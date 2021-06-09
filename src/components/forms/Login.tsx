import {Form, Input, Button, Checkbox} from 'antd'
import React from 'react'

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
}
const tailLayout = {
  wrapperCol: {offset: 8, span: 16}
}

export type LoginFormValues = {
  username: string
  password: string
  remember: boolean
}

interface LoginFormProps {
  onFinish: (values: LoginFormValues) => void
}

const LoginForm: React.FC<LoginFormProps> = ({onFinish}) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{required: true, message: 'Please input your username!'}]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}>
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
