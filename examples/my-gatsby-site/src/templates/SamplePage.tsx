import {fields} from '@snek-at/jaen-pages'
import type {JaenTemplate} from '@snek-at/jaen-pages/src/types'

const SamplePage: JaenTemplate = () => {
  return <fields.TextField fieldName="text" initValue="<p>my value</p>" />
}

SamplePage.TemplateName = 'SamplePage'

export default SamplePage
