import {useResolvedPage, usePage} from '@contexts/cms'
import {useTemplate} from '@contexts/template'
import {ResolvedPageType} from '@src/types'
import {withRedux} from '@store/withRedux'

interface IndexFieldProps {
  fixedSlug?: string
  onRender: (page: ResolvedPageType) => JSX.Element
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const {jaenPageContext} = useTemplate()
  const page = useResolvedPage(props.fixedSlug || jaenPageContext.id)

  if (!page) {
    throw new Error(`Page not found: ${props.fixedSlug || jaenPageContext.id}`)
  }

  return props.onRender(page)
}

export default withRedux(IndexField)
