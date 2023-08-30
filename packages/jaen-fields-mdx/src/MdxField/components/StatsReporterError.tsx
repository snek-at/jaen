import type {VFile} from 'vfile'
import {Statistics} from 'vfile-statistics'

export const StatsErrorReporter: React.FC<{
  stats: Statistics
  state: any
}> = ({stats, state}) => {
  const vfileReporter = (file: VFile) => {
    return JSON.stringify(file.messages, null, 2)
  }

  return (
    <>
      {stats.fatal || stats.warn ? (
        <pre>
          <code>{vfileReporter(state.file)}</code>
        </pre>
      ) : null}
    </>
  )
}

export default StatsErrorReporter
