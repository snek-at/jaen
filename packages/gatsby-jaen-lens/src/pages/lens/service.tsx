import {Box} from '@chakra-ui/react'
import {PageConfig, PageProps} from '@atsnek/jaen'
import {useEffect, useState} from 'react'

const Page: React.FC<PageProps> = ({data, location}) => {
  const [fqdn, setFqdn] = useState<string | null>(null)

  useEffect(() => {
    // get faq from location hash
    const fqdn = location.hash.slice(1)

    // set fqdn to state
    setFqdn(fqdn)

    window.scrollTo(0, 0)
  }, [
    location.hash // only update when location.hash changes
  ])

  return (
    <Box h="calc(100dvh - 4rem)" w="full">
      {fqdn && (
        <iframe
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation allow-top-navigation"
          src={`https://${fqdn}`}
          style={{width: '100%', height: 'calc(100dvh - 4rem)', border: 'none'}}
        />
      )}
    </Box>
  )
}

export const pageConfig: PageConfig = {
  label: 'Lens Service',
  layout: {
    name: 'jaen',
    type: 'full'
  },
  auth: {
    isRequired: true,
    isAdminRequired: true
  },
  breadcrumbs: [
    {
      label: 'Lens',
      path: '/lens/'
    },
    {
      label: 'Service',
      path: '/lens/service/'
    }
  ],
  withoutJaenFrameStickyHeader: true
}

export default Page

export {Head} from '@atsnek/jaen'
