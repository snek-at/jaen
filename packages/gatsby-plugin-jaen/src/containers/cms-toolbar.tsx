import {useNotificationsContext} from 'jaen'
import {ToolbarButtons} from '../components/cms/ToolbarButtons'
import {useCMSManagement, withCMSManagement} from '../connectors/cms-management'

const CMSToolbarContainer: React.FC = withCMSManagement(() => {
  const manager = useCMSManagement()
  const {toast} = useNotificationsContext()

  return (
    <ToolbarButtons
      editButtonIsEditing={manager.isEditing}
      editButtonToggle={() => {
        manager.setIsEditing(!manager.isEditing)

        toast({
          title: 'Edit mode',
          description: manager.isEditing
            ? 'You can now edit the page'
            : 'You can no longer edit the page',
          status: manager.isEditing ? 'success' : 'info'
        })
      }}
      saveLabel="Save"
      saveOnClick={function (): void {
        manager.draft.save()

        toast({
          title: 'Saved',
          description: 'Your changes have been saved',
          status: 'success'
        })
      }}
      importLabel="Import"
      importOnClick={async () => {
        try {
          await manager.draft.import()

          toast({
            title: 'Imported',
            description: 'Your changes have been imported',
            status: 'success'
          })
        } catch (e) {
          toast({
            title: 'Failed to import',
            description: 'Your changes could not be imported',
            status: 'error'
          })
        }
      }}
      discardLabel="Discard Changes"
      discardOnClick={function (): void {
        manager.draft.discard()

        toast({
          title: 'Discarded',
          description: 'Your changes have been discarded',
          status: 'info'
        })
      }}
      publishLabel="Publish"
      publishOnClick={function (): void {
        manager.setIsPublishing(true)

        toast({
          title: 'Publishing',
          description: 'Your changes are being published',
          status: 'info'
        })
      }}
    />
  )
})

export default CMSToolbarContainer
