import {useSelector, useStore} from 'react-redux'
import {store} from '~/types'

import {GenericBC} from '~/components/blocks'

import {useCMSPageContext} from '../../contexts/context'

type StreamFieldProps = {
  name: string
  blocks: GenericBC[]
}

const StreamField: React.FC<StreamFieldProps> = ({name, blocks}) => {
  const context = useCMSPageContext()
  const store = useStore<store.RootState>()

  // const storeBlocks = storePageData.fields[name].blocks //
  let storeWorkingBlocks = useSelector(
    ({cms}: store.RootState) =>
      cms.dataLayer.working.pages[context.page.slug]?.fields[name]?.blocks
  )

  let storeBlocks =
    store.getState().cms.dataLayer.editing.pages[context.page.slug]?.fields[
      name
    ]?.blocks

  if (!storeBlocks) {
    storeBlocks = storeWorkingBlocks
  }

  const getBlockComponentByTypeName = (typeName: string) =>
    blocks.find(b => b.BlockType === typeName)

  const renderBlock = (position: number) => {
    const blockTypeName = storeBlocks?.[position].typeName

    if (blockTypeName) {
      const Block = getBlockComponentByTypeName(blockTypeName)
      if (Block) {
        return (
          <Block
            key={position}
            fieldOptions={{
              fieldName: name,
              block: {position, typeName: Block.BlockType}
            }}
          />
        )
      }
    }
  }

  // Object.entries does automatically sort the keys by position 0->n

  if (storeBlocks) {
    return (
      <>
        {Object.keys(storeBlocks).map(position =>
          renderBlock(parseInt(position))
        )}
      </>
    )
  }

  return null
}

export default StreamField

// const storePageData: {
//   fields: {
//     [name: string]: {
//       blocks: {
//         [position: string]: {
//           typeName: string
//           fields: {[name: string]: number | string | boolean}
//         }
//       }
//     }
//   }
// } = {
//   fields: {
//     timeline: {
//       blocks: {
//         0: {
//           typeName: 'TimelineBlock',
//           fields: {
//             date: '20.10.2001',
//             heading: 'Welcome',
//             body: '<b>bold body</b>'
//           }
//         }
//       }
//     }
//   }
// }
