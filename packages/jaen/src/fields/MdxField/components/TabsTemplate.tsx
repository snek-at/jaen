import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useTheme,
  Icon
} from '@chakra-ui/react'
import {ChakraProvider} from '@chakra-ui/provider'

import React, {useState} from 'react'
import {FaPlus} from 'react-icons/fa'

interface ComponentInfoProps {
  items: Array<{
    label: string
    onClick: () => void
  }>
}

export const ComponentInfo: React.FC<ComponentInfoProps> = ({items}) => (
  <Menu>
    <MenuButton
      as={Button}
      leftIcon={<Icon as={FaPlus} />}
      size="sm"
      variant="link"
      mx="2">
      Components
    </MenuButton>

    <MenuList>
      {items.map(item => (
        <MenuItem key={item.label} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
)

export interface TabsProps {
  tabs: Array<{
    label: React.ReactNode
    content: React.ReactNode
  }>
  selectedTab: number
  componentsInfo?: ComponentInfoProps['items']
}

const TabsTemplate: React.FC<TabsProps> = props => {
  const [selectedTab, setSelectedTab] = useState(props.selectedTab)

  const handleTabChange = (index: number) => {
    setSelectedTab(index)
  }

  const currentTheme = useTheme()

  return (
    <Box position="relative">
      <Tabs index={selectedTab} onChange={handleTabChange} pos="relative">
        <ChakraProvider disableEnvironment disableGlobalStyle>
          <TabList pos="sticky" top="0" zIndex="1" bg="gray.100">
            {props.tabs.map((tab, i) => (
              <Tab key={i}>{tab.label}</Tab>
            ))}
            <Spacer />
            <ComponentInfo items={props.componentsInfo || []} />
          </TabList>
        </ChakraProvider>

        <ChakraProvider
          disableEnvironment
          disableGlobalStyle
          theme={currentTheme}
          cssVarsRoot=":root">
          <TabPanels>
            {props.tabs.map((tab, i) => (
              <TabPanel key={i} p="0">
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </ChakraProvider>
      </Tabs>
    </Box>
  )
}

export default TabsTemplate
