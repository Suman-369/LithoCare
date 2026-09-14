export type BatteryServiceStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface BatteryService {
  id: string;
  request_number: string;
  clerk_user_id: string;
  customer_name: string;
  phone_number: string;
  address: string;
  battery_brand: string;
  battery_type: string;
  battery_image_url: string | null;
  battery_image_file_id: string | null;
  battery_image_path: string | null;
  status: BatteryServiceStatus;
  created_at: string;
  updated_at: string;
}

export interface RequestStatusHistory {
  id: string;
  request_id: string;
  status: string;
  title: string;
  description: string | null;
  created_at: string;
  created_by: string;
}

export interface BatteryServiceWithHistory extends BatteryService {
  history: RequestStatusHistory[];
}

export interface CreateBatteryServiceInput {
  customer_name: string;
  phone_number: string;
  address: string;
  battery_brand: string;
  battery_type: string;
  battery_image_url?: string | null;
  battery_image_file_id?: string | null;
  battery_image_path?: string | null;
}

export interface UpdateBatteryServiceInput {
  customer_name?: string;
  phone_number?: string;
  address?: string;
  battery_brand?: string;
  battery_type?: string;
  battery_image_url?: string | null;
  battery_image_file_id?: string | null;
  battery_image_path?: string | null;
  status?: BatteryServiceStatus;
}
