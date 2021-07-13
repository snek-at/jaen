import PdfField from '.'

type SimpleImageFieldProps = {
  name: string
}

const SimplePdfField: React.ComponentType<SimpleImageFieldProps> = ({
  name,
  ...props
}) => <PdfField fieldOptions={{fieldName: name}} {...props} />

export default SimplePdfField
