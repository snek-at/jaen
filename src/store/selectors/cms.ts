import {createDraftSafeSelector} from '@reduxjs/toolkit'
import deepmerge from 'deepmerge'

import {Selector} from '.'
import {PageIndex} from '../types'

const workingDLIndexSelector: Selector<PageIndex | undefined> = state =>
  state.cms.dataLayer.working.index

const editingDLIndexSelector: Selector<PageIndex | undefined> = state =>
  state.cms.dataLayer.editing.index

export const indexSelector = createDraftSafeSelector(
  workingDLIndexSelector,
  editingDLIndexSelector,
  (workingLayer, editingLayer) =>
    deepmerge(workingLayer || {}, editingLayer || {})
)
