import {Box, Button, HStack, Stack, Text} from '@chakra-ui/react'
import * as React from 'react'
import {FaArrowDown, FaArrowUp, FaTrash} from 'react-icons/fa'
import {FiBox} from 'react-icons/fi'

import {TuneSelectorButton} from '../../components/TuneSelectorButton'
import {IBlockConnection} from '../../connectors/connect-block'
import {JaenSectionBlockProvider} from '../../contexts/block'
import {useNotificationsContext} from '../../contexts/notifications'
import {useContentManagement} from '../../hooks/use-content-management'
import {useSectionField} from '../../hooks/use-section-field'
import {withRedux} from '../../redux'
import {IJaenBlock} from '../../types'
import {HighlightTooltip} from '../components/HighlightTooltip'
import {
  SelectorBlockAddType,
  SelectorBlockType
} from './components/SectionBlockSelector'
import {SectionBlockSelectorButton} from './components/SectionBlockSelectorButton'

type SectionPropsCallback = (args: {
  count: number
  totalSections: number
  section: IJaenBlock
}) => Record<string, any>

export interface SectionFieldProps {
  name: string // chapterName
  label: string
  blocks: IBlockConnection[]
  as?: React.ComponentType<React.HTMLAttributes<HTMLElement>>
  sectionAs?: React.ComponentType<React.HTMLAttributes<HTMLElement>>
  props?: Record<string, any>
  sectionProps?: Record<string, any> | SectionPropsCallback
  className?: string
  style?: React.CSSProperties
  sectionClassName?: string
  sectionStyle?: React.CSSProperties
}

