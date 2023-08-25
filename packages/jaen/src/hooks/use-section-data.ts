import deepmerge from 'deepmerge'
import * as React from 'react'
import {useSectionBlockContext} from '../contexts/block'
import {usePageContext} from '../contexts/page'
import {useAppSelector} from '../redux'
import {IJaenSection, IJaenBlock} from '../types'
import {deepmergeArrayIdMerge} from '../utils/deepmerge'
import {findSection} from '../utils/page/section'

export function useSectionData(
  sectionName: string,
  options?: {forceUpdate?: boolean}
) {
  const {forceUpdate = false} = options || {}

  const jaenSection = useSectionBlockContext()

  const sectionPath = React.useMemo(
    () =>
      (jaenSection?.path || []).concat({
        fieldName: sectionName,
        sectionId: jaenSection?.id
      }),
    []
  )

  const {jaenPage} = usePageContext()

  if (!jaenPage.id) {
    throw new Error(
      'JaenPage id is undefined! connectField must be used within a JaenPage'
    )
  }

  const staticSection = React.useMemo(
    () => findSection(jaenPage.sections || [], sectionPath),
    [jaenPage.sections, sectionPath]
  )

  const dynamicSection = useAppSelector(
    state =>
      findSection(
        state.page.pages.nodes[jaenPage.id]?.sections || [],
        sectionPath
      ),
    (l, r) => {
      if (forceUpdate) {
        return false
      }

      const stringifyWithExclusion = (
        obj: IJaenSection | null,
        excludedKey: string
      ) => {
        return JSON.stringify(obj, (key, value) => {
          if (key === excludedKey) {
            return undefined // Exclude the specified key
          }
          return value
        })
      }

      return (
        stringifyWithExclusion(l, 'jaenFields') ===
        stringifyWithExclusion(r, 'jaenFields')
      )
    }
  )

  const [section, setSection] = React.useState<IJaenSection>(
    staticSection || {
      fieldName: sectionName,
      ptrHead: null,
      items: [],
      ptrTail: null
    }
  )

  React.useEffect(() => {
    const mergedSection = deepmerge(staticSection || {}, dynamicSection || {}, {
      arrayMerge: deepmergeArrayIdMerge
    })

    const sectionItemsDict: Record<string, IJaenBlock> = {}

    mergedSection?.items?.forEach(item => {
      sectionItemsDict[item.id] = item
    })

    const orderedSectionItems: IJaenBlock[] = []

    let ptrHead = mergedSection?.ptrHead

    let i = 0

    while (ptrHead && i < 50) {
      const item = sectionItemsDict[ptrHead]

      if (item == null) {
        throw new Error(`ptrHead ${ptrHead} is not found in section items!`)
      }

      i++

      ptrHead = item.ptrNext

      if (item.deleted) {
        continue
      }

      orderedSectionItems.push(item)
    }

    mergedSection.items = orderedSectionItems

    setSection(mergedSection)
  }, [dynamicSection])

  return {
    data: section,
    sectionPath
  }
}
