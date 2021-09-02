/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 */
import {JaenCoreProvider} from './src'

export const wrapRootElement = ({element}) => {
  // @ts-ignore
  const config = require(___JAEN_CONFIG___)
  return (
    <JaenCoreProvider plugins={[]} remote={config.remote}>
      {element}
    </JaenCoreProvider>
  )
}
