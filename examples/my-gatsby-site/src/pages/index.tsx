import {
  connectBlock,
  Field,
  PageConfig,
  PageProps,
  PageProvider,
  useAuth,
  useField,
  useJaenPageIndex,
  useMediaModal,
  usePageContext,
  useSiteMetadataContext
} from '@atsnek/jaen'
import {Link, useJaenFrameMenuContext} from 'gatsby-plugin-jaen'

import {Box, Button, LightMode, Text} from '@chakra-ui/react'
import {graphql} from 'gatsby'
import * as React from 'react'

import {UncontrolledMdxField} from '@atsnek/jaen-fields-mdx'
import {FaCogs} from '@react-icons/all-files/fa/FaCogs'

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif'
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320
}
const headingAccentStyles = {
  color: '#663399'
}
const paragraphStyles = {
  marginBottom: 48
}
const codeStyles = {
  color: '#8A6534',
  padding: 4,
  backgroundColor: '#FFF4DB',
  fontSize: '1.25rem',
  borderRadius: 4
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0
}
const doclistStyles = {
  paddingLeft: 0
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30
}

const linkStyle = {
  color: '#8954A8',
  fontWeight: 'bold',
  fontSize: 16,
  verticalAlign: '5%'
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: 'none',
  display: `inline-block`,
  marginBottom: 24,
  marginRight: 12
}

const descriptionStyle = {
  color: '#232129',
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25
}

const docLinks = [
  {
    text: 'TypeScript Documentation',
    url: 'https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/',
    color: '#8954A8'
  },
  {
    text: 'GraphQL Typegen Documentation',
    url: 'https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/',
    color: '#8954A8'
  }
]

const badgeStyle = {
  color: '#fff',
  backgroundColor: '#088413',
  border: '1px solid #088413',
  fontSize: 11,
  fontWeight: 'bold',
  letterSpacing: 1,
  borderRadius: 4,
  padding: '4px 6px',
  display: 'inline-block',
  position: 'relative' as 'relative',
  top: -2,
  marginLeft: 10,
  lineHeight: 1
}

const links = [
  {
    text: 'Tutorial',
    url: 'https://www.gatsbyjs.com/docs/tutorial/getting-started/',
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
    color: '#E95800'
  },
  {
    text: 'How to Guides',
    url: 'https://www.gatsbyjs.com/docs/how-to/',
    description:
      "Practical step-by-step guides to help you achieve a specific goal. Most useful when you're trying to get something done.",
    color: '#1099A8'
  },
  {
    text: 'Reference Guides',
    url: 'https://www.gatsbyjs.com/docs/reference/',
    description:
      "Nitty-gritty technical descriptions of how Gatsby works. Most useful when you need detailed information about Gatsby's APIs.",
    color: '#BC027F'
  },
  {
    text: 'Conceptual Guides',
    url: 'https://www.gatsbyjs.com/docs/conceptual/',
    description:
      'Big-picture explanations of higher-level Gatsby concepts. Most useful for building understanding of a particular topic.',
    color: '#0D96F2'
  },
  {
    text: 'Plugin Library',
    url: 'https://www.gatsbyjs.com/plugins',
    description:
      'Add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.',
    color: '#8EB814'
  },
  {
    text: 'Build and Host',
    url: 'https://www.gatsbyjs.com/cloud',
    badge: true,
    description:
      'Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!',
    color: '#663399'
  }
]

const TestBlock = connectBlock(
  () => {
    return (
      <Box boxSize="lg">
        <Field.Image name="image" />
      </Box>
    )
  },
  {
    name: 'TestBlock',
    label: 'Test Block'
  }
)

