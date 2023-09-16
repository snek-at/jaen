import deepmerge from 'deepmerge'

export const deepmergeArrayIdMerge = (
  target: any[],
  source: any[],
  options: any
) => {
  // Check if target or source is null or undefined
  if (target == null) {
    return source ? source.slice() : []
  }

  if (source == null) {
    return target.slice()
  }

  const groups = ['id', 'fieldName']

  for (const group of groups) {
    if (
      target.every(v => v?.[group]) && // Check if target elements and group property exist
      source.every(v => v?.[group]) // Check if source elements and group property exist
    ) {
      const mergeArrays = (arr1: any[] = [], arr2: any[] = [], key = 'id') => {
        const elements: any[] = []

        const arr2Copy = arr2.slice()

        for (const element of arr1) {
          const el = arr2Copy.find(v => v && v[key] === element[key]) // Check if element and key property exist

          if (el) {
            elements.push(
              deepmerge(element, el, {
                ...(options || {}),
                arrayMerge: deepmergeArrayIdMerge
              })
            )
            arr2Copy.splice(arr2Copy.indexOf(el), 1)
          } else {
            elements.push(element)
          }
        }

        // append the rest of the elements
        elements.push(...arr2Copy)

        return elements
      }

      const merged = mergeArrays(target || [], source || [], group)

      return merged
    }
  }

  const destination = target.slice()

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, {
        ...(options || {}),
        arrayMerge: deepmergeArrayIdMerge
      })
    } else if (!target.includes(item)) {
      destination.push(item)
    }
  })

  return destination
}
