import {PageConfig, PageProps} from '@atsnek/jaen'

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  return (
    <>
      <h1>Wholesale</h1>
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Wholesale',
  icon: 'FaWarehouse',
  auth: {
    isRequired: true,
    roles: ['4d84a68f-7b18-4efe-ae73-d6d3dd226110']
  }
}