const IndexPage: React.FC<PageProps> = () => {
  const auth = useAuth()

  const siteMetadata = useSiteMetadataContext()

  const mediaSelector = useMediaModal({
    onSelect: mediaNode => {
      alert('media selected: ' + mediaNode.url)
    }
  })

  const testImport = async () => {
    return await import(`${__JAEN_SOURCE_TEMPLATES__}/BlogPage`)
  }

  const jaenFrame = useJaenFrameMenuContext()

  React.useEffect(() => {
    jaenFrame.extendAddMenu({
      test: {
        label: 'New post',
        icon: FaCogs,
        onClick: () => {
          alert('test')
        }
      }
    })
  }, [])

  const index = useJaenPageIndex()

  // console.log('index', index)

  console.log('__REMOTE__', __JAEN_REMOTE__)

  // if (auth.isAuthenticated) {
  //   return (
  //     <div>
  //       <pre
  //         dangerouslySetInnerHTML={{
  //           __html: JSON.stringify(auth.user, null, 2)
  //         }}></pre>

  //       <Field.Image name="image" />
  //     </div>
  //   )
  // }

  return (
    <>
      <button onClick={auth.signinRedirect}>login</button>
      <Link to="/mdx">mdx</Link>
      <Field.Image name="image" />
      <Field.Image name="test" />

      <Box>
        {index?.childPages?.map(child => {
          return index.withJaenPage(
            child.id,
            <Box key={child.id}>
              <Text>{child.title}</Text>
              <Text>{child.slug}</Text>
              <Text>{child.id}</Text>
              <Text>{child.template}</Text>
              <Field.Image name="image" />
              <Field.Text name="text" />
            </Box>
          )
        })}
      </Box>
    </>
  )

  return (
    <>
      <UncontrolledMdxField
        components={{
          Foo: () => {
            return <Field.Image name="image" />
          }
        }}
        onUpdateValue={() => {}}
        value={undefined}
        isEditing={true}
      />

      <Text>{__JAEN_SOURCE_TEMPLATES__}</Text>
      <Text>{JSON.stringify(siteMetadata)}</Text>
      {/* <Text>{cm.colorMode}</Text> */}
      <Button variant="outline">test outside</Button>

      {index?.childPages?.map(child => {
        return (
          <Box key={child.id}>
            <Text>{child.title}</Text>
            <Text>{child.slug}</Text>
            <Text>{child.id}</Text>
            <Text>{child.template}</Text>
          </Box>
        )
      })}

      <LightMode>
        <Button variant="outline">test 2</Button>
        <main style={pageStyles}>
          <h1 style={headingStyles}>
            Congratulations22222sss555
            <br />
            <span style={headingAccentStyles}>
              — you just made a Gatsby site! 🎉🎉🎉
            </span>
          </h1>

          <button onClick={auth.signinRedirect}>login</button>

          <button onClick={mediaSelector.toggleModal}>media</button>

          <Field.Image name="image" lightbox objectFit="contain" />
          <Field.Image name="image2" objectFit="contain" />

          <Box boxSize="xs">
            <Field.Image name="image3" />
          </Box>

          <Field.Section name="section" blocks={[TestBlock]} />

          <Field.Text
            style={paragraphStyles}
            name="text"
            defaultValue=" Edit <code style={codeStyles}>src/pages/index.tsx</code> to see this
        page update in real-time. 😎"
          />
          <ul style={doclistStyles}>
            {docLinks.map(doc => (
              <li key={doc.url} style={docLinkStyle}>
                <a
                  style={linkStyle}
                  href={`${doc.url}?utm_source=starter&utm_medium=ts-docs&utm_campaign=minimal-starter-ts`}>
                  {doc.text}
                </a>
              </li>
            ))}
          </ul>
          <ul style={listStyles}>
            {links.map(link => (
              <li key={link.url} style={{...listItemStyles, color: link.color}}>
                <span>
                  <a
                    style={linkStyle}
                    href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter-ts`}>
                    {link.text}
                  </a>
                  {link.badge && (
                    <span style={badgeStyle} aria-label="New Badge">
                      NEW!
                    </span>
                  )}
                  <p style={descriptionStyle}>{link.description}</p>
                </span>
              </li>
            ))}
          </ul>
          <img
            alt="Gatsby G Logo"
            src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
          />
        </main>
      </LightMode>
    </>
  )
}

export default IndexPage

export const pageConfig: PageConfig = {
  label: 'Home Page 2',
  icon: 'FaHome',
  childTemplates: ['BlogPage'],
  breadcrumbs: [
    async () => {
      // // fetch random data from api
      // const res = await fetch('https://randomuser.me/api/')
      // const data = await res.json()

      const randomUsernames = [
        'johndoe',
        'janedoe',
        'johnsmith',
        'janesmith',
        'johnjones',
        'janejones',
        'johndoe2',
        'janedoe2',
        'johnsmith2',
        'janesmith2',
        'johnjones2',
        'janejones2'
      ]

      const randomUsername =
        randomUsernames[Math.floor(Math.random() * randomUsernames.length)]

      return {
        label: randomUsername,
        path: `/user/${randomUsername}`
      }
    }
  ],
  menu: {
    type: 'app',
    path: () => '/index'
  }
}

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: {eq: $jaenPageId}) {
      ...JaenPageData
      childPages {
        ...JaenPageData
      }
    }

    allJaenPage {
      nodes {
        ...JaenPageData
        childPages {
          ...JaenPageData
        }
      }
    }
  }
`

export {Head} from '@atsnek/jaen'
