export const shouldOnCreateNode = ({node}: {node: Record<string, unknown>}) => {
  const {internal} = node as any

  // Check if the node is a File node of instance `templates`
  if (internal.type === 'JaenPage') {
    return true
  }

  return false
}
