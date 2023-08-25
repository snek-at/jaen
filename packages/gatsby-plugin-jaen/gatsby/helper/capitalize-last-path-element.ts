/**
 * Takes a page path as input and extracts the last path element, then capitalizes it.
 * If the page path is empty (represents the root), it returns an empty string.
 * @param pagePath - The page path to extract the last element from.
 * @returns The capitalized last element of the page path, or an empty string if the path is empty.
 */
export function capitalizeLastPathElement(pagePath: string): string {
  if (!pagePath || pagePath.trim() === '/') {
    return 'Root'
  }

  const lastElement = pagePath.split('/').filter(Boolean).pop()
  if (!lastElement) {
    throw new Error('Invalid page path. The path should not be empty.')
  }

  const capitalizedLastElement =
    lastElement.charAt(0).toUpperCase() + lastElement.slice(1)
  return capitalizedLastElement
}
