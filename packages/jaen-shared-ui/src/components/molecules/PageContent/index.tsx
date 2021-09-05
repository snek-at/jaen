import {InfoOutlineIcon} from '@chakra-ui/icons'
import {
  Input,
  Heading,
  Box,
  Stack,
  Divider,
  Flex,
  Textarea,
  Badge,
  Spacer,
  Image,
  Tooltip
} from '@chakra-ui/react'
import {ChangeEvent, useEffect, useState} from 'react'

import translations from './translations.json'

export type Values = Partial<{
  templateName: string | null
  title: string
  slug: string
  description: string
  image: string
  isBlogPost: boolean
  lastPublished?: string
  locked?: boolean
}>

export type PageContentType = {
  values?: Values
  onValuesChange: (newValues: Values) => void
  onImageClick: () => void
}

const PageContent: React.FC<PageContentType> = props => {
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
          <Box>
            <Heading size="lg">
              {values.title}{' '}
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                {values.templateName}
              </Badge>
            </Heading>
          </Box>
          <Spacer />
          <Box>
            {values.isBlogPost && (
              <Badge mx={1} variant="outline" colorScheme="green">
                BlogPost
              </Badge>
            )}
            {values.lastPublished && (
              <Badge variant="outline" colorScheme="blue">
                Last published: {values.lastPublished}
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
                  <Heading size="md">{CONTENT.slug}</Heading>
                  <Tooltip
                    hasArrow
                    label={CONTENT.slugtooltip}
                    placement="top-start"
                    fontSize="md">
                    <InfoOutlineIcon w={3.5} h={3.5} ml="1" mt="1" />
                  </Tooltip>
                </Flex>
                <Input
                  placeholder="My slug"
                  value={values.slug || ''}
                  disabled={values.locked}
                  onChange={e => handleValuesChange('slug', e)}
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

export default PageContent
