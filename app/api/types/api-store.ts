export interface ApiStore {
  id: string;
  name: string;
  slug: string;
  telegram_bot_token?: string | null;
  system_prompt?: string | null;
  address?: string | null;
  phone?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ApiMyStoresResponse {
  success: boolean;
  data: ApiStore[];
  count: number;
}
