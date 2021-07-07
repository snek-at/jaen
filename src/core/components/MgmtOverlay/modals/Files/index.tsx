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
  const onUpload = (acceptedFiles: File[]): void => {
    // eslint-disable-next-line no-console
    console.log(acceptedFiles)
  }

  return (
    <>
      <Modal
        width={1650}
        visible
        title={<Header className="modal-header">File Explorer</Header>}
        footer={[]}
        className="modal">
        <Layout>
          <Content>
            <FileExplorer
              onUpload={onUpload}
              items={[
                {
                  title: 'image',
                  src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  description: 'a very cool image'
                },
                {
                  title: 'image',
                  src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
                  description: 'a very cool image'
                },
                {
                  title: 'image',
                  src: 'https://www.filmibeat.com/ph-big/2019/07/ismart-shankar_156195627930.jpg',
                  description: 'a very cool image'
                },
                {
                  title: 'image',
                  src: 'https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/hug-kiss-images.jpg',
                  description: 'a very cool image'
                },
                {
                  title: 'image',
                  src: 'https://i.pcmag.com/imagery/articles/00Cx7vFIetxCuKxQeqPf8mi-23.1580943870.fit_lim.jpg',
                  description: 'a very cool image'
                }
              ]}
            />
          </Content>
        </Layout>
      </Modal>
    </>
  )
}

export default FilesModal
