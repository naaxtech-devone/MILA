-- Cross-device Default Location (Climate Sync Hub) preference.
-- Stores the hub id slug (e.g. 'manila') from the app's HUBS constant;
-- city label and coordinates derive from that constant client-side, so a
-- single text column is enough. Non-sensitive user preference.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS default_location text;

-- Lenient length guard: hub ids are short slugs today, but leave headroom
-- for city/geo identifiers later. Deliberately not an enum/FK — the hub
-- list lives in the frontend and invalid values are simply ignored there.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_default_location_len_check') THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_default_location_len_check
      CHECK (default_location IS NULL OR length(default_location) <= 64);
  END IF;
END $$;

-- profiles uses column-level write grants (suspended stays admin-only);
-- expose the new column to clients. SELECT is already granted table-level,
-- and the owner-scoped "Users update own profile" RLS policy covers writes.
GRANT INSERT (default_location), UPDATE (default_location) ON public.profiles TO authenticated;
