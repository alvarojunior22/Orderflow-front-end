export interface ApiProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  unit: string;
  category: string;
  storeId: string;
  image_url?: string | null;
  barcode?: string | null;
  active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiProductsListResponse {
  success: boolean;
  data: ApiProduct[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface ApiProductResponse {
  success: boolean;
  data: ApiProduct;
}

export interface ApiDeleteProductResponse {
  success: boolean;
  message: string;
}
