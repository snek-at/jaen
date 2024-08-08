import {makeSnekQuery} from 'snek-query'
import {Query, Mutation} from './schema.generated'

const apiURL = process.env.GATSBY_LENS_API_URL

if (!apiURL) {
  throw new Error('GATSBY_LENS_API_URL is not set')
}

export const sq = makeSnekQuery(
  {Query, Mutation},
  {
    apiURL
  }
)
