import {BlockContext} from '../contexts/block'
import {IJaenConnection} from '../types'

export interface IBlockOptions {
  label: string
  name: string
  Icon?: React.ComponentType
}

/**
 * Connects a block to a section with Jaen, a content management system.
 *
 * This function enables you to wrap a block component with Jaen-specific functionality and configurations.
 *
 * @template P - The type of props that the connected component receives.
 * @param {React.ComponentType<P>} Component - The component to wrap with Jaen functionality.
 * @param {IBlockOptions} options - Configuration options for the block.
 * @returns {React.ComponentType<IJaenConnection<P, typeof options>>} The wrapped block component.
 *
 * @example
 * // Example usage of connectBlock:
 * export default connectBlock(
 *   p => {
 *     return (
 *       <>
 *         <h2>Block Section</h2>
 *         <p>{JSON.stringify(p)}</p>
 *       </>
 *     )
 *   },
 *   {
 *     label: 'Sample Block',
 *     name: 'sample-block',
 *     Icon: SomeIconComponent, // Optional: An icon component for the block (if available)
 *   }
 * );
 *
 */
export const connectBlock = <P extends {}>(
  Component: React.ComponentType<P>,
  options: IBlockOptions
) => {
  const MyComp: IJaenConnection<P, typeof options> = props => {
    return (
      <BlockContext.Provider value={options}>
        <Component {...props} />
      </BlockContext.Provider>
    )
  }

  MyComp.options = options

  return MyComp
}
export type IBlockConnection = ReturnType<typeof connectBlock>
