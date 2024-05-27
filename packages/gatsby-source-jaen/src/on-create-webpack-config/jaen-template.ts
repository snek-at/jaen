import {CreateWebpackConfigArgs} from 'gatsby'

import {templateDir} from '../gatsby-config'

export const onCreateWebpackConfig = async ({
  actions,
  plugins
}: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        __JAEN_SOURCE_TEMPLATES__: JSON.stringify(templateDir)
      })
    ]
  })
}
