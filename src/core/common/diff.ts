/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  diff_match_patch as DiffMatchPatch,
  Diff,
  DIFF_INSERT,
  DIFF_DELETE,
  DIFF_EQUAL
} from 'diff-match-patch'

const dmp = new DiffMatchPatch()

/**
 * Convert a diff array into a pretty HTML report.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} HTML representation.
 */
const diffPrettyHtml = (diffs: Diff[]): string => {
  const html = []
  const patternAmp = /&/g
  const patternLt = /</g
  const patternGt = />/g
  const patternPara = /\n/g

  for (let x = 0; x < diffs.length; x++) {
    const getDetails = (n: number): {op: number; text: string} => {
      const op = diffs[n][0] // Operation (insert, delete, equal)
      const data = diffs[n][1] // Text of change.
      const text = data
        .replace(patternAmp, '&amp;')
        .replace(patternLt, '&lt;')
        .replace(patternGt, '&gt;')
        .replace(patternPara, '&para;<br>')

      return {op, text}
    }

    const details = getDetails(x)

    switch (details.op) {
      case DIFF_INSERT:
        html[x] = `<ins style="background:#e6ffe6;">${details.text}</ins>`
        break

      case DIFF_DELETE:
        html[x] = `<del style="background:#ffe6e6;">${details.text}</del>`
        break

      case DIFF_EQUAL:
        html[x] = details.text
        break
    }
  }
  return html.join('')
}

export const htmlObjectDiff = (o1: object, o2: object): string => {
  const diff = diffPrettyHtml(
    dmp.diff_main(JSON.stringify(o1, null, 2), JSON.stringify(o2, null, 2))
  )

  return diff
}
