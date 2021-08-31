// @ts-nocheck
import type {GatsbySSR} from 'gatsby'

import {JaenCoreProvider} from '..'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  // @ts-ignore
  return <JaenCoreProvider plugins={[]}>{element}</JaenCoreProvider>
}
