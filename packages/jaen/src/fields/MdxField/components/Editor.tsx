import {Badge, Box, HStack, Icon} from '@chakra-ui/react'
import {markdown, markdownLanguage} from '@codemirror/lang-markdown'
import {languages} from '@codemirror/language-data'
import CodeMirror, {ReactCodeMirrorProps} from '@uiw/react-codemirror'
import type {EditorView} from 'codemirror'
import React, {useCallback, useEffect, useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {statistics, Statistics} from 'vfile-statistics'

import {ErrorFallback} from './ErrorFallback'
import {PreviewComponent} from './PreviewComponent'
import TabsTemplate from './TabsTemplate'
import {useMdx} from '../use-mdx'
import {BaseEditorProps} from './types'
import {FaEdit, FaEye} from 'react-icons/fa'

const MemoizedCodeMirror = React.memo<ReactCodeMirrorProps>(props => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CodeMirror {...props} />
    </ErrorBoundary>
  )
})

export interface EditorProps extends BaseEditorProps {}

export const Editor: React.FC<EditorProps> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [defaultValue, _] = useState(props.mdast)

  const [state, setConfig] = useMdx({
    gfm: true,
    frontmatter: true,
    math: true,
    directive: true,
    mdast: defaultValue
  }) as any

  const [view, setView] = React.useState<EditorView | null>(null)

  const componentsInfo = Object.entries(props.components || {}).filter(
    ([name]) => {
      return name[0] === name[0]?.toUpperCase()
    }
  )

  const stats = state.file ? statistics(state.file) : ({} as Statistics)

  const onUpdate = useCallback(
    (v: {docChanged: any; state: {doc: any}}) => {
      if (v.docChanged) {
        const value = String(v.state.doc)

        setConfig({...state, value})
      }
    },
    [setConfig]
  )

  // const onUpdate = useCallback(
  //   (v: {docChanged: any; state: {doc: any}}) => {
  //     if (v.docChanged) {
  //       console.log('docChanged 2', v)

  //       const value = String(v.state.doc)

  //       setConfig({...state, value})
  //     }
  //   },
  //   [setConfig]
  // )

  const insertSnippet = (snippet: string) => {
    if (!view) return

    // Get the current selection
    const {from, to} =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      view.state.selection.ranges[view.state.selection.mainIndex]!

    // Check if there is a selection
    if (from !== to) {
      // Replace the selected text with the snippet
      const changes = {from, to, insert: snippet}
      const tr = view.state.update({
        changes: {from: changes.from, to: changes.to, insert: changes.insert}
      })
      view.dispatch(tr)
    } else if (from === 0 && to === 0) {
      // Insert the snippet at the end of the file
      const changes = {
        from: view.state.doc.length,
        to: view.state.doc.length,
        insert: `\n${snippet}\n`
      }
      const tr = view.state.update({
        changes: {from: changes.from, to: changes.to, insert: changes.insert}
      })
      view.dispatch(tr)
    } else {
      // Get the cursor position
      const cursor = view.state.selection.main.head

      // Get the current line content
      const lineContent = view.state.doc.lineAt(cursor).text

      // Check if the line is empty
      const isEmptyLine = lineContent.trim() === ''

      // Insert the snippet with or without a newline depending on the line content
      const changes = {
        from: cursor,
        to: cursor,
        insert: snippet + (isEmptyLine ? '\n' : '')
      }
      const tr = view.state.update({
        changes: {from: changes.from, to: changes.to, insert: changes.insert}
      })
      view.dispatch(tr)
    }
  }

  useEffect(() => {
    props.onUpdateValue?.(state.file.data.mdast)
  }, [state.file.data?.mdast])

  return (
    <TabsTemplate
      tabs={[
        {
          label: (
            <HStack spacing={2}>
              <Icon as={FaEye} />
              <Box>Preview</Box>
              {stats.fatal ? (
                <Badge colorScheme="red">Error</Badge>
              ) : stats.warn ? (
                <Badge colorScheme="yellow">Warning</Badge>
              ) : null}
            </HStack>
          ),
          content: (
            <PreviewComponent
              state={state}
              stats={stats}
              components={props.components}
            />
          )
        },
        {
          label: (
            <HStack spacing={2}>
              <Icon as={FaEdit} />
              <Box>Editor</Box>
            </HStack>
          ),
          content: (
            <>
              <noscript>Enable JavaScript for the rendered result.</noscript>

              <MemoizedCodeMirror
                value={state.value}
                extensions={[
                  markdown({base: markdownLanguage, codeLanguages: languages})
                ]}
                onCreateEditor={editorView => {
                  setView(editorView)
                }}
                onUpdate={onUpdate}
                theme="dark"
              />
            </>
          )
        }
      ]}
      componentsInfo={componentsInfo.map(([name, component]) => ({
        label: component.displayName || name,
        onClick: () => {
          const props = Object.entries(
            component.defaultProps || {}
          ).reduce<any>((acc, [name, value]) => {
            // skip if children
            if (name === 'children') return acc

            if (typeof value === 'function') {
              const result = value()
              acc[name] = processValue(result)
            } else {
              acc[name] = processValue(value)
            }

            return acc
          }, {})

          function processValue(value: any) {
            if (typeof value === 'string') {
              return `"${value}"`
            } else if (typeof value === 'number') {
              return value
            } else if (typeof value === 'boolean') {
              return value
            } else if (typeof value === 'object') {
              return `{${JSON.stringify(value)}}`
            } else {
              return value
            }
          }

          // Generate a usage snippet with filled-in placeholder props.
          const propsChain = Object.entries(props)
            .map(([name, value]) => `${name}=${value}`)
            .join(' ')

          const snippet = `<${name}${propsChain && ' ' + propsChain}>${
            // @ts-expect-error
            component.defaultProps?.children || ''
          }</${name}>`

          // Insert the snippet into the editor at the current cursor position.
          insertSnippet(snippet)
        }
      }))}
      selectedTab={0}
    />
  )
}

export default Editor
