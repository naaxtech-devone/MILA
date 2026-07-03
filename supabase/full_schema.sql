-- Full schema: all migrations concatenated in order (generated 2026-07-02).
-- Paste into the Supabase SQL Editor of a FRESH project, or run: psql <db-url> -f supabase/full_schema.sql

-- ===== supabase/migrations/20260524145150_789afca6-a068-4e9f-857f-8d7ab9fb3c2b.sql =====

-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  skin_undertone TEXT CHECK (skin_undertone IN ('Cool','Warm','Neutral')),
  color_season TEXT CHECK (color_season IN ('Spring','Summer','Autumn','Winter')),
  body_type TEXT CHECK (body_type IN ('Hourglass','Rectangle','Pear','Inverted Triangle','Apple')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Outfits table
CREATE TABLE public.outfits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  analysis_result JSONB,
  match_score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.outfits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own outfits" ON public.outfits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own outfits" ON public.outfits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own outfits" ON public.outfits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own outfits" ON public.outfits FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE INDEX outfits_user_created_idx ON public.outfits(user_id, created_at DESC);

-- ===== supabase/migrations/20260524145210_8e92afb0-1931-43cc-b25b-fd302c9f6f5d.sql =====
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- ===== supabase/migrations/20260524151508_da3814e8-20c3-4fef-ab29-53ee71fde15f.sql =====

insert into storage.buckets (id, name, public) values ('outfits', 'outfits', true)
on conflict (id) do nothing;

create policy "Outfit images are publicly viewable"
on storage.objects for select
using (bucket_id = 'outfits');

create policy "Users can upload their own outfit images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'outfits' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own outfit images"
on storage.objects for delete
to authenticated
using (bucket_id = 'outfits' and (storage.foldername(name))[1] = auth.uid()::text);

-- ===== supabase/migrations/20260524161131_85caaca5-fb5b-453e-b065-6b9afd36a03b.sql =====
-- Create the clothes table for digital wardrobe management
CREATE TABLE public.clothes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  primary_color TEXT,
  color_undertone TEXT,
  silhouette_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clothes ENABLE ROW LEVEL SECURITY;

-- Create policies so users can only manage their own wardrobe items
CREATE POLICY "Users can view their own clothes"
  ON public.clothes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own clothes"
  ON public.clothes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clothes"
  ON public.clothes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own clothes"
  ON public.clothes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for fast lookups by user
CREATE INDEX idx_clothes_user_id ON public.clothes(user_id);

-- Index for category filtering
CREATE INDEX idx_clothes_category ON public.clothes(category);
-- ===== supabase/migrations/20260524161514_00c1e59a-5e1c-425f-a9d2-308d119f4df8.sql =====

-- Tighten outfits bucket: replace public listing policy with owner-scoped one
DROP POLICY IF EXISTS "Outfit images are publicly viewable" ON storage.objects;

CREATE POLICY "Users view their own outfit images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'outfits' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Create wardrobe storage bucket (public-read via URL, owner-only write/list)
INSERT INTO storage.buckets (id, name, public)
VALUES ('wardrobe', 'wardrobe', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users view their own wardrobe images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'wardrobe' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users upload their own wardrobe images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'wardrobe' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users delete their own wardrobe images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'wardrobe' AND (storage.foldername(name))[1] = auth.uid()::text);

-- ===== supabase/migrations/20260524172457_d7439a83-b06d-401f-bfc1-c47afcc048a3.sql =====
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS color_hue TEXT,
  ADD COLUMN IF NOT EXISTS color_value TEXT,
  ADD COLUMN IF NOT EXISTS color_chroma TEXT;
-- ===== supabase/migrations/20260524180258_01d2267c-c7ee-4aa2-b981-9bfcc84d019c.sql =====
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS color_profile jsonb;
-- ===== supabase/migrations/20260524184639_86e0e246-9737-4e1c-ac05-96ca11309a4f.sql =====

-- Entitlements
CREATE TABLE public.user_entitlements (
  user_id UUID PRIMARY KEY,
  wardrobe_slots INTEGER NOT NULL DEFAULT 20,
  ads_removed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own entitlements" ON public.user_entitlements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own entitlements" ON public.user_entitlements
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own entitlements" ON public.user_entitlements
  FOR UPDATE USING (auth.uid() = user_id);

-- Purchases (IAP record)
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'completed',
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own purchases" ON public.purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_purchases_user ON public.purchases(user_id, created_at DESC);

-- Ad events (banner + rewarded)
CREATE TABLE public.ad_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  ad_type TEXT NOT NULL CHECK (ad_type IN ('banner','rewarded','interstitial')),
  event TEXT NOT NULL CHECK (event IN ('impression','click','completed','reward_granted','dismissed')),
  placement TEXT,
  reward_type TEXT,
  reward_amount INTEGER,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ad_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own ad events" ON public.ad_events
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own ad events" ON public.ad_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_ad_events_user ON public.ad_events(user_id, created_at DESC);

-- ===== supabase/migrations/20260524190704_bb3c5b23-93a0-4555-92eb-550b18bdfb5f.sql =====
-- Shared timestamp trigger fn (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Brands
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  affiliate_network TEXT,
  commission_rate NUMERIC(5,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view active brands"
  ON public.brands FOR SELECT TO authenticated USING (status = 'active');

-- Products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  affiliate_link TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  seasonal_palettes TEXT[] NOT NULL DEFAULT '{}',
  body_shapes TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  date_added TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_products_brand ON public.products(brand_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_palettes ON public.products USING GIN(seasonal_palettes);
CREATE INDEX idx_products_shapes ON public.products USING GIN(body_shapes);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view products"
  ON public.products FOR SELECT TO authenticated USING (true);

-- User favorites
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);
CREATE INDEX idx_favorites_user ON public.user_favorites(user_id);
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own favorites"
  ON public.user_favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own favorites"
  ON public.user_favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own favorites"
  ON public.user_favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_brands_updated_at
  BEFORE UPDATE ON public.brands
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed
WITH b AS (
  INSERT INTO public.brands (name, website_url, affiliate_network, commission_rate, status) VALUES
    ('Aritzia', 'https://www.aritzia.com', 'Rakuten', 5.00, 'active'),
    ('COS', 'https://www.cos.com', 'AWIN', 4.00, 'active'),
    ('Reformation', 'https://www.thereformation.com', 'Impact', 6.00, 'active'),
    ('Everlane', 'https://www.everlane.com', 'Impact', 5.00, 'active'),
    ('Ganni', 'https://www.ganni.com', 'AWIN', 6.00, 'active'),
    ('Net-a-Porter', 'https://www.net-a-porter.com', 'Rakuten', 8.00, 'active')
  RETURNING id, name
)
INSERT INTO public.products (brand_id, title, image_url, affiliate_link, price, currency, seasonal_palettes, body_shapes, category)
SELECT b.id, p.title, p.image_url, p.affiliate_link, p.price, 'USD', p.palettes, p.shapes, p.category
FROM b JOIN (VALUES
  ('Aritzia','Effortless Wool Coat','https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800','https://www.aritzia.com',248.00,ARRAY['Deep Winter','Deep Autumn'],ARRAY['Hourglass','Rectangle'],'Outerwear'),
  ('Aritzia','Contour Knit Tank','https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800','https://www.aritzia.com',48.00,ARRAY['Clear Winter','Cool Summer'],ARRAY['Hourglass','Pear'],'Tops'),
  ('COS','Architectural Trouser','https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800','https://www.cos.com',135.00,ARRAY['Soft Summer','Cool Winter'],ARRAY['Rectangle','Inverted Triangle'],'Bottoms'),
  ('COS','Minimal Oversized Shirt','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800','https://www.cos.com',95.00,ARRAY['Light Summer','Soft Autumn'],ARRAY['Inverted Triangle','Apple'],'Tops'),
  ('Reformation','Bias Slip Midi Dress','https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800','https://www.thereformation.com',248.00,ARRAY['Light Spring','Warm Spring'],ARRAY['Hourglass','Pear'],'Dresses'),
  ('Reformation','Linen High-Rise Short','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800','https://www.thereformation.com',98.00,ARRAY['Warm Spring','Light Spring'],ARRAY['Pear','Hourglass'],'Bottoms'),
  ('Everlane','The Way-High Jean','https://images.unsplash.com/photo-1542272604-787c3835535d?w=800','https://www.everlane.com',98.00,ARRAY['Cool Winter','Soft Summer'],ARRAY['Rectangle','Pear'],'Bottoms'),
  ('Everlane','Organic Cotton Tee','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800','https://www.everlane.com',30.00,ARRAY['Light Summer','Light Spring'],ARRAY['Hourglass','Rectangle','Pear','Inverted Triangle','Apple'],'Tops'),
  ('Ganni','Printed Mesh Top','https://images.unsplash.com/photo-1485518882345-15568b007407?w=800','https://www.ganni.com',175.00,ARRAY['Clear Spring','Clear Winter'],ARRAY['Hourglass','Inverted Triangle'],'Tops'),
  ('Ganni','Recycled Leather Skirt','https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=800','https://www.ganni.com',395.00,ARRAY['Deep Autumn','Deep Winter'],ARRAY['Hourglass','Pear'],'Bottoms'),
  ('Net-a-Porter','Cashmere Crewneck','https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800','https://www.net-a-porter.com',520.00,ARRAY['Soft Autumn','Soft Summer'],ARRAY['Rectangle','Hourglass'],'Tops'),
  ('Net-a-Porter','Silk Tailored Blazer','https://images.unsplash.com/photo-1591047139756-eb1a3a1a3a5b?w=800','https://www.net-a-porter.com',890.00,ARRAY['Deep Winter','Cool Winter'],ARRAY['Inverted Triangle','Hourglass'],'Outerwear')
) AS p(brand_name, title, image_url, affiliate_link, price, palettes, shapes, category)
ON b.name = p.brand_name;
-- ===== supabase/migrations/20260528164517_c6a01c03-358c-4be3-a9da-82c56c182f56.sql =====
ALTER TABLE public.user_entitlements
  ADD COLUMN IF NOT EXISTS ai_credits integer NOT NULL DEFAULT 5;

UPDATE public.user_entitlements SET ai_credits = 5 WHERE ai_credits IS NULL;
-- ===== supabase/migrations/20260528165153_08ee5ead-6275-4b6a-a53e-5fe0f8ad9fa7.sql =====
ALTER TABLE public.profiles DROP COLUMN IF EXISTS color_hue;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS color_value;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS color_chroma;
-- ===== supabase/migrations/20260528172916_a9b0b7d1-5b73-4c2a-8a36-73517723835b.sql =====
ALTER TABLE public.profiles
ADD COLUMN username TEXT UNIQUE;

-- Recreate the insert policy so new profiles must supply a valid username
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (
  auth.uid() = id
  AND username IS NOT NULL
  AND length(trim(username)) >= 3
  AND length(trim(username)) <= 30
  AND username ~ '^[a-zA-Z0-9_-]+$'
);

-- Recreate the update policy so a username (when provided) must be valid
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND (
    username IS NULL
    OR (
      length(trim(username)) >= 3
      AND length(trim(username)) <= 30
      AND username ~ '^[a-zA-Z0-9_-]+$'
    )
  )
);

-- Regrant column-level permissions on the new username field
GRANT SELECT(username), INSERT(username), UPDATE(username) ON public.profiles TO authenticated;
GRANT SELECT(username), INSERT(username), UPDATE(username) ON public.profiles TO service_role;
-- ===== supabase/migrations/20260621185341_54909d8b-66ca-46c9-92d8-fbd433c3914c.sql =====
-- Drop wardrobe-related schema in the pivot to OOTD curation.
DROP TABLE IF EXISTS public.clothes CASCADE;
ALTER TABLE public.user_entitlements DROP COLUMN IF EXISTS wardrobe_slots;
-- ===== supabase/migrations/20260621190228_fc36bfdd-99a8-4011-a5f2-74b19de6ed03.sql =====
-- Expand profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS face_shape text,
  ADD COLUMN IF NOT EXISTS hair_type text,
  ADD COLUMN IF NOT EXISTS beauty_preferences jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Posts table
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url_front text NOT NULL,
  image_url_back text NOT NULL,
  caption text,
  generated_look_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own posts"
  ON public.posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view everyone's posts"
  ON public.posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);

-- Storage policies for posts bucket (bucket itself created via storage tool)
CREATE POLICY "Posts images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'posts');

CREATE POLICY "Users can upload their own post images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own post images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own post images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ===== supabase/migrations/20260623060632_7d29df49-814f-4918-bc70-fc973fcf0157.sql =====
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS beauty_preferences jsonb NOT NULL DEFAULT '[]'::jsonb;
-- ===== supabase/migrations/20260623063625_8093b872-b0fb-4b8a-9865-023fd68ec53e.sql =====

-- Role system
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Admin-managed post moderation
ALTER TABLE public.posts ADD COLUMN hidden boolean NOT NULL DEFAULT false;
ALTER TABLE public.posts ADD COLUMN hidden_reason text;
ALTER TABLE public.posts ADD COLUMN hidden_at timestamptz;

-- Admins can view, hide, and delete any post
CREATE POLICY "Admins manage all posts" ON public.posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can view all profiles (for user management)
CREATE POLICY "Admins view all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Account suspension flag
ALTER TABLE public.profiles ADD COLUMN suspended boolean NOT NULL DEFAULT false;

-- Seed first admin by email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE email = 'shantelle4578@gmail.com'
ON CONFLICT DO NOTHING;

-- ===== supabase/migrations/20260703000000_default_user_role.sql =====
-- Every new signup (email/password and OAuth both insert into auth.users,
-- so this covers both) gets the default 'user' role alongside its profile.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

-- Backfill: existing accounts that predate default roles get 'user'
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'user'::public.app_role
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = u.id)
ON CONFLICT DO NOTHING;

