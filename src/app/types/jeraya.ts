export interface JerayaTableRef {
  records: {
    list: (params?: { limit?: number; offset?: number }) => Promise<unknown>
    create: (data: Record<string, unknown>) => Promise<unknown>
    update: (id: string, data: Record<string, unknown>) => Promise<unknown>
    bulkCreate: (data: Record<string, unknown>[]) => Promise<unknown>
  }
  columns: {
    list: () => Promise<unknown>
    create: (column: { title: string; uidt: string }) => Promise<unknown>
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyUser = any

export interface JerayaDb {
  tables: {
    list: () => Promise<unknown>
    create: (meta: { title: string }) => Promise<unknown>
  }
  table: (id: string) => JerayaTableRef
}

export interface JerayaUserApi {
  me: () => Promise<AnyUser>
  list: (params: { limit: number; offset: number }) => Promise<{ list?: AnyUser[]; users?: AnyUser[] }>
}

export interface JerayaApp {
  db: JerayaDb
  user: JerayaUserApi
}

export interface JerayaConfig {
  appId: string
  name: string
  prefix: string
  type: string
  distFolder: string
  version: string
}

export interface InventoryTables {
  inventories: JerayaTableRef
  products: JerayaTableRef
  stock: JerayaTableRef
  orders: JerayaTableRef
}