export const SectionField = withRedux(
  ({name, label, blocks: unfilteredBlocks, ...rest}: SectionFieldProps) => {
    const {confirm, toast} = useNotificationsContext()

    // Avoid duplicate blocks. The last block with the same name will be used
    const blocks = unfilteredBlocks.reduce<IBlockConnection[]>((acc, block) => {
      const index: number = acc.findIndex(
        el => el.options.name === block.options.name
      )

      if (index === -1) {
        return [...acc, block]
      }

      return [...acc.slice(0, index), block, ...acc.slice(index + 1)]
    }, [])

    const {
      onSectionAdd,
      onSectionDelete,
      onSectionMove,
      onSectionAppend,
      onSectionPrepend,
      section,
      sectionsDict,
      sectionPath
    } = useSectionField(name, blocks)

    const {isEditing} = useContentManagement()

    const Wrapper = rest.as || Stack

    let tooltipButtons = [
      <Button
        key="section-field-tooltip-button-add"
        variant="jaenHighlightTooltipText"
        size="xs">
        <Text as="span" noOfLines={1}>
          {label}
        </Text>
      </Button>
    ]

    const blocksForSelector: SelectorBlockType[] = blocks.map(({options}) => ({
      slug: options.name,
      label: options.label,
      Icon: options.Icon || FiBox
    }))

    const handleSectionAdd = (
      block: SelectorBlockType,
      type: SelectorBlockAddType,
      item?: IJaenBlock
    ) => {
      if (item) {
        if (type === 'prepend') {
          onSectionPrepend(block.slug, item.id, item.ptrPrev)
        } else if (type === 'append') {
          onSectionAppend(block.slug, item.id, item.ptrNext)
        } else {
          onSectionAdd(block.slug, [item.id, item.ptrNext])
        }
      } else {
        if (type === 'prepend' && section.ptrHead) {
          onSectionPrepend(block.slug, section.ptrHead, null)
        } else if (type === 'append' && section.ptrTail) {
          onSectionAppend(block.slug, section.ptrTail, null)
        } else {
          onSectionAdd(block.slug, [null, null])
        }
      }

      toast({
        title: 'Block added',
        description: `Block has been added to the ${label} section`,
        status: 'info'
      })
    }

    const handleSectionDelete = async (
      id: string,
      ptrPrev: string | null,
      ptrNext: string | null
    ) => {
      const shouldDelete = await confirm({
        title: 'Delete block',
        message: `Are you sure you want to remove this block from the ${label} section?`
      })

      if (shouldDelete) {
        onSectionDelete(id, ptrPrev, ptrNext)

        toast({
          title: 'Block deleted',
          description: `Block has been removed from the ${label} section`,
          status: 'info',
          variant: 'subtle'
        })
      }
    }

    if (blocks.length > 0) {
      tooltipButtons = tooltipButtons.concat([
        <HStack spacing="0.5" key="section-field-tooltip-buttons">
          <SectionBlockSelectorButton
            onBlockAdd={handleSectionAdd}
            blocks={blocksForSelector}
            onlyAdd={section.items.length === 0}
          />
        </HStack>
      ])
    }

    return (
      <HighlightTooltip
        id={name}
        isEditing={isEditing}
        actions={tooltipButtons}
        as={Wrapper}
        minH="64"
        p="4"
        className={rest.className}
        style={rest.style}
        {...rest.props}>
        {section.items.map((item, index) => {
          const s = sectionsDict[item.type]

          if (s == null) {
            console.error(
              `Section type ${item.type} is not found in sections dictionary!`
            )
            return null
          }

          const SectionWrapper = rest.sectionAs || Box

          const sectionProps =
            typeof rest.sectionProps === 'function'
              ? rest.sectionProps({
                  count: index + 1,
                  totalSections: section.items.length,
                  section: item
                })
              : rest.sectionProps

          return (
            <HighlightTooltip
              key={item.id}
              id={`${name}-${index}`}
              as={SectionWrapper}
              isEditing={isEditing}
              actions={[
                <Button
                  variant="jaenHighlightTooltipText"
                  key={`section-field-tooltip-button-${item.id}`}>
                  <Text as="span" noOfLines={1}>
                    {s.Component.options.label}
                  </Text>
                </Button>,
                <SectionBlockSelectorButton
                  key={`section-field-tooltip-block-selector-${item.id}`}
                  onBlockAdd={(block, type) => {
                    handleSectionAdd(block, type, item)
                  }}
                  blocks={blocksForSelector}
                  onlyAdd={false}
                />,
                <TuneSelectorButton
                  aria-label="Section tune selector"
                  key={`section-field-tooltip-tune-selector-${item.id}`}
                  activeTunes={
                    item.id === section.ptrHead
                      ? [{name: 'move-up'}]
                      : item.id === section.ptrTail
                      ? [{name: 'move-down'}]
                      : []
                  }
                  tunes={[
                    {
                      type: 'tune',
                      name: 'move-up',
                      label: 'Move up',
                      Icon: FaArrowUp,
                      onTune: () => {
                        const prevItem =
                          section.items.find(el => el.id === item.ptrPrev)
                            ?.ptrPrev || null

                        onSectionMove(
                          item.id,
                          item.ptrPrev,
                          item.ptrNext,
                          prevItem,
                          'up'
                        )
                      },
                      isHiddenOnActive: true
                    },
                    {
                      type: 'tune',
                      name: 'move-down',
                      label: 'Move down',
                      Icon: FaArrowDown,
                      onTune: () => {
                        const nextItem =
                          section.items.find(el => el.id === item.ptrNext)
                            ?.ptrNext || null

                        onSectionMove(
                          item.id,
                          item.ptrPrev,
                          item.ptrNext,
                          nextItem,
                          'down'
                        )
                      },
                      isHiddenOnActive: true
                    },
                    {
                      type: 'tune',
                      name: 'delete',
                      label: 'Delete',
                      Icon: FaTrash,
                      onTune: () => {
                        void handleSectionDelete(
                          item.id,
                          item.ptrPrev,
                          item.ptrNext
                        )
                      }
                    }
                  ]}
                />
              ]}
              p="2"
              {...sectionProps}>
              <JaenSectionBlockProvider
                path={sectionPath}
                id={item.id}
                position={index}
                Component={s.Component}
              />
            </HighlightTooltip>
          )
        })}
      </HighlightTooltip>
    )
  }
)
