/**
 *  Checks if the link is internal or external
 * @param href  - The href of the link
 * @returns   - Whether the link is internal or not
 */
export function isInternalLink(href: string) {
  // Check if the link starts with a forward slash (/) or a dot (./ or ../) or with a hash (#) or with a question mark (?)
  return (
    href.startsWith('/') ||
    href.startsWith('./') ||
    href.startsWith('../') ||
    href.startsWith('#') ||
    href.startsWith('?')
  )
}
