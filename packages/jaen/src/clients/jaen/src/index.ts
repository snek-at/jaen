import {makeSnekQuery} from 'snek-query'
import {User} from 'oidc-client-ts'

import {Query, Mutation} from './schema.generated.js'

export const sqJaen = makeSnekQuery(
  {Query, Mutation},
  {
    apiURL: 'https://services.netsnek.com/jaen/graphql',
    middlewares: [
      ({context}) => {
        const oidcStorage = sessionStorage.getItem(
          `oidc.user:https://access.netsnek.com:${__JAEN_ZITADEL__.clientId}`
        )

        if (oidcStorage) {
          const user = User.fromStorageString(oidcStorage)

          context.headers['Authorization'] = `Bearer ${user.access_token}`
        }
      }
    ]
  }
)
