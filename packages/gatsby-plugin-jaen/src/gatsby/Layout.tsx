import {Box, GlobalStyle, ThemeProvider} from '@chakra-ui/react'
import {LayoutProps} from '@atsnek/jaen'

import {JaenPageLayout} from '../components/JaenPageLayout'
import CustomLayout from '../components/Layout'
import userTheme from '../theme/theme'

const Layout: React.FC<LayoutProps> = ({children, pageProps}) => {
  const {pageConfig} = pageProps.pageContext

  // check if jaen theme is set
  const layout = pageConfig?.layout

  return layout?.name === '@atsnek/jaen' ? (
    <JaenPageLayout layout={layout.type}>{children}</JaenPageLayout>
  ) : (
    <Box zIndex="1">
      <CustomLayout pageProps={pageProps}>
        <ThemeProvider theme={userTheme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </CustomLayout>
    </Box>
  )
}

export default Layout
