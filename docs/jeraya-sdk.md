# jeraya-sdk

SDK for building Jeraya applications.

## Quick Start

```ts
import jeraya from 'jeraya'

const app = jeraya;
```



## User Management

```ts
// Get current user profile
const profile = await app.user.me()

// Update profile
await app.user.update({ display_name: 'New Name' })

// List users (requires admin)
const users = await app.user.list({ limit: 20, offset: 0 })

// Get user by ID
const user = await app.user.getById('userId')

// Invite new user
await app.user.invite({ email: 'new@example.com', role: 'viewer' })

// Update user
await app.user.updateUser('userId', { first_name: 'Jane' })

// Delete user
await app.user.delete('userId')

// user object has type
interface User {
  id: string;
  email: string;
  email_verified: boolean | null;
  roles: {
    "org-level-creator": boolean;
    super: boolean;
  };
  token_version: number;
  display_name: string;
  user_name: string | null;
  blocked: boolean;
  blocked_reason: string | null;
  deleted_at: string | null; // or Date | null
  is_deleted: boolean;
  meta: Record<string, any> | null; 
  is_new_user: boolean;
  base_roles: string[] | null; 
  isAuthorized: boolean;
  workspace_roles: string[] | null;
}

```

## Database
```ts

const db = jeraya.db;

// Records
await db.table('tbl_xyz').records.list({ where: '(Age,gt,18)', limit: 50 })
await db.table('tbl_xyz').records.create({ Name: 'Alice', Age: 30 })
await db.table('tbl_xyz').records.update('rec_1', { Age: 31 })
await db.table('tbl_xyz').records.bulkCreate([{ Name: 'Bob' }, { Name: 'Carol' }])
await db.table('tbl_xyz').records.delete('rec_1')
await db.table('tbl_xyz').records.count('(Status,eq,Active)')

// Columns
await db.table('tbl_xyz').columns.list()
await db.table('tbl_xyz').columns.create({ title: 'Score', uidt: 'Number' })
await db.table('tbl_xyz').columns.setPrimary('col_id')

// Table meta
await db.table('tbl_xyz').get()
await db.table('tbl_xyz').update({ title: 'Renamed' })
await db.table('tbl_xyz').delete()

// Tables in this base
await db.tables.list()
await db.tables.create({ title: 'New Table' })

// Workspace & base admin
await db.workspaces.list()
await db.workspaces.workspace('ws_abc').bases.list()
await db.workspaces.workspace('ws_abc').bases.create({ title: 'My Base' })

```

## Storage

```ts
// Upload single file (Blob)
const result = await app.storage.upload(fileBlob, 'photo.jpg')

// Upload multiple files
const results = await app.storage.uploadMultiple([file1, file2])

// Generate download URL
const url = app.storage.getDownloadUrl(result.path)
```
