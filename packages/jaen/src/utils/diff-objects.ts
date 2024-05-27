type Diff<T> = {
  [K in keyof T]?: T[K] extends object ? Diff<T[K]> : T[K]
}

export function diffObjects<T extends object>(obj1: T, obj2: T): Diff<T> {
  const diff: Partial<T> = {}

  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]) as Set<
    keyof T
  >

  keys.forEach(key => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    console.log(key, value1, value2)

    if (value2 !== null && typeof value2 === 'object') {
      diff[key] = diffObjects(value1 || {}, value2) as any
    } else if (
      !value1 ||
      !value2 ||
      typeof value1 !== 'object' ||
      typeof value2 !== 'object'
    ) {
      console.log(obj2, value2)

      // Check if obj2 contains the key
      if (obj2.hasOwnProperty(key)) {
        console.log('key not in obj2', key, value1, value2)

        // Check if the value is different
        if (value1 !== value2) {
          console.log('assign', value1, value2)
          diff[key] = value2
        }
      }
    }
  })

  return diff
}
