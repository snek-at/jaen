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

import {merge} from '~/common/utils'

import {buildPageTree} from '~/utils/pageTree'

import {store} from '..'
import {
  RootState,
  PageDetails,
  PageFieldBlocks,
  EditingPageDetails,
  EditingDataLayerPages,
  PagesDetails,
  WorkingDataLayerPages,
  DataLayerFiles
} from '../types'

export const rootPageSlugSelector = createSelector<
  RootState,
  string,
  string,
  string
>(
  state => state.cms.dataLayer.working.rootPageSlug,
  state => state.cms.dataLayer.editing.rootPageSlug,
  (wSlug, eSlug) => eSlug || wSlug
)

export const pageDetailsSelector = (slug: string) =>
  createSelector<RootState, PageDetails, EditingPageDetails, PageDetails>(
    state => state.cms.dataLayer.working.pages[slug]?.details,
    state => state.cms.dataLayer.editing.pages[slug]?.details,
    (wDetails, eDetails) =>
      deepmerge(wDetails || {}, eDetails || {}, {
        arrayMerge: (_target, source, _options) => source
      })
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

export const pageFieldContentSelector = (
  slug: string,
  fieldName: string,
  block?: {typeName: string; position: number; blockFieldName: string}
) =>
  createSelector<RootState, string | undefined, string | undefined>(
    state =>
      block
        ? state.cms.dataLayer.working.pages?.[slug]?.fields?.[fieldName]
            ?.blocks?.[block.position]?.fields?.[block.blockFieldName]
        : state.cms.dataLayer.working.pages?.[slug]?.fields?.[fieldName]
            ?.content,
    content => {
      const editingField =
        store.getState().cms.dataLayer.editing.pages[slug]?.fields?.[fieldName]

      const eContent = block
        ? editingField?.blocks?.[block.position]?.fields?.[block.blockFieldName]
        : editingField?.content

      return eContent || content
    }
  )

export const pageFieldBlocksSelector = (slug: string, fieldName: string) =>
  createSelector<RootState, PageFieldBlocks, PageFieldBlocks, PageFieldBlocks>(
    state =>
      state.cms.dataLayer.working.pages?.[slug]?.fields?.[fieldName]?.blocks,
    state =>
      state.cms.dataLayer.editing.pages?.[slug]?.fields?.[fieldName]?.blocks,
    (wBlocks, eBlocks) =>
      merge(wBlocks || {}, eBlocks || {}, value => value.deleted)
  )

export const filesSelector = createSelector<
  RootState,
  DataLayerFiles,
  DataLayerFiles,
  DataLayerFiles
>(
  state => state.cms.dataLayer.working.files,
  state => state.cms.dataLayer.editing.files,
  (wFiles, eFiles) => {
    const merged = merge(wFiles, eFiles, value => value.meta?.deleted)

    return merged
  }
)

export const combinedDLSelector = createSelector(
  [rootPageSlugSelector, pagesSelector, filesSelector],
  (rootPageSlug, pages, files) => {
    return {rootPageSlug, pages, files}
  }
)
