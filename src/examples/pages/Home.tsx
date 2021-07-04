/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {Card} from 'antd'
import {
  ConnectedPageType,
  SimpleTextField,
  SimpleRichTextField,
  EditableField,
  IndexField,
  StreamField
} from '~/index'

import {CardBlock} from '../blocks/Card'

const HomePage: ConnectedPageType = () => {
  return (
    <div style={{marginLeft: 100, marginRight: 100}}>
      <h1>test</h1>
      <SimpleTextField name="testfield" />
      <SimpleRichTextField name="rtextfield" />
      <EditableField
        fieldOptions={{
          fieldName: 'f1',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h1'}
        }}
      />
      <EditableField
        fieldOptions={{
          fieldName: 'f1',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h2'}
        }}
      />
      <EditableField
        fieldOptions={{
          fieldName: 'f2',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h1'}
        }}
      />
      <EditableField
        fieldOptions={{
          fieldName: 'f2',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h2'}
        }}
      />
      <IndexField
        fixedSlug={'home'}
        outerElement={() => <div />}
        renderItem={(item, key, navigate) => (
          <p key={key}>
            Slug: {item.slug} Title: {item.title}{' '}
            <a onClick={() => navigate()}>Goto</a>
          </p>
        )}
      />
      <Card style={{width: '50%', display: 'table'}}>
        <StreamField
          reverseOrder={false}
          name={'timeline'}
          blocks={[CardBlock]}
        />
      </Card>
    </div>
  )
}

HomePage.PageType = 'HomePage'
HomePage.ChildPages = [HomePage]

export default HomePage
