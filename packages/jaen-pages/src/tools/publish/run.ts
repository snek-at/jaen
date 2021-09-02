import * as fs from 'fs'
import 'isomorphic-fetch'
import * as path from 'path'

import {merge} from '../../common/utils'
import {mergeBaseWithMigration} from './merge'

const siteMetadataPath = path.resolve('./site-metadata.json')
const jaenPagesPath = path.resolve('./jaen-pages.json')

console.log('Path', jaenPagesPath)

export const runMigration = async () => {
  const migrationUrl = process.env.JAEN_PAGES_NEW_MIGRATION

  if (migrationUrl) {
    // get file content fs
    const fileContent = JSON.parse(fs.readFileSync(jaenPagesPath, 'utf8'))
    const migrationFile = await (await fetch(migrationUrl)).json()
    const newBaseData = await mergeBaseWithMigration(fileContent, migrationFile)

    fs.writeFileSync(jaenPagesPath, JSON.stringify(newBaseData, null, 2))
  }

  const siteMetadata = require(siteMetadataPath)
  const jaenMetadata = await getSiteData()
  const updatedMetadata = merge(siteMetadata, jaenMetadata)

  fs.writeFileSync(siteMetadataPath, JSON.stringify(updatedMetadata, null, 2))

  // regex to find and replace siteMetadata gatsbyConfigContent module.exports

  //console.log('Updated gatsby-config.js', updatedGatsbyConfigContent)

  // write gatsby-config.js
  // fs.writeFileSync(gatsbyConfigPath, updatedGatsbyConfigContent)

  // console.log(merge(gatsbyConfig.siteMetadata, jaenMetadata))

  // update javascript based gatsby config
}

export const getSiteData = async () => {
  const fileContent = JSON.parse(fs.readFileSync(jaenPagesPath, 'utf8'))

  const siteFileUrl = fileContent.site?.context?.fileUrl

  if (siteFileUrl) {
    const siteFile = await (await fetch(siteFileUrl)).json()
    return siteFile
  }
}
