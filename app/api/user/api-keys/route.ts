/**
 * API Key Management Endpoints
 * GET  /api/user/api-keys  — list keys (prefix only)
 * POST /api/user/api-keys  — generate new key
 * DELETE /api/user/api-keys?id=xxx — revoke a key
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes, createHash } from 'crypto';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
}

async function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const cookie = request.headers.get('cookie') || '';

  const supabase = getSupabaseAdmin();

  // Try bearer token first
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const { data } = await supabase.auth.getUser(token);
    return data?.user || null;
  }

  // Try cookie-based session
  const sbAccessToken = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('sb-access-token='));

  if (sbAccessToken) {
    const token = sbAccessToken.split('=')[1];
    const { data } = await supabase.auth.getUser(token);
    return data?.user || null;
  }

  return null;
}

function generateApiKey(): string {
  const raw = randomBytes(32).toString('hex');
  return `mcv_${raw}`;
}

function hashKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('id, prefix, created_at, last_used')
      .eq('user_id', user.id)
      .eq('revoked', false)
      .order('created_at', { ascending: false });

    if (error) {
      // Table may not exist yet — return empty
      return NextResponse.json({ keys: [] });
    }

    return NextResponse.json({
      keys: (keys || []).map((k: { id: string; prefix: string; created_at: string; last_used: string | null }) => ({
        id: k.id,
        prefix: k.prefix,
        createdAt: k.created_at,
        lastUsed: k.last_used,
      })),
    });
  } catch {
    return NextResponse.json({ keys: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    // Check existing key count (max 5)
    const { count } = await supabase
      .from('api_keys')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('revoked', false);

    if (count !== null && count >= 5) {
      return NextResponse.json(
        { error: 'Maximum of 5 active API keys allowed. Revoke an existing key first.' },
        { status: 400 }
      );
    }

    const plainKey = generateApiKey();
    const hashedKey = hashKey(plainKey);
    const prefix = plainKey.slice(0, 12);

    const { error } = await supabase.from('api_keys').insert({
      user_id: user.id,
      key_hash: hashedKey,
      prefix,
      revoked: false,
    });

    if (error) {
      console.error('[api-keys] insert error:', error.message);
      return NextResponse.json({ error: 'Failed to create API key. Ensure database is configured.' }, { status: 500 });
    }

    return NextResponse.json({ key: plainKey, prefix });
  } catch (err) {
    console.error('[api-keys] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const keyId = searchParams.get('id');
    if (!keyId) {
      return NextResponse.json({ error: 'Missing key id' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('api_keys')
      .update({ revoked: true })
      .eq('id', keyId)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: 'Failed to revoke key' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
