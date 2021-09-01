/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 */
import {JaenCoreProvider} from './src'

export const wrapRootElement = ({element}) => {
  return <JaenCoreProvider plugins={[]}>{element}</JaenCoreProvider>
}
