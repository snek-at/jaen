import type {PageProps as GatsbyPageProps} from 'gatsby'
import type {IGatsbyImageData} from 'gatsby-plugin-image'
import type * as FaIcons from 'react-icons/fa'

import {IBlockConnection} from './connectors/connect-block'

export interface PageConfig {
  label: string
  icon?: keyof typeof FaIcons

  childTemplates?: string[]

  breadcrumbs?: Array<{
    label: string
    path: string
  }>

  withoutJaenFrame?: boolean
  withoutJaenFrameStickyHeader?: boolean

  menu?: {
    label?: string
    group?: string
    groupLabel?: string
    order?: number
    type?: 'app' | 'user'
  }

  // auth
  auth?: {
    isRequired?: boolean
    isAdminRequired?: boolean
    // permissions?: string[]
  }

  layout?: {
    name: 'jaen'
    // default: 'content'
    type?: 'content' | 'form' | 'full'
  }
}

interface PageContext {
  pageConfig?: PageConfig
  jaenPageId?: string
}

export interface LayoutProps {
  pageProps: PageProps<
    {
      jaenPage?: JaenPage
      allJaenPage?: {
        nodes: Array<JaenPage>
      }
    },
    PageContext
  >

  children: React.ReactNode
}

export interface MediaNode {
  id: string
  fileUniqueId: string
  createdAt: string
  modifiedAt: string
  preview?: {
    url: string
  }
  url: string
  description?: string
  width: number
  height: number
  revisions?: Array<Omit<MediaNode, 'revisions'>>
  jaenPageId?: string
}

export interface IWidget {
  nodes: Array<{
    name: string
    data: any
  }>
}

export interface SiteMetadata {
  title?: string
  description?: string
  siteUrl?: string
  image?: string
  author?: {
    name?: string
  }
  organization: {
    name?: string
    url?: string
    logo?: string
  }
  social?: {
    twitter?: string // twitter username
    fbAppID?: string // FB ANALYTICS
  }
}

export interface ISite {
  siteMetadata: Partial<SiteMetadata>
}

export interface JaenTemplate {
  id: string
  label: string
  childTemplates: Array<JaenTemplate>
}

export interface IJaenView {
  path: string
  label: string
  Icon: React.ComponentType | null
  Component: React.ComponentType
  group?: string
  hasRoutes?: boolean
}

export type IJaenFields = Record<
  string,
  Record<
    string,
    {
      position?: number
      props?: Record<string, any>
      value: any
    }
  >
> | null

export interface JaenPage {
  id: string
  slug: string
  path?: string
  createdAt: string
  modifiedAt: string
  jaenPageMetadata: Partial<{
    title: string
    image: string
    description: string

    blogPost?: {
      date?: string
      author?: string
      category?: string
    }
  }>
  jaenFields: IJaenFields
  mediaNodes: Array<{
    id: string
    description: string
    node: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }>
  parentPage: {
    id: string
  } | null
  childPages: Array<{id: string} & Partial<JaenPage>>
  sections: IJaenSection[]
  [customFieldName: string]: any

  /**
   * Unique identifier of the page component name (e.g. `JaenPageHome`).
   * - Must be unique across all pages.
   * - Used to determine the component to render.
   */
  template: string | null
  childTemplates: string[]
  /**
   * Path to the component to render.
   *
   * When `component` is null, the `template` is used to determine the component to render.
   */
  component: string | null
  deleted?: boolean
  excludedFromIndex?: boolean
}

export interface IJaenSection {
  fieldName: string
  items: IJaenBlock[]
  ptrHead: string | null
  ptrTail: string | null
  position?: number
  props?: object
}

export interface SectionType {
  id: string
  /**
   * Position of the section inside its SectionField
   */
  position: number
  path: Array<{
    fieldName: string
    sectionId?: string
  }>
  Component?: IBlockConnection
}

export interface IJaenBlock {
  [customFieldName: string]: any
  id: string
  type: string
  ptrPrev: string | null
  ptrNext: string | null
  jaenFields: IJaenFields

  sections?: IJaenSection[]

  deleted?: true
}

export interface IJaenPopup {
  id: string // relative path to the notification file
  active: boolean
  jaenFields: IJaenFields
}

export interface IJaenConnection<ReactProps, Options>
  extends React.FC<ReactProps> {
  options: Options
}

export type PageProps<
  DataType = object,
  PageContextType = object
> = GatsbyPageProps<
  DataType & {
    jaenPage: JaenPage | null
    allJaenPage?: {nodes: Array<Partial<JaenPage>>}
  },
  PageContextType & PageContext
>

export interface IFormProps<Values> {
  values: Values
  onSubmit: (values: Values) => void
  externalValidation?: (
    valueName: keyof Values,
    value: string
  ) => string | undefined
}

export type MigrationData = Record<string, any>
