import {WidgetProvider} from '@atsnek/jaen'
import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'

// Define the type for your site metadata

export interface WidgetProviderProps {
  children: React.ReactNode
}

// Create the provider component
export const JaenWidgetProvider: React.FC<WidgetProviderProps> = ({
  children
}) => {
  const data = useStaticQuery(graphql`
    query {
      allJaenWidget {
        nodes {
          id
          name
          createdAt
          modifiedAt
          name
          data
        }
      }
    }
  `)

  if (!data) {
    return null
  }

  return (
    <WidgetProvider widgets={data.allJaenWidget.nodes}>
      {children}
    </WidgetProvider>
  )
}
