import {DocumentsIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'
import {documentEditor} from './documentEditor'

export const pages = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Pages')
		.icon(DocumentsIcon)
		.schemaType('page')
		.child(
			S.documentTypeList('page').child(
				(id) => documentEditor(S, 'page', id)
			)
		)
}
