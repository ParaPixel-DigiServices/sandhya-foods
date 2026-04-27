-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.addresses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  name text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  is_default boolean DEFAULT false,
  CONSTRAINT addresses_pkey PRIMARY KEY (id),
  CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.cart_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  product_id uuid,
  qty integer,
  CONSTRAINT cart_items_pkey PRIMARY KEY (id),
  CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  image text,
  active boolean DEFAULT true,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.order_items_v2 (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid,
  user_id uuid,
  product_id uuid NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  qty integer NOT NULL CHECK (qty > 0),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT order_items_v2_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_v2_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders_v2(id),
  CONSTRAINT order_items_v2_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES public.orders_v2(id),
  CONSTRAINT fk_order_items_v2_order FOREIGN KEY (order_id) REFERENCES public.orders_v2(id),
  CONSTRAINT order_items_v2_order_fk FOREIGN KEY (order_id) REFERENCES public.orders_v2(id)
);
CREATE TABLE public.orders_v2 (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  total numeric NOT NULL CHECK (total >= 0::numeric),
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'unverified'::text, 'rejected'::text, 'delivered'::text, 'paid'::text, 'confirmed'::text, 'packed'::text, 'shipped'::text, 'cancelled'::text])),
  created_at timestamp with time zone DEFAULT now(),
  admin_note text,
  razorpay_payment_id text,
  razorpay_order_id text,
  CONSTRAINT orders_v2_pkey PRIMARY KEY (id),
  CONSTRAINT orders_v2_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.payments_v2 (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  user_id uuid,
  utr text,
  status text NOT NULL DEFAULT 'submitted'::text CHECK (status = ANY (ARRAY['submitted'::text, 'verified'::text, 'rejected'::text])),
  created_at timestamp with time zone DEFAULT now(),
  razorpay_payment_id text,
  CONSTRAINT payments_v2_pkey PRIMARY KEY (id),
  CONSTRAINT payments_v2_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders_v2(id),
  CONSTRAINT payments_v2_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.product_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  url text,
  is_primary boolean DEFAULT false,
  CONSTRAINT product_images_pkey PRIMARY KEY (id),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  ingredients text,
  category_id uuid,
  price numeric NOT NULL,
  mrp numeric,
  active boolean DEFAULT true,
  is_bestseller boolean DEFAULT false,
  stock integer DEFAULT 9999,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text NOT NULL,
  phone text,
  role USER-DEFINED NOT NULL DEFAULT 'customer'::user_role,
  created_at timestamp with time zone DEFAULT now(),
  email text,
  phone_verified boolean DEFAULT false,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);