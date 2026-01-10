import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {pageSections} from '../sections/sections'

export const product = defineType({
  type: 'document',
  name: 'product',
  icon: TagIcon,
  fields: [
    defineField({
      type: 'array',
      name: 'sections',
      of: pageSections,
    }),
    defineField({
      type: 'meta',
      name: 'meta',
    }),
    defineField({
      type: 'shopifyProduct',
      name: 'shopify',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'shopifyProduct.title',
      subtitle: 'shopifyProduct.handle',
    },
  },
})
