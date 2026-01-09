import {MenuIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const header = defineType({
  type: 'document',
  name: 'header',
  icon: MenuIcon,
  fields: [
    defineField({
      type: 'array',
      name: 'navigationItems',
      of: [
        defineArrayMember({
          type: 'button',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
