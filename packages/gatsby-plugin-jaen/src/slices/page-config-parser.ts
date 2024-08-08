import {PageConfig, useAuth} from '@atsnek/jaen'

export const usePageConfig = () => {
  const auth = useAuth()

  const parsePageConfig = async (pageConfig: PageConfig) => {
    // Recursively go through all the fields and parse lazy fields
    const parseField = async (field: any): Promise<any> => {
      if (!field) return field

      // Check if object with type function then execute the function
      if (field.type === 'function') {
        let result: any | null = null
        try {
          const func: Function | undefined = new Function(
            `return ${field.value}`
          )()

          if (func) {
            result = await func({auth})
          }
        } catch (e) {
          console.log('error', e)
        }

        // If the result is a promise, await it
        if (result instanceof Promise) {
          return await result
        } else {
          return result
        }
      } else if (Array.isArray(field)) {
        // Handle arrays by mapping each element
        return await Promise.all(field.map(parseField))
      } else if (typeof field === 'object') {
        // Handle objects by recursively parsing their properties
        for (const key in field) {
          field[key] = await parseField(field[key])
        }
      }
      return field
    }

    return (await parseField(pageConfig)) as PageConfig
  }

  return {
    parsePageConfig
  }
}
