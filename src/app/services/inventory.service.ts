import { db, user } from '../lib/jeraya'
import type { InventoryTables, JerayaTableRef } from '../types/jeraya'
import type {
  Inventory,
  InventoryAppData,
  InventoryForm,
  JerayaUser,
  Order,
  OrderForm,
  Product,
  ProductForm,
  StockRecord,
} from '../types/inventory'

interface TableMeta {
  title: string
  columns: { title: string; uidt: string }[]
}

const TABLES: Record<string, TableMeta> = {
  inventories: {
    title: 'Restaurant Inventories',
    columns: [
      { title: 'Name', uidt: 'SingleLineText' },
      { title: 'Location', uidt: 'SingleLineText' },
      { title: 'Notes', uidt: 'LongText' },
    ],
  },
  products: {
    title: 'Restaurant Products',
    columns: [
      { title: 'Name', uidt: 'SingleLineText' },
      { title: 'Category', uidt: 'SingleLineText' },
      { title: 'Unit', uidt: 'SingleLineText' },
      { title: 'Minimum Stock', uidt: 'Number' },
      { title: 'Supplier', uidt: 'SingleLineText' },
    ],
  },
  stock: {
    title: 'Restaurant Stock Levels',
    columns: [
      { title: 'Inventory ID', uidt: 'SingleLineText' },
      { title: 'Product ID', uidt: 'SingleLineText' },
      { title: 'Quantity', uidt: 'Number' },
      { title: 'Updated By', uidt: 'SingleLineText' },
    ],
  },
  orders: {
    title: 'Restaurant Purchase Orders',
    columns: [
      { title: 'Inventory ID', uidt: 'SingleLineText' },
      { title: 'Product ID', uidt: 'SingleLineText' },
      { title: 'Product Name', uidt: 'SingleLineText' },
      { title: 'Quantity', uidt: 'Number' },
      { title: 'Status', uidt: 'SingleLineText' },
      { title: 'Requested By', uidt: 'SingleLineText' },
      { title: 'Notes', uidt: 'LongText' },
    ],
  },
}

const DEMO_INVENTORIES = [
  { Name: 'Main Kitchen', Location: 'Back of house', Notes: 'Daily prep and service storage' },
  { Name: 'Bar Storage', Location: 'Dining room', Notes: 'Beverage and garnish stock' },
]

const DEMO_PRODUCTS = [
  { Name: 'Tomatoes', Category: 'Produce', Unit: 'kg', 'Minimum Stock': 12, Supplier: 'Fresh Market' },
  { Name: 'Olive Oil', Category: 'Pantry', Unit: 'liters', 'Minimum Stock': 8, Supplier: 'Mediterranean Goods' },
  { Name: 'Chicken Breast', Category: 'Protein', Unit: 'kg', 'Minimum Stock': 15, Supplier: 'Local Farms' },
  { Name: 'Coffee Beans', Category: 'Beverage', Unit: 'kg', 'Minimum Stock': 6, Supplier: 'Roaster House' },
]

function getRecordId(record: Record<string, unknown>): string | undefined {
  return (record?.Id ?? record?.id ?? record?._id) as string | undefined
}

function normalizeRecord<T extends Record<string, unknown>>(record: Record<string, unknown>): T {
  const fields = (record?.fields ?? record) as Record<string, unknown>
  return { ...fields, id: getRecordId(record) ?? fields?.id } as unknown as T
}

function tableId(table: Record<string, unknown>): string {
  return (table?.id ?? table?.Id ?? table?._id) as string
}

function normalizeList<T>(response: unknown): T[] {
  if (Array.isArray(response)) return response as T[]
  const obj = response as Record<string, unknown>
  return (obj?.list ?? obj?.records ?? obj?.tables ?? []) as T[]
}

async function ensureColumns(table: JerayaTableRef, columns: { title: string; uidt: string }[]) {
  const existingColumns = await table.columns.list()
  const existingTitles = new Set(
    normalizeList<{ title?: string; Title?: string }>(existingColumns).map(
      (column) => column.title ?? column.Title ?? '',
    ),
  )

  await Promise.all(
    columns
      .filter((column) => !existingTitles.has(column.title))
      .map((column) => table.columns.create(column)),
  )
}

