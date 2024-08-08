import {PageConfig, PageProps} from '@atsnek/jaen'

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  return (
    <>
      You cannot see this page in the node graph visualizer because it has the
      following pageConfig:
      <pre>{JSON.stringify(pageContext.pageConfig, null, 2)}</pre>
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Hidden Node',
  icon: 'FaHandMiddleFinger',
  showInNodeGraphVisualizer: false
}
