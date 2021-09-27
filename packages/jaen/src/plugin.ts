import {AuthState} from '@store/types'

type HotbarMain = {
  start: JSX.Element[]
  end: JSX.Element[]
}

type TabsMain = {
  start: {
    label: string
    content: JSX.Element
  }[]
  end: {
    label: string
    content: JSX.Element
  }[]
}

export type PluginUI = {
  hotbar: HotbarMain
  tabs: TabsMain
}

export type PluginCallbacks = {
  onPublish: () => Promise<object>
  getAuthState: () => AuthState
}

export type Plugin = {
  name: string
  registerUI: PluginUI
  registerCallbacks: PluginCallbacks
}

/**
 * @param {Plugin[]} plugins
 *
 * @return {PluginUI}
 *
 * Merges the plugin UI objects into a single object.
 */
export const getUI = (plugins: Plugin[]): PluginUI => {
  const ui: PluginUI = {
    hotbar: {start: [], end: []},
    tabs: {start: [], end: []}
  }

  plugins.forEach(plugin => {
    const {hotbar, tabs} = plugin.registerUI

    ui.hotbar.start = [...ui.hotbar.start, ...hotbar.start]
    ui.hotbar.end = [...ui.hotbar.end, ...hotbar.end]
    ui.tabs.start = [...ui.tabs.start, ...tabs.start]
    ui.tabs.end = [...ui.tabs.end, ...tabs.end]
  })

  return ui
}

/**
 * @param {Plugin[]} plugins
 *
 * Gathers all individual plugin publish objects and merges them into a single object
 */
export const getPublishValue = async (plugins: Plugin[]): Promise<object> => {
  const o: {[key: string]: any} = {}

  for (const {name, registerCallbacks} of plugins) {
    const {onPublish} = registerCallbacks
    o[name] = await onPublish()
  }
  return o
}
