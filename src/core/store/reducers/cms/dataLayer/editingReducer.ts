/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {union} from 'lodash'

import {diff, getNextIndexedObjectKey} from '~/common/utils'

import {cmsActions} from '~/store/actions'
import {UpdatePageFieldActionPayload} from '~/store/actions/cms'
import {
  BlocksField,
  DataLayer,
  EditingDataLayer,
  Field,
  PlainField
} from '~/store/types/cms/dataLayer'

const initialState: EditingDataLayer = {}

const editingReducer = createReducer(initialState, {
  [cmsActions.registerField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload

    const f = state.pages?.[page.slug]?.fields?.[fieldOptions.fieldName]

    if (fieldOptions.block) {
      const field = f as BlocksField

      state.pages = {
        ...state.pages,
        [page.slug]: {
          ...state.pages?.[page.slug],
          fields: {
            ...state.pages?.[page.slug]?.fields,
            [fieldOptions.fieldName]: {
              ...field,
              _type: 'BlocksField',
              blocks: {
                ...field?.blocks,
                [fieldOptions.block.position]: {
                  typeName: fieldOptions.block.typeName
                }
              }
            }
          }
        }
      }
    } else {
      const field = f as PlainField

      state.pages = {
        ...state.pages,
        [page.slug]: {
          ...state.pages?.[page.slug],
          fields: {
            ...state.pages?.[page.slug]?.fields,
            [fieldOptions.fieldName]: {
              ...field,
              _type: 'PlainField'
            }
          }
        }
      }
    }
  },
  [cmsActions.unregisterField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload

    const block = fieldOptions.block

    const field =
      state.pages?.[page.slug]?.fields?.[fieldOptions.fieldName] ||
      ({
        _type: block ? 'BlocksField' : 'PlainField'
      } as Field)

    if (field?._type === 'BlocksField' && block) {
      state.pages = {
        ...state.pages,
        [page.slug]: {
          ...state.pages?.[page.slug],
          fields: {
            ...state.pages?.[page.slug]?.fields,
            [fieldOptions.fieldName]: {
              ...field,
              blocks: {
                ...field.blocks,
                [block.position]: {
                  ...field.blocks?.[block.position],
                  deleted: true
                }
              }
            }
          }
        }
      }
    } else if (field?._type === 'PlainField') {
      state.pages = {
        ...state.pages,
        [page.slug]: {
          ...state.pages?.[page.slug],
          fields: {
            ...state.pages?.[page.slug]?.fields,
            [fieldOptions.fieldName]: {
              ...field,
              deleted: true
            }
          }
        }
      }
    }
  },

  [cmsActions.registerPage.type]: (state, action) => {
    const {page, rootPageSlug, pagesDetails} = action.payload

    const {key, slug, title, typeName, isDraft} = page

    const pathParts = (key as string).split('/').filter(item => item !== '')
    const parentSlug =
      pathParts[pathParts.length - 2] || (rootPageSlug as string)

    state.pages = {
      ...state.pages,
      [slug]: {
        ...state.pages?.[slug],
        details: {
          ...state.pages?.[slug]?.details,
          ...diff(
            {
              slug,
              title,
              typeName,
              childSlugs: isDraft ? [] : pagesDetails[slug].childSlugs,
              hiddenChildSlugs: isDraft
                ? []
                : pagesDetails[slug].hiddenChildSlugs
            },
            pagesDetails[slug] || {}
          ),
          deleted: undefined
        }
      }
    }

    if (
      !pagesDetails[parentSlug].childSlugs.includes(slug) &&
      parentSlug !== slug
    ) {
      state.pages = {
        ...state.pages,
        [parentSlug]: {
          ...state.pages?.[parentSlug],
          details: {
            ...state.pages?.[parentSlug]?.details,
            childSlugs: pagesDetails[parentSlug].childSlugs.concat([slug]) || []
          }
        }
      }
    }
  },
  [cmsActions.unregisterPage.type]: (state, action) => {
    const {page, rootPageSlug, pagesDetails} = action.payload

    const {key, slug} = page

    const pathParts = (key as string).split('/').filter(item => item !== '')
    const parentSlug = pathParts[pathParts.length - 2] || rootPageSlug

    state.pages = {
      ...state.pages,
      [slug]: {
        ...state.pages?.[slug],
        details: {
          ...state.pages?.[slug]?.details,
          deleted: true
        }
      }
    }

    const setDeleted = (slugs: string[], _parentSlug: string): void => {
      for (const _slug of slugs) {
        state.pages = {
          ...state.pages,
          [_slug]: {
            ...state.pages?.[_slug],
            details: {
              ...state.pages?.[_slug]?.details,
              deleted: true
            }
          }
        }

        state.pages = {
          ...state.pages,
          [_parentSlug]: {
            ...state.pages?.[_parentSlug],
            details: {
              ...state.pages?.[_parentSlug]?.details,
              childSlugs: pagesDetails[_parentSlug].childSlugs.filter(
                (e: string) => e !== _slug
              ),
              hiddenChildSlugs: pagesDetails[
                _parentSlug
              ].hiddenChildSlugs.filter((e: string) => e !== _slug)
            }
          }
        }

        setDeleted(pagesDetails[_slug].childSlugs, _slug)
      }
    }

    setDeleted([slug], parentSlug)
  },

  [cmsActions.updatePageField.type]: (
    state,
    action: PayloadAction<UpdatePageFieldActionPayload>
  ) => {
    const {slug, fieldDetails, workingDataLayer} = action.payload

    const editingPageFields = state.pages?.[slug]?.fields || {}
    const workingPageFields = workingDataLayer.pages[slug]?.fields || {}

    const editingField =
      editingPageFields[fieldDetails.fieldName] ||
      ({
        _type: fieldDetails._type
      } as Field)
    const workingField = workingPageFields[fieldDetails.fieldName]

    if (
      editingField?._type === 'BlocksField' &&
      fieldDetails._type === 'BlocksField'
    ) {
      if (workingField?._type === 'BlocksField') {
        const blockContent =
          workingField.blocks?.[fieldDetails.blockPosition]?.fields?.[
            fieldDetails.blockFieldName
          ]

        if (blockContent === fieldDetails.block) {
          delete workingField.blocks?.[fieldDetails.blockPosition]?.fields?.[
            fieldDetails.blockFieldName
          ]
          return
        }
      }

      state.pages = {
        ...state.pages,
        [slug]: {
          ...state.pages?.[slug],
          fields: {
            ...editingPageFields,
            [fieldDetails.fieldName]: {
              ...editingField,
              blocks: {
                ...editingField.blocks,
                [fieldDetails.blockPosition]: {
                  ...editingField.blocks?.[fieldDetails.blockPosition],
                  fields: {
                    ...editingField.blocks?.[fieldDetails.blockPosition]
                      ?.fields,
                    [fieldDetails.blockFieldName]: fieldDetails.block
                  }
                }
              }
            }
          }
        }
      }
    } else if (editingField?._type === 'PlainField') {
      if (workingField?._type === 'PlainField') {
        if (workingField.content === fieldDetails.block) {
          delete editingPageFields[fieldDetails.fieldName]
          return
        }
      }

      state.pages = {
        ...state.pages,
        [slug]: {
          ...state.pages?.[slug],
          fields: {
            ...editingPageFields,
            [fieldDetails.fieldName]: {
              ...editingField,
              content: fieldDetails.block
            }
          }
        }
      }
    }
  },

  [cmsActions.setHiddenChildSlugs.type]: (state, action) => {
    const {page, hiddenChildSlugs} = action.payload

    const slug = page.slug

    state.pages = {
      ...state.pages,
      [slug]: {
        ...state.pages?.[slug],
        hiddenChildSlugs
      }
    }
  },

  [cmsActions.publish.fulfilled.type]: (_state, _action) => initialState,
  [cmsActions.discardEditing.type]: (_state, _action) => initialState,

  [cmsActions.overrideWDL.fulfilled.type]: (state, action) => {
    const {dataLayer} = action.payload

    const {working, editing} = dataLayer as DataLayer

    // merge editing pages child slugs with new workingLayer pages child slugs
    for (const [slug, page] of Object.entries(working.pages)) {
      if (editing.pages?.[slug]) {
        const childSlugs = union(
          state.pages?.[slug]?.details?.childSlugs,
          page.details?.childSlugs
        )

        const hiddenChildSlugs = union(
          state.pages?.[slug]?.details?.hiddenChildSlugs,
          page.details?.hiddenChildSlugs
        )

        if (!state.pages?.[slug]?.details) {
          state.pages = {
            ...state.pages,
            [slug]: {
              ...page,
              details: {
                childSlugs,
                hiddenChildSlugs
              }
            }
          }
        }

        state.pages = {
          ...state.pages,
          [slug]: {
            ...state.pages[slug],
            details: {
              ...state.pages[slug]?.details,
              childSlugs,
              hiddenChildSlugs
            }
          }
        }
      }
    }
  },

  [cmsActions.addFile.fulfilled.type]: (state, action) => {
    const {url, fileMeta, combinedFiles} = action.payload

    state.files = {
      ...state.files,
      [getNextIndexedObjectKey(combinedFiles)]: {url, meta: fileMeta}
    }
  },
  [cmsActions.removeFile.type]: (state, action) => {
    const index = action.payload

    state.files = {
      ...state.files,
      [index]: {
        ...state.files?.[index],
        meta: {
          ...state.files?.[index]?.meta,
          deleted: true
        }
      }
    }
  },
  [cmsActions.updateFile.type]: (state, action) => {
    const {index, meta, combinedFiles} = action.payload

    state.files = {
      ...state.files,
      [index]: {
        ...state.files?.[index],
        meta: {
          ...state.files?.[index]?.meta,
          ...diff(meta, combinedFiles[index]?.meta)
        }
      }
    }
  }
})

export default editingReducer
