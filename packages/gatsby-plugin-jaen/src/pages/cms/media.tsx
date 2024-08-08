import {PageConfig} from 'jaen'
import {graphql, PageProps} from 'gatsby'

import MediaContainer from '../../containers/media'

const MediaPage: React.FC<PageProps> = () => {
  return <MediaContainer />
}

export default MediaPage

export const pageConfig: PageConfig = {
  label: 'Jaen CMS | Media',
  icon: 'FaImage',
  menu: {
    label: 'Media',
    type: 'app',
    group: 'cms',
    order: 300
  },
  breadcrumbs: [
    {
      label: 'CMS',
      path: '/cms/'
    },
    {
      label: 'Media',
      path: '/cms/media/'
    }
  ],
  withoutJaenFrameStickyHeader: true,
  auth: {
    isAdminRequired: true
  },
  layout: {
    name: 'jaen',
    type: 'full'
  }
}

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`

export {Head} from 'jaen'
