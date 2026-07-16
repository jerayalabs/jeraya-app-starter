---
name: jeraya-db
description: Use when working with the Jeraya database API — querying tables, CRUD operations on records, managing columns, or writing where clauses. Use ONLY for Jeraya DB, not for SQL or other databases.
---

# Jeraya DB API

## Import

```ts
import { db } from '@shared/lib/jeraya'
```

`db` is a `JerayaDb` instance (see `src/shared/types/jeraya.ts`).

## Table Reference

Access a table by its slug (defined in `src/collections/`):

```ts
const table = db.table('my_table')
```

## Record CRUD (`table.records`)

| Operation | Description |
|-----------|-------------|
| `table.records.list(params?)` | List records with optional `{ where, limit, offset, sort, fields }` |
| `table.records.create(data)` | Create a single record |
| `table.records.update(id, data)` | Update a record by ID |
| `table.records.bulkCreate(data[])` | Create multiple records |
| `table.records.delete(id)` | Delete a record by ID |
| `table.records.count(where?)` | Count records, optionally filtered |

### Example

```ts
const result = await table.records.list({
  where: '(status,eq,active)',
  limit: 20,
  sort: 'created_at',
  fields: ['title', 'status'],
})
// result.list -> T[], result.pageInfo -> { totalRows, page, ... }
```

## Column Management (`table.columns`)

| Operation | Description |
|-----------|-------------|
| `table.columns.list()` | List all columns |
| `table.columns.create({ title, uidt })` | Create a column (`uidt` = data type string) |
| `table.columns.setPrimary(col_id)` | Set primary column |

## Table-Level Operations (`table.*`)

| Operation | Description |
|-----------|-------------|
| `table.get()` | Get table metadata |
| `table.update({ title })` | Rename the table |
| `table.delete()` | Delete the table |
| `db.tables.list()` | List all tables in the base |
| `db.tables.create({ title })` | Create a new table |

## Where Clause Syntax

NocoDB filter format: `(field,operator,value)`

| Example | Meaning |
|---------|---------|
| `(age,gt,18)` | age > 18 |
| `(status,eq,active)` | status equals "active" |
| `(name,like,%john%)` | name contains "john" |
| `(age,gt,18)~and(status,eq,active)` | combined AND |
| `(dept,eq,eng)~or(dept,eq,sales)` | combined OR |

Available operators: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `nlike`, `in`, `null`, `notnull`, `blank`, `notblank`, `empty`, `notempty`, `checked`, `notchecked`, `btw`, `nbtw`, `isWithin`, `allof`, `anyof`

## Types

Defined in `src/shared/types/jeraya.ts`:

- `JerayaDb` — db root with `tables.{list,create}` and `table(id)`
- `JerayaTableRef` — table proxy with `records.*` and `columns.*`
- `ListResult<T>` — `{ list: T[], pageInfo?: { totalRows, page, pageSize, ... } }`
