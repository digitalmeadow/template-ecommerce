export const PREVIEW_WEBSITE_URL = 'PROJECT_PREVIEW_WEBSITE_URL'

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = ['home', 'header', 'footer', 'page']
export const LINKABLE_DOCUMENT_TYPES: string[] = ['home', 'page']
export const SINGLETON_DOCUMENT_TYPES: string[] = ['home', 'footer', 'header']

// Document type to route map
export const ROUTE_MAPS: Record<string, string> = {
  header: '/',
  footer: '/',
  home: '/',
  page: '/[slug]',
}
