import {useCMSPage, usePage} from '@contexts/cms'
import {useTemplate} from '@contexts/template'
import {ResolvedPageType} from '@src/types'
import {withRedux} from '@store/withRedux'

interface IndexFieldProps {
  fixedSlug?: string
  onRender: (page: ResolvedPageType) => JSX.Element
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const {jaenPageContext} = useTemplate()
  const page = useCMSPage(props.fixedSlug || jaenPageContext.id)

  return props.onRender(page)
}

export default withRedux(IndexField)
