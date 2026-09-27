CREATE TABLE IF NOT EXISTS business_plan_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_user_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    reason TEXT,
    phone_number TEXT NOT NULL,
    address TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security
ALTER TABLE business_plan_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own plan requests"
ON business_plan_requests FOR INSERT
WITH CHECK (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own plan requests"
ON business_plan_requests FOR SELECT
USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- We won't strictly enforce admin access here because server actions use Service Role Key which bypasses RLS
