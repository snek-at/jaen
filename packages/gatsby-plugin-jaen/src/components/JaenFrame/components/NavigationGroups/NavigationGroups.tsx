import { ReloadIcon } from '@radix-ui/react-icons'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import { cn } from '../../../../lib/utils'
import { Button } from '../../../ui/button'
import { Separator } from '../../../ui/separator'
import { SheetClose } from '../../../ui/sheet'

export interface NavigationItem {
  icon: React.ComponentType
  label: string
  onClick?: () => void
  path?: string
  isLoading?: boolean
}

export interface NavigationGroup {
  label?: string
  items: Record<string, NavigationItem>
}

export interface NavigationGroupsProps {
  groups: Record<string, NavigationGroup>
  onClick?: () => void
}

export const NavigationGroups: React.FC<NavigationGroupsProps> = ({
  groups,
  onClick
}) => {
  const location = useLocation()

  return (
    <div className="flex flex-col py-4">
      {Object.entries(groups).map(([key, value]) => {
        return (
          <div key={key} className="flex flex-col">
            {value.label && (
              <p className="px-1 font-semibold text-sm text-muted-foreground">
                {value.label}
              </p>
            )}

            <div className="flex flex-col mt-1">
              {Object.entries(value.items).map(([key, value]) => {
                const icon = <value.icon />

                // Check if path is active
                const isActive = location.pathname === value.path

                const btn = (
                  <Button
                    key={key}
                    asChild={!!value.path}
                    className={cn('justify-start', {
                      'bg-accent': isActive
                    })}
                    variant="ghost"
                    disabled={isActive || value.isLoading}
                    onClick={() => {
                      value.onClick?.()

                      onClick?.()
                    }}>
                    {value.path ? (
                      <Link to={value.path}>
                        {value.isLoading ? (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <span
                            className="mr-2 h-4 w-4"
                            style={{
                              color: 'var(--chakra-colors-brand-500)'
                            }}>
                            {icon}
                          </span>
                        )}
                        {value.label}
                      </Link>
                    ) : (
                      <>
                        {value.isLoading ? (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <span
                            className="mr-2 h-4 w-4"
                            style={{
                              color: 'var(--chakra-colors-brand-500)'
                            }}>
                            {icon}
                          </span>
                        )}
                        {value.label}
                      </>
                    )}
                  </Button>
                )

                if (value.path) {
                  return <SheetClose asChild>{btn}</SheetClose>
                }

                return btn
              })}
            </div>

            <Separator className="my-2" />
          </div>
        )
      })}
    </div>
  )

  // return (
  //   <div className='flex'>
  //     {Object.entries(groups).map(([key, value]) => {
  //       return (
  //         <Stack key={key}>
  //           {value.label && (
  //             <Text px="1" fontWeight="semibold" fontSize="sm" color="muted">
  //               {value.label}
  //             </Text>
  //           )}
  //           <List>
  //             {Object.entries(value.items).map(([key, value]) => {
  //               return (
  //                 <ListItem key={key}>
  //                   <Link
  //                     as={Button}
  //                     leftIcon={
  //                       value.isLoading ? (
  //                         <Spinner mr="2" size="sm" />
  //                       ) : (
  //                         <Icon
  //                           as={value.icon}
  //                           fontSize="lg"
  //                           mr="2"
  //                           color="brand.500"
  //                         />
  //                       )
  //                     }
  //                     variant="ghost"
  //                     w="full"
  //                     px="2"
  //                     justifyContent="flex-start"
  //                     fontWeight="medium"
  //                     fontSize="sm"
  //                     to={value.path}
  //                     onClick={() => {
  //                       value.onClick?.()

  //                       onClick?.()
  //                     }}>
  //                     {value.label}
  //                   </Link>
  //                 </ListItem>
  //               )
  //             })}
  //           </List>
  //         </Stack>
  //       )
  //     })}
  //   </Stack>
  // )
}
