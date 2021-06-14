import {GenericBC} from '~/components/blocks'

type StreamFieldProps = {
  name: string
  blocks: GenericBC[]
}

const StreamField: React.FC<StreamFieldProps> = ({name, blocks}) => {
  console.log(name, blocks)
  const storeBlocks = storePageData.fields[name].blocks

  const getBlockComponentByTypeName = (typeName: string) =>
    blocks.find(b => b.BlockType === typeName)

  const renderBlock = (position: number) => {
    const Block = getBlockComponentByTypeName(storeBlocks[position].typeName)
    console.log(Block, storeBlocks)
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

  // Object.entries does automatically sort the keys by position 0->n
  return (
    <>
      {Object.keys(storeBlocks).map(position =>
        renderBlock(parseInt(position))
      )}
    </>
  )
}

export default StreamField

const storePageData: {
  fields: {
    [name: string]: {
      blocks: {
        [position: string]: {
          typeName: string
          fields: {[name: string]: number | string | boolean}
        }
      }
    }
  }
} = {
  fields: {
    timeline: {
      blocks: {
        0: {
          typeName: 'TimelineBlock',
          fields: {
            date: '20.10.2001',
            heading: 'Welcome',
            body: '<b>bold body</b>'
          }
        }
      }
    }
  }
}
