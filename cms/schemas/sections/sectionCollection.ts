import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const sectionCollection = defineType({
  type: 'object',
  name: 'sectionCollection',
  title: 'Section: Collection',
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: 'reference',
      name: 'collection',
      to: [{type: 'collection'}],
    }),
  ],
  preview: {
    select: {
      subtitle: 'collection.shopify.title',
    },
    prepare({subtitle}) {
      return {
        title: 'Section: Collection',
        subtitle,
      }
    },
  },
})
