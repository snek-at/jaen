import {Box, Heading, Stack, StackProps} from '@chakra-ui/react'

export interface FieldGroupProps extends StackProps {
  title?: string
}

export const FieldGroup = (props: FieldGroupProps) => {
  const {title, children, ...flexProps} = props
  return (
    <Stack
      direction={{base: 'column', md: 'row'}}
      spacing="6"
      py="4"
      {...flexProps}>
      <Box minW="3xs">
        {title && (
          <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  )
}
