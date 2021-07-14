/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createSelector} from '@reduxjs/toolkit'
import deepmerge from 'deepmerge'
import {ConnectedPageType} from '~/contexts'

import {merge, RecursivePartial} from '~/common/utils'

import {buildPageTree} from '~/utils/pageTree'

import {RootState, store} from '..'
import {ContentBlocks, TextBlock} from '../types/cms/blocks'
import {
  BaseDataLayer,
  BlocksField,
  BlocksFieldBlocks,
  DataLayerFiles,
  EditingDataLayerPages,
  PageDetails,
  PagesDetails,
  PlainField,
  WorkingDataLayer,
  WorkingDataLayerPages
} from '../types/cms/dataLayer'

export const rootPageSlugSelector = createSelector<
  RootState,
  string,
  string | undefined,
  string
>(
  state => state.cms.dataLayer.working.rootPageSlug,
  state => state.cms.dataLayer.editing?.rootPageSlug,
  (wSlug, eSlug) => eSlug || wSlug
)

export const pageDetailsSelector = (slug: string) =>
  createSelector<
    RootState,
    PageDetails,
    RecursivePartial<PageDetails> | undefined,
    PageDetails
  >(
    state => state.cms.dataLayer.working.pages[slug]?.details,
    state => state.cms.dataLayer.editing.pages?.[slug]?.details,
    (wDetails, eDetails) =>
      deepmerge(wDetails || {}, eDetails || {}, {
        arrayMerge: (_target, source, _options) => source
      }) as PageDetails
  )

export const pagesSelector = createSelector<
  RootState,
  WorkingDataLayerPages,
  EditingDataLayerPages,
  WorkingDataLayerPages
>(
  state => state.cms.dataLayer.working.pages,
  state => state.cms.dataLayer.editing.pages,
  (wPages, ePages) =>
    merge(wPages || {}, ePages || {}, value => value.details?.deleted)
)

export const pageTreeSelector = (registeredPages: ConnectedPageType[]) =>
  createSelector(
    rootPageSlugSelector,
    pagesSelector,
    (rootPageSlug, dataLayerPages) => {
      const pagesDetails = Object.fromEntries(
        Object.entries(dataLayerPages).map(([slug, page]) => [
          slug,
          page.details
        ])
      ) as PagesDetails

      return buildPageTree(pagesDetails, rootPageSlug, registeredPages)
    }
  )

export const pageFieldTextSelector = (
  slug: string,
  fieldName: string,
  block?: {typeName: string; position: number; blockFieldName: string}
) =>
  createSelector<RootState, string | undefined, string | undefined>(
    state =>
      block
        ? (
            (
              state.cms.dataLayer.working.pages?.[slug]?.fields?.[fieldName] as
                | BlocksField
                | undefined
            )?.blocks?.[block.position]?.fields?.[block.blockFieldName] as
              | TextBlock
              | undefined
          )?.text
        : (
            (
              state.cms.dataLayer.working.pages?.[slug]?.fields?.[fieldName] as
                | PlainField
                | undefined
            )?.content as TextBlock | undefined
          )?.text,
    text => {
      const editingField =
        store.getState().cms.dataLayer.editing.pages?.[slug]?.fields?.[
          fieldName
        ]

      if (editingField?._type === 'PlainField') {
        if (editingField.content?._type === 'TextBlock') {
          return editingField.content.text || text
        }
      } else if (editingField?._type === 'BlocksField' && block) {
        const blockField =
          editingField?.blocks?.[block.position]?.fields?.[block.blockFieldName]

        if (blockField?._type === 'TextBlock') {
          return blockField.text || text
        }
      }

      return text
    }
  )

export const pageFieldContentSelector = (
  slug: string,
  fieldName: string,
  block?: {typeName: string; position: number; blockFieldName: string}
) =>
  createSelector<
    RootState,
    ContentBlocks | undefined,
    RecursivePartial<ContentBlocks> | undefined
  >(
    state =>
      block
        ? (
            state.cms.dataLayer.working.pages?.[slug].fields?.[fieldName] as
              | BlocksField
              | undefined
          )?.blocks?.[block.position]?.fields?.[block.blockFieldName]
        : (
            state.cms.dataLayer.working.pages?.[slug].fields?.[fieldName] as
              | PlainField
              | undefined
          )?.content,
    field => {
      const editingField =
        store.getState().cms.dataLayer.editing.pages?.[slug]?.fields?.[
          fieldName
        ]

      if (editingField) {
        if (editingField._type === 'PlainField') {
          return editingField.content
        }

        if (editingField._type === 'BlocksField' && block) {
          const blockField =
            editingField?.blocks?.[block.position]?.fields?.[
              block.blockFieldName
            ]

          return blockField || field
        }
      }

      return field
    }
  )

export const pageFieldBlocksSelector = (slug: string, fieldName: string) =>
  createSelector<
    RootState,
    BlocksFieldBlocks | undefined,
    BlocksFieldBlocks | undefined,
    BlocksFieldBlocks
  >(
    state =>
      (
        state.cms.dataLayer.working.pages?.[slug]?.fields?.[fieldName] as
          | BlocksField
          | undefined
      )?.blocks,
    state =>
      (
        state.cms.dataLayer.editing.pages?.[slug]?.fields?.[fieldName] as
          | BlocksField
          | undefined
      )?.blocks,
    (wBlocks, eBlocks) =>
      merge(wBlocks || {}, eBlocks || {}, value => value.deleted)
  )

export const filesSelector = createSelector<
  RootState,
  DataLayerFiles | undefined,
  RecursivePartial<DataLayerFiles> | undefined,
  DataLayerFiles
>(
  state => state.cms.dataLayer.working.crypt.clear?.files,
  state => state.cms.dataLayer.editing.files,
  (wFiles, eFiles) => {
    const merged = merge(
      wFiles || {},
      eFiles || {},
      value => value.meta?.deleted
    )

    return merged
  }
)

export const fileSelector = (index: string) =>
  createSelector([filesSelector], files => {
    return files[index]
  })

export const workingDLSelector = createSelector<
  RootState,
  WorkingDataLayer,
  BaseDataLayer
>(
  state => state.cms.dataLayer.working,
  workingLayer => {
    const {rootPageSlug, pages, crypt} = workingLayer

    const layer = {rootPageSlug, pages, files: crypt?.clear?.files || {}}

    return layer
  }
)

export const combinedDLSelector = createSelector(
  [rootPageSlugSelector, pagesSelector, filesSelector],
  (rootPageSlug, pages, files) => {
    return {rootPageSlug, pages, files}
  }
)
