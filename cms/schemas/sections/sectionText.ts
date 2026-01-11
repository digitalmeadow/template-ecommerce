import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const sectionText = defineType({
  type: 'object',
  name: 'sectionText',
  title: 'Section: Text',
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: 'textRich',
      name: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
