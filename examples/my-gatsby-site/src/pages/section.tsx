import {connectBlock, Field, PageConfig, PageProps} from '@atsnek/jaen'
import {VStack} from '@chakra-ui/react'

const Block = connectBlock(
  () => {
    return (
      <VStack>
        <Field.Image name="image" />
        <Field.Text name="title" defaultValue="title" />
      </VStack>
    )
  },
  {
    name: 'image',
    label: 'Image'
  }
)

const BlocksBlock = connectBlock(
  () => {
    return (
      <Field.Section
        name="blocks"
        label="Blocks"
        as={VStack}
        blocks={[Block]}
      />
    )
  },
  {
    name: 'blocks',
    label: 'Blocks'
  }
)

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  // everything after /user/ is the handle
  // const handle = location.pathname.split('/user/')[1];

  return (
    <>
      <Field.Text name="title" defaultValue="fooo" />
      <Field.Text name="title" defaultValue="baaar" />
      <Field.Text name="title" defaultValue="baaar" />

      <Field.Section
        name="blocks-blocks"
        label="Multiple Blocks"
        as={VStack}
        blocks={[BlocksBlock]}
      />
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Section',
  icon: 'FaBox'
}
