import {HomeIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'
import {documentEditor} from './documentEditor'

export const home = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Home')
		.icon(HomeIcon)
		.child(
			() => documentEditor(S, 'home', 'home')
		)
}
