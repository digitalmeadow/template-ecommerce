import {link} from './fields/primitives/link'
import {meta} from './fields/primitives/meta'
import {header} from './components/header'
import {footer} from './components/footer'
import {home} from './pages/home'
import {button} from './blocks/button'
import {page} from './pages/page'
import {media} from './fields/primitives/media'
import {sectionHero} from './sections/sectionHero'
import {textRich} from './fields/primitives/textRich'

export const schemaTypes = [
  // Primitives
  link,
  textRich,
  meta,
  media,

  // Blocks
  button,

  // Sections
  sectionHero,

  // Components
  header,
  footer,

  // Pages
  home,
  page,
]
