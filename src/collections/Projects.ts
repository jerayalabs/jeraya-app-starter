import { defineCollection } from '@jeraya/sdk'

export const Projects = defineCollection({
  slug: 'projects',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'status', type: 'text' },
  ],
})
