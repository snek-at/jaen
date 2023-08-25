import {GatsbyConfig} from 'gatsby'
import fs from 'fs'

const Config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  jsxImportSource: '@emotion/react',
  plugins: [],
  flags: {
    DETECT_NODE_MUTATIONS: true
  }
}

export const pagesDir = `${process.cwd()}/src/pages`

if (fs.existsSync(pagesDir)) {
  Config.plugins?.push({
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: pagesDir
    }
  })
}

export const templateDir = `${process.cwd()}/src/templates`

if (fs.existsSync(templateDir)) {
  Config.plugins?.push({
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `templates`,
      path: templateDir
    }
  })
}

export default Config
