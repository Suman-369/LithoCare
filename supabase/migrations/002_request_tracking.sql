-- Migration: 002_request_tracking.sql

-- 1. Add request_number to existing battery_services
ALTER TABLE battery_services ADD COLUMN IF NOT EXISTS request_number TEXT;

-- 2. Generate a request number for existing rows
UPDATE battery_services 
SET request_number = 'REQ-' || upper(substr(md5(random()::text), 1, 6))
WHERE request_number IS NULL;

-- 3. Make it required and unique
ALTER TABLE battery_services ALTER COLUMN request_number SET NOT NULL;
ALTER TABLE battery_services ADD CONSTRAINT unique_request_number UNIQUE(request_number);

-- 4. Auto-generate request_number on insert
CREATE OR REPLACE FUNCTION generate_request_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.request_number IS NULL THEN
    NEW.request_number := 'REQ-' || upper(substr(md5(random()::text), 1, 6));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_request_number ON battery_services;
CREATE TRIGGER trigger_generate_request_number
BEFORE INSERT ON battery_services
FOR EACH ROW
EXECUTE FUNCTION generate_request_number();


-- 5. Create request_status_history table
CREATE TABLE IF NOT EXISTS request_status_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID NOT NULL REFERENCES battery_services(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by TEXT NOT NULL -- clerk_user_id or 'system'
);

CREATE INDEX IF NOT EXISTS idx_status_history_request_id ON request_status_history(request_id);

-- 6. Trigger to automatically log the 'pending' status when a new request is created
CREATE OR REPLACE FUNCTION log_initial_request_status()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO request_status_history (request_id, status, title, description, created_by)
  VALUES (
    NEW.id, 
    NEW.status, 
    'Request Submitted', 
    'Your request was successfully submitted and is pending review.', 
    NEW.clerk_user_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_log_initial_status ON battery_services;
CREATE TRIGGER trigger_log_initial_status
AFTER INSERT ON battery_services
FOR EACH ROW
EXECUTE FUNCTION log_initial_request_status();
