import {GatsbyNode} from 'gatsby'

import {sourceNodes as sourceNodesJaenData} from './source-nodes/jaen-data'
import {sourceNodes as sourceNodesJaenPages} from './source-nodes/jaen-pages'
import {createPages as createPagesJaenPages} from './create-pages/jaen-pages'
import {sourceNodes as sourceNodesJaenSite} from './source-nodes/jaen-site'

import {onCreatePage as onCreatePageJaenPage} from './on-create-page/jaen-page'
import {onCreateNode as onCreateNodeJaenPage} from './on-create-node/jaen-page'
import {onCreateNode as onCreateNodeJaenTemplate} from './on-create-node/jaen-template'

import {shouldOnCreateNode as shouldOnCreateNodeJaenPage} from './should-on-create-node/jaen-page'
import {shouldOnCreateNode as shouldOnCreateNodeJaenTemplate} from './should-on-create-node/jaen-template'

import {createSchemaCustomization as createSchemaCustomizationJaenPage} from './create-schema-customization/jaen-page'
import {createSchemaCustomization as createSchemaCustomizationJaenTemplate} from './create-schema-customization/jaen-template'
import {createSchemaCustomization as createSchemaCustomizationJaenData} from './create-schema-customization/jaen-data'
import {createSchemaCustomization as createSchemaCustomizationJaenSite} from './create-schema-customization/jaen-site'

import {onCreateWebpackConfig as onCreateWebpackConfigJaenTemplate} from './on-create-webpack-config/jaen-template'

export const sourceNodes: GatsbyNode['sourceNodes'] = async args => {
  await sourceNodesJaenData(args)

  // Must be called after sourceJaenNodes
  await sourceNodesJaenPages(args)
  await sourceNodesJaenSite(args)
}

export const createPages: GatsbyNode['createPages'] = async args => {
  await createPagesJaenPages(args)
}

export const onCreatePage: GatsbyNode['onCreatePage'] = async args => {
  await onCreatePageJaenPage(args)
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async args => {
  await onCreateNodeJaenPage(args)
  await onCreateNodeJaenTemplate(args)
}

export const shouldOnCreateNode: GatsbyNode['shouldOnCreateNode'] = args => {
  // Return true if any of the plugins should create a node
  return [
    shouldOnCreateNodeJaenPage(args),
    shouldOnCreateNodeJaenTemplate(args)
  ].some(Boolean)
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  async args => {
    await Promise.all([
      createSchemaCustomizationJaenPage(args),
      createSchemaCustomizationJaenTemplate(args),
      createSchemaCustomizationJaenData(args),
      createSchemaCustomizationJaenSite(args)
    ])
  }

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] =
  async args => {
    await onCreateWebpackConfigJaenTemplate(args)
  }
