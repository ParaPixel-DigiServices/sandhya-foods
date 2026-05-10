-- =============================================================================
-- MIGRATION 01: Full Schema
-- Applies clean schema to the new Supabase project.
-- Tables are named without _v2 suffix (orders, order_items, payments).
-- =============================================================================

-- Custom enum type for user roles
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'customer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ─── profiles ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id              uuid        NOT NULL,
  full_name       text        NOT NULL,
  phone           text,
  role            user_role   NOT NULL DEFAULT 'customer',
  created_at      timestamptz DEFAULT now(),
  email           text,
  phone_verified  boolean     DEFAULT false,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ─── categories ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id      uuid    NOT NULL DEFAULT gen_random_uuid(),
  name    text    NOT NULL,
  slug    text    NOT NULL,
  image   text,
  active  boolean DEFAULT true,
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_slug_key UNIQUE (slug)
);

-- ─── products ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id            uuid        NOT NULL DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  slug          text        NOT NULL,
  description   text,
  ingredients   text,
  category_id   uuid,
  price         numeric     NOT NULL,
  mrp           numeric,
  active        boolean     DEFAULT true,
  is_bestseller boolean     DEFAULT false,
  stock         integer     DEFAULT 9999,
  image_url     text,
  created_at    timestamptz DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_slug_key UNIQUE (slug),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);

-- ─── product_images ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.product_images (
  id          uuid    NOT NULL DEFAULT gen_random_uuid(),
  product_id  uuid,
  url         text,
  is_primary  boolean DEFAULT false,
  CONSTRAINT product_images_pkey PRIMARY KEY (id),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE
);

-- ─── addresses ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.addresses (
  id              uuid    NOT NULL DEFAULT gen_random_uuid(),
  user_id         uuid,
  name            text,
  phone           text,
  address_line1   text,
  address_line2   text,
  city            text,
  state           text,
  pincode         text,
  is_default      boolean DEFAULT false,
  CONSTRAINT addresses_pkey PRIMARY KEY (id),
  CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- ─── cart_items ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cart_items (
  id          uuid    NOT NULL DEFAULT gen_random_uuid(),
  user_id     uuid,
  product_id  uuid,
  qty         integer,
  CONSTRAINT cart_items_pkey PRIMARY KEY (id),
  CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE
);

-- ─── orders (renamed from orders_v2) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
  user_id             uuid,
  customer_name       text    NOT NULL,
  phone               text    NOT NULL,
  address             text    NOT NULL,
  city                text    NOT NULL,
  state               text    NOT NULL,
  pincode             text    NOT NULL,
  total               numeric NOT NULL CHECK (total >= 0),
  status              text    NOT NULL DEFAULT 'pending' CHECK (
                        status = ANY (ARRAY[
                          'pending','unverified','rejected','delivered',
                          'paid','confirmed','packed','shipped','cancelled'
                        ])
                      ),
  created_at          timestamptz DEFAULT now(),
  admin_note          text,
  razorpay_payment_id text,
  razorpay_order_id   text,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ─── order_items (renamed from order_items_v2) ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.order_items (
  id          uuid    NOT NULL DEFAULT gen_random_uuid(),
  order_id    uuid,
  user_id     uuid,
  product_id  uuid    NOT NULL,
  name        text    NOT NULL,
  price       numeric NOT NULL CHECK (price >= 0),
  qty         integer NOT NULL CHECK (qty > 0),
  created_at  timestamptz DEFAULT now(),
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT order_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ─── payments (renamed from payments_v2) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payments (
  id                  uuid    NOT NULL DEFAULT gen_random_uuid(),
  order_id            uuid    NOT NULL,
  user_id             uuid,
  utr                 text,
  status              text    NOT NULL DEFAULT 'submitted' CHECK (
                        status = ANY (ARRAY['submitted','verified','rejected'])
                      ),
  created_at          timestamptz DEFAULT now(),
  razorpay_payment_id text,
  CONSTRAINT payments_pkey PRIMARY KEY (id),
  CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE,
  CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

-- =============================================================================
-- Row Level Security
-- =============================================================================

ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments       ENABLE ROW LEVEL SECURITY;

-- Public read for shop browsing
DROP POLICY IF EXISTS "Public read categories"     ON public.categories;
DROP POLICY IF EXISTS "Public read products"       ON public.products;
DROP POLICY IF EXISTS "Public read product_images" ON public.product_images;
CREATE POLICY "Public read categories"     ON public.categories     FOR SELECT USING (true);
CREATE POLICY "Public read products"       ON public.products       FOR SELECT USING (active = true);
CREATE POLICY "Public read product_images" ON public.product_images FOR SELECT USING (true);

-- Profiles: users can manage their own
DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;
CREATE POLICY "Users manage own profile"   ON public.profiles FOR ALL USING (auth.uid() = id);

-- Addresses: users can manage their own
DROP POLICY IF EXISTS "Users manage own addresses" ON public.addresses;
CREATE POLICY "Users manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- Cart: users can manage their own
DROP POLICY IF EXISTS "Users manage own cart" ON public.cart_items;
CREATE POLICY "Users manage own cart"      ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Orders: users see their own; service role (used in API routes) can see all
DROP POLICY IF EXISTS "Users see own orders"    ON public.orders;
DROP POLICY IF EXISTS "Users insert own orders" ON public.orders;
CREATE POLICY "Users see own orders"       ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own orders"    ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: users see their own
DROP POLICY IF EXISTS "Users see own order_items"    ON public.order_items;
DROP POLICY IF EXISTS "Users insert own order_items" ON public.order_items;
CREATE POLICY "Users see own order_items"  ON public.order_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own order_items" ON public.order_items FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments: users see their own
DROP POLICY IF EXISTS "Users see own payments"    ON public.payments;
DROP POLICY IF EXISTS "Users insert own payments" ON public.payments;
CREATE POLICY "Users see own payments"     ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own payments"  ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- Auto-create profile on signup trigger
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
