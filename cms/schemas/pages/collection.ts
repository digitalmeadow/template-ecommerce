import {PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {pageSections} from '../sections/sections'

export const collection = defineType({
  type: 'document',
  name: 'collection',
  icon: PackageIcon,
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
      type: 'shopifyCollection',
      name: 'shopifyCollection',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'shopifyCollection.title',
      subtitle: 'shopifyCollection.handle',
    },
  },
})
