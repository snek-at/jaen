import {makeSnekQuery} from 'snek-query'
import {User} from 'oidc-client-ts'
import 'jaen/dist/types'

import {Query, Mutation} from './schema.generated'

const apiURL = process.env.GATSBY_LENS_API_URL

if (!apiURL) {
  throw new Error('GATSBY_LENS_API_URL is not set')
}

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
