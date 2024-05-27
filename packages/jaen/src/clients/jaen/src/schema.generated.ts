// @ts-ignore

import {proxy, arrayProxy, fnProxy, fnArrayProxy, t} from 'snek-query'

export type PublishConfigInput = {
  repository: t.String
  repositoryCwd?: t.String
}

export class Query {
  __typename: t.String
  version: t.String
  constructor() {
    this.__typename = ''
    this.version = ''
  }
}
export class Mutation {
  __typename: t.String
  publish: (args: {
    migrationURL: t.String
    config: PublishConfigInput
  }) => PublishEvent
  constructor() {
    this.__typename = ''
    this.publish = fnProxy(PublishEvent)
  }
}
export class PublishEvent {
  __typename: t.String
  publishedDate: t.Date
  repositoryPath: t.String
  constructor() {
    this.__typename = ''
    this.publishedDate = ''
    this.repositoryPath = ''
  }
}
