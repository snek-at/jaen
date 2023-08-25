import {Selector} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'

/**
 * This hook uses JSON.stringify to perform a equality check.
 * This approach is sensitive to the properties ordering and shouldn't be used
 * for usecases where that matters.
 *
 * @param selector
 * @returns
 */
export function useDeepEqualSelector(selector: Selector) {
  return useSelector(
    selector,
    (l, r) => JSON.stringify(l) === JSON.stringify(r)
  )
}
