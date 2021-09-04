import {ChakraProvider} from '@chakra-ui/react'
import loadable from '@loadable/component'
import * as React from 'react'

import MainUI from './containers/MainUI'
import {PluginCallbacks, getPublishValue, getUI, Plugin} from './plugin'
import {store} from './store/index'

export type JaenCoreContextType = {remote: string} & PluginCallbacks
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
  remote: string
  plugins: Plugin[]
}

export const JaenCoreProvider: React.FC<JaenCoreProviderProps> = ({
  children,
  remote,
  plugins
}) => {
  const ui = getUI(plugins)
  const onPublish = () => getPublishValue(plugins)
  const getAuthState = () => store.getState().auth

  return (
    <>
      <JaenCoreContext.Provider value={{onPublish, getAuthState, remote}}>
        <MainUI ui={ui} />
        {children}
      </JaenCoreContext.Provider>
    </>
  )
}

export default JaenCoreProvider
