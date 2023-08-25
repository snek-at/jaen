import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Icon,
  ListItem as ChakraListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import {FaBullhorn, FaRocket} from 'react-icons/fa'

import {List, ListItem} from '../../shared/components/List'

export interface DashboardProps {
  user?: string
  isPublishing?: boolean
  patches: Array<{
    createdAt: string
    url: string
    title: string
  }>
}

export const Dashboard: React.FC<DashboardProps> = props => {
  return (
    <Stack spacing="12">
      <Heading size="sm">
        {props.user ? (
          <>
            Welcome back, <Text as="span">{props.user}</Text>!
          </>
        ) : (
          'Welcome'
        )}
      </Heading>

      <Stack spacing="4">
        <SimpleGrid
          columns={{
            base: 1,
            md: 2
          }}
          spacing="4">
          <Card>
            <CardHeader>
              <HStack>
                <Icon as={FaBullhorn} boxSize={6} color="brand.500" /> What is
                Jaen
                <Text>What is Jaen CMS?</Text>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text>
                Jaen CMS is a friendly tool that helps you create and manage
                websites easily, without any technical knowledge required. It
                lets you add and edit content, like text and images, to your
                website without worrying about the technical stuff. It's like
                writing a document and seeing it on your website instantly!
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <HStack>
                <Icon as={FaRocket} boxSize={6} color="brand.500" />{' '}
                <Text>Key Features</Text>
              </HStack>
            </CardHeader>
            <CardBody>
              <UnorderedList styleType="disc" pl="1.5rem" spacing={3}>
                <ChakraListItem>
                  Easy to Use: Jaen CMS is designed with simplicity in mind. You
                  don't need to be a techie to use it. Just start creating!
                </ChakraListItem>
                <ChakraListItem>
                  Instant Preview: See how your changes look on your website in
                  real-time before publishing. No waiting or guessing!
                </ChakraListItem>
                <ChakraListItem>
                  Safe Editing: Don't worry about making mistakes. Jaen CMS
                  keeps track of your changes, so you can always go back to a
                  previous version if needed.
                </ChakraListItem>
                <ChakraListItem>
                  Beautiful Images: Easily add and manage images to make your
                  website visually stunning and engaging.
                </ChakraListItem>
                <ChakraListItem>
                  Better SEO: Improve your website's visibility in search
                  engines with built-in tools to optimize your content for
                  search results.
                </ChakraListItem>
              </UnorderedList>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Stack>

      <List spacing="12" overflowY="auto" label="Previouse releases">
        {props.isPublishing && (
          <ListItem
            title="In progress"
            subTitle="Your website will be live in a few minutes."
            circleColor="orange.500"
            icon={<Icon as={FaRocket} boxSize="6" />}
          />
        )}

        {props.patches.map((m, i) => (
          <ListItem
            key={i}
            title={m.title}
            subTitle={`Published on ${new Date(m.createdAt).toLocaleString()}`}
            circleColor="green.500"
            icon={<Icon as={FaRocket} boxSize="6" />}
            isLastItem={i === props.patches.length - 1}
          />
        ))}
      </List>
    </Stack>
  )
}
