export const toSlug = (path: string): string => {
  // path: SitePage /foo/bar/
  const pathParts = path.split('/')
  const slug = pathParts[pathParts.length - 2]
  return slug
}

export const toPath = (
  parentPath: string | null,
  slug: string,
  prefix = 'SitePage'
): string => {
  // replace spaces with dashes and lowercase
  const cleanSlug = slug.replaceAll(' ', '-').toLowerCase()

  // if parentPath is null, we are at the root
  if (parentPath === null) {
    return `${prefix} /${cleanSlug}/`
  }

  return `${parentPath + cleanSlug}/`
}

export const toParentPath = (path: string): string => {
  const parentPath = path.substring(0, path.lastIndexOf('/'))

  return parentPath
}
