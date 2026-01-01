create type user_role as enum ('customer','admin');
create type payment_state as enum ('pending','verified','rejected');
create type order_state as enum ('placed','confirmed','packed','shipped','delivered','cancelled');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text not null,
  role user_role not null default 'customer',
  created_at timestamptz default now()
);

create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  name text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  is_default boolean default false
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text,
  slug text,
  image text,
  active boolean default true
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text,
  slug text,
  description text,
  ingredients text,
  category_id uuid references categories(id),
  price numeric,
  mrp numeric,
  active boolean default true
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  url text,
  is_primary boolean default false
);

create table inventory (
  product_id uuid primary key references products(id),
  stock integer,
  low_stock_threshold integer
);

create table cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  qty integer
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  address_snapshot jsonb,
  total_amount numeric,
  payment_status text,
  order_status order_state,
  payment_method text,
  razorpay_payment_id text,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  product_snapshot jsonb,
  qty integer,
  price numeric
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  amount numeric,
  method text,
  status payment_state,
  proof_url text,
  verified_by uuid references profiles(id),
  verified_at timestamptz
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  rating integer,
  comment text,
  approved boolean default false
);

create table coupons (
  id uuid primary key default gen_random_uuid(),
  code text,
  discount_percent integer,
  active boolean default true
);

create table order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  old_status text,
  new_status text,
  changed_by uuid,
  changed_at timestamptz default now()
);
