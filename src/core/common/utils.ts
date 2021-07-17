/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import deepmerge from 'deepmerge'
import _ from 'lodash'
import process from 'process'

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K>}> = Partial<T> &
  U[keyof U]

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const isDev = () => development

export const deepSearch = (object: any, key: any, predicate: any) => {
  const search = (object: any, key: any, predicate: any): any => {
    if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
      return object

    for (let i = 0; i < Object.keys(object).length; i++) {
      let value = object[Object.keys(object)[i]]

      if (typeof value === 'object' && value != null) {
        let o: any = deepSearch(object[Object.keys(object)[i]], key, predicate)
        if (o != null) return o
      } else if (typeof value === 'symbol') {
        return null
      }
    }
    return null
  }

  return search(object, key, predicate)
}

export const diff = function (obj1: any, obj2: any) {
  return _.reduce(
    obj1,
    function (result: any, value: any, key: any) {
      if (_.isPlainObject(value)) {
        result[key] = diff(value, obj2[key])
      } else if (!_.isEqual(value, obj2[key])) {
        result[key] = value
      }
      return result
    },
    {}
  )
}

// Ref: https://gist.github.com/Mazuh/8209a608a655f91b9de319872d7a660a
export function compactObject(
  data: {[x: string]: any},
  deleteFn?: (value: {[x: string]: any}) => boolean
) {
  if (typeof data !== 'object') {
    return data
  }

  return Object.keys(data).reduce(function (accumulator, key) {
    const isObject = typeof data[key] === 'object'
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

export const merge = <T>(
  x: Partial<T>,
  y: Partial<T>,
  deleteFn?: (value: {[x: string]: any}) => boolean
) => {
  const merged = deepmerge(x || {}, y || {}, {
    arrayMerge: (_target, source, _options) => source
  })

  const compact = compactObject(merged, deleteFn)

  return compact
}

export const getNextIndexedObjectKey = (o: object): string => {
  let key = Object.keys(o).pop()

  if (!key) {
    key = '0'
  } else {
    key = `${parseInt(key, 10) + 1}`
  }

  return key
}
