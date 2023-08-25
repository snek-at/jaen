import {persistKey, resetState} from '../redux'

declare global {
  interface Window {
    ___webpackCompilationHash: string | undefined
  }
}

export const useJaenUpdate = () => {
  const key = 'ljch'
  // is undefined when running in development mode
  const latestWebpackCompilationHash =
    typeof window !== 'undefined' ? window.___webpackCompilationHash : undefined

  const isDisabled = latestWebpackCompilationHash === undefined

  const isJaenUpdate = () => {
    if (typeof window === 'undefined') {
      return false
    }

    const latestJaenCompilationHash = localStorage.getItem(key)

    // If the latest webpack compilation hash is not null and different from the latest
    // jaen compilation hash, then we know that there are changes. Otherwise,
    // there are no changes.

    if (
      latestWebpackCompilationHash &&
      latestJaenCompilationHash !== null &&
      latestWebpackCompilationHash !== latestJaenCompilationHash
    ) {
      return true
    }

    // set the latestJaenCompilationHash to the latest webpack compilation hash if
    // the `jaen-state` key is set in localStorage. This is to ensure that there is only
    // a incoming build when the user has logged in to jaen.

    // event listener on localStorage to update the latestJaenCompilationHash
    // when the `jaen-state` key is set.

    if (latestWebpackCompilationHash) {
      const isJaenStateKeySet = localStorage.getItem(persistKey) !== null

      if (isJaenStateKeySet) {
        localStorage.setItem(key, latestWebpackCompilationHash)
      }
    }

    return false
  }

  const updateToLatest = () => {
    resetState()

    localStorage.removeItem(key)
  }

  return {
    isJaenUpdate: isJaenUpdate(),
    isDisabled,
    updateToLatest
  }
}
