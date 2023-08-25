import {Element} from 'hast'
import {Plugin} from 'unified'
import {visit} from 'unist-util-visit'

export const rehypeUnwrapImages: Plugin<[]> = () => {
  return tree => {
    visit(tree, 'element', visitor)
  }

  function visitor(
    node: Element,
    index: number,
    parentPage: Element | undefined
  ) {
    if (node.tagName === 'img' && parent && parent.tagName === 'p') {
      parent.tagName = 'div'
    }
  }
}
