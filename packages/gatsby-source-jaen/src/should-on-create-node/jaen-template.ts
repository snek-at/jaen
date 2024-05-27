export const shouldOnCreateNode = ({node}: {node: Record<string, unknown>}) => {
  const {internal, sourceInstanceName} = node as any

  // Check if the node is a File node of instance `templates`
  if (internal.type === 'File' && sourceInstanceName === 'templates') {
    return true
  }

  return false
}
