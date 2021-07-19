/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {Layout, Modal} from 'antd'

import FileExplorer from '../../FileExplorer'
import './files.scss'

const {Content, Header} = Layout

type FilesModalProps = {
  mode?: 'CHOOSER_IMAGE' | 'CHOOSER_PDF' | 'EXPLORER'
  /**
   * If a mode is provided `onChoose` returns the index of the chosen file
   */
  onChoose?: (index: string) => void
  onClose: () => void
}

const FilesModal: React.FC<FilesModalProps> = ({
  mode = 'EXPLORER',
  onChoose,
  onClose
}) => {
  return (
    <>
      <Modal
        width={1650}
        visible
        title={
          <Header className="files-modal-header">
            {!mode ? 'File Explorer' : 'File Chooser'}
          </Header>
        }
        onCancel={onClose}
        footer={[]}
        className="files-modal">
        <Layout>
          <Content>
            <FileExplorer
              chooserView={
                mode !== 'EXPLORER'
                  ? mode === 'CHOOSER_IMAGE'
                    ? 'IMAGE'
                    : 'PDF'
                  : undefined
              }
              onChoose={onChoose}
            />
          </Content>
        </Layout>
      </Modal>
    </>
  )
}

export default FilesModal
