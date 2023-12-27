import {CreateWebpackConfigArgs} from 'gatsby'

export const onCreateWebpackConfig = async ({
  actions,
  plugins,
  cache
}: CreateWebpackConfigArgs) => {
  const jaenDataContentDigest = await cache.get('JaenDataContentDigest')

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        __JAEN_DATA_CONTENT_DIGEST__: JSON.stringify(jaenDataContentDigest)
      })
    ]
  })
}
