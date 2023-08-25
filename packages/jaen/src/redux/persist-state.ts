import {Store} from 'redux'
import {onErrorResetAndRery} from './middleware'

export default <RootState extends {}>(persistKey: string) => {
  const loadState = (): RootState | undefined => {
    try {
      const serialState = localStorage.getItem(persistKey)

      if (serialState === null) {
        return undefined
      }
      return JSON.parse(serialState) as RootState
    } catch (err) {
      return undefined
    }
  }

  const saveState = (state: RootState) => {
    try {
      // recursively remove all isLoading and error properties
      const removeLoadingAndError = (obj: Record<string, any>) => {
        const keysToRemove = ['isLoading', 'error']

        if (obj && typeof obj === 'object') {
          keysToRemove.forEach(key => {
            if (key in obj) {
              delete obj[key]
            }
          })

          Object.keys(obj).forEach(key => {
            removeLoadingAndError(obj[key])
          })
        }
      }

      const cleanState = JSON.parse(JSON.stringify(state))

      removeLoadingAndError(cleanState)

      const serialState = JSON.stringify(cleanState)

      localStorage.setItem(persistKey, serialState)
    } catch (err) {
      console.error(err)
    }
  }

  const persistState = (store: Store) => {
    store.subscribe(() => {
      saveState(store.getState() as RootState)
    })

    const resetState = (payload?: {}) => {
      localStorage.removeItem(persistKey)

      store.dispatch({
        type: 'RESET_STATE',
        payload
      })
    }

    return {resetState}
  }

  const persistMiddleware = [onErrorResetAndRery<RootState>(persistKey)]

  return {
    loadState,
    saveState,
    persistState,
    persistMiddleware
  }
}
