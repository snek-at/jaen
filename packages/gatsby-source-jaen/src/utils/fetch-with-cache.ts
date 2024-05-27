import {GatsbyCache} from 'gatsby'

export const fetchWithCache = async <T>(
  url: string,
  options?: {
    cache: GatsbyCache
  }
): Promise<T> => {
  const {cache} = options ?? {}

  if (cache) {
    const cachedResponse = await cache.get(url)
    if (cachedResponse) {
      return cachedResponse
    }
  }

  const response = await fetch(url)
  const data = await response.json()

  if (cache) {
    await cache.set(url, data)
  }

  return data
}
