function getMaybeParentJaenPageId(jaenPageId: string) {
  // Remove the 'JaenPage ' prefix from the jaenPageId
  const path = jaenPageId.replace('JaenPage ', '')

  // Split the page path by the forward slash to get an array of path segments
  // Make sure to handle trailing slashes by filtering out empty strings
  const pathSegments = path.split('/').filter(segment => segment !== '')

  // Remove the last element (current page) from the array to get parent path segments
  const parentPathSegments = pathSegments.slice(0, -1)

  // Join the parent path segments array with a forward slash to get the parent path
  const parentPath = parentPathSegments.join('/')

  // If the parent path is empty, return 'JaenPage /' as the parent id
  if (parentPath === '') {
    return 'JaenPage /'
  }

  // Return the parent path with the 'JaenPage ' prefix
  return `JaenPage /${parentPath}/`
}
export function getJaenPageParentId(page: {
  parentPage: {id: string} | null
  id: string
}) {
  if (page.parentPage) {
    return page.parentPage.id
  }

  // Extract the maybeParentJaenPageId using the getMaybeParentJaenPageId function
  const maybeParentJaenPageId = getMaybeParentJaenPageId(page.id)

  // If the maybeParentJaenPageId is different from the current page id, return it as the parent id
  if (maybeParentJaenPageId !== page.id) {
    return maybeParentJaenPageId
  }

  // If the current page id is 'JaenPage /', it means it's the root page, so return null
  if (page.id === 'JaenPage /') {
    return null
  }

  // If all else fails, return 'JaenPage /' as the parent id (guessing the parent)
  return 'JaenPage /'
}
