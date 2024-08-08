import {makeSnekQuery} from 'snek-query'
import {User} from 'oidc-client-ts'
import '@atsnek/jaen/dist/types'

import {Query, Mutation} from './schema.generated'

const apiURL =
  __JAEN_MAILPRESS_PYLON_URL__ || 'https://mailpress.cronit.io/graphql'

export const sq = makeSnekQuery(
  {Query, Mutation},
  {
    apiURL,
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
