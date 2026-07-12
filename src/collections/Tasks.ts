import { defineCollection } from '@jeraya/sdk'

export const Tasks = defineCollection({
  slug: 'tasks',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'status', type: 'text' },
    { name: 'priority', type: 'text' },
    { name: 'project_id', type: 'text' },
  ],
})
