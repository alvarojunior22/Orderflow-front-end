import { authFetch } from "@/lib/authFetch";
import type {
  ApiProductsListResponse,
  ApiProductResponse,
  ApiDeleteProductResponse,
  ApiProduct,
} from "@/app/api/types/api-product";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export interface ListProductsParams {
  limit?: number;
  offset?: number;
  storeId?: string;
}

export interface SearchProductsParams extends ListProductsParams {
  q: string;
}

export interface CreateProductPayload {
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
}

export type UpdateProductPayload = Partial<Omit<CreateProductPayload, "storeId">>;

export async function listProducts(
  params: ListProductsParams
): Promise<ApiProductsListResponse> {
  const { storeId, limit = 50, offset = 0 } = params;

  if (!storeId) {
    throw new Error("storeId is required to list products");
  }

  const url = new URL("/api/products", API_URL);

  url.searchParams.set("storeId", storeId);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  const res = await authFetch(url.toString());

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to list products");
  }

  return res.json();
}



export async function searchProducts(
  params: SearchProductsParams
): Promise<ApiProductsListResponse> {
  const url = new URL("/api/products/search", API_URL);

  url.searchParams.set("q", params.q);

  if (typeof params.limit === "number") {
    url.searchParams.set("limit", String(params.limit));
  }

  if (typeof params.offset === "number") {
    url.searchParams.set("offset", String(params.offset));
  }

  const res = await authFetch(url.toString());

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to search products");
  }

  return res.json();
}


export async function getProduct(id: string): Promise<ApiProduct> {
  const res = await authFetch(`${API_URL}/api/products/${id}`);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to fetch product");
  }

  const json: ApiProductResponse = await res.json();
  return json.data;
}

export async function createProduct(payload: CreateProductPayload): Promise<ApiProduct> {
  const res = await authFetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to create product");
  }

  const json: ApiProductResponse = await res.json();
  return json.data;
}

export async function updateProduct(id: string, payload: UpdateProductPayload): Promise<ApiProduct> {
  const res = await authFetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to update product");
  }

  const json: ApiProductResponse = await res.json();
  return json.data;
}

export async function deleteProduct(id: string): Promise<ApiDeleteProductResponse> {
  const res = await authFetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to delete product");
  }

  const json: ApiDeleteProductResponse = await res.json();
  return json;
}
