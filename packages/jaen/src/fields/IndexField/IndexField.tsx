import {Button, Text} from '@chakra-ui/react'

import {useJaenPageIndex} from '../../contexts/page'
import {withRedux} from '../../redux/index'
import {JaenPage} from '../../types'
import {HighlightTooltip} from '../components/HighlightTooltip/HighlightTooltip'

export interface IndexFieldProps {
  name: string
  /**
   * Opts out the field from the page content on which it is applied.
   * Instead the page context of the provided jaenPageId will be used.
   *
   * Priority: jaenPageId > path > current page
   */
  jaenPageId?: string
  /**
   * Opts out the field from the page content on which it is applied.
   * Instead it resolves the page by the provided path.
   *
   * This is useful when you want to use a dynamic page as a context.
   *
   * Priority: jaenPageId > path > current page
   */
  path?: string
  /**
   * Provides page and wrapps the return jsx in a JaenPageProvider, thus allowing
   * to use fields.
   *
   * Filtering is done by the `filter` prop.
   */
  renderPage: (page: Partial<JaenPage>) => JSX.Element
  filter?: (page: Partial<JaenPage>) => boolean
  sort?: (a: Partial<JaenPage>, b: Partial<JaenPage>) => number
}

export const IndexField: React.FC<IndexFieldProps> = withRedux(
  ({name, renderPage, ...rest}: IndexFieldProps) => {
    const {childPages, withJaenPage} = useJaenPageIndex(rest)
    return (
      <HighlightTooltip
        id={name}
        actions={[
          <Button
            variant="jaenHighlightTooltipText"
            key="jaen-highlight-tooltip-text-index">
            <Text as="span" noOfLines={1}>
              Index
            </Text>
          </Button>
        ]}>
        {childPages.map(page => withJaenPage(page.id, renderPage(page)))}
      </HighlightTooltip>
    )
  }
)

export default IndexField
