import deepmerge from 'deepmerge'
import {Root} from 'hast'
import {defaultSchema, sanitize} from '../hast-util-sanitize-mdx'

/**
 * Sanitize HTML.
 */
export default function rehypeSanitize(componentsNames: string[] = []) {
  return () => {
    const allowAllAttributes = componentsNames.reduce<{
      [key: string]: string[]
    }>((acc, componentName) => {
      acc[componentName] = ['*']
      return acc
    }, {})

    const schema = deepmerge(defaultSchema, {
      tagNames: ['Link', 'Image'],
      attributes: {
        '*': ['className'],
        // Allow rehype-mathjax classes.
        code: [['className', /^language-./, 'math-inline', 'math-display']],
        // Allow all attributes for components. The security of the components is the responsibility of the user.
        ...allowAllAttributes
      },
      clobberPrefix: ''
    })

    return function (tree: Root) {
      console.log('tree', tree)

      const result = sanitize(tree, schema) as Root
      return result
    }
  }
}
