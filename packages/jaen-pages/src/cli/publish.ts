import {merge} from '@src/common/utils'
import {
  JaenPages,
  JaenPagesEntity,
  JaenPagesEntityWithMigrations,
  JaenPagesPublish
} from '@src/types'
import * as fs from 'fs'
import update from 'immutability-helper'
import 'isomorphic-fetch'
import * as path from 'path'

export const mergeBaseWithMigration = async (
  baseData: JaenPages,
  migration: JaenPagesPublish
) => {
  const updateEntity = async (
    baseEntity: JaenPagesEntityWithMigrations | undefined,
    migrationEntity: JaenPagesEntity
  ) => {
    const {upload} = await import('../storage') // do not change the import path
    const migrationContext = migrationEntity.context

    // check if baseEntity is not a empty object

    if (!baseEntity?.context) {
      return {context: migrationContext, migrations: [migrationContext]}
    } else {
      const baseData = await (await fetch(baseEntity.context.fileUrl)).json()
      const migrationData = await (await fetch(migrationContext.fileUrl)).json()

      //   console.log('fetch done', typeof baseData, typeof migrationData)

      const mergedData = merge(baseData, migrationData) as object
      const fileUrl = await upload(mergedData)

      const context = {
        createdAt: migrationContext.createdAt,
        fileUrl
      }

      return update(baseEntity, {
        context: {$set: context},
        migrations: {$push: [migrationContext]}
      })
    }
  }

  //> merge site
  if (migration.site) {
    baseData.site = await updateEntity(baseData.site, migration.site)
  }

  //> merge snekFinder
  if (migration.snekFinder) {
    baseData.snekFinder = await updateEntity(
      baseData.snekFinder,
      migration.snekFinder
    )
  }

  //> merge pages
  if (migration.pages) {
    for (const id of Object.keys(migration.pages)) {
      baseData.pages[id] = await updateEntity(
        baseData.pages[id],
        migration.pages[id]
      )
    }
  }

  return baseData
}

const siteMetadataPath = path.resolve('./site-metadata.json')
const jaenPagesPath = path.resolve('./jaen-pages.json')

export const runMigration = async (migrationUrl: string) => {
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

  const siteFileUrl =
    fileContent.site &&
    fileContent.site.context &&
    fileContent.site.context.fileUrl

  if (siteFileUrl) {
    const siteFile = await (await fetch(siteFileUrl)).json()
    return siteFile
  }
}
