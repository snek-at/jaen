import {Root as MdastRoot} from 'mdast'
import {TabsProps} from './TabsTemplate'

export interface BaseEditorProps {
  components: Record<string, React.ComponentType<any>>;
  onUpdateValue: (value: any) => void;
  mdast?: any;
  tabsTemplate?: React.FC<TabsProps>; // Update this line
  mode?: 'preview' | 'build' | 'editAndPreview' | 'editAndBuild'
}

export {MdastRoot}
