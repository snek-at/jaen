import {JaenPage, IJaenPopup, ISite, Widget} from '../types'

export interface IError {
  code: string
  message: string
  details?: any
}

export interface IPageState {
  pages: {
    lastAddedNodeId?: string
    registeredPageFields: Record<string, number>
    nodes: Record<string, Partial<JaenPage>>
  }
  routing: {
    dynamicPaths: Record<
      string,
      {
        pageId: string
        templateName: string
      }
    >
  }
}

export interface IStatusState {
  isPublishing: boolean
  isEditing: boolean
}

export interface IPopupState {
  nodes: Record<string, IJaenPopup>
  advanced: Record<
    string,
    {
      pageViews: number
    }
  >
}

export interface IJaenSiteState {
  siteMetadata: ISite['siteMetadata']
}

export interface IWidgetState {
  nodes: Array<Widget>
}

export interface IJaenState {
  site: IJaenSiteState
  page: IPageState
  status: IStatusState
  popup: IPopupState
  widget: IWidgetState
}
