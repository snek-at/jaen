import {useCallback, useMemo} from 'react'
import {IBlockOptions, IBlockConnection} from '../connectors/connect-block'
import {usePageContext} from '../contexts/page'
import {store} from '../redux'
import {actions} from '../redux/slices/page'
import {IJaenSection, IJaenConnection} from '../types'
import {useSectionData} from './use-section-data'

export interface UseSectionField {
  onSectionAdd: (
    sectionItemType: string,
    between: [string | null, string | null]
  ) => void
  onSectionDelete: (
    id: string,
    ptrPrev: string | null,
    ptrNext: string | null
  ) => void
  onSectionMove: (
    id: string,
    ptrPrev: string | null,
    ptrNext: string | null,
    ptrNew: string | null,
    direction: 'up' | 'down'
  ) => void
  onSectionAppend: (
    sectionName: string,
    id: string,
    ptrNext: string | null
  ) => void
  onSectionPrepend: (
    sectionName: string,
    id: string,
    ptrPrev: string | null
  ) => void
  section: IJaenSection
  sectionsDict: Record<
    string,
    {
      Component: IJaenConnection<{}, IBlockOptions>
      options: {
        label: string
        name: string
      }
    }
  >
  sectionPath: Array<{
    fieldName: string
    sectionId?: string | undefined
  }>
}

export interface UseSectionFieldOptions {
  sectionName: string
  blocks: IBlockConnection[]
}

export const useSectionField = (
  sectionName: string,
  blocks: IBlockConnection[]
): UseSectionField => {
  const {jaenPage} = usePageContext()

  const {data: section, sectionPath} = useSectionData(sectionName)

  // sections to dictionary with key as section name
  const sectionsDict = useMemo<
    Record<
      string,
      {
        Component: IBlockConnection
        options: {
          label: string
          name: string
        }
      }
    >
  >(() => {
    const t = blocks.reduce<
      Record<
        string,
        {
          Component: IBlockConnection
          options: {label: string; name: string}
        }
      >
    >(
      (acc, Section) => ({
        ...acc,
        [Section.options.name]: {
          Component: Section,
          options: Section.options
        }
      }),
      {}
    )

    return t
  }, [blocks])

  const onSectionAdd = useCallback(
    (sectionItemType: string, between: [string | null, string | null]) => {
      store.dispatch(
        actions.section_add({
          pageId: jaenPage.id,
          sectionItemType,
          path: sectionPath,
          between
        })
      )
    },
    []
  )

  const onSectionDelete = useCallback(
    (id: string, ptrPrev: string | null, ptrNext: string | null) => {
      store.dispatch(
        actions.section_remove({
          pageId: jaenPage.id,
          sectionId: id,
          path: sectionPath,
          between: [ptrPrev, ptrNext]
        })
      )
    },
    []
  )

  const onSectionMove = useCallback(
    (
      id: string,
      ptrPrev: string | null,
      ptrNext: string | null,
      ptrNew: string | null,
      direction: 'up' | 'down'
    ) => {
      store.dispatch(
        actions.section_move({
          pageId: jaenPage.id,
          sectionId: id,
          path: sectionPath,
          between: [ptrPrev, ptrNext],
          move: {
            direction,
            ptrNew
          }
        })
      )
    },
    []
  )

  const onSectionAppend = useCallback(
    (sectionName: string, id: string, ptrNext: string | null) => {
      onSectionAdd(sectionName, [id, ptrNext || null])
    },
    []
  )

  const onSectionPrepend = useCallback(
    (sectionName: string, id: string, ptrPrev: string | null) => {
      onSectionAdd(sectionName, [ptrPrev || null, id])
    },
    []
  )

  return {
    onSectionAdd,
    onSectionDelete,
    onSectionMove,
    onSectionAppend,
    onSectionPrepend,
    section,
    sectionsDict,
    sectionPath
  }
}
