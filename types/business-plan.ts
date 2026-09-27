export interface BusinessPlanRequest {
  id: string;
  clerk_user_id: string;
  plan_name: string;
  business_name: string;
  reason: string | null;
  phone_number: string;
  address: string;
  status: string; // 'pending' | 'contacted' | 'skipped'
  created_at: string;
  updated_at: string;
}

export interface CreateBusinessPlanRequestInput {
  plan_name: string;
  business_name: string;
  reason: string;
  phone_number: string;
  address: string;
}
