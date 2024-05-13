import React, {useEffect, useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {VFileMessage} from 'vfile-message'
import {Statistics} from 'vfile-statistics'

import {ErrorFallback} from './ErrorFallback.js'
import {BaseEditorProps} from './types.js'

import {Stack} from '@chakra-ui/react'
import StatsReporterError from './StatsReporterError.js'

const FallbackComponent: React.FC<{error: Error}> = ({error}) => {
  const message = new VFileMessage(error)
  message.fatal = true
  return (
    <pre>
      <code>{String(message)}</code>
    </pre>
  )
}

export interface PreviewComponentProps {
  state: any
  stats: Statistics
  components: BaseEditorProps['components']
}

const processContent = ({
  state,
  components
}: {
  state: PreviewComponentProps['state']
  components: PreviewComponentProps['components']
}) => {
  try {
    // check if state.file.result is a functio, if not throw error

    if (typeof state.file.result !== 'function') {
      console.error(state)
      throw new Error(`Preview could not be generated.`)
    }

    return state.file.result({
      components: {
        code: ({className, ...props}: any) => {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter language={match[1]} PreTag="div" {...props} />
          ) : (
            <code className={className} {...props} />
          )
        },
        ...components,
        wrapper: ({children}: any) => {
          const Wrapper = components?.wrapper
          const el = (
            <Stack
              w="full"
              sx={{
                'mjx-container': {
                  display: 'inline-block !important',
                  verticalAlign: 'text-bottom !important'
                }
              }}>
              {children}
            </Stack>
          )

          if (Wrapper) {
            return <Wrapper>{el}</Wrapper>
          }

          return el
        }
      }
    })
  } catch (error) {
    throw error
  }
}

export const PreviewComponent: React.FC<PreviewComponentProps> = React.memo(
  ({state, stats, components}) => {
    const [content, setContent] = useState<React.ReactNode>(() =>
      processContent({state, components})
    )
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
      async function processState() {
        try {
          const result = await processContent({
            state,
            components
          })
          setContent(result)
          setError(null)
        } catch (error) {
          setError(error)
        }
      }

      processState()
    }, [state.file?.value, components])

    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <noscript>Enable JavaScript for the rendered result.</noscript>

        {state.file?.result && <>{content}</>}

        {error && <FallbackComponent error={error} />}

        <StatsReporterError state={state} stats={stats} />
      </ErrorBoundary>
    )
  }
)
