import {usePage} from '../../../contexts/cms'
import {useTemplate} from '../../../contexts/template'
import {useAppSelector} from '../../../store'
import {withRedux} from '../../../store/withRedux'
import {ResolvedPageType} from '../../../types'

interface IndexFieldProps {
  fixedSlug?: string
  onRender: (page: ResolvedPageType) => JSX.Element
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const template = useTemplate()
  const page = usePage(props.fixedSlug || template.pageId)

  return props.onRender(page)
}

export default withRedux(IndexField)
