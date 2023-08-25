import {CreatePagesArgs} from 'gatsby'

import {onCreatePage} from '../on-create-page/jaen-page'
import {readPageConfig} from '../utils/page-config-reader'
import {generatePageOriginPath} from '../utils/path'

export const createPages = async (args: CreatePagesArgs) => {
  const {actions, graphql, reporter} = args

  reporter.info('Creating pages...')

  const result = await graphql<{
    allJaenTemplate: {
      nodes: Array<{
        id: string
        absolutePath: string
        relativePath: string
      }>
    }
    allJaenPage: {
      nodes: Array<{
        id: string
        template: string | null
        slug: string
        parentPage: {
          id: string
        } | null
      }>
    }
  }>(`
    query {
      allJaenTemplate {
        nodes {
          id
          absolutePath
          relativePath
        }
      }
      allJaenPage {
        nodes {
          id
          template
          slug
          parentPage {
            id
          }
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query. ${result.errors}`)

    return
  }

  const {allJaenTemplate, allJaenPage} = result.data

  for (const node of allJaenPage.nodes) {
    const pagePath = generatePageOriginPath(allJaenPage.nodes, node)

    if (node.template) {
      if (!pagePath) {
        reporter.panicOnBuild(`Error while generating path for page ${node.id}`)
        return
      }

      const jaenTemplate = allJaenTemplate.nodes.find(
        template => template.id === node.template
      )

      if (!jaenTemplate) {
        reporter.panicOnBuild(`Template ${node.template} not found`)
        return
      }

      const pageConfig = readPageConfig(jaenTemplate.absolutePath)

      const page = {
        path: pagePath,
        component: jaenTemplate.absolutePath,
        context: {
          jaenPageId: node.id,
          pageConfig
        }
      }

      actions.createPage(page)

      await onCreatePage({
        page,
        ...args
      })
    }
  }
}
