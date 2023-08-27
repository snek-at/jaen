import {proxy, arrayProxy, fnProxy, fnArrayProxy, t} from 'snek-query'

export type LensServiceMetaInput = {
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
  meta: t.Nullable<LensServiceMeta>
  fqdn: t.String
  host: t.String
  port: t.NotSupportedYet
  isSecure: t.Boolean
  constructor() {
    this.__typename = ''
    this.id = ''
    this.meta = proxy(LensServiceMeta)
    this.fqdn = ''
    this.host = ''
    this.port = null
    this.isSecure = false
  }
}
export class LensServiceMeta {
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
  serviceUpdate: (args: {
    id: t.String
    meta: LensServiceMetaInput
  }) => t.Nullable<LensService>
  constructor() {
    this.__typename = ''
    this.serviceUpdate = fnProxy(LensService)
  }
}
