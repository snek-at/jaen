import {useMemo} from 'react'

import {Tune, TuneOption, TuneSelectorProps} from './TuneSelector.js'

export const getActiveProps = (
  activeTunes: TuneSelectorProps['activeTunes'],
  tunes: TuneOption[] = []
): Tune['props'] => {
  let activeProps: Record<string, any> = {}

  tunes.forEach(tune => {
    if ('type' in tune && tune.type === 'groupTune') {
      tune.tunes.forEach(subTune => {
        if (subTune.props) {
          const isActive = activeTunes?.some(
            activeTune =>
              activeTune.name === subTune.name &&
              activeTune.groupName === tune.name
          )

          if (isActive) {
            activeProps = {
              ...activeProps,
              ...subTune.props
            }
          }
        }
      })
    } else {
      if (tune.props) {
        const isActive = activeTunes?.some(
          activeTune => activeTune.name === tune.name
        )

        if (isActive) {
          activeProps = {
            ...activeProps,
            ...tune.props
          }
        }
      }
    }
  })

  return activeProps
}

export const getActiveTunesFromProps = (
  props: Record<string, any>,
  tunes: TuneOption[] = []
): Array<{name: string; groupName?: string}> => {
  const activeTunes: Array<{name: string; groupName?: string}> = []

  tunes.forEach(tune => {
    if ('type' in tune && tune.type === 'groupTune') {
      tune.tunes.forEach(subTune => {
        if (subTune.props) {
          const requiredProps =
            subTune.requiredProps || Object.keys(subTune.props) // Use requiredProps if available, otherwise fallback to all props

          const isActive = requiredProps.every(
            prop => props[prop] === subTune.props?.[prop]
          )

          if (isActive) {
            activeTunes.push({
              name: subTune.name,
              groupName: tune.name
            })
          }
        }
      })
    } else {
      if (tune.props) {
        const requiredProps = tune.requiredProps || Object.keys(tune.props) // Use requiredProps if available, otherwise fallback to all props

        const isActive = requiredProps.every(
          prop => props[prop] === tune.props?.[prop]
        )

        if (isActive) {
          activeTunes.push({
            name: tune.name
          })
        }
      }
    }
  })

  return activeTunes
}

export interface UseTunesOptions {
  props: Record<string, any>
  activeTunes: TuneSelectorProps['activeTunes']
  tunes: TuneOption[]
}

export interface UseTunesReturn {
  activeTunes: Array<{name: string; groupName?: string}>
  activeProps: Record<string, any>
  tunes: TuneOption[]
}

export const useTunes = ({props, activeTunes, tunes}: UseTunesOptions) => {
  const defaultActiveTunes = useMemo(
    () => getActiveTunesFromProps(props, tunes),
    [props, tunes]
  )

  const activeOrDefaultTunes = useMemo(() => {
    const tuneMap = new Map<
      string | undefined,
      {
        name: string
        groupName?: string
      }
    >()
    for (const activeOrDefaultTune of defaultActiveTunes) {
      const key = activeOrDefaultTune.groupName
      if (!tuneMap.has(key)) {
        tuneMap.set(key, activeOrDefaultTune)
      }
    }

    for (const activeTune of activeTunes || []) {
      const key = activeTune.groupName
      tuneMap.set(key, activeTune)
    }

    return Array.from(tuneMap.values())
  }, [defaultActiveTunes, activeTunes])

  const activeProps = useMemo(
    () => getActiveProps(activeOrDefaultTunes, tunes),
    [activeOrDefaultTunes, tunes]
  )

  return {
    activeTunes: activeOrDefaultTunes,
    activeProps,
    tunes
  }
}
