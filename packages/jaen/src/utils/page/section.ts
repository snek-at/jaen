import deepmerge from 'deepmerge'
import {v4 as uuidv4} from 'uuid'

import {IJaenBlock, IJaenSection, SectionType} from '../../types'
import {deepmergeArrayIdMerge} from '../../utils/deepmerge'

export const updateItem = <T>(
  items: IJaenBlock[],
  id: string,
  newData: Partial<T>
) => {
  const index = items.findIndex(item => item.id === id)

  if (index === -1) {
    // @ts-expect-error
    items.push({
      id,
      ...newData
    })
  } else {
    // @ts-expect-error
    items[index] = deepmerge(items[index], newData, {
      arrayMerge: deepmergeArrayIdMerge
    })
  }

  return items
}

export const insertSectionIntoTree = (
  sections: IJaenSection[],
  path: SectionType['path'],
  options?: {
    between?: [string | null, string | null]
    sectionId?: string
    shouldDelete?: true
    blockData?: Partial<IJaenBlock>
    move?: {
      direction: 'up' | 'down'
      ptrNew: string | null
    }
  }
): IJaenSection | null => {
  const between = options?.between
  const sectionId = options?.sectionId
  const shouldDelete = options?.shouldDelete
  const blockData = options?.blockData || {}
  const move = options?.move

  const [head, ...tail] = path

  if (
    sections.find(({fieldName}) => head && fieldName === head.fieldName) == null
  ) {
    if (head?.fieldName) {
      // @ts-expect-error
      sections.push({
        fieldName: head.fieldName,
        items: []
      })
    }
  }

  for (const section of sections) {
    if (section.fieldName === head?.fieldName) {
      if (tail.length === 0) {
        if (sectionId && shouldDelete) {
          updateItem(section.items, sectionId, {
            ...blockData,
            deleted: true
          })

          if (between) {
            const [prev, next] = between

            if (prev && !next) {
              // If next is not defined:
              // - set the prev section's next pointer to null
              // - set the tail pointer to the prev section's id

              updateItem(section.items, prev, {
                ptrNext: null
              })

              section.ptrTail = prev
            } else if (!prev && next) {
              // If prev is not defined:
              // - set the next section's prev pointer to null
              // - set the head pointer to the next section's id

              updateItem(section.items, next, {
                ptrPrev: null
              })

              section.ptrHead = next
            } else if (prev && next) {
              // If both prev and next are defined:
              // If the section is deleted:
              // - set the prev section's next pointer to next
              // - set the next section's prev pointer to prev
              // If the section is not deleted:
              // - set the prev section's next pointer to the next section's id
              // - set the next section's prev pointer to the prev section's id

              if (shouldDelete) {
                updateItem(section.items, prev, {
                  ptrNext: next
                })
                updateItem(section.items, next, {
                  ptrPrev: prev
                })
              } else {
                updateItem(section.items, prev, {
                  ptrNext: null
                })
                updateItem(section.items, next, {
                  ptrPrev: null
                })
              }
            } else {
              // If both prev and next are not defined:
              // - set the head and tail pointers to null

              section.ptrHead = null
              section.ptrTail = null
            }
          }
        } else if (sectionId && move && between) {
          const [prev, next] = between
          const {direction, ptrNew} = move

          if (direction === 'down') {
            if (ptrNew) {
              updateItem(section.items, ptrNew, {
                ptrPrev: sectionId
              })
            } else {
              section.ptrTail = sectionId
            }

            if (prev) {
              updateItem(section.items, prev, {
                ptrNext: next
              })
            } else {
              section.ptrHead = next
            }

            if (next) {
              updateItem(section.items, next, {
                ptrPrev: prev,
                ptrNext: sectionId
              })
            } else {
              section.ptrTail = sectionId
            }

            updateItem(section.items, sectionId, {
              ptrPrev: next,
              ptrNext: ptrNew
            })
          } else if (direction === 'up') {
            if (ptrNew) {
              updateItem(section.items, ptrNew, {
                ptrNext: sectionId
              })
            } else {
              section.ptrHead = sectionId
            }

            if (prev) {
              updateItem(section.items, prev, {
                ptrNext: next,
                ptrPrev: sectionId
              })
            } else {
              section.ptrHead = sectionId
            }

            if (next) {
              updateItem(section.items, next, {
                ptrPrev: prev
              })
            } else {
              section.ptrTail = prev
            }

            updateItem(section.items, sectionId, {
              ptrPrev: ptrNew,
              ptrNext: prev
            })
          }
        } else {
          // Generate a new id in the pattern of `JaenSection {uuid}`
          const genSectionId = sectionId || `JaenSection ${uuidv4()}`

          if (between && blockData.type) {
            const [prev, next] = between

            if (!prev && !next) {
              // If the before and after are not defined, add the section without changing
              // the pointers of other sections

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: null,
                ptrPrev: null,
                sections: [],
                type: blockData.type,
                ...blockData
              })

              section.ptrHead = genSectionId
              section.ptrTail = genSectionId
            } else if (prev && !next) {
              // If the after is defined, add the section before the after

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: null,
                ptrPrev: prev,
                sections: [],
                type: blockData.type,
                ...blockData
              })

              updateItem(section.items, prev, {
                ptrNext: genSectionId
              })

              section.ptrTail = genSectionId
            } else if (!prev && next) {
              // If the before is defined, add the section after the before

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: next,
                ptrPrev: null,
                sections: [],
                type: blockData.type,
                ...blockData
              })

              updateItem(section.items, next, {
                ptrPrev: genSectionId
              })

              section.ptrHead = genSectionId
            } else if (prev && next) {
              // cannot use else here because of the null check
              // If both before and after are defined, add the section between the before and after

              section.items.push({
                id: genSectionId,
                jaenFields: null,
                jaenFiles: [],
                ptrNext: next,
                ptrPrev: prev,
                sections: [],
                type: blockData.type,
                ...blockData
              })

              updateItem(section.items, prev, {
                ptrNext: genSectionId
              })

              updateItem(section.items, next, {
                ptrPrev: genSectionId
              })
            }
          } else {
            updateItem(section.items, genSectionId, {
              ...blockData,
              id: genSectionId
            })
          }
        }

        return section
      }

      let item = section.items.find(({id}) => id === tail[0]?.sectionId)

      if (item == null) {
        item = {
          id: tail[0]?.sectionId
        } as IJaenBlock

        section.items.push(item)
      }

      item.sections = item.sections || []

      return insertSectionIntoTree(item.sections, tail, options)
    }
  }

  return null
}

export const findSection = (
  sections: IJaenSection[],
  path: SectionType['path'],
  i = 0
): IJaenSection | null => {
  const [head, ...tail] = path

  for (const section of sections) {
    if (section.fieldName === head?.fieldName) {
      if (tail.length === 0) {
        return section
      }

      for (const item of section.items) {
        if (item.id === tail?.[0]?.sectionId) {
          if (item.sections) {
            return findSection(item.sections, tail, i + 1)
          }
        }
      }
    }
  }

  return null
}
