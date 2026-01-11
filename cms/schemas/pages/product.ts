import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {previewMedia} from '../../utils/preview'

export const product = defineType({
  type: 'document',
  name: 'product',
  icon: TagIcon,
  fields: [
    defineField({
      type: 'media',
      name: 'mediaThumbnail',
    }),
    defineField({
      type: 'array',
      name: 'mediaGallery',
      of: [{type: 'media'}],
    }),
    defineField({
      type: 'meta',
      name: 'meta',
    }),
    defineField({
      type: 'shopifyProduct',
      name: 'shopify',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'shopify.title',
      subtitle: 'shopify.handle.current',
      media: 'mediaThumbnail',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle,
        media: previewMedia(media),
      }
    },
  },
})
