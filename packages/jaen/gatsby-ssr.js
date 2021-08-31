import {JaenCoreProvider} from './src'

export const wrapRootElement = ({element}) => {
  // @ts-ignore
  return <JaenCoreProvider plugins={[]}>{element}</JaenCoreProvider>
}
