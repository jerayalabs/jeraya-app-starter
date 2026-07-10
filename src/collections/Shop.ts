import { defineCollection } from '@jeraya/sdk'


export const Shop = defineCollection({
  slug: 'tasks',
  fields: [
    {
      name: "taskName",
      type: "text"
    },
    {
      name: "content",
      type: "text"
    },
    // {
    //   name: 'author',
    //   type: 'relationship',
    //   relation: 'hm',        // has-many
    //   relatedTable: 'users',
    //   fk_child_column_id: 'col_user_id',
    //   fk_parent_column_id: 'col_id',
    // },
  ],
})