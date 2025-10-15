-- Create transactions table for wallet transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  reference TEXT, -- Payment reference from Paystack or other sources
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transactions
-- Users can only view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own transactions (for credits via Paystack)
CREATE POLICY "Users can insert own transactions"
  ON transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only system/admin can update transactions (for status changes)
CREATE POLICY "System can update transactions"
  ON transactions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_transactions_updated_at();

-- Add some sample transactions for testing (optional)
-- These will be replaced with real transactions from Paystack
INSERT INTO transactions (user_id, type, amount, description, reference, status)
SELECT 
  id,
  'credit',
  100000.00,
  'Initial wallet funding',
  'SAMPLE-' || id,
  'completed'
FROM profiles
WHERE user_type = 'buyer'
LIMIT 1;
