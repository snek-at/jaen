import {createSelector} from '@reduxjs/toolkit'
import deepmerge from 'deepmerge'
import union from 'lodash/union'

import {Selector} from '.'
import {CMSState, PageIndex} from '../types'

const workingDLIndex: Selector<PageIndex | undefined> = state =>
  state.cms.dataLayer.working.index

const editingDLIndex: Selector<PageIndex | undefined> = state =>
  state.cms.dataLayer.editing.index

export const indexSelector = createSelector(
  workingDLIndex,
  editingDLIndex,
  (wIndex, eIndex) => deepmerge(wIndex || {}, eIndex || {})
)

const dataLayer: Selector<CMSState['dataLayer'] | undefined> = state =>
  state.cms.dataLayer

export const combinedDLSelector = createSelector(dataLayer, layer =>
  deepmerge(layer?.working || {}, layer?.editing || {}, {
    arrayMerge: (destinationArray, sourceArray, _options) =>
      union(destinationArray, sourceArray)
  })
)

export const pagesSelector = createSelector(combinedDLSelector, layer => {
  const pages = Object.fromEntries(
    Object.entries(layer.pages).filter(([_slug, page]: any) => !page.deleted)
  )

  return pages
})
