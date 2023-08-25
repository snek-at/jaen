import {Box, HStack, Icon} from '@chakra-ui/react'
import React, {useEffect} from 'react'
import {FaPlus} from 'react-icons/fa'

import {Link} from '../../components/shared/Link'
import {JaenLogo} from '../shared/JaenLogo/JaenLogo'
import {MenuButton, MenuButtonProps} from '../shared/MenuButton/MenuButton'
import {
  Breadcrumbs,
  BreadcrumbsProps
} from './components/Breadcrumbs/Breadcrumbs'
import {DrawerLeft, DrawerLeftProps} from './components/DrawerLeft/DrawerLeft'
import {
  DrawerRight,
  DrawerRightProps
} from './components/DrawerRight/DrawerRight'

export interface JaenFrameProps {
  logo?: JSX.Element
  navigation: {
    isStickyDisabled?: boolean
    app: {
      navigationGroups: DrawerLeftProps['navigationGroups']
      version: DrawerLeftProps['version']
      logo: DrawerLeftProps['logo']
    }
    user: {
      user: DrawerRightProps['user']
      navigationGroups: DrawerRightProps['navigationGroups']
      isBadgeVisible: DrawerRightProps['isBadgeVisible']
    }
    addMenu: {
      items: MenuButtonProps['items']
    }
    breadcrumbs: {
      links: BreadcrumbsProps['links']
    }
  }
}

export const JaenFrame: React.FC<JaenFrameProps> = React.memo(props => {
  // const headerRef = useRef<HTMLHeadingElement | null>(null)
  // const prevScrollPosRef = useRef<number>(0)
  // const visibleRef = useRef<boolean>(true)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset
  //     const scrollThreshold = 200 // Threshold in pixels

  //     if (
  //       currentScrollPos > prevScrollPosRef.current &&
  //       currentScrollPos > scrollThreshold
  //     ) {
  //       // Scrolling down and past the threshold
  //       visibleRef.current = false
  //     } else {
  //       // Scrolling up or within the threshold
  //       visibleRef.current = true
  //     }

  //     prevScrollPosRef.current = currentScrollPos

  //     if (headerRef.current) {
  //       headerRef.current.style.top = visibleRef.current ? '0' : '-100%'
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  return (
    <HStack
      // ref={headerRef}
      id="coco"
      as="header"
      bg="bg.subtle"
      {...(!props.navigation.isStickyDisabled && {
        pos: 'sticky',
        top: '0',
        zIndex: 'sticky',
        transition: 'top 0.3s'
      })}
      h="16"
      px="16px"
      borderBottom="1px"
      borderColor="border.emphasized"
      backdropBlur={8}
      justifyContent="space-between"
      zIndex="sticky">
      <HStack spacing="5" w="full" h="full">
        <HStack
          h="full"
          spacing="4"
          w={{
            base: '24',
            md: 'full'
          }}>
          <DrawerLeft
            navigationGroups={props.navigation.app.navigationGroups}
            version={props.navigation.app.version}
            logo={props.navigation.app.logo}
          />

          <Box
            h="full"
            maxW="12rem"
            display={{
              base: 'none',
              md: 'block'
            }}>
            <Link
              to="/"
              textDecoration="none"
              sx={{
                // before
                _before: {
                  content: 'none'
                }
              }}>
              {props.logo || <JaenLogo transform="scale(1.05)" />}
            </Link>
          </Box>

          <Box
            display={{
              base: 'none',
              md: 'block'
            }}>
            <Breadcrumbs links={props.navigation.breadcrumbs.links} />
          </Box>
        </HStack>

        <Box mx="auto" h="full">
          <Box
            h="full"
            maxW="12rem"
            display={{
              base: 'block',
              md: 'none'
            }}>
            <Link
              to="/"
              textDecoration="none"
              sx={{
                // before
                _before: {
                  content: 'none'
                }
              }}>
              {props.logo || (
                <JaenLogo h="full" w="auto" transform="scale(1.05)" />
              )}
            </Link>
          </Box>
        </Box>

        <HStack
          spacing={4}
          w={{
            base: '24',
            md: 'xs'
          }}
          h="full"
          justifyContent="end">
          <HStack
            h="full"
            spacing={4}
            display={{
              base: 'none',
              md: 'flex'
            }}>
            <MenuButton
              leftIcon={<Icon as={FaPlus} color="brand.500" />}
              variant="outline"
              items={props.navigation.addMenu.items}
            />
          </HStack>

          <DrawerRight
            user={props.navigation.user.user}
            navigationGroups={props.navigation.user.navigationGroups}
            isBadgeVisible={props.navigation.user.isBadgeVisible}
          />
        </HStack>
      </HStack>
    </HStack>
  )
})

export default JaenFrame
