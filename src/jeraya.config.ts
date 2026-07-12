import { buildConfig } from '@jeraya/sdk'
import collections from './collections'

export default buildConfig({
  collections: [
    ...collections
  ],
  webapp: {},
})
