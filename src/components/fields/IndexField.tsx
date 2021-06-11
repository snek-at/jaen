import {Select} from 'antd'
import pickBy from 'lodash/pickBy'
import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {useCMSPageContext, useCMSContext} from '~/contexts/context'
import {store} from '~/types'

const {Option} = Select

type DataElement = store.PageIndex['pages'][string]

type IndexFieldProps = {
  outerElement(dataSource?: DataElement[]): React.ReactElement
  renderItem: (
    value: DataElement,
    key: number,
    navigate: () => void
  ) => React.ReactElement
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const history = useHistory()
  const cmsContext = useCMSContext()
  const pageContext = useCMSPageContext()

  const editing = useSelector(
    (state: store.RootState) => state.cms.options.editing
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

  const {outerElement, renderItem} = props
  const dataSource = pageContext.getChildPagesFromIndex()
  const filteredDataSource = dataSource.filter(
    x => !pageContext.getHiddenSlugs().includes(x.slug)
  )
  const selectDefaultValues = filteredDataSource.map(e => e.slug)

  const getKeyFromSlug = (slug: string) => {
    const refs = cmsContext.keyRefs?.indexKey
    return Object.keys(pickBy(refs, page => page.slug === slug))[0] || ''
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

    pageContext.setHiddenChildSlugs(newHiddenChildSlugs)
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
