import {
  Field,
  PageConfig,
  PageProps,
  useCMSManagementContext
} from '@atsnek/jaen'
import {CMSManagement} from 'gatsby-plugin-jaen'

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  const manager = useCMSManagementContext()

  return <pre>{JSON.stringify(manager.tree, null, 2)}</pre>
}

export default (props: any) => (
  <CMSManagement>
    <Page {...props} />
  </CMSManagement>
)

export const pageConfig: PageConfig = {
  label: 'Tree',
  icon: 'FaTree'
}
