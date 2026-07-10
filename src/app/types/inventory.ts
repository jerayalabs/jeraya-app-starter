// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Inventory extends Record<string, any> {
  id: string
  Name: string
  Location: string
  Notes: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Product extends Record<string, any> {
  id: string
  Name: string
  Category: string
  Unit: string
  'Minimum Stock': number
  Supplier: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StockRecord extends Record<string, any> {
  id: string
  'Inventory ID': string
  'Product ID': string
  Quantity: number
  'Updated By': string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Order extends Record<string, any> {
  id: string
  'Inventory ID': string
  'Product ID': string
  'Product Name': string
  Quantity: number
  Status: 'Ordered' | 'Received'
  'Requested By': string
  Notes: string
}

export interface InventoryStockRow {
  product: Product
  quantity: number
  low: boolean
}

export interface InventoryForm {
  name: string
  location: string
  notes: string
}

export interface ProductForm {
  name: string
  category: string
  unit: string
  minimumStock: number
  supplier: string
}

export interface OrderForm {
  inventoryId: string
  productId: string
  productName: string
  quantity: number
  status: 'Ordered' | 'Received'
  notes: string
}

export interface JerayaUser {
  id: string
  email: string
  display_name: string
  role?: string
}

export interface InventoryAppData {
  inventories: Inventory[]
  products: Product[]
  stock: StockRecord[]
  orders: Order[]
  profile: JerayaUser | null
  users: JerayaUser[]
}
