/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {Layout} from 'antd'
import Modal from 'antd/lib/modal/Modal'

import FileExplorer from '../../FileExplorer'
import './files.scss'

const {Content, Header} = Layout

const FilesModal: React.FC = () => {
  return (
    <>
      <Modal
        width={1650}
        visible
        title={<Header className="modal-header">File Explorer</Header>}
        closable={false}
        footer={[]}
        className="modal">
        <Layout>
          <Content>
            <FileExplorer />
          </Content>
        </Layout>
      </Modal>
    </>
  )
}

export default FilesModal
