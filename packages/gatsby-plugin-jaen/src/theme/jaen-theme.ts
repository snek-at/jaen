import {extendTheme} from '@chakra-ui/react'
import * as components from './jaen-theme/components'
import * as foundations from './jaen-theme/foundations'

export const jaenTheme: Record<string, any> = extendTheme({
  ...foundations,
  components: {...components}
})
