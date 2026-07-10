import { buildConfig } from '@jeraya/sdk'
import { Inventory } from './collections/Inventory'
import { Shop } from './collections/Shop'

console.log('grgerger');

export default buildConfig({
  name: 'simba',
  collections: [Inventory, Shop],
  webapps: {

  }
})
