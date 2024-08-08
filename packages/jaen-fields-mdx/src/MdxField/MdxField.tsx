import {connectField, EditingProvider} from '@atsnek/jaen'
import React, {useEffect, useMemo} from 'react'

import {Preview} from './components/Preview.js'
import {BaseEditorProps, MdastRoot} from './components/types.js'

import {Image, Link} from './default-components.js'
import {defaultData} from './default-data.js'

import { TabsProps } from './components/TabsTemplate.js'
type MdxFieldValue = MdastRoot

const baseComponents = {
  Image,
  Link,
  a: (props: any) => {
    return <Link to={props.href}>{props.children}</Link>
  },
  img: (props: any) => {
    const src = props.src
    const alt = props.alt

    const name = `${src}-${alt}`

    return <Image name={name} defaultValue={src} alt={alt} />
  }
}

export interface MdxFieldProps {
  components: BaseEditorProps['components']
  tabsTemplate?: React.FC<TabsProps> // Ensure this is React.FC<TabsProps>
}

export const MdxField = connectField<MdxFieldValue, MdxFieldProps>(
  ({jaenField, components, tabsTemplate}) => {
    const [rawValue, setRawValue] = React.useState<MdastRoot | undefined>(
      jaenField.staticValue || defaultData
    )

    useEffect(() => {
      setRawValue(jaenField.value || jaenField.staticValue || defaultData)
    }, [jaenField.value])

    const combinedComponents = useMemo(() => {
      return {
        ...baseComponents,
        ...components
      }
    }, [baseComponents, JSON.stringify(components)])

    if (jaenField.isEditing) {
      // Render editor in edit mode

      return (
        <LayzEditor
          components={combinedComponents}
          onUpdateValue={jaenField.onUpdateValue}
          rawValue={rawValue}
          tabsTemplate={tabsTemplate} // Pass tabsTemplate to LayzEditor
        />
      )
    } else {
      return <Preview components={combinedComponents} mdast={rawValue} />
    }
  },
  {
    fieldType: 'IMA:MdxField'
  }
)

export const UncontrolledMdxField: React.FC<{
  components: BaseEditorProps['components']
  onUpdateValue: (value: MdastRoot) => void
  value?: MdastRoot
  isEditing?: boolean
  tabsTemplate?: React.FC<TabsProps> // Ensure this is React.FC<TabsProps>
}> = ({components, onUpdateValue, value, isEditing, tabsTemplate}) => {
  const combinedComponents = useMemo(() => {
    return {
      ...baseComponents,
      ...components
    }
  }, [baseComponents, components])

  if (isEditing) {
    // Render editor in edit mode

    return (
      <EditingProvider isEditing={isEditing}>
        <LayzEditor
          components={combinedComponents}
          onUpdateValue={onUpdateValue}
          rawValue={value}
          tabsTemplate={tabsTemplate} // Pass tabsTemplate to LayzEditor
        />
      </EditingProvider>
    )
  } else {
    return <Preview components={combinedComponents} mdast={value} />
  }
}

const LayzEditor: React.FC<{
  components: BaseEditorProps['components']
  onUpdateValue: (value: MdastRoot) => void
  rawValue?: MdastRoot
  tabsTemplate?: BaseEditorProps['tabsTemplate'] // Ensure this is React.FC<TabsProps>
}> = ({components, onUpdateValue, rawValue, tabsTemplate}) => {
  const Editor = React.lazy(async () => await import('./components/Editor.js'))

  const MemoedEditor = React.useMemo(() => Editor, [])

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoedEditor
        components={components}
        onUpdateValue={onUpdateValue}
        mode="editAndPreview"
        mdast={rawValue}
        tabsTemplate={tabsTemplate} // Pass tabsTemplate to Editor
      />
    </React.Suspense>
  )
}
