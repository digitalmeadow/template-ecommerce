import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const sectionHero = defineType({
  type: 'object',
  name: 'sectionHero',
  title: 'Section: Hero',
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: 'media',
      name: 'backgroundMedia',
    }),
    defineField({
      type: 'string',
      name: 'heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'textRich',
      name: 'text',
    }),
  ],
})
