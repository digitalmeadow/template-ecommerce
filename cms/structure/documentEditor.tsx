import {StructureBuilder} from 'sanity/structure'
import {PreviewPane} from '../components/editor/PreviewPane'
import {PREVIEWABLE_DOCUMENT_TYPES} from '../config'

// Creates a tab for preview pane if document type is marked as previewable
export const documentEditor = (S: StructureBuilder, schemaType: string, documentId: string) => {
  return S.editor()
    .id(documentId)
    .schemaType(schemaType)
    .documentId(documentId)
    .views([
      S.view.form(),
      ...(PREVIEWABLE_DOCUMENT_TYPES.includes(schemaType)
        ? [S.view.component((props) => <PreviewPane {...props} />).title('Preview')]
        : []),
    ])
}
