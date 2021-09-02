import * as fs from 'fs'
import 'isomorphic-fetch'
import * as path from 'path'

import {merge} from '../../common/utils'
import {mergeBaseWithMigration} from './merge'

const siteMetadataPath = path.resolve('./site-metadata.json')
const jaenPagesPath = path.resolve('./jaen-pages.json')

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
}

export const getSiteData = async () => {
  const fileContent = JSON.parse(fs.readFileSync(jaenPagesPath, 'utf8'))

  const siteFileUrl = fileContent.site?.context?.fileUrl

  if (siteFileUrl) {
    const siteFile = await (await fetch(siteFileUrl)).json()
    return siteFile
  }
}
