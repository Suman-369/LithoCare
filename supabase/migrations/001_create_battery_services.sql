CREATE TABLE battery_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    clerk_user_id TEXT NOT NULL,

    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT NOT NULL,

    battery_brand TEXT NOT NULL,
    battery_type TEXT NOT NULL,

    battery_image_url TEXT,
    battery_image_file_id TEXT,
    battery_image_path TEXT,

    status TEXT NOT NULL DEFAULT 'pending',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT battery_services_status_check
    CHECK (
        status IN (
            'pending',
            'processing',
            'completed',
            'cancelled'
        )
    )
);

CREATE INDEX idx_battery_services_clerk_user_id
ON battery_services(clerk_user_id);

CREATE INDEX idx_battery_services_status
ON battery_services(status);

CREATE INDEX idx_battery_services_created_at
ON battery_services(created_at DESC);

-- Trigger for updating the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_battery_services_updated_at
BEFORE UPDATE ON battery_services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS and add policies
ALTER TABLE battery_services ENABLE ROW LEVEL SECURITY;

-- Allow everything for the service role (since we use supabaseAdmin server-side)
-- RLS doesn't apply to the service_role key anyway, but good practice.
CREATE POLICY "Allow service role full access to battery_services"
ON battery_services
AS PERMISSIVE FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
