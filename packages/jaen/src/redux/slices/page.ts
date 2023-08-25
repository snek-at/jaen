import {combineReducers, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid'

import {JaenPage, SectionType} from '../../types'
import {deepRemoveUndefinedProperties} from '../../utils/deep-remove-undefined-properties'
import {findSection, insertSectionIntoTree} from '../../utils/page/section'
import {IPageState} from '../types'

export const pageInitialState: IPageState = {
  pages: {
    lastAddedNodeId: undefined,
    registeredPageFields: {},
    nodes: {}
  },
  routing: {
    dynamicPaths: {}
  }
}

const pagesSlice = createSlice({
  name: 'pages',
  initialState: pageInitialState.pages,
  reducers: {
    page_updateOrCreate(
      state,
      action: PayloadAction<
        IPageState['pages']['nodes'][string] & {
          id?: string
          fromId?: string
        }
      >
    ) {
      let {
        id,
        slug,
        jaenFields,
        jaenPageMetadata,
        parentPage,
        childPages,
        template,
        excludedFromIndex,
        fromId
      } = action.payload

      const parentPageId = parentPage?.id || null

      const modifiedAt = new Date().toISOString()

      // Check if the page is being updated or created
      if (id) {
        // Update the page
        let toBeAddedData = {
          id,
          modifiedAt,
          ...(slug && {slug}),
          ...(jaenFields !== undefined && {jaenFields}),
          jaenPageMetadata,
          ...(parentPage !== undefined && {parentPage}),
          ...(childPages && {childPages}),
          ...(excludedFromIndex !== undefined && {excludedFromIndex})
        }

        // TODO: Use this instead of the above
        toBeAddedData = deepRemoveUndefinedProperties(toBeAddedData)

        state.nodes[id] = {
          ...state.nodes[id],
          ...toBeAddedData,
          jaenPageMetadata: {
            ...state.nodes[id]?.jaenPageMetadata,
            ...jaenPageMetadata
          } as JaenPage['jaenPageMetadata']
        }

        // If `fromId` then remove the page from the fromPage childPages
        if (fromId && (parentPageId || parentPageId === null)) {
          // Update the from page
          // If the fromIndex is not found, add the fromPage to the state and set the from index

          const newchildPages = [
            ...(state.nodes[fromId]?.childPages || []).filter(e => e.id !== id),
            {
              id,
              deleted: true
            }
          ]

          state.nodes[fromId] = {
            ...state.nodes[fromId],
            modifiedAt,
            childPages: newchildPages
          }
        }
      } else {
        // If `fromId` is defined, throw an error because a page move is not supported on creation.
        if (fromId) {
          throw new Error(`Cannot move a page that is being created.`)
        }

        // Generate a new id in the pattern of `JaenPage {uuid}`
        id = `JaenPage ${uuidv4()}`

        // Create the page
        state.nodes[id] = {
          createdAt: modifiedAt,
          modifiedAt,
          slug,
          jaenFields: jaenFields || null,
          jaenPageMetadata: jaenPageMetadata || {
            title: 'New Page'
          },
          parentPage: parentPage || null,
          childPages: childPages || [],
          template,
          excludedFromIndex
        }

        state.lastAddedNodeId = id
      }

      // Add the page to the new parentPages' childPages
      if (parentPageId) {
        state.nodes[parentPageId] = {
          modifiedAt,
          ...state.nodes[parentPageId],
          childPages: state.nodes[parentPageId]?.childPages
            ? [...(state.nodes[parentPageId]?.childPages || []), {id}]
            : [{id}]
        }
      }

      return state
    },
    page_markForDeletion(state, action: PayloadAction<string>) {
      const id = action.payload

      state.nodes[id] = {
        ...state.nodes[id],
        deleted: true,
        childPages: state.nodes[id]?.childPages || []
      }

      return state
    },

    section_add(
      state,
      action: PayloadAction<{
        pageId: string
        // The larger the index, the more nested the section
        path: SectionType['path']
        sectionItemType: string
        between: [string | null, string | null]
      }>
    ) {
      const {pageId, path, sectionItemType, between} = action.payload

      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        childPages: state.nodes[pageId]?.childPages || []
      }

      const page = state.nodes[pageId] as JaenPage
      const sections = page.sections || []

      insertSectionIntoTree(sections, path, {
        between,
        blockData: {
          type: sectionItemType
        }
      })

      page.sections = sections

      return state
    },
    section_remove(
      state,
      action: PayloadAction<{
        pageId: string
        path: SectionType['path']
        sectionId: string
        between: [string | null, string | null]
      }>
    ) {
      const {pageId, path, sectionId, between} = action.payload

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        childPages: state.nodes[pageId]?.childPages || []
      }

      const page = state.nodes[pageId] as JaenPage
      const sections = page.sections || []

      insertSectionIntoTree(sections, path, {
        between,
        sectionId,
        shouldDelete: true
      })

      page.sections = sections

      return state
    },

    section_move(
      state,
      action: PayloadAction<{
        pageId: string
        path: SectionType['path']
        sectionId: string
        between: [string | null, string | null]
        move: {
          direction: 'up' | 'down'
          ptrNew: string | null
        }
      }>
    ) {
      const {pageId, path, sectionId, between, move} = action.payload

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        childPages: state.nodes[pageId]?.childPages || []
      }

      const page = state.nodes[pageId] as JaenPage

      const sections = page.sections || []

      insertSectionIntoTree(sections, path, {
        between,
        sectionId,
        move
      })

      page.sections = sections

      return state
    },

    section_register(
      state,
      action: PayloadAction<{
        pageId: string
        path: SectionType['path']
        props?: object
      }>
    ) {
      const {pageId, path, props} = action.payload

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        childPages: state.nodes[pageId]?.childPages || []
      }

      const page = state.nodes[pageId] as JaenPage
      const sections = page.sections || []

      const section = findSection(sections, path)

      if (section) {
        // section.position = position
        section.props = props
      }

      page.sections = sections

      // state.registeredPageFields[pageId] = position + 1

      return state
    },
    page_unregisterFields(
      state,
      action: PayloadAction<{
        pageId: string
      }>
    ) {
      const {pageId} = action.payload

      state.registeredPageFields = {
        ...state.registeredPageFields,
        [pageId]: 0
      }
    },

    field_register(
      state,
      action: PayloadAction<{
        pageId: string
        fieldType: string
        fieldName: string
        section?: {
          path: SectionType['path']
          id: string
        }
        props: object
      }>
    ) {
      const {pageId, section, fieldType, fieldName, props} = action.payload

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        childPages: state.nodes[pageId]?.childPages || [],
        sections: state.nodes[pageId]?.sections || []
      }

      const page = state.nodes[pageId] as JaenPage

      if (section) {
        const sections = page.sections || []

        insertSectionIntoTree(sections, section.path, {
          sectionId: section.id,
          blockData: {
            // @ts-expect-error
            jaenFields: {
              [fieldType]: {
                [fieldName]: {
                  position: undefined,
                  props
                }
              }
            }
          }
        })
      } else {
        page.jaenFields = page.jaenFields || {}
        // @ts-expect-error
        page.jaenFields[fieldType] = {
          ...page.jaenFields[fieldType],
          [fieldName]: {
            ...page.jaenFields[fieldType]?.[fieldName],
            position: undefined,
            props
          }
        }
      }

      // state.registeredPageFields[pageId] = position + 1
    },

    field_write(
      state,
      action: PayloadAction<{
        pageId: string
        section?: {
          path: SectionType['path']
          id: string
        }
        fieldType: string
        fieldName: string
        value: any
        props?: object
      }>
    ) {
      const {pageId, section, fieldType, fieldName, value, props} =
        action.payload

      const modifiedAt = new Date().toISOString()

      // find the page
      // Create the page if not found
      state.nodes[pageId] = {
        ...state.nodes[pageId],
        modifiedAt,
        childPages: state.nodes[pageId]?.childPages || []
      }

      const page = state.nodes[pageId] as JaenPage

      // If the page is found, add the field

      if (section) {
        page.sections = page.sections || []

        insertSectionIntoTree(page.sections, section.path, {
          sectionId: section.id,
          blockData: {
            jaenFields: {
              [fieldType]: {
                [fieldName]: {
                  value,
                  props
                }
              }
            }
          }
        })
      } else {
        page.jaenFields = page.jaenFields || {}
        page.jaenFields[fieldType] = {
          ...page.jaenFields[fieldType],
          [fieldName]: {
            ...page.jaenFields[fieldType]?.[fieldName],
            value,
            props
          }
        }
      }

      return state
    },

    discardAllChanges(state) {
      state.registeredPageFields = {}
      state.nodes = {}
      state.lastAddedNodeId = undefined
      return state
    },

    discardChanges(state, action: PayloadAction<{pageId: string}>) {
      const {pageId} = action.payload
      delete state.nodes[pageId]

      if (state.lastAddedNodeId === pageId) {
        state.lastAddedNodeId = undefined
      }

      return state
    }
  }
})

export const actions = {
  ...pagesSlice.actions
}

export const reducers = {
  pages: pagesSlice.reducer
}

export default combineReducers(reducers)
