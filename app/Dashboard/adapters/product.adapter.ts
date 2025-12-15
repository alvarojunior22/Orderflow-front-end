import type { ApiProduct } from "@/app/api/types/api-product";
import type { InventoryProduct } from "@/app/Dashboard/interfaces/interface-Product";

export function adaptApiProduct(apiProduct: ApiProduct): InventoryProduct {
  return {
    id: apiProduct.id,
    image: apiProduct.image_url ?? "/placeholder.svg",
    name: apiProduct.name,
    barcode: apiProduct.barcode ?? apiProduct.id,
    category: apiProduct.category,
    unitType: apiProduct.unit,
    stock: apiProduct.stock,
    price: apiProduct.price,
    active: apiProduct.active ?? true,
    isDuplicate: false,
    duplicateOf: undefined,
  };
}
