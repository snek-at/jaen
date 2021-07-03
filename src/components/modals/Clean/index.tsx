/**
 * @license
 * Copyright snek-at. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import Modal from 'antd/lib/modal/Modal'

const CleanModal: React.FC = ({children}) => {
  return (
    <Modal width={1000} visible title={null} footer={null} closable={false}>
      {children}
    </Modal>
  )
}

export default CleanModal
