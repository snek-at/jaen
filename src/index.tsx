import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {
  ConnectedPageType,
  CMSProvider,
  PageProvider,
  TextField,
  IndexField
} from './root'
import {persistor, store} from './store/store'

const HomePage: ConnectedPageType = ({slug}) => {
  return (
    <>
      <PageProvider typeName={HomePage.PageType} slug={slug}>
        <TextField fieldOptions={{name: 'testfield'}} />
        <IndexField
          outerElement={() => <div />}
          renderItem={(item, key, navigate) => (
            <p key={key}>
              Slug: {item.slug} Title: {item.title}{' '}
              <a onClick={() => navigate()}>Goto</a>
            </p>
          )}
        />
      </PageProvider>
    </>
  )
}

HomePage.PageType = 'HomePage'
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
