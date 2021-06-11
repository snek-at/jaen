import {Select} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {useCMSPageContext} from '~/contexts/context'
import {store} from '~/types'

const {Option} = Select

type DataElement = store.PageIndex['pages'][string]

type IndexFieldProps = {
  outerElement(dataSource?: DataElement[]): React.ReactElement
  renderItem: (value: DataElement, key: number) => React.ReactElement
}

const IndexField: React.FC<IndexFieldProps> = props => {
  const context = useCMSPageContext()

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
  const dataSource = context.getChildPagesFromIndex()
  const filteredDataSource = dataSource.filter(
    x => !context.getHiddenSlugs().includes(x.slug)
  )
  const selectDefaultValues = filteredDataSource.map(e => e.slug)

  const wrapper = React.cloneElement(outerElement(dataSource), {
    ref,
    children: filteredDataSource.map((e, key) =>
      React.cloneElement(renderItem(e, key))
    )
  })

  const onSelectorChange = (slugs: string[]) => {
    let newHiddenChildSlugs = dataSource
      .map(e => e.slug)
      .filter(x => !slugs.includes(x))

    context.setHiddenChildSlugs(newHiddenChildSlugs)
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
