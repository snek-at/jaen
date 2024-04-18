import {Root as MdastRoot} from 'mdast'

export interface BaseEditorProps {
  mdast?: MdastRoot
  components?: Record<string, React.ComponentType<any>>
  onUpdateValue?: (value: MdastRoot) => void
  mode?: 'preview' | 'build' | 'editAndPreview' | 'editAndBuild'
}

export {MdastRoot}
