/**
 * @license
 * Copyright snek-at. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Modal, Space, Typography, Form, Input, Button, Checkbox} from 'antd'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {store} from '~/types'

import {SnekIcon} from '~/components/icons'

import {login} from '~/store/actions/auth'

import './login.scss'

export type LoginModalValues = {
  username: string
  password: string
  remember: boolean
}

type LoginModalProps = {visible: boolean; onClose: () => void}

const LoginModal: React.FC<LoginModalProps> = ({visible, onClose}) => {
  console.log('try', visible)
  const dispatch = useDispatch<store.AppDispatch>()

  const onLogin = (values: LoginModalValues) => dispatch(login({creds: values}))

  const [showModal, setShowModal] = useState(visible)

  useEffect(() => {
    setShowModal(visible)
  }, [visible])

  return (
    <Modal
      title={
        <>
          <Space>
            <SnekIcon />
            <Typography.Text>jaen - Login</Typography.Text>
          </Space>
        </>
      }
      style={{top: 20}}
      visible={showModal}
      footer={[]}
      onCancel={() => {
        setShowModal(false)
        onClose()
      }}>
      <Form name="basic" initialValues={{remember: true}} onFinish={onLogin}>
        <Form.Item
          name="username"
          rules={[{required: true, message: 'Please input your username!'}]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{required: true, message: 'Please input your password!'}]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default LoginModal
