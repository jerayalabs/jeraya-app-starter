import { defineCollection } from '@jeraya/sdk'

export const Inventory = defineCollection({
  slug: 'projects',
  fields: [
    { name: 'projectName', type: 'text' },
    { name: 'image', type: 'file' },
    { name: 'note', type: 'text' },
    {
      name: 'tasklist',
      type: 'relationship',
      relation_type: 'om',
      related_table: 'tasks',
    },
    { name: 'due_date', type: 'date' },
    {
      name: 'task_completed',
      type: 'relationship',
      relation_type: 'om',
      related_table: 'tasks',
    },
    {
      name: 'task_stuck',
      type: 'relationship',
      relation_type: 'om',
      related_table: 'tasks',
    },
  ],
})