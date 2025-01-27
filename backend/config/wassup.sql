-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Provider enum (keeping this as enum since it's core platform config)
create type account_provider as enum (
  'evm', 'tron', 'substrate', 'solana', 'twitter', 'youtube', 
  'tiktok', 'docusign', 'biconomy', 'instagram', 'threads', 
  'facebook', 'mastodon', 'bluesky'
);

create type account_type as enum ('web2', 'web3');

-- Account Groups table
create table account_groups (
  id uuid primary key default uuid_generate_v4(),
  account_ids text[] default array[]::text[], -- Array of account IDs
  profile_ids text[] default array[]::text[], -- Array of profile IDs
  account_logs jsonb default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Validation function for account_logs
create or replace function validate_account_logs()
returns trigger as $$
begin
  -- Check if it's an array
  if jsonb_typeof(new.account_logs) != 'array' then
    raise exception 'account_logs must be an array';
  end if;
  
  -- Return new row if array is empty or validation passes
  return new;
end;
$$ language plpgsql;

-- Add trigger for account_logs validation
create trigger validate_account_logs_trigger
  before insert or update on account_groups
  for each row execute function validate_account_logs();

-- Accounts table (private information)
create table accounts (
  id text primary key,
  group_id uuid references account_groups(id) not null,
  provider account_provider not null,
  account_type account_type not null,
  
  -- Private authentication info
  auth jsonb default '{}'::jsonb,
  private_email text,  -- Private email for auth/notifications
  
  name text,
  last_synced_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Email format validation
  constraint valid_email_format 
    check (private_email is null or private_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

-- Profiles table (public information with privacy controls)
create table profiles (
  id text primary key,
  account_id text references accounts(id) not null,
  group_id uuid references account_groups(id) not null,
  
  username text not null,
  display_name text,
  contact_email text,    -- Public email (optional)
  bio text,
  location text,
  avatar_url text,
  phone text,
  birth_date date,
  
  -- Privacy settings
  privacy_settings jsonb default '{
    "email_visible": false,
    "phone_visible": false,
    "location_visible": false,
    "birth_date_visible": false,
    "bio_visible": true,
    "visibility_level": "public"
  }'::jsonb,
  
  platform_usernames jsonb default '[]'::jsonb,
  platform_specifics jsonb default '{}'::jsonb,
  
  version integer default 1,
  last_synced_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Constraints
  constraint valid_username_format check (username ~* '^[a-zA-Z0-9_-]{2,30}$'),
  constraint valid_contact_email_format check (
    contact_email is null or 
    contact_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
  ),
  constraint valid_birth_date check (birth_date is null or birth_date <= current_date)
);

-- Helper function to add a log entry
create or replace function add_account_log(
  p_group_id uuid,
  p_account_id text,
  p_provider account_provider,
  p_email text,
  p_name text,
  p_profile_id text,
  p_username text,
  p_action text,
  p_reason text
) returns void as $$
begin
  -- Validate action
  if p_action not in ('linked', 'unlinked', 'updated', 'refreshed', 'expired') then
    raise exception 'Invalid action: %', p_action;
  end if;

  update account_groups
  set account_logs = account_logs || jsonb_build_object(
    'account_id', p_account_id,
    'provider', p_provider,
    'email', p_email,
    'name', p_name,
    'profile_id', p_profile_id,
    'username', p_username,
    'action', p_action,
    'reason', p_reason,
    'created_at', timezone('utc'::text, now())
  )
  where id = p_group_id;
end;
$$ language plpgsql;

-- Helper function to get public profile
create or replace function get_public_profile(profile_id text)
returns json as $$
  select json_build_object(
    'id', p.id,
    'username', p.username,
    'display_name', p.display_name,
    'avatar_url', p.avatar_url,
    'bio', case when (p.privacy_settings->>'bio_visible')::boolean then p.bio else null end,
    'email', case when (p.privacy_settings->>'email_visible')::boolean then p.contact_email else null end,
    'phone', case when (p.privacy_settings->>'phone_visible')::boolean then p.phone else null end,
    'location', case when (p.privacy_settings->>'location_visible')::boolean then p.location else null end,
    'birth_date', case when (p.privacy_settings->>'birth_date_visible')::boolean then p.birth_date else null end,
    'platform_usernames', p.platform_usernames
  )
  from profiles p
  where p.id = profile_id;
$$ language sql security definer;

-- Update timestamps trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger update_account_groups_updated_at
  before update on account_groups
  for each row execute procedure update_updated_at_column();

create trigger update_accounts_updated_at
  before update on accounts
  for each row execute procedure update_updated_at_column();

create trigger update_profiles_updated_at
  before update on profiles
  for each row execute procedure update_updated_at_column();

-- Indexes for performance
create index idx_accounts_group_id on accounts(group_id);
create index idx_accounts_provider on accounts(provider);
create index idx_accounts_last_synced on accounts(last_synced_at);
create index idx_profiles_account_id on profiles(account_id);
create index idx_profiles_group_id on profiles(group_id);
create index idx_profiles_last_synced on profiles(last_synced_at);
create index idx_account_groups_account_logs on account_groups using gin(account_logs);
create index idx_account_groups_account_ids on account_groups using gin(account_ids);
create index idx_account_groups_profile_ids on account_groups using gin(profile_ids);
create index idx_profiles_platform_specifics on profiles using gin(platform_specifics);
create index idx_profiles_privacy on profiles using gin(privacy_settings);

-- Full text search indexes
create index idx_accounts_email_search on accounts using gin(to_tsvector('english', coalesce(private_email, '')));
create index idx_profiles_username_search on profiles using gin(to_tsvector('english', coalesce(username, '')));
create index idx_profiles_display_name_search on profiles using gin(to_tsvector('english', coalesce(display_name, '')));
create index idx_profiles_full_text on profiles using gin(
  to_tsvector('english',
    coalesce(username, '') || ' ' ||
    coalesce(display_name, '') || ' ' ||
    coalesce(bio, '')
  )
);

-- Enable Row Level Security
alter table accounts enable row level security;
alter table profiles enable row level security;
alter table account_groups enable row level security;

-- RLS Policies
create policy "Accounts are only visible to owner"
  on accounts for all
  using (auth.uid()::text = group_id::text);

create policy "Profiles are readable by everyone"
  on profiles for select
  using (true);

create policy "Profiles are only editable by owner"
  on profiles for all
  using (auth.uid()::text = group_id::text)
  with check (auth.uid()::text = group_id::text);

create policy "Account groups are readable by everyone"
  on account_groups for select
  using (true);

create policy "Account groups are only editable by owner"
  on account_groups for all
  using (auth.uid()::text = id::text)
  with check (auth.uid()::text = id::text);


  -- Enhanced privacy settings default
alter table profiles 
alter column privacy_settings set default '{
  "email_visible": false,
  "phone_visible": false,
  "location_visible": false,
  "birth_date_visible": false,
  "bio_visible": true,
  "followers_visible": true,
  "following_visible": true,
  "activity_visible": true,
  "social_links_visible": true,
  "visibility_level": "public"
}'::jsonb;

-- Add additional helper functions
-- Get all accounts for a group with their profiles
create or replace function get_group_accounts(group_id_param uuid)
returns jsonb as $$
  select jsonb_agg(
    jsonb_build_object(
      'account', a,
      'profile', p
    )
  )
  from accounts a
  left join profiles p on p.account_id = a.id
  where a.group_id = group_id_param;
$$ language sql security definer;

-- Search profiles with privacy respect
create or replace function search_profiles(search_term text)
returns setof json as $$
  select json_build_object(
    'id', p.id,
    'username', p.username,
    'display_name', p.display_name,
    'bio', case 
      when (p.privacy_settings->>'bio_visible')::boolean then p.bio 
      else null 
    end
  )
  from profiles p
  where 
    to_tsvector('english', 
      coalesce(p.username, '') || ' ' || 
      coalesce(p.display_name, '') || ' ' ||
      coalesce(p.bio, '')
    ) @@ plainto_tsquery('english', search_term)
    and (p.privacy_settings->>'visibility_level')::text = 'public';
$$ language sql security definer;

-- Get account activity log with date range
create or replace function get_account_activity(
  p_group_id uuid,
  start_date timestamp with time zone,
  end_date timestamp with time zone
)
returns jsonb as $$
  select jsonb_agg(log)
  from account_groups ag,
  jsonb_array_elements(account_logs) log
  where ag.id = p_group_id
  and (log->>'created_at')::timestamp with time zone between start_date and end_date;
$$ language sql security definer;

-- Add safe constraints (that don't involve subqueries)
alter table profiles
add constraint valid_privacy_settings check (
  jsonb_typeof(privacy_settings->'email_visible') = 'boolean' and
  jsonb_typeof(privacy_settings->'phone_visible') = 'boolean' and
  privacy_settings->>'visibility_level' in ('public', 'private', 'followers_only')
);