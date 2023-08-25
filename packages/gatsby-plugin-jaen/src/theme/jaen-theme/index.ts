import {extendTheme} from '@chakra-ui/react'

import {jaenTheme} from '../jaen-theme'
import userTheme from '../theme'

// update brand
jaenTheme.colors.brand = userTheme.colors.brand

export const theme = extendTheme(jaenTheme)
