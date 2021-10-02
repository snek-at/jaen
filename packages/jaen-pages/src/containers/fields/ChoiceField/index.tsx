import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ChakraProvider
} from '@chakra-ui/react'
import {useBlock} from '@src/contexts/block'
import {useTemplate} from '@src/contexts/template'
import {getFieldContent} from '@src/tools/fields'
import {ChoiceBlock, FieldIdentifier, FieldUpdateDetails} from '@src/types'
import {
  registerPageField,
  unregisterPageField,
  updatePageField
} from '@store/actions/siteActions'
import {useAppDispatch, useAppSelector} from '@store/index'
import {pageFieldContentSelector} from '@store/selectors/pages'
import {withRedux} from '@store/withRedux'
import React from 'react'

type Options = string[]
type Option = Options[number]

type ChoiceRenderFn = (
  selection: Option | undefined,
  options: Options,
  select: (option: Option) => void,
  isEditing: boolean
) => JSX.Element

interface ChoiceFieldProps extends Omit<FieldIdentifier, 'initValue'> {
  options: Options
  initValue?: Option
  header?: React.ReactNode
  onRenderPopover: ChoiceRenderFn | null
  onRender: ChoiceRenderFn
}

// Component
const ChoiceField: React.FC<ChoiceFieldProps> = ({
  options,
  header,
  onRenderPopover,
  onRender,
  initValue,
  fieldName,
  ...props
}) => {
  const dispatch = useAppDispatch()

  const {block, updatedFieldName} = useBlock(fieldName)
  fieldName = updatedFieldName

  const field = {initValue, fieldName, block}

  const {jaenPageContext} = useTemplate()
  const pageId = props.pageId || jaenPageContext.id

  const register = () => dispatch(registerPageField({pageId, field}))
  const unregister = () => dispatch(unregisterPageField({pageId, field}))

  const isEditing = useAppSelector(state => state.options.isEditing)

  const updatedValue = (useAppSelector(
    pageFieldContentSelector(pageId, fieldName, block)
  ) as ChoiceBlock | undefined)?.option

  const contextValue = (getFieldContent(
    jaenPageContext.fields?.[fieldName],
    block
  ) as ChoiceBlock | undefined)?.option

  const isRegistered = updatedValue !== undefined

  const selection: string | undefined = isRegistered
    ? updatedValue
    : contextValue || initValue || options[0]

  const onSelect = (option: Option) => {
    if (!isRegistered && option !== initValue) {
      register()
    }
    if (option === initValue) {
      unregister()
    } else {
      let fieldDetails: FieldUpdateDetails

      if (block) {
        fieldDetails = {
          _type: 'BlocksField',
          blockFieldName: block.blockFieldName as string,
          blockPosition: block.position,
          fieldName,
          block: {
            _type: 'ChoiceBlock',
            option
          }
        }
      } else {
        fieldDetails = {
          _type: 'PlainField',
          fieldName,
          block: {
            _type: 'ChoiceBlock',
            option
          }
        }
      }

      dispatch(
        updatePageField({
          pageId,
          fieldDetails
        })
      )
    }
  }

  if (!isEditing || onRenderPopover === null) {
    return onRender(selection, options, onSelect, isEditing)
  }

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        {onRender(selection, options, onSelect, isEditing)}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        {header && <PopoverHeader>{header}</PopoverHeader>}
        <PopoverBody>
          {onRenderPopover(selection, options, onSelect, isEditing)}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default withRedux(ChoiceField)
