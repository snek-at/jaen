/**
 * Removes all properties with the value of `undefined` from the given object recursively.
 * Nested objects are also traversed to remove any undefined properties.
 *
 * @param {T} obj - The input object to remove undefined properties from.
 * @returns {T} The modified object after removing all undefined properties.
 */
export function deepRemoveUndefinedProperties<T extends Record<string, any>>(
  obj: T
): T {
  // Loop through all keys in the object
  Object.keys(obj).forEach(key => {
    // If the value associated with the current key is an object, recursively call the function on that nested object
    if (obj[key] && typeof obj[key] === 'object')
      deepRemoveUndefinedProperties(obj[key])
    // If the value associated with the current key is undefined, delete that key from the object
    else if (obj[key] === undefined) delete obj[key]
  })

  // Return the modified object after removing all undefined properties
  return obj
}
