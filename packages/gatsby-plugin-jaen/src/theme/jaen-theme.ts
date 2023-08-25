import * as components from './jaen-theme/components'
import * as foundations from './jaen-theme/foundations'

export const jaenTheme: Record<string, any> = {
  ...foundations,
  components: {...components}
}
