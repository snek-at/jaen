import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {ConnectedPageType, CMSProvider, PageProvider, TextField} from './root'
import {persistor, store} from './store/store'

const HomePage: ConnectedPageType = ({slug}) => {
  return (
    <>
      <PageProvider typeName={HomePage.PageParamsType} slug={slug}>
        <TextField fieldOptions={{name: 'testfield'}} />
      </PageProvider>
    </>
  )
}

HomePage.PageParamsType = 'HomePage'
HomePage.ChildPages = [HomePage]

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <CMSProvider
          bifrostUrls={{
            httpUrl: 'http://localhost:8000/graphql'
          }}
          pages={[HomePage]}
        />
      </PersistGate>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
)
