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
    roles: ['260237544631828483:kassabuch:admin']
  }
}
