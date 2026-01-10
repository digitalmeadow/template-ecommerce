import {defineArrayMember, defineType} from 'sanity'
import Italics from '../../components/marks/Italics'
import {ImageIcon, TextIcon} from '@sanity/icons'

// Basic rich text with default settings
export const textRich = defineType({
  type: 'array',
  name: 'textRich',
  icon: TextIcon,
  of: [
    defineArrayMember({
      type: 'block',
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'link',
          }),
        ],
        decorators: [
          {
            title: 'Italic',
            value: 'italic',
            icon: () => 'I',
            component: Italics,
          },
          {
            title: 'Strong',
            value: 'strong',
            icon: () => 'B',
          },
        ],
      },
      of: [
        {
          type: 'image',
          name: 'image',
          icon: ImageIcon,
        },
      ],
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
      ],
    }),
  ],
})
