/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import Modal from 'antd/lib/modal/Modal'

type CleanModalProps = {width?: number}

const CleanModal: React.FC<CleanModalProps> = ({
  children,
  width = 1000,
  ...props
}) => {
  return (
    <Modal
      width={width}
      {...props}
      visible
      title={null}
      footer={null}
      closable={false}>
      {children}
    </Modal>
  )
}

export default CleanModal
