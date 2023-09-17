import {ButtonGroup, Icon} from '@chakra-ui/react'

import {FaDownload} from '@react-icons/all-files/fa/FaDownload'
import {FaEdit} from '@react-icons/all-files/fa/FaEdit'
import {FaGlobe} from '@react-icons/all-files/fa/FaGlobe'
import {FaTrash} from '@react-icons/all-files/fa/FaTrash'
import {FaUpload} from '@react-icons/all-files/fa/FaUpload'

import {JaenLogo} from '../../../components/shared/JaenLogo'
import {MenuButton} from '../../shared/MenuButton'

export interface ToolbarButtonsProps {
  // Props for the EditButton
  editButtonIsEditing: boolean
  editButtonToggle: () => void

  // Props for the MenuButton with multiple items
  saveLabel: string
  saveOnClick: () => void
  importLabel: string
  importOnClick: () => void
  discardLabel: string
  discardOnClick: () => void
  publishLabel: string
  publishOnClick: () => void
}

export const ToolbarButtons: React.FC<ToolbarButtonsProps> = props => {
  const {
    editButtonIsEditing,
    editButtonToggle,
    saveLabel,
    saveOnClick,
    importLabel,
    importOnClick,
    discardLabel,
    discardOnClick,
    publishLabel,
    publishOnClick
  } = props

  return (
    <ButtonGroup variant="outline">
      <MenuButton
        borderColor={editButtonIsEditing ? 'pink.500' : undefined}
        items={{
          edit: {
            icon: FaEdit,
            label: editButtonIsEditing ? 'Stop Editing' : 'Edit',
            onClick: editButtonToggle
          },

          import: {
            icon: FaUpload,
            label: importLabel,
            onClick: importOnClick
          },
          save: {
            icon: FaDownload,
            label: saveLabel,
            onClick: saveOnClick
          },

          discard: {
            icon: FaTrash,
            label: discardLabel,
            divider: true,
            onClick: discardOnClick
          },
          publish: {
            icon: FaGlobe,
            label: publishLabel,
            onClick: publishOnClick
          }
        }}
        leftIcon={
          <Icon as={editButtonIsEditing ? FaEdit : JaenLogo} color="pink.500" />
        }>
        Jaen CMS
      </MenuButton>
    </ButtonGroup>
  )
}
