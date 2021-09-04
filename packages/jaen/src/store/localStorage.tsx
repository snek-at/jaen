import {useStaticQuery, graphql} from 'gatsby'

import {RootState, store} from './index'

const key = 'jaen'

export const loadState = (): RootState | undefined => {
  try {
    const serialState = localStorage.getItem(key)
    if (serialState === null) {
      return undefined
    }
    return JSON.parse(serialState) as RootState
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: RootState) => {
  try {
    const serialState = JSON.stringify(state)
    localStorage.setItem(key, serialState)
  } catch (err) {
    console.log(err)
  }
}

export const clearState = () => {
  localStorage.removeItem(key)
  store.dispatch({type: 'RESET_STATE'})
}

export const withStorageManager = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => props => {
  const btKey = `${key}:buildTime`
  const data = useStaticQuery(graphql`
    query CoreBuildMetadata {
      siteBuildMetadata {
        buildTime
      }
    }
  `)

  const buildTime = data.siteBuildMetadata.buildTime

  if (typeof window !== 'undefined') {
    const storageBuildTime = localStorage.getItem(btKey)

    if (storageBuildTime !== buildTime) {
      alert(`buildTime: ${buildTime}; storageBuildTime: ${storageBuildTime}`)

      if (storageBuildTime) {
        clearState()
      }

      localStorage.setItem(btKey, buildTime)
    }
  }

  return <Component {...props} />
}
