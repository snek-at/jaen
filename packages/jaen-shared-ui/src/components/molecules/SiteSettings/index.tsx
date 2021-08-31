import {InfoOutlineIcon} from '@chakra-ui/icons'
import {
  Input,
  Text,
  InputGroup,
  Heading,
  Box,
  Stack,
  Divider,
  Flex,
  Center,
  InputRightAddon,
  InputLeftAddon,
  Textarea,
  Checkbox,
  Badge,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  HStack,
  Spacer,
  Image,
  VStack,
  Icon,
  Tooltip
} from '@chakra-ui/react'
import {ChangeEvent, useEffect, useState} from 'react'

import translations from './translations.json'

type Values = Partial<{
  title: string
  description: string
  siteUrl: string
  image: string
  author: {
    name: string
  }
  organization: {
    name: string
    url: string
    logo: string
  }
  social: {
    twitter: string // twitter username
    fbAppID: string // FB ANALYTICS
    google: string // GOOGLE ANALYTICS
  }
  lastPublished: string
}>

export type SiteSettingsType = {
  values?: Values
  onValuesChange: (newValues: Values) => void
  onImageClick: () => void
}

const SiteSettings: React.FC<SiteSettingsType> = props => {
  const [values, setValues] = useState<Values>(props.values || {})

  useEffect(() => {
    setValues(props.values || {})
  }, [props.values])

  const handleValuesChange = (
    key: keyof Values,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({...values, [key]: event.target.value})
  }

  const handleValuesCb = () => {
    if (JSON.stringify(values) !== JSON.stringify(props.values)) {
      props.onValuesChange(values)
    }
  }

  const LM = 'en'

  type Translations = {[name: string]: {en: string; de: string}}

  type Trs<T> = {[name in keyof T]: string}

  function useLanguageModeValue<T extends Translations>(value: T) {
    const translation: Trs<T> = {} as Trs<T>

    for (const [key, element] of Object.entries(value)) {
      translation[key as keyof T] = element[LM]
    }

    return translation
  }

  const CONTENT = useLanguageModeValue(translations)

  return (
    <>
      <Stack spacing="24px" h="70vh">
        <Flex>
          <Box d="flex">
            <Heading size="lg"> {CONTENT.heading}</Heading>
          </Box>
          <Spacer />
          <Box>
            {values.lastPublished && (
              <Badge variant="outline" colorScheme="blue">
                {CONTENT.lastpublished} {values.lastPublished}
              </Badge>
            )}
          </Box>
        </Flex>
        <Divider />
        <Stack spacing={2}>
          <Flex>
            <Box flex="1" mr={5}>
              <Box py={2}>
                <Flex>
                  <Heading size="md">{CONTENT.title}</Heading>
                  <Tooltip
                    hasArrow
                    label={CONTENT.titletooltip}
                    placement="top-start"
                    fontSize="md">
                    <InfoOutlineIcon w={3.5} h={3.5} ml="1" mt="1" />
                  </Tooltip>
                </Flex>
                <Input
                  placeholder="My title"
                  value={values.title || ''}
                  onChange={e => handleValuesChange('title', e)}
                  onBlur={handleValuesCb}
                />
              </Box>
              <Box py={2}>
                <Flex>
                  <Heading size="md">URL</Heading>
                  <Tooltip
                    hasArrow
                    label={CONTENT.urltooltip}
                    placement="top-start"
                    fontSize="md">
                    <InfoOutlineIcon w={3.5} h={3.5} ml="1" mt="1" />
                  </Tooltip>
                </Flex>
                <Input
                  placeholder="My slug"
                  value={values.siteUrl || ''}
                  onChange={e => handleValuesChange('siteUrl', e)}
                  onBlur={handleValuesCb}
                />
              </Box>
              <Box py={2}>
                <Flex>
                  <Heading size="md">{CONTENT.description}</Heading>
                  <Tooltip
                    hasArrow
                    label={CONTENT.descriptiontooltip}
                    placement="top-start"
                    fontSize="md">
                    <InfoOutlineIcon w={3.5} h={3.5} ml="1" mt="1" />
                  </Tooltip>
                </Flex>
                <Textarea
                  placeholder="Description"
                  maxH="sm"
                  value={values.description || ''}
                  onChange={e => handleValuesChange('description', e)}
                  onBlur={handleValuesCb}
                />
              </Box>
              <Box py={2}>
                <Flex>
                  <Heading size="md">{CONTENT.author}</Heading>
                  <Tooltip
                    hasArrow
                    label={CONTENT.authortooltip}
                    placement="top-start"
                    fontSize="md">
                    <InfoOutlineIcon w={3.5} h={3.5} ml="1" mt="1" />
                  </Tooltip>
                </Flex>
                <Box p={2}>
                  <Heading size="sm">Name</Heading>
                  <Input
                    placeholder="Description"
                    value={values.author?.name || ''}
                    onChange={e => handleValuesChange('description', e)}
                    onBlur={handleValuesCb}
                  />
                </Box>
              </Box>
              <Box py={2}>
                <Flex>
                  <Heading size="md">{CONTENT.organization}</Heading>
                  <Tooltip
                    hasArrow
                    label={CONTENT.organizationtooltip}
                    placement="top-start"
                    fontSize="md">
                    <InfoOutlineIcon w={3.5} h={3.5} ml="1" mt="1" />
                  </Tooltip>
                </Flex>
                <Box p={2}>
                  <Heading size="sm">Name</Heading>
                  <Input
                    placeholder="Description"
                    value={values.organization?.name || ''}
                    onChange={e => handleValuesChange('description', e)}
                    onBlur={handleValuesCb}
                  />
                </Box>
                <Box p={2}>
                  <Heading size="sm">URL</Heading>
                  <Input
                    placeholder="Description"
                    value={values.organization?.url || ''}
                    onChange={e => handleValuesChange('description', e)}
                    onBlur={handleValuesCb}
                  />
                </Box>
                <Box p={2}>
                  <Heading size="sm">Logo</Heading>
                  <Input
                    placeholder="Description"
                    value={values.organization?.logo || ''}
                    onChange={e => handleValuesChange('description', e)}
                    onBlur={handleValuesCb}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Image
                h="sm"
                w="sm"
                src={values.image}
                fallbackSrc="https://via.placeholder.com/150"
                transition="0.2s all"
                objectFit="cover"
                _hover={{filter: 'brightness(70%)', cursor: 'pointer'}}
                onClick={props.onImageClick}
              />
            </Box>
          </Flex>
        </Stack>
      </Stack>
    </>
  )
}

export default SiteSettings
