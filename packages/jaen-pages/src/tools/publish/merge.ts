import update from 'immutability-helper'

import {merge} from '../../common/utils'
import {upload} from '../../ipfs'
import {
  JaenPages,
  JaenPagesEntity,
  JaenPagesEntityWithMigrations,
  JaenPagesPublish
} from '../../types'

export const mergeBaseWithMigration = async (
  baseData: JaenPages,
  migration: JaenPagesPublish
) => {
  const updateEntity = async (
    baseEntity: JaenPagesEntityWithMigrations | undefined,
    migrationEntity: JaenPagesEntity
  ) => {
    const migrationContext = migrationEntity.context

    if (!baseEntity) {
      return {context: migrationContext, migrations: [migrationContext]}
    } else {
      const baseData = await (await fetch(baseEntity.context.fileUrl)).json()
      const migrationData = await (await fetch(migrationContext.fileUrl)).json()

      //   console.log('fetch done', typeof baseData, typeof migrationData)

      const mergedData = merge(baseData, migrationData)
      const fileUrl = await upload(JSON.stringify(mergedData))

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
