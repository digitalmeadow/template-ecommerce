import {Card} from '@sanity/ui'
import {ComponentProps} from 'react'
import {UserViewComponent} from 'sanity/structure'
import {PREVIEW_WEBSITE_URL, ROUTE_MAPS} from '../../config'

export function PreviewPane({document}: ComponentProps<UserViewComponent>) {
  const {displayed} = document as any
  const documentType = displayed?._type
  const slug = displayed?.slug?.current

  let route = ROUTE_MAPS[documentType] || '/'
  route = route.includes('[slug]') ? route.replace('[slug]', slug) : route
  const url = new URL(route, PREVIEW_WEBSITE_URL)

  return (
    <Card scheme="light" style={{width: '100%', height: '100%', position: 'relative'}}>
      <iframe
        title="Preview"
        style={{width: '100%', height: '100%', position: 'relative', zIndex: 1}}
        src={url.toString()}
      />
    </Card>
  )
}
