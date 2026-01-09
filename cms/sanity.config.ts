import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {muxInput} from 'sanity-plugin-mux-input'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'PROJECT_SANITY_PROJECT_TITLE',

  projectId: 'iqfm6q7t',
  dataset: 'production',

  plugins: [structureTool({structure}), muxInput({mp4_support: 'standard'}), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
