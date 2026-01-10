import {defineField, defineType} from 'sanity'

export const shopifyProductVariant = defineType({
  type: 'object',
  name: 'shopifyProductVariant',
  title: 'Shopify Product Variant',
  fields: [
    defineField({
      type: 'string',
      name: 'id',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'sku',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'productId',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
