import {ComponentIcon} from '@sanity/icons'
import {documentEditor} from './documentEditor'
import {StructureBuilder} from 'sanity/structure'

export const components = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
	.title('Components')
	.icon(ComponentIcon)
	.child(
		S.list()
			.title('Components')
			.items(
			[
				S.listItem()
					.title('Header')
					.schemaType('header')
					.child(
						(id: string) => documentEditor(S, 'header', id)
					),
				S.listItem()
					.title('Footer')
					.schemaType('footer')
					.child(
						(id: string) => documentEditor(S, 'footer', id)
					),
			]
		)
	)
}
