import React from 'react'
import {generateMuxThumbnailUrl} from '../../utils/mux'
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
        Rule.custom((fields, context) => {
          // @ts-expect-error
          if (context.parent.type === 'image' && !fields.asset) {
            return 'Image required'
          } else {
            return true
          }
        }),
    }),
    defineField({
      type: 'mux.video',
      name: 'video',
      hidden: ({parent}) => parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context) => {
          // @ts-expect-error
          if (context.parent.type === 'video' && !video) {
            return 'Video Required'
          } else {
            return true
          }
        }),
    }),
  ],
  options: {collapsible: true, collapsed: false},
  preview: {
    select: {
      type: 'type',
      playbackId: 'video.asset.playbackId',
      image: 'image',
    },
    prepare(selection) {
      const {type, image} = selection

      return {
        media:
          type === 'video' ? (
            <img src={generateMuxThumbnailUrl(selection.playbackId)} alt="" />
          ) : (
            image
          ),
      }
    },
  },
})
