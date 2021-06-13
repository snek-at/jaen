/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'
import {components, PageParamsType} from '~/types'

import {setHiddenChildSlugs} from '~/store/cmsActions'

// import {PageNode} from '../components/Explorer/index'
import {
  setSettings,
  registerField,
  toggleMenu,
  toggleEditing,
  discardEditing,
  publish,
  overrideWDL,
  setOverrideWDLState,
  updatePageContent,
  setIndex,
  transferPageToIndex,
  deletePageFromIndex
} from './cmsActions'
import {CMSState} from './types'

const initialState: CMSState = {
  settings: {
    gitRemote: undefined
  },
  options: {
    editing: false,
    showMenu: false,
    shouldOverrideWDL: false
  },
  dataLayer: {working: {updateFieldsCount: 0, pages: {}}, editing: {pages: {}}}
}

export const cmsReducer = createReducer(initialState, {
  [setSettings.type]: (state, action) => {
    state.settings = action.payload
  },
  [registerField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload

    console.log(state, fieldOptions, page)

    const fields =
      state.dataLayer.editing.pages[page.slug]?.fields[fieldOptions.fieldName]

    state.dataLayer.editing.pages[page.slug] = {
      ...state.dataLayer.editing.pages[page.slug],
      fields: {
        ...state.dataLayer.editing.pages[page.slug]?.fields,
        [fieldOptions.fieldName]: {
          ...fields,
          blocks: {
            ...fields?.blocks,
            [fieldOptions.block.position]: {
              ...fields?.blocks?.[fieldOptions.block],
              typeName: fieldOptions.block.typeName
            }
          }
        }
      }
    }

    // const {fieldName, block}: components.EditableFieldOptions = fieldOptions
    // let wPages = state.dataLayer.working.pages
    // let pages = state.dataLayer.editing.pages
    // let blocks = undefined
    // // Check if a block is to be registered and the block is not already present in the working layer
    // const shouldRegisterBlock =
    //   block &&
    //   !wPages[page.slug]?.fields[fieldName]?.blocks?.[block.position]?.fields[
    //     block.blockFieldName
    //   ]
    // if (block) {
    //   console.log(
    //     wPages[page.slug]?.fields[fieldName]?.blocks?.[block.position]?.fields[
    //       block.blockFieldName
    //     ]
    //   )
    //   console.log('ad', block && undefined)
    // }
    // console.log('shouldRegisterBlock', fieldName, shouldRegisterBlock)
    // if (block && shouldRegisterBlock) {
    //   blocks = {
    //     ...pages[page.slug]?.fields[fieldName]?.blocks,
    //     [block.position]: {
    //       ...pages[page.slug]?.fields[fieldName]?.blocks?.[block.position],
    //       typeName: block.typeName,
    //       fields: {
    //         ...pages[page.slug]?.fields[fieldName]?.blocks?.[block.position]
    //           ?.fields,
    //         [block.blockFieldName]:
    //           pages[page.slug]?.fields[fieldName]?.blocks?.[block.position]
    //             ?.fields[block.blockFieldName]
    //       }
    //     }
    //   }
    // }
    // const shouldRegisterField =
    //   !wPages[page.slug]?.fields[fieldName] || shouldRegisterBlock
    // console.log('shouldRegisterField', fieldName, shouldRegisterField)
    // if (shouldRegisterField) {
    //   state.dataLayer.editing.pages = {
    //     ...pages,
    //     [page.slug]: {
    //       ...pages[page.slug],
    //       fields: {
    //         ...pages[page.slug]?.fields,
    //         [fieldName]: {
    //           ...pages[page.slug]?.fields[fieldName],
    //           blocks
    //         }
    //       }
    //     }
    //   }
    // }
  },
  [toggleEditing.type]: (state, action) => {
    state.options.editing = action.payload
  },
  [toggleMenu.type]: (state, action) => {
    state.options.showMenu = action.payload
  },
  [setOverrideWDLState.type]: (state, action) => {
    state.options.shouldOverrideWDL = action.payload
  },
  [overrideWDL.type]: (state, action) => {
    const {data, cksm} = action.payload
    state.dataLayer.origCksm = cksm
    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...state.dataLayer.working,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1,
        ...data
      }
    }
    state.options.shouldOverrideWDL = false
  },
  [discardEditing.type]: (state, _action) => {
    state.options.editing = false
    state.dataLayer.editing = {pages: {}}
    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...state.dataLayer.working,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1
      }
    }
  },
  [updatePageContent.type]: (state, action) => {
    const {
      content,
      fieldOptions,
      page
    }: {
      content: any
      fieldOptions: components.EditableFieldOptions
      page: PageParamsType
    } = action.payload

    const {fieldName, block} = fieldOptions

    const workingPageFields =
      state.dataLayer.working.pages[page.slug]?.fields || {}
    const editingPageFields =
      state.dataLayer.editing.pages[page.slug]?.fields || {}

    if (block) {
      const blockContent =
        workingPageFields[fieldName]?.blocks?.[block.position]?.fields[
          block.blockFieldName
        ]

      if (blockContent === content) {
        const editingBlocks = editingPageFields[fieldName]?.blocks
        if (editingBlocks) {
          delete editingBlocks[block.position].fields[block.blockFieldName]
        }
        return
      }

      state.dataLayer.editing.pages[page.slug] = {
        ...state.dataLayer.editing.pages[page.slug],
        fields: {
          ...editingPageFields,
          [fieldName]: {
            blocks: {
              ...editingPageFields[fieldName]?.blocks,
              [block.position]: {
                ...editingPageFields[fieldName]?.blocks?.[block.position],
                typeName: block.typeName,
                fields: {
                  ...editingPageFields[fieldName]?.blocks?.[block.position]
                    ?.fields,
                  [block.blockFieldName]: content
                }
              }
            }
          }
        },
        typeName: page.typeName
      }
    } else {
      if (workingPageFields[fieldName]?.content === content) {
        delete editingPageFields[fieldName]
        return
      }

      state.dataLayer.editing.pages[page.slug] = {
        ...state.dataLayer.editing.pages[page.slug],
        fields: {
          ...editingPageFields,
          [fieldName]: {
            content: content
          }
        },
        typeName: page.typeName
      }
    }
  },
  [publish.fulfilled.type]: (state, action) => {
    const workingLayer = action.payload

    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...workingLayer,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1
      },
      editing: {
        pages: {}
      }
    }
  },
  [setIndex.type]: (state, action) => {
    state.index = action.payload
  },
  [transferPageToIndex.type]: (state, action) => {
    const {key, slug, title, typeName, isDraft} = action.payload

    if (state.index) {
      const pathParts = (key as string).split('/').filter(item => item !== '')
      const parentSlug =
        pathParts[pathParts.length - 2] || state.index.rootPageSlug

      let childSlugs: string[] = []
      if (!isDraft) {
        const slugs = key.split('/')
        const oldSlug = slugs[slugs.length - 2]

        childSlugs = state.index.pages[oldSlug].childSlugs

        delete state.index.pages[oldSlug]
        state.index.pages[parentSlug].childSlugs = state.index.pages[
          parentSlug
        ].childSlugs.filter(e => e !== oldSlug)
      }

      state.index.pages = {
        ...state.index.pages,
        [slug]: {
          slug,
          title,
          typeName,
          childSlugs: isDraft ? [] : childSlugs
        },
        [parentSlug]: {
          ...state.index.pages[parentSlug],
          childSlugs: [...state.index.pages[parentSlug].childSlugs, slug]
        }
      }
    }
  },
  [deletePageFromIndex.type]: (state, action) => {
    const {key, slug, isDraft} = action.payload

    let slugs = key.split('/')
    slugs.splice(slugs.length - 2, 1)
    const parentKey = slugs.join('')

    if (state.index) {
      const parentSlug = parentKey === '' ? state.index.rootPageSlug : parentKey

      if (!isDraft) {
        delete state.dataLayer.working.pages[slug]
        delete state.dataLayer.editing.pages[slug]
        delete state.index.pages[slug]

        state.index.pages[parentSlug].childSlugs = state.index.pages[
          parentSlug
        ].childSlugs.filter(e => e !== slug)
      }
    }
  },
  [setHiddenChildSlugs.type]: (state, action) => {
    const {page, hiddenChildSlugs} = action.payload

    const slug = page.slug

    state.dataLayer.editing.pages = {
      ...state.dataLayer.editing.pages,
      [slug]: {
        ...state.dataLayer.editing.pages[slug],
        hiddenChildSlugs
      }
    }
  }
})
