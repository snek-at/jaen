import {makeSnekQuery} from 'snek-query'
import {User} from 'oidc-client-ts'
import '@atsnek/jaen/dist/types'

import {Query, Mutation} from './schema.generated'

export const sq = makeSnekQuery(
  {Query, Mutation},
  {
    apiURL: 'https://mailpress.cronit.io/graphql',
    middlewares: [
      ({context}) => {
        const oidcStorage = sessionStorage.getItem(
          `oidc.user:${__JAEN_ZITADEL__.authority}:${__JAEN_ZITADEL__.clientId}`
        )

        if (oidcStorage) {
          const user = User.fromStorageString(oidcStorage)

          context.headers['Authorization'] = `Bearer ${user.access_token}`
        }
      }
    ]
  }
)
