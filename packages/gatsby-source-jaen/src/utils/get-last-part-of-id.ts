export function getLastPartOfId(input: string): string {
  input = input.replace('JaenPage ', '')

  // Remove leading and trailing slashes
  input = input.replace(/^\/+|\/+$/g, '')

  // Split the input string by slashes
  const parts = input.split('/').filter(part => part !== '')

  // If there are no parts, return "root"
  if (parts.length === 0) {
    return 'root'
  }

  // Get the last part of the array
  const lastPart = parts[parts.length - 1]

  if (!lastPart) {
    return 'this-should-not-happen'
  }

  return lastPart
}
