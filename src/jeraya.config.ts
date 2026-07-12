import { buildConfig } from '@jeraya/sdk'
import { Projects } from './collections/Projects'
import { Tasks } from './collections/Tasks'

export default buildConfig({
  collections: [Projects, Tasks],
  webapp: {},
})
