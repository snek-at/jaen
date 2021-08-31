export function renameObjectKey<T extends {[key: string]: any}>(
  o: T,
  oldKey: string,
  newKey: string
) {
  delete Object.assign(o, {[newKey]: o[oldKey]})[oldKey]

  return o
}
