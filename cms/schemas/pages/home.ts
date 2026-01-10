import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {pageSections} from '../sections/sections'

export const home = defineType({
  type: 'document',
  name: 'home',
  icon: HomeIcon,
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
  ],
})
