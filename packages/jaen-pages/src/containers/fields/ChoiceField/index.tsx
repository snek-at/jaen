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

interface ChoiceFieldProps extends Omit<FieldIdentifier, 'initValue'> {
  options: Options
  initValue?: Option
  onRenderPopover: (
    selection: Option | undefined,
    options: Options,
    select: (option: Option) => void
  ) => JSX.Element
  onRender: (selection: Option | undefined) => JSX.Element
}

// Component
const ChoiceField: React.FC<ChoiceFieldProps> = ({
  options,
  onRenderPopover,
  onRender,
  ...field
}) => {
  const dispatch = useAppDispatch()

  const {initValue, fieldName, block} = field
  const {jaenPageContext} = useTemplate()
  const pageId = jaenPageContext.id

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

  if (!isEditing) {
    return onRender(selection)
  }

  return (
    <ChakraProvider>
      <Popover trigger="hover">
        <PopoverTrigger>{onRender(selection)}</PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
          <PopoverBody>
            {onRenderPopover(selection, options, onSelect)}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ChakraProvider>
  )
}

export default withRedux(ChoiceField)