async function ensureTable(meta: TableMeta): Promise<JerayaTableRef> {
  const tables = normalizeList<{ title?: string; Title?: string }>(await db.tables.list())
  const existing = tables.find((table) => (table.title ?? table.Title) === meta.title)
  const table = existing ?? (await db.tables.create({ title: meta.title }))
  const tableRef = db.table(tableId(table as Record<string, unknown>))
  await ensureColumns(tableRef as unknown as JerayaTableRef, meta.columns)
  return tableRef as unknown as JerayaTableRef
}

async function listRecords<T extends Record<string, unknown>>(
  table: JerayaTableRef,
  limit = 200,
): Promise<T[]> {
  const records = await table.records.list({ limit, offset: 0 })
  return normalizeList<Record<string, unknown>>(records).map((r) => normalizeRecord<T>(r))
}

async function seedIfEmpty(tables: InventoryTables) {
  const [inventories, products] = await Promise.all([
    listRecords(tables.inventories),
    listRecords(tables.products),
  ])

  if (inventories.length === 0) {
    await tables.inventories.records.bulkCreate(DEMO_INVENTORIES)
  }
  if (products.length === 0) {
    await tables.products.records.bulkCreate(DEMO_PRODUCTS)
  }
}

export async function ensureInventorySchema(): Promise<InventoryTables> {
  const tables: InventoryTables = {
    inventories: await ensureTable(TABLES.inventories),
    products: await ensureTable(TABLES.products),
    stock: await ensureTable(TABLES.stock),
    orders: await ensureTable(TABLES.orders),
  }

  await seedIfEmpty(tables)
  return tables
}

export async function loadInventoryAppData(tables: InventoryTables): Promise<InventoryAppData> {
  const [inventories, products, stock, orders, profile, users] = await Promise.all([
    listRecords<Inventory>(tables.inventories),
    listRecords<Product>(tables.products),
    listRecords<StockRecord>(tables.stock),
    listRecords<Order>(tables.orders),
    user.me().catch(() => null),
    user.list({ limit: 50, offset: 0 }).catch(() => ({ list: [], users: [] })),
  ])

  return {
    inventories,
    products,
    stock,
    orders,
    profile,
    users: Array.isArray(users) ? users : (users as { list?: JerayaUser[]; users?: JerayaUser[] }).list ?? (users as { list?: JerayaUser[]; users?: JerayaUser[] }).users ?? [],
  }
}

export async function createInventory(tables: InventoryTables, values: InventoryForm): Promise<unknown> {
  return tables.inventories.records.create({
    Name: values.name,
    Location: values.location,
    Notes: values.notes,
  })
}

export async function createProduct(tables: InventoryTables, values: ProductForm): Promise<unknown> {
  return tables.products.records.create({
    Name: values.name,
    Category: values.category,
    Unit: values.unit,
    'Minimum Stock': Number(values.minimumStock || 0),
    Supplier: values.supplier,
  })
}

export async function createOrder(
  tables: InventoryTables,
  values: OrderForm,
  profile: JerayaUser | null,
): Promise<unknown> {
  return tables.orders.records.create({
    'Inventory ID': values.inventoryId,
    'Product ID': values.productId ?? '',
    'Product Name': values.productName,
    Quantity: Number(values.quantity || 0),
    Status: values.status ?? 'Ordered',
    'Requested By': profile?.display_name ?? profile?.email ?? profile?.id ?? 'Current user',
    Notes: values.notes,
  })
}

export async function receiveStock(
  tables: InventoryTables,
  values: OrderForm,
  profile: JerayaUser | null,
  stockRecords: StockRecord[] = [],
): Promise<unknown> {
  const existing = stockRecords.find(
    (item) => item['Inventory ID'] === values.inventoryId && item['Product ID'] === values.productId,
  )
  const quantity = Number(values.quantity || 0)
  const updatedBy = profile?.display_name ?? profile?.email ?? profile?.id ?? 'Current user'

  if (existing?.id) {
    return tables.stock.records.update(existing.id, {
      Quantity: Number(existing.Quantity || 0) + quantity,
      'Updated By': updatedBy,
    })
  }

  return tables.stock.records.create({
    'Inventory ID': values.inventoryId,
    'Product ID': values.productId,
    Quantity: quantity,
    'Updated By': updatedBy,
  })
}

export function getStockFor(
  inventoryId: string,
  productId: string,
  stockRecords: StockRecord[],
): number {
  const record = stockRecords.find(
    (item) => item['Inventory ID'] === inventoryId && item['Product ID'] === productId,
  )
  return Number(record?.Quantity || 0)
}

export function isLowStock(product: Product, quantity: number): boolean {
  return quantity <= Number(product['Minimum Stock'] || 0)
}
