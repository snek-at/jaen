import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Form, Input, Button, Checkbox} from 'antd'
import React from 'react'

import './login.scss'

export type LoginFormValues = {
  username: string
  password: string
  remember: boolean
}

interface LoginFormProps {
  onFinish: (values: LoginFormValues) => void | Error
}

const LoginForm: React.FC<LoginFormProps> = ({onFinish}) => {
  return (
    <Form name="basic" initialValues={{remember: true}} onFinish={onFinish}>
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
