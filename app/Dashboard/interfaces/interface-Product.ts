export interface InventoryProduct {
  id: string;
  image: string;
  name: string;
  barcode: string;
  category: string;
  unitType: string;
  stock: number;
  price: number;
  active: boolean;
  isDuplicate?: boolean;
  duplicateOf?: string;
}
