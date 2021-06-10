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
