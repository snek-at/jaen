import {Box, Heading} from '@chakra-ui/react'

import {connectBlock} from '../../connectors/connect-block'
import {Field} from '../../fields/index'
import {SectionFieldProps} from '../../fields/SectionField/SectionField'

export interface EditorFieldProps {
  name: string
  label?: string
  blocks?: SectionFieldProps['blocks']
}

export const EditorField: React.FC<EditorFieldProps> = ({
  name,
  label = 'Editor',
  blocks = []
}) => {
  return (
    <Field.Section
      name={name}
      label={label}
      blocks={[HeadingBlock, TextBlock, ImageBlock, ...blocks]}
    />
  )
}

const TextBlock = connectBlock(
  () => {
    return <Field.Text name="text" defaultValue="Example Text" />
  },
  {
    label: 'TextBlock',
    name: 'TextBlock'
  }
)

const HeadingBlock = connectBlock(
  () => {
    return (
      <Field.Text
        as={Heading}
        name="heading"
        defaultValue="Example Heading"
        textAlign="center"
        tunes={[
          {
            type: 'groupTune',
            name: 'heading',
            label: 'Heading',
            tunes: new Array(6).fill(0).map((_, i) => {
              const n = i + 1

              const tag = `h${n}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

              const responsiveFontSize = {
                h1: {
                  base: '4xl',
                  sm: '5xl',
                  md: '6xl',
                  lg: '6xl',
                  '2xl': '6xl'
                },
                h2: {
                  base: '3xl',
                  sm: '4xl',
                  md: '5xl',
                  lg: '6xl',
                  '2xl': '6xl'
                },
                h3: {
                  base: '2xl',
                  sm: '3xl',
                  md: '4xl',
                  lg: '5xl',
                  '2xl': '6xl'
                },
                h4: {base: 'xl', sm: '2xl', md: '3xl', lg: '4xl', '2xl': '5xl'},
                h5: {base: 'lg', sm: 'xl', md: '2xl', lg: '3xl', '2xl': '4xl'},
                h6: {base: 'md', sm: 'lg', md: 'xl', lg: '2xl', '2xl': '3xl'}
              }

              const responsiveFontSizeValue = responsiveFontSize[tag]

              const marginTop = `${2 + (7 - i) * 0.5}rem`
              const marginBottom = `${(6 - i) * 0.5}rem`

              return {
                type: 'tune',
                name: tag,
                label: `Heading ${i}`,
                Icon: () => <Box>{tag.toUpperCase()}</Box>,
                // Disable on active if tag is h2 because it is the default
                isDisableOnActive: tag === 'h2',
                requiredProps: ['asAs'],
                props: {
                  asAs: tag,
                  fontSize: responsiveFontSizeValue,
                  marginTop,
                  marginBottom
                }
              }
            })
          }
        ]}
      />
    )
  },
  {
    label: 'HeadingBlock',
    name: 'HeadingBlock'
  }
)

const ImageBlock = connectBlock(
  () => {
    return (
      <Box>
        <Box h="md" m="4" objectFit="contain">
          <Field.Image name="image" objectFit="contain" />
        </Box>
        <Field.Text
          name="caption"
          textAlign="center"
          variant="cursive"
          fontSize="xs"
        />
      </Box>
    )
  },
  {
    label: 'ImageBlock',
    name: 'ImageBlock'
  }
)
