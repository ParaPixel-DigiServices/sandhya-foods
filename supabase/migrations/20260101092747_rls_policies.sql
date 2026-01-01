alter table profiles enable row level security;
alter table addresses enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payments enable row level security;
alter table reviews enable row level security;

create policy "profiles_select_own"
on profiles for select using (auth.uid() = id);

create policy "profiles_update_own"
on profiles for update using (auth.uid() = id);

create policy "addresses_own"
on addresses for all using (auth.uid() = user_id);

create policy "cart_own"
on cart_items for all using (auth.uid() = user_id);

create policy "orders_own"
on orders for select using (auth.uid() = user_id);

create policy "order_items_own"
on order_items for select using (
  exists(select 1 from orders where id = order_id and user_id = auth.uid())
);

create policy "reviews_own"
on reviews for all using (auth.uid() = user_id);

create policy "admin_full_access_profiles"
on profiles for all using (
  exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);

create policy "admin_full_access_orders"
on orders for all using (
  exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);

create policy "admin_full_access_payments"
on payments for all using (
  exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);
