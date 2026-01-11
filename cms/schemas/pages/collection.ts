import {PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const collection = defineType({
  type: 'document',
  name: 'collection',
  icon: PackageIcon,
  fields: [
    defineField({
      type: 'meta',
      name: 'meta',
    }),
    defineField({
      type: 'shopifyCollection',
      name: 'shopify',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'shopify.title',
      subtitle: 'shopify.handle.current',
    },
  },
})
