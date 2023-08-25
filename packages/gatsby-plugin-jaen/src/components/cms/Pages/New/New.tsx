import {Flex} from '@chakra-ui/react'
import React from 'react'

import {
  PageContentForm,
  PageContentFormProps
} from '../shared/PageContentForm/PageContentForm'

export interface NewProps {
  form: PageContentFormProps
}

export const New: React.FC<NewProps> = props => {
  return (
    <Flex id="coco">
      <PageContentForm {...props.form} />
    </Flex>
  )
}
