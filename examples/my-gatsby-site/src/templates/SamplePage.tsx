import {fields} from '@snek-at/jaen-pages'
import type {JaenTemplate} from '@snek-at/jaen-pages/src/types'

const SamplePage: JaenTemplate = () => {
  return (
    <fields.IndexField
      onRender={page => <div> {Object.keys(page.children)}</div>}
    />
  )
}

SamplePage.TemplateName = 'SamplePage'

export default SamplePage
