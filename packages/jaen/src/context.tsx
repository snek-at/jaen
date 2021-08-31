import {ChakraProvider} from '@chakra-ui/react'
import loadable from '@loadable/component'
import * as React from 'react'

import {PluginCallbacks, getPublishValue, getUI, Plugin} from './plugin'

const LoadableUI = loadable(
  () => import('@snek-at/jaen-shared-ui/dist/components/app/Main')
)

export type JaenCoreContextType = {} & PluginCallbacks
export const JaenCoreContext = React.createContext<
  JaenCoreContextType | undefined
>(undefined)

export const useJaenCoreContext = (): JaenCoreContextType => {
  const context = React.useContext(JaenCoreContext)

  if (context === undefined) {
    throw new Error('useJaenCoreContext must be within JaenCoreContext')
  }

  return context
}

type JaenCoreProviderProps = {
  plugins: Plugin[]
}

export const JaenCoreProvider: React.FC<JaenCoreProviderProps> = ({
  children,
  plugins
}) => {
  const {hotbar, tabs} = getUI(plugins)
  const onPublish = () => getPublishValue(plugins)

  return (
    <>
      <JaenCoreContext.Provider value={{onPublish}}>
        <ChakraProvider>
          <LoadableUI hotbar={hotbar} tabs={tabs} authenticated={true} />
        </ChakraProvider>
        {children}
      </JaenCoreContext.Provider>
    </>
  )
}

export default JaenCoreProvider
