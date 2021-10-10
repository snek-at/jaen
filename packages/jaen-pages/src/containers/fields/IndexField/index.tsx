import {useResolvedPage, usePage} from '@contexts/cms'
import {useTemplate} from '@contexts/template'
import {ResolvedPageType} from '@src/types'
import {withRedux} from '@store/withRedux'

interface IndexFieldProps {
  fixedSlug?: string
  onRender: (page: ResolvedPageType, pageId: string) => JSX.Element
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const {jaenPageContext} = useTemplate()
  const pageId = props.fixedSlug || jaenPageContext.id
  const page = useResolvedPage(pageId)

  if (!page) {
    throw new Error(`Page not found!: ${pageId}`)
  }

  return props.onRender(page, pageId)
}

export default withRedux(IndexField)
