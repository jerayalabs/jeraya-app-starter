# Jeraya DB API

## Table Schema Definition

Table schemas are defined in `src/collections/` using `defineCollection`. This folder is used **only** for managing the table schema (creating/altering tables on the backend). It is not used at runtime in the frontend.

```ts
// src/collections/MyTable.ts
import { defineCollection } from '@jeraya/sdk'

export const MyTable = defineCollection({
  slug: 'my_table',           // used as the table identifier at runtime
  fields: [
    { name: 'title', type: 'text' },
    { name: 'count', type: 'number' },
  ],
})
```

Register the collection in `src/jeraya.config.ts`:

```ts
import { buildConfig } from '@jeraya/sdk'
import { MyTable } from './collections/MyTable'

export default buildConfig({
  collections: [MyTable],
  webapps: {},
})
```

## Runtime Table Access

Import `db` and access the table by its **slug** (the same value from `defineCollection`):

```ts
import { db } from '@shared/lib/jeraya'

const table = db.table('my_table')
```

## Operations

### `db.tables` — Manage tables in the base

| Operation | Description |
|-----------|-------------|
| `db.tables.list()` | List all tables in the base |
| `db.tables.create({ title })` | Create a new table |

### `db.table(slug)` — Get a table reference

Returns a `JerayaTableRef` with the following sub-APIs.

### `table.*` — Table-level operations

| Operation | Description |
|-----------|-------------|
| `table.get()` | Get table metadata |
| `table.update({ title })` | Update table title |
| `table.delete()` | Delete the table |

### `table.records.*` — Record CRUD

| Operation | Description |
|-----------|-------------|
| `table.records.list(params?)` | List records. Params: `{ where, limit, offset, sort, fields }` |
| `table.records.create(data)` | Create a single record |
| `table.records.update(id, data)` | Update a record by ID |
| `table.records.bulkCreate(data[])` | Create multiple records at once |
| `table.records.delete(id)` | Delete a record by ID |
| `table.records.count(where?)` | Count records, optionally filtered by where clause |

### `table.columns.*` — Column management

| Operation | Description |
|-----------|-------------|
| `table.columns.list()` | List all columns |
| `table.columns.create({ title, uidt })` | Create a new column (`uidt` is the data type) |
| `table.columns.setPrimary(col_id)` | Set a column as the primary column |

## Where Clause Syntax

Used in `list()` and `count()` operations. Follows NocoDB filter syntax:

```
(field,operator,value)
```

Examples:
- `(age,gt,18)` — age greater than 18
- `(status,eq,active)` — status equals "active"
- `(name,like,%john%)` — name contains "john"
- `(age,gt,18)~and(status,eq,active)` — combined conditions

## TypeScript Types

Defined in `src/shared/types/jeraya.ts`:

```ts
JerayaDb {
  tables: {
    list: () => Promise<unknown>
    create: (meta: { title: string }) => Promise<unknown>
  }
  table: (id: string) => JerayaTableRef
}

JerayaTableRef {
  get: () => Promise<unknown>
  update: (meta: { title: string }) => Promise<unknown>
  delete: () => Promise<unknown>
  records: {
    list: (params?: { where?: string; limit?: number; offset?: number; sort?: string; fields?: string[] }) => Promise<unknown>
    create: (data: Record<string, unknown>) => Promise<unknown>
    update: (id: string, data: Record<string, unknown>) => Promise<unknown>
    bulkCreate: (data: Record<string, unknown>[]) => Promise<unknown>
    delete: (id: string) => Promise<unknown>
    count: (where?: string) => Promise<number>
  }
  columns: {
    list: () => Promise<unknown>
    create: (column: { title: string; uidt: string }) => Promise<unknown>
    setPrimary: (col_id: string) => Promise<unknown>
  }
}
```
