import {defineField, defineType} from 'sanity'

export const media = defineType({
  type: 'object',
  name: 'media',
  fields: [
    defineField({
      type: 'string',
      name: 'type',
      title: 'Type',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'image',
      hidden: ({parent}) => parent?.type !== 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((fields, context) =>
          (context.parent as any).type === 'image' && !fields?.asset ? 'Image required' : true,
        ),
    }),
    defineField({
      type: 'mux.video',
      name: 'video',
      hidden: ({parent}) => parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context) =>
          (context.parent as any).type === 'video' && !video ? 'Video Required' : true,
        ),
    }),
  ],
})
