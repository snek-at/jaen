import {
  FieldHighlighterProvider,
  JaenPage,
  PageConfig,
  PageProps,
  useAuth,
  withAuthSecurity
} from '@atsnek/jaen'
import {Flex} from '@chakra-ui/react'
import {GatsbyBrowser, Slice} from 'gatsby'
import React, {useEffect, useMemo} from 'react'
import * as Sentry from '@sentry/gatsby'

import {theme} from '../theme/jaen-theme/index'
import {DynamicPageRenderer} from './DynamicPageRenderer'
import Layout from './Layout'

// Import other necessary components here

interface CustomPageElementProps extends Omit<PageProps, 'children'> {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

const CustomPageElement: React.FC<CustomPageElementProps> = ({
  children,
  ...props
}) => {
  const auth = useAuth()

  if (auth.isAuthenticated && auth.user) {
    Sentry.setUser({
      email: auth.user.profile.email,
      id: auth.user.profile.sub,
      username: auth.user.profile.preferred_username,
      details: auth
    })
  }

  const withoutJaenFrame = props.pageContext?.pageConfig?.withoutJaenFrame

  if (!withoutJaenFrame) {
    return (
      <Flex
        pos="relative"
        flexDirection="column"
        visibility={
          props.pageContext?.pageConfig?.auth?.isRequired &&
          !auth.isAuthenticated
            ? 'hidden'
            : 'visible'
        }>
        {auth.isAuthenticated && (
          <Slice
            alias="jaen-frame"
            jaenPageId={props.pageContext?.jaenPageId}
            pageConfig={props.pageContext?.pageConfig as any}
          />
        )}

        <Layout pageProps={props}>{children}</Layout>
      </Flex>
    )
  }

  return <Layout pageProps={props}>{children}</Layout>
}

const SecureRendered = withAuthSecurity(DynamicPageRenderer)

const withJaenPageProvider = <
  P extends React.ComponentProps<typeof DynamicPageRenderer>
>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return props => {
    return <SecureRendered {...props} Component={Component} />
  }
}

const JaenPageElement = withJaenPageProvider(CustomPageElement)

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props
}) => {
  return (
    <FieldHighlighterProvider path={props.location.pathname} theme={theme}>
      <JaenPageElement {...(props as any)} children={element} />
    </FieldHighlighterProvider>
  )
}

export interface UseTemplateReturn {}
