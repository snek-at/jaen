import deepmerge from 'deepmerge'

export const merge = <T>(
  x: Partial<T>,
  y: Partial<T>,
  deleteFn?: (value: {[x: string]: any}) => boolean
) => {
  const merged = deepmerge(x || {}, y || {}, {
    arrayMerge: (_target, source, _options) => source
  })

  const compact = compactObject(merged, deleteFn)

  return compact as T
}

// Ref: https://gist.github.com/Mazuh/8209a608a655f91b9de319872d7a660a
export function compactObject(
  data: {[x: string]: any},
  deleteFn?: (value: {[x: string]: any}) => boolean
) {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  return Object.keys(data).reduce(function (accumulator, key) {
    const isObject = typeof data[key] === 'object' && data[key] !== null
    const isArray = Array.isArray(data[key])

    const isDeletable = deleteFn && data[key] && deleteFn(data[key])

    const value: any = isObject ? compactObject(data[key], deleteFn) : data[key]
    const isEmptyObject = isObject && !Object.keys(value) && !isArray

    if (value === undefined || isEmptyObject || isDeletable) {
      return accumulator
    }

    return Object.assign(accumulator, {
      [key]: isArray ? Object.values(value) : value
    })
  }, {})
}
