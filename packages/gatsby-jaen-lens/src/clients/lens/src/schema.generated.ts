import {proxy, arrayProxy, fnProxy, fnArrayProxy, t} from 'snek-query'

export type MetaInput = {
  label?: t.String
  icon?: t.String
}

export class Query {
  __typename: t.String
  allService: LensService[]
  version: t.String
  constructor() {
    this.__typename = ''
    this.allService = arrayProxy(LensService)
    this.version = ''
  }
}
export class LensService {
  __typename: t.String
  id: t.String
  meta: t.Nullable<Meta>
  fqdn: t.String
  host: t.String
  port: t.NotSupportedYet
  isSecure: t.Boolean
  constructor() {
    this.__typename = ''
    this.id = ''
    this.meta = proxy(Meta)
    this.fqdn = ''
    this.host = ''
    this.port = null
    this.isSecure = false
  }
}
export class Meta {
  __typename: t.String
  label: t.Nullable<t.String>
  icon: t.Nullable<t.String>
  constructor() {
    this.__typename = ''
    this.label = null
    this.icon = null
  }
}
export class Mutation {
  __typename: t.String
  serviceMetaUpdate: (args: {id: t.String; meta?: MetaInput}) => LensService[]
  constructor() {
    this.__typename = ''
    this.serviceMetaUpdate = fnArrayProxy(LensService)
  }
}
