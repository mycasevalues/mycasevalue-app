-- Create api_keys table for tracking API access and usage
-- Stores API keys, their associated users, and metadata

create table if not exists public.api_keys (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key_hash text not null unique,
  key_prefix text not null, -- First 10 chars for display (e.g., "mcv_abc123...")
  name text not null, -- User-friendly name
  description text, -- Optional description of the key's purpose
  tier text not null default 'starter', -- starter, professional, enterprise
  rate_limit_requests_per_min integer not null default 10,
  rate_limit_requests_per_day integer not null default 100000,
  last_used_at timestamp with time zone,
  last_rotated_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  expires_at timestamp with time zone, -- Optional expiration date
  is_active boolean not null default true,

  constraint valid_tier check (tier in ('starter', 'professional', 'enterprise')),
  constraint valid_rate_limits check (rate_limit_requests_per_min > 0),
  constraint valid_rate_limits_daily check (rate_limit_requests_per_day > 0)
);

-- Create api_usage table for tracking API call metrics
create table if not exists public.api_usage (
  id uuid primary key default uuid_generate_v4(),
  api_key_id uuid not null references public.api_keys(id) on delete cascade,
  endpoint text not null, -- e.g., "GET /api/v1/cases/nos/[code]"
  method text not null, -- GET, POST, etc.
  status_code integer not null,
  response_time_ms integer, -- Milliseconds
  request_size_bytes integer, -- Request body size
  response_size_bytes integer, -- Response body size
  error_message text, -- If status_code >= 400
  created_at timestamp with time zone not null default now(),

  constraint valid_status_code check (status_code >= 100 and status_code < 600)
);

-- Create indexes for common queries
create index if not exists api_keys_user_id_idx on public.api_keys(user_id);
create index if not exists api_keys_is_active_idx on public.api_keys(is_active);
create index if not exists api_keys_created_at_idx on public.api_keys(created_at desc);
create index if not exists api_usage_api_key_id_idx on public.api_usage(api_key_id);
create index if not exists api_usage_created_at_idx on public.api_usage(created_at desc);
create index if not exists api_usage_endpoint_idx on public.api_usage(endpoint);

-- Enable RLS on both tables
alter table public.api_keys enable row level security;
alter table public.api_usage enable row level security;

-- RLS policy: Users can only view their own API keys
create policy "Users can view own api_keys" on public.api_keys
  for select using (auth.uid() = user_id);

-- RLS policy: Users can only create their own API keys
create policy "Users can create own api_keys" on public.api_keys
  for insert with check (auth.uid() = user_id);

-- RLS policy: Users can only update their own API keys
create policy "Users can update own api_keys" on public.api_keys
  for update using (auth.uid() = user_id);

-- RLS policy: Users can only delete their own API keys
create policy "Users can delete own api_keys" on public.api_keys
  for delete using (auth.uid() = user_id);

-- RLS policy: Users can only view usage of their own API keys
create policy "Users can view own api_usage" on public.api_usage
  for select using (
    api_key_id in (
      select id from public.api_keys where user_id = auth.uid()
    )
  );

-- Grant permissions to authenticated users
grant select on public.api_keys to authenticated;
grant insert, update, delete on public.api_keys to authenticated;
grant select on public.api_usage to authenticated;
