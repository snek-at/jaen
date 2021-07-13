import ImageField from '.'

type SimpleImageFieldProps = {
  name: string
}

const SimpleImageField: React.ComponentType<SimpleImageFieldProps> = ({
  name,
  ...props
}) => <ImageField fieldOptions={{fieldName: name}} {...props} />

export default SimpleImageField
