import {TagsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {pageSections} from '../sections/sections'

export const productVariant = defineType({
  type: 'document',
  name: 'productVariant',
  icon: TagsIcon,
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
      type: 'shopifyProductVariant',
      name: 'shopifyProductVariant',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'reference',
      name: 'product',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'shopifyProductVariant.title',
      subtitle: 'shopifyProductVariant.sku',
    },
  },
})
