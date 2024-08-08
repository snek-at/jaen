import {PageConfig, useWidgetContext} from '@atsnek/jaen'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Stack,
  StackDivider,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import {graphql, PageProps, useStaticQuery} from 'gatsby'

import {JaenWidgetProvider} from '../../contexts/jaen-widget'

const Page: React.FC<PageProps> = () => {
  const data = useStaticQuery<{
    allSitePlugin: {
      nodes: {
        id: string
        name: string
        version: string
      }[]
    }
  }>(graphql`
    query AllSitePlugin {
      allSitePlugin {
        nodes {
          id
          name
          version
        }
      }
    }
  `)

  return (
    <Stack spacing={6} divider={<StackDivider />}>
      <Stack spacing="6">
        <Heading as="h1" size="lg">
          Version Information
        </Heading>

        <Text fontSize="md">
          Below, you'll find information about the versions of Gatsby, Jaen, and
          plugins installed in your project.
        </Text>

        <Accordion allowToggle allowMultiple>
          {/* Gatsby Information */}
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  fontWeight: 'bold'
                }}>
                <Box as="span" flex="1" textAlign="left">
                  Gatsby
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Stack spacing="4">
                <Text fontSize="md">
                  Gatsby is a popular static site generator used for building
                  modern web applications. Below, you'll find information about
                  the Gatsby and Gatsby CLI versions installed in your project.
                </Text>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Gatsby version:</Td>
                      <Td>{require('gatsby/package.json').version}</Td>
                    </Tr>
                    <Tr>
                      <Td>Gatsby CLI version:</Td>
                      <Td>{require('gatsby-cli/package.json').version}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          {/* Jaen Information */}
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  fontWeight: 'bold'
                }}>
                <Box as="span" flex="1" textAlign="left">
                  Jaen
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Stack spacing="4">
                <Text fontSize="md">
                  Jaen is a headless content management system (CMS) for
                  managing your website's content. Below, you'll find
                  information about the Jaen version installed in your project.
                </Text>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Jaen version:</Td>
                      <Td>{require('@atsnek/jaen/package.json').version}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          {/* Plugins Information */}
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  fontWeight: 'bold'
                }}>
                <Box as="span" flex="1" textAlign="left">
                  Plugins
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Stack spacing="4">
                <Text fontSize="md">
                  Plugins extend the functionality of your website. Below,
                  you'll find a list of installed plugins and their versions.
                </Text>
                <Table variant="simple">
                  <Tbody>
                    {data.allSitePlugin.nodes.map(node => (
                      <Tr key={node.id}>
                        <Td>{node.name}</Td>
                        <Td>{node.version}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>

      <Stack spacing="6">
        <Heading as="h1" size="lg">
          Widgets
        </Heading>

        <Text fontSize="md">
          Below, you'll find a list of widgets and their data. This is a preview
          feature and will be improved in the future.
        </Text>

        <JaenWidgetProvider>
          <WidgetsTable />
        </JaenWidgetProvider>
      </Stack>
    </Stack>
  )
}

const WidgetsTable: React.FC = () => {
  const widgets = useWidgetContext()

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Created At</Th>
          <Th>Modified At</Th>
          <Th>Data</Th>
        </Tr>
      </Thead>

      <Tbody>
        {widgets.map(widget => (
          <Tr key={widget.id}>
            <Td>{widget.name}</Td>
            <Td>{widget.createdAt}</Td>
            <Td>{widget.modifiedAt}</Td>
            <Td>
              <pre>{JSON.stringify(widget.data, null, 2)}</pre>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Jaen CMS | Debug',

  breadcrumbs: [
    {
      label: 'CMS',
      path: '/cms/'
    },
    {
      label: 'Debug',
      path: '/cms/debug/'
    }
  ],
  auth: {
    isAdminRequired: true
  },
  layout: {
    name: 'jaen'
  }
}
