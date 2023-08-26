import {JaenPage, JaenSite} from '@atsnek/jaen'
import deepmerge from 'deepmerge'
import fs from 'fs/promises' // Import the fs module for asynchronous file operations
import {SourceNodesArgs} from 'gatsby'

import {fetchWithCache} from '../utils/fetch-with-cache'

export type JaenData = {
  pages?: JaenPage[]
  site?: JaenSite
  patches?: any
}

export const sourceNodes = async (args: SourceNodesArgs) => {
  const {actions, createNodeId, createContentDigest, reporter, cache} = args
  const {createNode} = actions

  // Log a message using the reporter
  reporter.info('Fetching and sourcing nodes...')

  try {
    // 1. Read data from ./jaen-data/patches.txt
    const buffer = await fs.readFile(`${process.cwd()}/jaen-data/patches.txt`)

    // 2. Parse data from ./jaen-data/patches.txt (1 link per line)
    const data = buffer.toString().split('\n')

    let jaenData = {
      patches: []
    } as JaenData

    for (const link of data) {
      // skip empty lines
      if (link === '') {
        continue
      }

      const response = await fetchWithCache<{
        createdAt: Date
        message: string
        data: JaenData
      }>(link, {cache})

      jaenData.patches.push({
        createdAt: response.createdAt || new Date().toISOString(),
        title: response.message,
        url: link
      })

      if (response) {
        jaenData = deepmerge(jaenData, response.data)
      }
    }

    // 3. Create JaenData node
    const jaenDataNode = {
      id: createNodeId('JaenData'),
      internal: {
        type: 'JaenData',
        contentDigest: createContentDigest(jaenData)
      },
      ...jaenData
    }

    // 4. Create JaenData node using createNode action
    await createNode(jaenDataNode)

    // Log a success message using the reporter
    reporter.info('Nodes sourced and created successfully!')
  } catch (error) {
    // Log an error message using the reporter
    reporter.panic('Error sourcing nodes:', error)
  }
}