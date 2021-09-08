import {IGatsbyImageData} from 'gatsby-plugin-image'
import React from 'react'

export type JaenTemplate = React.FC & {TemplateName: string}

export type StreamBlockIdentifier = {
  fieldName: string
  block?: {typeName: string; position: number}
}

export type FieldIdentifier = {
  initValue: any
  fieldName: string
  block?: {typeName: string; position: number; blockFieldName: string}
}

export type TextBlock = {
  _type: 'TextBlock'
  text: string
}

export type ImageBlock = {
  _type: 'ImageBlock'
  src: string
  title: string
  alt: string
}

export type ChoiceBlock = {
  _type: 'ChoiceBlock'
  option: string
}

export type ContentBlocks = TextBlock | ImageBlock | ChoiceBlock

type BlocksFieldDetails = {
  _type: 'BlocksField'
  blockFieldName: string
  blockPosition: number
}

type PlainFieldDetails = {
  _type: 'PlainField'
}

export type FieldUpdateDetails = (BlocksFieldDetails | PlainFieldDetails) & {
  fieldName: string
  block: ContentBlocks
}

export type CustomBlock = {
  typeName: string
  fields: {
    [name: string]: ContentBlocks
  }
  deleted?: true
}

export type BlocksField = {
  _type: 'BlocksField'
  blocks: {
    [position: string]: CustomBlock
  }
  deleted?: true
}

export type PlainField = {
  _type: 'PlainField'
  content: ContentBlocks
}

export type Field = PlainField | BlocksField

export type PageMetadata = {
  title: string
  description: string
  image: string
  /**
   * Link rel="canonical" will be used by search engines
   */
  canonical: string
  datePublished?: string
  isBlogPost: boolean
}

type BasePageType = {
  slug: string
  pageMetadata?: PageMetadata
  images: {
    id: {
      fieldName: string
      pageId: string
      block: {
        position: number
        fieldName: string
      } | null
    }
    file: {
      childImageSharp: {gatsbyImageData: IGatsbyImageData}
    }
  }[]
  fields: {
    [fieldName: string]: Field
  }
  title?: string
  path?: string
  /**
   * dynamic: true if the page is a dynamic page (not a static page).
   * Leads to a different template and different routing behaviour.
   *
   * Dynamic is true when:
   *  1. A page is created
   *  2. A page is deleted
   *  3. A page is moved to a different parent or renamed (path change)
   *
   * Dynamic is false when:
   *  1. Field content is changed
   *  2. Page meta data is changed
   *  3. Page children are changed
   */
  dynamic?: true
  /**
   * template: holds the template name for the page.
   * This is null for static pages unhandled by the CMS (except fields).
   */
  template: string | null
  deleted?: true
}

export interface PageType extends BasePageType {
  parent: {
    id: string
  } | null
  children: {id: string}[]
}

export interface ResolvedPageType extends BasePageType {
  parent: {
    page: BasePageType
  } | null
  children: {
    page: BasePageType
  }[]
}

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  image: string
  author: {
    name: string
  }
  organization: {
    name: string
    url: string
    logo: string
  }
  social: {
    twitter: string // twitter username
    fbAppID: string // FB ANALYTICS
  }
}

export interface SitePages {
  rootNodeIds: string[]
  nodes: {
    [id: string]: PageType
  }
}

export type DynamicPaths = {[path: string]: string}

export type ResolveDynamicPaths = (
  id: string,
  sitePages: SitePages
) => {dynamicPaths: DynamicPaths; affectedIds: string[]}

export type ReturnResolveDynamicPaths = ReturnType<ResolveDynamicPaths>

export interface SiteRoutingSpecs {
  dynamicPaths: DynamicPaths
}

export type SiteType = {
  siteMetadata: SiteMetadata
  allSitePage: SitePages
}

export type RemoteFileMigration = {
  createdAt: string
  fileUrl: string
}

export type JaenPagesEntity = {
  context: RemoteFileMigration
}

export interface JaenPagesEntityWithMigrations extends JaenPagesEntity {
  migrations: RemoteFileMigration[]
}

export type JaenPages = {
  site?: JaenPagesEntityWithMigrations
  snekFinder?: JaenPagesEntityWithMigrations
  pages: {
    [id: string]: JaenPagesEntityWithMigrations
  }
}

export interface JaenPagesPublish {
  site?: JaenPagesEntity
  snekFinder?: JaenPagesEntity
  pages: {
    [id: string]: JaenPagesEntity
  }
}

// Site Meta update
// site page structure update
// site page meta update
// site page field update
