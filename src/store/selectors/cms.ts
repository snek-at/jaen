/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createSelector} from '@reduxjs/toolkit'
import deepmerge from 'deepmerge'
import {ConnectedPageType} from '~/contexts'
import {buildPageTree} from '~/utils/pageTree'

import {Selector} from '.'
import {store} from '..'
import {
  RootState,
  CMSState,
  PageDetails,
  PageFieldBlocks,
  EditingPageDetails,
  EditingDataLayerPages,
  PagesDetails,
  WorkingDataLayerPages
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
  (wPages, ePages) => {
    const merged = deepmerge(wPages || {}, ePages || {}, {
      arrayMerge: (_target, source, _options) => source
    })

    const cleaned = Object.fromEntries(
      Object.entries(merged).filter(([_slug, page]) => !page.details.deleted)
    ) as WorkingDataLayerPages

    return cleaned
  }
)

const dataLayer: Selector<CMSState['dataLayer'] | undefined> = state =>
  state.cms.dataLayer

export const combinedDLSelector = createSelector(dataLayer, layer =>
  deepmerge(layer?.working || {}, layer?.editing || {})
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
    (wBlocks, eBlocks) => {
      const blocks = deepmerge(wBlocks || {}, eBlocks || {})

      return blocks
    }
  )
