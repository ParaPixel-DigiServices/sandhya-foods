-- =============================================================================
-- MIGRATION 03: Seed Data
-- Inserts all products, categories, and product_images with updated image URLs.
-- Image URLs are updated from old project to new project ID.
-- Old project: fejytngrucuwsekeuuwr
-- New project: simwxrfscfhtuksrbnqf
-- =============================================================================

-- ─── categories ───────────────────────────────────────────────────────────────
INSERT INTO public.categories (id, name, slug, image, active) VALUES
  ('0a0ae1f1-6e5a-440b-8bcf-232f86463a24', 'Chana Garlic',  'chana-garlic', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/categories/chana-garlic.jpg', true),
  ('ae385f7d-f243-4f06-97d6-cdab1a4239f9', 'Chana Masala',  'chana-masala', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/categories/chana.jpg',        true),
  ('754b04f1-143b-4b30-95aa-c99070a0ec48', 'Moong Special', 'moong',        'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/categories/moong.jpg',        true),
  ('c637b978-d04e-44bb-884c-4ffe9159eb2a', 'Urad Punjabi',  'urad',         'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/categories/urad.jpg',         true)
ON CONFLICT (id) DO NOTHING;

-- ─── products ─────────────────────────────────────────────────────────────────
INSERT INTO public.products (id, name, slug, description, ingredients, category_id, price, mrp, active, is_bestseller, stock, image_url, created_at) VALUES
  ('d05997d1-892b-4ca3-89b0-78819dd553f8', 'Moong Special Papad - 200GM',  'moong-special-papad---200gm',  E'Weight: 200GM\nSize: 7" / 9"', '', NULL, 71,  71,  true, false, 9999, NULL, '2026-01-04T07:03:26.872048+00:00'),
  ('f74f1c71-3274-4978-9a99-3c792415a788', 'Moong Special Papad - 400GM',  'moong-special-papad---400gm',  E'Weight: 400GM\nSize: 7" / 9"', '', NULL, 138, 138, true, true,  9999, NULL, '2026-01-04T07:04:36.252181+00:00'),
  ('bb25161c-1a03-41b9-8d2d-9300c7540fe7', 'Moong Punjabi Papad - 200GM',  'moong-punjabi-papad---200gm',  E'Weight : 200GM\nSize : 7"',     '', NULL, 75,  75,  true, true,  9999, NULL, '2026-01-04T07:06:02.077854+00:00'),
  ('facdbc6b-4343-461d-9bb9-77687d4e2c42', 'Moong Punjabi Papad - 400GM',  'moong-punjabi-papad---400gm',  E'Weight : 400GM\nSize : 7"',     '', NULL, 146, 146, true, false, 9999, NULL, '2026-01-04T07:07:25.570935+00:00'),
  ('b86379b3-e6bb-4f7c-9fd3-58d06e3efb11', 'Moong Garlic Papad - 400GM',   'moong-garlic-papad---400gm',   E'Weight : 400GM\nSize : 7"',     '', NULL, 138, 138, true, false, 9999, NULL, '2026-01-04T07:08:33.130534+00:00'),
  ('4e0066e4-e19a-4532-919e-286d4cf1a5d7', 'Urad Special Papad - 200GM',   'urad-special-papad---200gm',   E'Weight : 200GM\nSize : 7"',     '', NULL, 74,  74,  true, false, 9999, NULL, '2026-01-04T07:09:40.358479+00:00'),
  ('d0d6a2ba-0862-4dd2-bbb2-58fdfd09a796', 'Urad Special Papad - 400GM',   'urad-special-papad---400gm',   E'Weight : 400GM\nSize : 7"',     '', NULL, 144, 144, true, true,  9999, NULL, '2026-01-04T07:11:18.568837+00:00'),
  ('0ce951ce-bdf5-4976-aaa6-44fa045d4351', 'Urad Punjabi Papad - 200GM',   'urad-punjabi-papad---200gm',   E'Weight : 200GM\nSize : 7"',     '', NULL, 78,  78,  true, false, 9999, NULL, '2026-01-04T07:12:56.333827+00:00'),
  ('b6641eb2-4275-4ab2-8c9d-cb08a20029d5', 'Urad Punjabi Papad - 400GM',   'urad-punjabi-papad---400gm',   E'Weight : 400GM\nSize : 7"',     '', NULL, 152, 152, true, true,  9999, NULL, '2026-01-04T07:13:37.602272+00:00'),
  ('030e9730-5f74-444e-8dff-a5cb85b5f7d1', 'Chana Masala Papad - 200GM',   'chana-masala-papad---200gm',   E'Weight : 200GM\nSize : 7"',     '', NULL, 61,  61,  true, false, 9999, NULL, '2026-01-04T07:14:26.32505+00:00'),
  ('09783784-86c5-410c-99b3-fff057293a4d', 'Chana Masala Papad - 400GM',   'chana-masala-papad---400gm',   E'Weight : 400GM\nSize : 7"',     '', NULL, 118, 118, true, true,  9999, NULL, '2026-01-04T07:15:14.707158+00:00'),
  ('027c505e-02a0-4116-8e37-a65b91224606', 'Chana Garlic Papad - 200GM',   'chana-garlic-papad---200gm',   E'Weight : 200GM\nSize : 7"',     '', NULL, 63,  63,  true, false, 9999, NULL, '2026-01-04T07:16:14.529001+00:00'),
  ('f61c9134-0814-4346-b91b-b8e266aaa4fb', 'Chana Garlic Papad - 400GM',   'chana-garlic-papad---400gm',   E'Weight : 400GM\nSize : 7"',     '', NULL, 122, 122, true, true,  9999, NULL, '2026-01-04T07:17:22.234878+00:00')
ON CONFLICT (id) DO NOTHING;

-- ─── product_images (URLs updated to new project) ─────────────────────────────
INSERT INTO public.product_images (id, product_id, url, is_primary) VALUES
  ('b4fa3d4e-ad91-44e8-b970-06f549986ebe', 'd05997d1-892b-4ca3-89b0-78819dd553f8', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/75bba7c1-38d2-4107-8d4a-2298f39551c1', true),
  ('1fb75be8-4c8c-4c2c-ada4-0f4a09c83a63', 'f74f1c71-3274-4978-9a99-3c792415a788', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/fd72ed1c-da0a-4904-a53a-3a98ae4713a1', true),
  ('5016bf81-5d1c-4ca5-828a-26739e407f3a', 'bb25161c-1a03-41b9-8d2d-9300c7540fe7', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/dfc8cb30-acf6-456b-876f-ff415df6f1bc', true),
  ('737dae86-4f45-40c4-b26f-efc64f253676', 'facdbc6b-4343-461d-9bb9-77687d4e2c42', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/c94c1d35-fb01-4be2-8955-f2da35b4da03', true),
  ('849d518d-3332-469d-b15f-3e8d5575b356', 'b86379b3-e6bb-4f7c-9fd3-58d06e3efb11', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/368fd6f4-b15a-46d2-b8b8-d56caee0ce79', true),
  ('eed83c96-7e5d-47e1-925b-6459aeb5ad31', '4e0066e4-e19a-4532-919e-286d4cf1a5d7', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/14dee328-0ac9-4003-b7ea-7839defca88a', true),
  ('6ba0bb46-fc38-438a-94da-dadfced7be43', 'd0d6a2ba-0862-4dd2-bbb2-58fdfd09a796', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/b5a5c70d-b7c4-4e64-8d01-796f42e548f0', true),
  ('0905a1a1-3aa6-43a3-9566-6865d4c2e8ee', '0ce951ce-bdf5-4976-aaa6-44fa045d4351', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/109b7781-e86c-447f-aed3-3eb0ca876355', true),
  ('f8711de7-dcd0-48a8-98ff-15845cec16b7', 'b6641eb2-4275-4ab2-8c9d-cb08a20029d5', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/99dacd25-00fb-419f-a085-aec45db94fc2', true),
  ('733a6033-801d-4045-af29-8b1e4afc039a', '030e9730-5f74-444e-8dff-a5cb85b5f7d1', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/db7f1507-3bd0-47fe-9743-0dc8742a9251', true),
  ('99036028-e3d3-4a09-810b-ad6e10015df5', '09783784-86c5-410c-99b3-fff057293a4d', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/0f4c055b-af69-4bf0-90af-a73192c3feb9', true),
  ('13a546a0-2a5e-4903-b80b-dfec3673ed06', '027c505e-02a0-4116-8e37-a65b91224606', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/de7ddd9e-d37c-43d5-a3cd-09432a4a77c3', true),
  ('483150c8-f844-4127-96ed-01329992a347', 'f61c9134-0814-4346-b91b-b8e266aaa4fb', 'https://simwxrfscfhtuksrbnqf.supabase.co/storage/v1/object/public/product-images/products/3e20bc9b-e4bb-4da8-b398-1a1a24c65048', true)
ON CONFLICT (id) DO NOTHING;
