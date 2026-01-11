import {TagsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productVariant = defineType({
  type: 'document',
  name: 'productVariant',
  icon: TagsIcon,
  fields: [
    defineField({
      type: 'meta',
      name: 'meta',
    }),
    defineField({
      type: 'shopifyProductVariant',
      name: 'shopify',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      type: 'reference',
      name: 'product',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'shopify.title',
      subtitle: 'shopify.sku',
    },
  },
})
