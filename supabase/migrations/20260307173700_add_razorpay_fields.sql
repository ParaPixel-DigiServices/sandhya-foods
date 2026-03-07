-- Add Razorpay fields to orders_v2 table
ALTER TABLE orders_v2 ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT;
ALTER TABLE orders_v2 ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT;

-- Add razorpay_payment_id to payments_v2 table
ALTER TABLE payments_v2 ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT;
