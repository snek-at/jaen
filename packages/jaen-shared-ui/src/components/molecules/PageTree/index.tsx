import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition
} from '@atlaskit/tree'
import {AddIcon, DeleteIcon, LockIcon, PhoneIcon} from '@chakra-ui/icons'
import {
  Box,
  Text,
  useColorModeValue,
  Badge,
  Flex,
  Spacer,
  HStack,
  useDisclosure,
  Portal
} from '@chakra-ui/react'
import {ContextMenu} from '@components/atoms'
import {
  FileIcon,
  FolderCloseIcon,
  FolderOpenIcon
} from '@components/atoms/icons'
import styled from '@emotion/styled'
import {MouseEvent, useState, useMemo, useEffect} from 'react'

import {CreatePageModal} from '../modals'
import {resolveChildSlugs, titleToSlug, TreeConverter} from './treeconverter'

export type Items = {
  [id: string]: {
    data: Partial<{
      title: string
      slug: string
      locked?: boolean
    }>
    isRootItem?: true
    children: string[]
    parent: string | null
    deleted?: true
  }
}

type PageTreeProps = {
  items: Items
  rootItemIds: string[]
  defaultSelection: string
  height: number | string
  templates: string[]
  onItemSelect: (id: string | null) => void
  onItemCreate: (
    parentId: string | null,
    title: string,
    slug: string,
    template: string
  ) => void
  onItemDelete: (id: string) => void
  onItemMove: (id: string, newParentId: string | null) => void
}

const PADDING_PER_LEVEL = 16
const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
  margin-right: 5px;
`

const PageTree: React.FC<PageTreeProps> = ({
  items,
  rootItemIds,
  defaultSelection,
  ...props
}) => {
  const itemBgColor = useColorModeValue('blue.100', 'blue.400')
  // convert items to a set
  const [tree, setTree] = useState(TreeConverter(items))

  const [selectedItem, selectItem] = useState<string>(defaultSelection)

  const [contextMenu, setContextMenu] = useState<{
    id: string | null
    spawnX: number
    spawnY: number
  } | null>(null)

  const addPageDisclousure = useDisclosure()

  const renderedContextMenu = (
    <Portal>
      {contextMenu && (
        <Box
          pos="absolute"
          top={contextMenu.spawnY}
          left={contextMenu.spawnX}
          w="3xs"
          zIndex="popover">
          <ContextMenu
            items={
              contextMenu.id !== null
                ? [
                    {
                      _type: 'ITEM',
                      content: (
                        <HStack spacing={2}>
                          <AddIcon />
                          <Text>Add page</Text>
                        </HStack>
                      ),
                      onItemClick: () => {
                        addPageDisclousure.onOpen()
                        setContextMenu(null)
                      }
                    }
                  ].concat(
                    items[contextMenu.id].data.locked
                      ? []
                      : [
                          {_type: 'DIVIDER'} as any,
                          {
                            _type: 'ITEM',
                            content: (
                              <HStack spacing={2}>
                                <DeleteIcon />
                                <Text>Delete</Text>
                              </HStack>
                            ),
                            onItemClick: () => {
                              setContextMenu(null)
                              props.onItemDelete(selectedItem)
                            }
                          }
                        ]
                  )
                : ([
                    {
                      _type: 'ITEM',
                      content: (
                        <HStack spacing={2}>
                          <AddIcon />
                          <Text>Add page</Text>
                        </HStack>
                      ),
                      onItemClick: () => {
                        addPageDisclousure.onOpen()
                        setContextMenu(null)
                      }
                    }
                  ] as any)
            }
          />
        </Box>
      )}
    </Portal>
  )

  useEffect(() => {
    setTree(TreeConverter(items))
  }, [items])

  const handleSelectItem = (id?: string | null) => {
    const finalId = id || defaultSelection
    selectItem(finalId)
    setContextMenu(null)
    props.onItemSelect(finalId)
  }

  const handleClick = (event: MouseEvent, id: string | null) => {
    event.stopPropagation()

    handleSelectItem(id)
  }

  const handleContextMenu = (event: MouseEvent, id: string | null) => {
    event.preventDefault()
    event.stopPropagation()

    selectItem(id || defaultSelection)

    setContextMenu({id, spawnX: event.clientX, spawnY: event.clientY})
  }

  const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void
  ) => {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <PreTextIcon onClick={() => onCollapse(item.id)}>
          <FolderOpenIcon />
        </PreTextIcon>
      ) : (
        <PreTextIcon onClick={() => onExpand(item.id)}>
          <FolderCloseIcon />
        </PreTextIcon>
      )
    }
    return (
      <PreTextIcon>
        <FileIcon />
      </PreTextIcon>
    )
  }

  const renderItem = ({
    item,
    onExpand,
    onCollapse,
    provided
  }: RenderItemParams) => {
    const disableDnD = !!item.data.locked

    const renderedItem = (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={2}
        userSelect="none"
        // @ts-ignore
        onMouseDown={e => {
          disableDnD && e.stopPropagation()
        }}
        onClick={e => handleClick(e, item.id.toString())}
        onContextMenu={e => handleContextMenu(e, item.id.toString())}
        _hover={{bg: itemBgColor}}
        bg={selectedItem === item.id ? itemBgColor : ''}>
        <Flex>
          <Box>
            {getIcon(item, onExpand, onCollapse)}
            {item.data ? item.data.title : ''}
          </Box>
          <Spacer />
          <Box>{disableDnD ? <LockIcon /> : null}</Box>
        </Flex>
      </Box>
    )

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          ...provided.draggableProps.style,
          top: 'auto !important',
          left: 'auto !important'
        }}>
        {!(item as any).deleted && renderedItem}
      </div>
    )
  }

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, {isExpanded: true}))
  }

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, {isExpanded: false}))
  }

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) {
      return
    }

    const movedItemId = tree.items[source.parentId].children[
      source.index
    ].toString()

    const dstId = destination.parentId.toString()

    if (
      tree.items[dstId].children
        .map(child => tree.items[child.toString()].data.slug)
        .indexOf(tree.items[movedItemId].data.slug) === -1
    ) {
      const newTree = moveItemOnTree(tree, source, destination)

      setTree(mutateTree(newTree, destination.parentId, {isExpanded: true}))
      handleSelectItem(movedItemId)

      props.onItemMove(
        movedItemId,
        dstId === tree.rootId.toString() ? null : dstId
      )
    }
  }

  return (
    <div
      style={{height: props.height, overflow: 'auto'}}
      onClick={e => handleClick(e, null)}
      onContextMenu={e => {
        handleContextMenu(e, null)
      }}>
      {renderedContextMenu}
      <Tree
        tree={tree}
        renderItem={renderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        offsetPerLevel={PADDING_PER_LEVEL}
        isDragEnabled
        isNestingEnabled
      />
      <CreatePageModal
        isOpen={addPageDisclousure.isOpen}
        templates={props.templates}
        onClose={addPageDisclousure.onClose}
        onCreate={(name, template) => {
          props.onItemCreate(
            contextMenu?.id || null,
            name,
            titleToSlug(name),
            template
          )
        }}
        onValidate={name => {
          const slug = titleToSlug(name)

          if (
            !slug ||
            resolveChildSlugs(
              items,
              rootItemIds,
              contextMenu?.id || null
            ).includes(slug)
          ) {
            return false
          }

          return true
        }}
      />
    </div>
  )
}

export default PageTree
