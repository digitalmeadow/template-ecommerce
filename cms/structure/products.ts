import {DocumentsIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'
import {documentEditor} from './documentEditor'

export const products = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Products')
		.icon(DocumentsIcon)
		.schemaType('product')
		.child(
			S.documentTypeList('product').child(
				(id) => documentEditor(S, 'product', id)
			)
		)
}
