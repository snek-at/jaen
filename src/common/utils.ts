import _ from 'lodash'

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K>}> = Partial<T> &
  U[keyof U]

export const deepSearch = (object: any, key: any, predicate: any): any => {
  if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
    return object

  for (let i = 0; i < Object.keys(object).length; i++) {
    let value = object[Object.keys(object)[i]]
    if (typeof value === 'object' && value != null) {
      let o: any = deepSearch(object[Object.keys(object)[i]], key, predicate)
      if (o != null) return o
    }
  }
  return null
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
