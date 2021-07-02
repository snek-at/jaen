/*
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from '@draft-js-plugins/buttons'
import Editor, {createEditorStateWithText} from '@draft-js-plugins/editor'
import createImagePlugin from '@draft-js-plugins/image'
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import {EditorState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import {stateFromHTML} from 'draft-js-import-html'
import React, {Fragment, useEffect, useRef, useState} from 'react'
import {useMemo} from 'react'

import type {AtLeastOne} from '~/common/utils'

import './editor.css'

export type ButtonOptions = AtLeastOne<{
  bold: boolean
  italic: boolean
  underline: boolean
  code: boolean
  headlineOne: boolean
  headlineTwo: boolean
  headlineThree: boolean
  unorderedList: boolean
  orderedList: boolean
  blockquote: boolean
  codeBlock: boolean
}>

interface SidebarEditorProps {
  text?: string
  onChange: (content: string) => void
  buttonOptions?: ButtonOptions
  editable?: boolean
  recreateTrigger?: any
}

const SidebarEditor: React.FC<SidebarEditorProps> = ({
  text = 'No content available',
  onChange,
  buttonOptions,
  editable = true,
  recreateTrigger = undefined
}) => {
  //   const [plugins, SideToolbar] = useMemo(() => {
  //     const sideToolbarPlugin = createSideToolbarPlugin({
  //       position: 'right'
  //     })
  //     return [[sideToolbarPlugin], sideToolbarPlugin.SideToolbar]
  //   }, [])

  const [plugins, InlineToolbar] = useMemo(() => {
    const imagePlugin = createImagePlugin()
    const linkifyPlugin = createLinkifyPlugin()

    const toolbarPlugin = createInlineToolbarPlugin()

    return [
      [toolbarPlugin, imagePlugin, linkifyPlugin],
      toolbarPlugin.InlineToolbar
    ]
  }, [])

  // const [{plugins, SideToolbar}] = useState(() => {

  //   const toolbarPlugin = createInlineToolbarPlugin({position: 'right'})
  //   const imagePlugin = createImagePlugin()
  //   const {SideToolbar} = toolbarPlugin
  //   const plugins = [toolbarPlugin, imagePlugin]
  //   return {
  //     plugins,
  //     SideToolbar
  //   }
  // })

  const editorRef = useRef<Editor | null>(null)

  const [editorState, setEditorState] = useState(() => {
    if (buttonOptions) {
      return EditorState.createWithContent(stateFromHTML(text))
    } else {
      return createEditorStateWithText(text)
    }
  })

  useEffect(() => {
    let es: EditorState

    // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
    if (buttonOptions) {
      es = EditorState.createWithContent(stateFromHTML(text))
    } else {
      es = createEditorStateWithText(text)
    }

    setEditorState(es)
  }, [recreateTrigger])

  const onValueChange = (value: EditorState): void => {
    const toHTMLContent = (es: EditorState) =>
      stateToHTML(es.getCurrentContent())
    const toTextContent = (es: EditorState) =>
      es.getCurrentContent().getPlainText('\u0001')

    let previousContent: string = ''
    let content: string = ''

    if (buttonOptions) {
      previousContent = toHTMLContent(editorState)
      content = toHTMLContent(value)
    } else {
      previousContent = toTextContent(editorState)
      content = toTextContent(value)
    }

    if (previousContent !== content) {
      onChange(content)
    }

    setEditorState(value)
  }

  return (
    <div onClick={() => editorRef.current && editorRef.current.focus()}>
      <Editor
        readOnly={!editable}
        editorKey="InlineEditor"
        editorState={editorState}
        onChange={onValueChange}
        plugins={plugins}
        ref={(editor: any) => (editorRef.current = editor)}
      />
      {buttonOptions && editable && (
        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            externalProps => (
              <Fragment>
                {buttonOptions.bold && <BoldButton {...externalProps} />}
                {buttonOptions.italic && <ItalicButton {...externalProps} />}
                {buttonOptions.underline && (
                  <UnderlineButton {...externalProps} />
                )}
                {buttonOptions.codeBlock && <CodeButton {...externalProps} />}
                {buttonOptions.headlineOne && (
                  <HeadlineOneButton {...externalProps} />
                )}
                {buttonOptions.headlineTwo && (
                  <HeadlineTwoButton {...externalProps} />
                )}
                {buttonOptions.headlineThree && (
                  <HeadlineThreeButton {...externalProps} />
                )}
                {buttonOptions.unorderedList && (
                  <UnorderedListButton {...externalProps} />
                )}
                {buttonOptions.orderedList && (
                  <OrderedListButton {...externalProps} />
                )}
                {buttonOptions.blockquote && (
                  <BlockquoteButton {...externalProps} />
                )}
                {buttonOptions.codeBlock && (
                  <CodeBlockButton {...externalProps} />
                )}
              </Fragment>
            )
          }
        </InlineToolbar>
      )}
    </div>
  )
}

export default SidebarEditor
