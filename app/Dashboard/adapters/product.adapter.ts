import type { ApiProduct } from "@/app/api/types/api-product";
import type { InventoryProduct } from "@/app/Dashboard/interfaces/interface-Product";

export function adaptApiProduct(apiProduct: ApiProduct): InventoryProduct {
  const rawStock = (apiProduct as unknown as { stock?: unknown }).stock;
  const parsedStock =
    typeof rawStock === "number"
      ? rawStock
      : typeof rawStock === "string"
        ? Number.parseFloat(rawStock)
        : Number.NaN;

  const rawCategory = (apiProduct as unknown as { category?: unknown }).category;
  const category =
    typeof rawCategory === "string" && rawCategory.trim().length > 0
      ? rawCategory.trim()
      : "Uncategorized";

  return {
    id: apiProduct.id,
    image: apiProduct.image_url ?? "/placeholder.svg",
    name: apiProduct.name,
    barcode: apiProduct.barcode ?? apiProduct.id,
    category,
    unitType: apiProduct.unit,
    stock: Number.isFinite(parsedStock) ? parsedStock : 0,
    price: apiProduct.price,
    active: apiProduct.active ?? true,
    isDuplicate: false,
    duplicateOf: undefined,
  };
}
