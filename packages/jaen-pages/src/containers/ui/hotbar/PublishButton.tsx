import {useToast} from '@chakra-ui/react'
import {BifrostBridge} from '@snek-at/bridge'
import {useJaenCoreContext} from '@snek-at/jaen'
import {PublishButton} from '@snek-at/jaen-shared-ui/dist/components/molecules/buttons'
import {withRedux} from '@store/withRedux'
import gql from 'graphql-tag'
import React from 'react'

const Bridge = new BifrostBridge({
  httpUrl: 'https://origin.snek.at/graphql'
})

const Button: React.FC = () => {
  const core = useJaenCoreContext()
  const toast = useToast()

  const isDisabled = core.getAuthState().isGuest

  const publish = async () => {
    const {upload} = await import('@src/ipfs')
    const res = (await core.onPublish()) as {'jaen-pages': object}

    const url = await upload(JSON.stringify(res['jaen-pages']))

    const publishRes = await Bridge.session.mutate<{
      jaenPublishFormPage: {result: string}
    }>(
      gql`
        mutation JaenPublishMutation($values: GenericScalar!, $url: String!) {
          jaenPublishFormPage(values: $values, url: $url) {
            result
            errors {
              name
              errors
            }
          }
        }
      `,
      {
        url: '/jaen-publish',
        values: {git_remote: core.remote, jaendata_url: url}
      }
    )

    if (publishRes.data?.jaenPublishFormPage?.result === 'OK') {
      toast({
        title: 'Sucessfully published.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Publish failed.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <PublishButton disabled={isDisabled} onPublishClick={() => publish()} />
  )
}

export default withRedux(Button)
