import {PageProps} from 'gatsby'

/**
 * The DynamicTemplate is rendered when there is no static site generated for a specific context.
 * It allows to render all available template page comonents with the respective data.
 */
const DynamicTemplate = (_props: PageProps) => {
  return (
    <div style={{maxWidth: `960px`, margin: `1.45rem`}}>
      <h1>__dynamic</h1>
    </div>
  )
}
export default DynamicTemplate
