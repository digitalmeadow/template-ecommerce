import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {previewMedia} from '../../utils/preview'

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
  preview: {
    select: {
      heading: 'heading',
      media: 'backgroundMedia',
    },
    prepare({heading, media}) {
      return {
        title: 'Section: Hero',
        subtitle: heading,
        media: previewMedia(media),
      }
    },
  },
})
