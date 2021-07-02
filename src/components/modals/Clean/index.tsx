import Modal from 'antd/lib/modal/Modal'

const CleanModal: React.FC = ({children}) => {
  return (
    <Modal width={1000} visible title={null} footer={null} closable={false}>
      {children}
    </Modal>
  )
}

export default CleanModal
