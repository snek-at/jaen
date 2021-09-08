// import {CKEditor} from '@ckeditor/ckeditor5-react'
import {Box} from '@chakra-ui/react'
import styled from '@emotion/styled'
import loadable from '@loadable/component'
import * as React from 'react'

import './style.css'

const EditorWrapper = styled(Box)`
  display: inline-block;
  width: 100%;

  .ck-content > * {
    all: revert;
  }
`

const LoadableCKEditor = loadable(() => import('@ckeditor/ckeditor5-react'), {
  resolveComponent: (editor: {CKEditor: any}) => editor.CKEditor
})

type EditorProps = {
  data: string
  editing: boolean
  disableToolbar: boolean
  toolbarType: 'inline' | 'balloon'
  onChange: (data: string) => void
}

const Editor: React.FC<EditorProps> = props => {
  const raw = (
    <Box
      className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"
      dangerouslySetInnerHTML={{__html: props.data}}
    />
  )

  const editorConfig: {[key: string]: any} = {
    editorClass: 'dasjdaioshdiashdiu',
    mediaEmbed: {
      previewsInData: true
    }
  }

  if (props.disableToolbar) {
    editorConfig['toolbar'] = []
  }

  return (
    <EditorWrapper className="testestest">
      {props.editing ? (
        <LoadableCKEditor
          fallback={raw}
          //@ts-ignore
          editor={
            props.toolbarType === 'balloon' &&
            typeof window !== 'undefined' &&
            require('@ckeditor/ckeditor5-build-balloon')
          }
          config={editorConfig}
          data={props.data}
          onLoad={(editor: any) => {
            editor.writer.addClass('revert-css')
          }}
          //@ts-ignore
          onChange={(event, editor) => {
            const data = editor.getData()
            props.onChange(data)
          }}
        />
      ) : (
        <>{raw}</>
      )}
    </EditorWrapper>
  )
}

// // A custom React Hook for using CKEditor with SSR
// // particularly with NextJS.
// // https://ckeditor.com | https://nextjs.org

// export function useCKEditor() {
//   const editorRef = useRef()
//   const [isEditorLoaded, setIsEditorLoaded] = useState(false)
//   const {CKEditor, InlineEditor} = editorRef.current || {}

//   useEffect(() => {
//     editorRef.current = {
//       // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
//       CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
//       InlineEditor: require('@ckeditor/ckeditor5-build-inline')
//     }
//     setIsEditorLoaded(true)
//   }, [])

//   return Object.freeze({
//     isEditorLoaded,
//     CKEditor,
//     InlineEditor
//   })
// }

export default Editor
