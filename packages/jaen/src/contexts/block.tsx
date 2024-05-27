import {Text} from '@chakra-ui/react'
import {createContext, memo, useCallback, useContext} from 'react'

import {useAppDispatch} from '../redux'
import {actions} from '../redux/slices/page'
import type {SectionType} from '../types'
import {usePageContext} from './page'

export const BlockContext = createContext<
  {name: string; label: string} | undefined
>(undefined)

export type SectionBlockContextType = SectionType & {
  register: (props: object) => void
}

export const SectionBlockContext = createContext<
  SectionBlockContextType | undefined
>(undefined)

export const JaenSectionBlockProvider: React.FC<SectionType> = memo(
  ({path, id, position, Component}) => {
    const {jaenPage} = usePageContext()
    const dispatch = useAppDispatch()

    const register = useCallback(
      (props: object) => {
        dispatch(
          actions.section_register({
            pageId: jaenPage.id,
            path,
            props
          })
        )
      },
      [dispatch, jaenPage.id]
    )

    return (
      <SectionBlockContext.Provider
        value={{
          path,
          id,
          position,
          Component,
          register
        }}>
        {Component ? (
          <Component />
        ) : (
          <Text>
            <>
              No block component found for section {id} at path {path}. Please
              contact the site administrator.
            </>
          </Text>
        )}
      </SectionBlockContext.Provider>
    )
  }
)

/**
 * Access the SectionBlockContext.
 *
 * @example
 * ```
 * const { name } = useSectionBlockContext()
 * ```
 */
export const useSectionBlockContext = ():
  | SectionBlockContextType
  | undefined => {
  const context = useContext(SectionBlockContext)

  return context
}
