import {Box} from '@chakra-ui/react'
import styled from '@emotion/styled'
import loadable from '@loadable/component'
import * as React from 'react'

import './style.css'

const EditorWrapper = styled(Box)`
  width: 100%;

  .ck-content > * {
    all: revert;
  }
`

const LoadableCKEditor = loadable(() => import('@ckeditor/ckeditor5-react'), {
  resolveComponent: (editor: {CKEditor: any}) => editor.CKEditor
})

type EditorProps = {
  defaultData: {value: string; shouldOverrideRand?: number}
  editing: boolean
  disableToolbar: boolean
  onChange: (data: string) => void
}

let BalloonEditor: any = undefined

const Editor: React.FC<EditorProps> = props => {
  const raw = (
    <Box
      className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"
      dangerouslySetInnerHTML={{__html: props.defaultData.value}}
    />
  )

  const editorConfig: {[key: string]: any} = {
    mediaEmbed: {
      previewsInData: true
    }
  }

  if (props.disableToolbar) {
    editorConfig['toolbar'] = []
  }

  const [editor, setEditor] = React.useState(BalloonEditor)

  React.useEffect(() => {
    async function load() {
      if (!BalloonEditor && props.editing) {
        //@ts-ignore
        BalloonEditor = await import('@ckeditor/ckeditor5-build-balloon')

        setEditor(BalloonEditor)
      }
    }

    load()
  })

  return (
    <EditorWrapper>
      {props.editing && editor ? (
        <LoadableCKEditor
          fallback={raw}
          //@ts-ignore
          editor={editor?.default}
          config={editorConfig}
          data={props.defaultData.value}
          //@ts-ignore
          onChange={(event, editor) => {
            const data = editor.getData()
            props.onChange(data)
          }}
          onLoad={(editor: any) => {
            editor.writer.addClass('revert-css')
          }}
        />
      ) : (
        <>{raw}</>
      )}
    </EditorWrapper>
  )
}

export default React.memo(Editor, (prev, next) => {
  return (
    prev.defaultData.shouldOverrideRand ===
      next.defaultData.shouldOverrideRand || prev.editing === next.editing
  )
})
