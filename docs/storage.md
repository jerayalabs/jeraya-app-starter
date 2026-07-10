# Storage via Jeraya SDK

## SDK Client Setup

Exports:
```ts
import { storage } from '@shared/lib/jeraya'
```

## Storage API

```ts
const result = await storage.upload(fileBlob, 'photo.jpg')
const results = await storage.uploadMultiple([file1, file2])
const url = storage.getDownloadUrl(result.path)
