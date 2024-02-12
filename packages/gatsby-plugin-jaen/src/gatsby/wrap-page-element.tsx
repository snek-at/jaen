import {
  FieldHighlighterProvider,
  JaenPage,
  PageConfig,
  useAuth,
  withAuthSecurity
} from '@atsnek/jaen'
import {Flex} from '@chakra-ui/react'
import {GatsbyBrowser, PageProps, Slice} from 'gatsby'
import React, {useMemo} from 'react'

import {theme} from '../theme/jaen-theme/index'
import {DynamicPageRenderer} from './DynamicPageRenderer'
import Layout from './Layout'

// Import other necessary components here

interface PageContext {
  pageConfig?: PageConfig
  jaenPageId?: string
}

interface CustomPageElementProps {
  pageProps: PageProps<
    {
      jaenPage?: JaenPage
      allJaenPage?: {
        nodes: Array<JaenPage>
      }
    },
    PageContext
  >

  children: React.ReactNode
}

const CustomPageElement: React.FC<CustomPageElementProps> = ({
  children,
  pageProps
}) => {
  const auth = useAuth()

  const withoutJaenFrame = pageProps.pageContext?.pageConfig?.withoutJaenFrame

  if (!withoutJaenFrame) {
    return (
      <Flex
        pos="relative"
        flexDirection="column"
        visibility={
          pageProps.pageContext?.pageConfig?.auth?.isRequired &&
          !auth.isAuthenticated
            ? 'hidden'
            : 'visible'
        }>
        {auth.isAuthenticated && (
          <Slice
            alias="jaen-frame"
            jaenPageId={pageProps.pageContext?.jaenPageId}
            pageConfig={pageProps.pageContext?.pageConfig as any}
          />
        )}

        <Layout pageProps={pageProps}>{children}</Layout>
      </Flex>
    )
  }

  return <Layout pageProps={pageProps}>{children}</Layout>
}

export interface WithJaenPageProviderProps {
  pageProps: PageProps<
    {
      jaenPage?: JaenPage
      allJaenPage?: {
        nodes: Array<JaenPage>
      }
    },
    PageContext
  >
}

const withJaenPageProvider = <P extends WithJaenPageProviderProps>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return props => {
    const SecureRendered = useMemo(
      () =>
        withAuthSecurity(
          DynamicPageRenderer,
          props.pageProps.pageContext?.pageConfig
        ),
      [props.pageProps.pageContext.pageConfig]
    )

    return <SecureRendered {...props} Component={Component} />
  }
}

const JaenPageElement = withJaenPageProvider(CustomPageElement)

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props
}) => {
  return (
    <FieldHighlighterProvider path={props.path} theme={theme}>
      <JaenPageElement pageProps={props}>{element}</JaenPageElement>
    </FieldHighlighterProvider>
  )
}

export interface UseTemplateReturn {}
