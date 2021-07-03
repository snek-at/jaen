/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {Select} from 'antd'
import pickBy from 'lodash/pickBy'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector, useStore} from 'react-redux'
import {useHistory} from 'react-router'
import {useCMSPageContext, useCMSContext} from '~/contexts/context'
import {store as storeTypes} from '~/types'

import {setHiddenChildSlugs} from '~/store/actions/cms'
import {pageDetailsSelector, pageTreeSelector} from '~/store/selectors/cms'

const {Option} = Select

type DataElement = storeTypes.PageDetails

type IndexFieldProps = {
  outerElement(dataSource?: DataElement[]): React.ReactElement
  renderItem: (
    value: DataElement,
    key: number,
    navigate: () => void
  ) => React.ReactElement
  fixedSlug?: string
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const {outerElement, renderItem, fixedSlug} = props

  const rootState = useStore<storeTypes.RootState>().getState()
  const dispatch = useDispatch<storeTypes.AppDispatch>()
  const history = useHistory()
  const {registeredPages} = useCMSContext()
  const {slug, typeName} = useCMSPageContext()

  const page = {slug, typeName}

  const pageDetails = useSelector(pageDetailsSelector(fixedSlug || slug))

  const {indexKeyRefs} = useSelector(pageTreeSelector(registeredPages))

  const editing = useSelector(
    (state: storeTypes.RootState) => state.cms.options.editing
  )

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight)
      setWidth(ref.current.clientWidth)
    }
  })

  const dataSource = pageDetails?.childSlugs.map(childSlug =>
    pageDetailsSelector(childSlug)(rootState)
  )

  const filteredDataSource = dataSource?.filter(
    x => x && !pageDetails?.hiddenChildSlugs.includes(x.slug)
  )

  const selectDefaultValues = filteredDataSource?.map(e => e && e.slug)

  const getKeyFromSlug = (slug: string) => {
    return (
      Object.keys(pickBy(indexKeyRefs, page => page.slug === slug))[0] || ''
    )
  }

  const wrapper = React.cloneElement(outerElement(dataSource), {
    ref,
    children: filteredDataSource.map((e, key) =>
      React.cloneElement(
        renderItem(e, key, () => history.push(getKeyFromSlug(e.slug)))
      )
    )
  })

  const onSelectorChange = (slugs: string[]) => {
    let newHiddenChildSlugs = dataSource
      .map(e => e.slug)
      .filter(x => !slugs.includes(x))

    dispatch(setHiddenChildSlugs({page, hiddenChildSlugs: newHiddenChildSlugs}))
  }

  return (
    <>
      {editing && width ? (
        <div style={{width, height, border: '2px dashed lightgreen'}}>
          <Select
            mode="multiple"
            allowClear
            style={{width: '100%', height}}
            placeholder="Please select"
            defaultValue={selectDefaultValues}
            onChange={onSelectorChange}>
            {dataSource.map((e, key) => (
              <Option key={key} value={e.slug}>
                {e.title}
              </Option>
            ))}
          </Select>
        </div>
      ) : (
        wrapper
      )}
    </>
  )
}

export default IndexField
