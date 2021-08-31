import {Spacer, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'

export type TabsMainProps = {
  start: {
    label: string
    content: JSX.Element
  }[]
  end: {
    label: string
    content: JSX.Element
  }[]
}

const TabsMain: React.FC<TabsMainProps> = ({start, end}) => {
  return (
    <Tabs pd={0} mt={4}>
      <TabList>
        {start.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
        <Spacer />
        {end.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {start.concat(end).map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default TabsMain
