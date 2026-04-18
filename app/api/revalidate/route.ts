import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-revalidation-secret');
    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { path } = body as Record<string, unknown>;
    if (!path || typeof path !== 'string' || !path.startsWith('/')) {
      return Response.json(
        { error: 'Invalid path: must be a non-empty string starting with /' },
        { status: 400 }
      );
    }

    revalidatePath(path);
    return Response.json({ revalidated: true, path });
  } catch (err) {
    console.error('[api/revalidate] error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
