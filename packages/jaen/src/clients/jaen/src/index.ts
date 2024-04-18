import {makeSnekQuery} from 'snek-query'
import {User} from 'oidc-client-ts'

import {Query, Mutation} from './schema.generated.js'

const apiURL = __JAEN_PYLON_URL__ || 'https://jaen-pylon.cronit.io/graphql'

export const sqJaen = makeSnekQuery(
  {Query, Mutation},
  {
    apiURL: apiURL,
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
