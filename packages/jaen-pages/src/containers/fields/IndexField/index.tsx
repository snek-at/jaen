import {usePage} from '../../../contexts/cms'
import {useTemplate} from '../../../contexts/template'
import {withRedux} from '../../../store/withRedux'
import {ResolvedPageType} from '../../../types'

interface IndexFieldProps {
  fixedSlug?: string
  onRender: (page: ResolvedPageType) => JSX.Element
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const {jaenPageContext} = useTemplate()
  const page = usePage(props.fixedSlug || jaenPageContext.id)

  return props.onRender(page)
}

export default withRedux(IndexField)
