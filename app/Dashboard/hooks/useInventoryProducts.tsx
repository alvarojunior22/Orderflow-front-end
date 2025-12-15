"use client";

import { useEffect, useState } from "react";
import {
  listProducts,
  searchProducts,
} from "@/app/Dashboard/services/product.services";
import type { InventoryProduct } from "@/app/Dashboard/interfaces/interface-Product";
import { adaptApiProduct } from "@/app/Dashboard/adapters/product.adapter";
import { useAuth } from "@/app/context/authcontext";

interface UseInventoryProductsOptions {
  limit?: number;
  searchQuery?: string;
  reloadKey?: number;
}

interface UseInventoryProductsResult {
  products: InventoryProduct[];
  loading: boolean;
  error: string | null;
}

export function useInventoryProducts(
  options: UseInventoryProductsOptions = {}
): UseInventoryProductsResult {
  const { limit = 50, searchQuery, reloadKey } = options;
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { storeId } = useAuth();

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      if (!storeId) {
        if (isActive) {
          setProducts([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);

        const trimmedQuery = searchQuery?.trim();

        const response =
          trimmedQuery && trimmedQuery.length > 0
            ? await searchProducts({
                q: trimmedQuery,
                limit,
                offset: 0,
              })
            : await listProducts({
                storeId,
                limit,
                offset: 0,
              });

        if (!isActive) return;

        const mapped = response.data.map(adaptApiProduct);
        setProducts(mapped);
        setError(null);
      } catch (err) {
        console.error("Failed to load inventory products:", err);
        if (isActive) {
          setError("Failed to load products");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void fetchProducts();

    return () => {
      isActive = false;
    };
  }, [limit, searchQuery, reloadKey, storeId]);

  return { products, loading, error };
}
