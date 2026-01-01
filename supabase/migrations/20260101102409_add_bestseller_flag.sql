alter table products
add column if not exists is_bestseller boolean default false;
