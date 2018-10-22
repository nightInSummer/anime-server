import React from 'react'
import { Form, Input, Button, message } from 'antd'
import * as API from "../../apis"

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
}

class Login extends React.Component<any, any> {

  async login() {
    const result = this.props.form.getFieldsValue()
    const res = await API.user.login(result)
    if (res.data.code === 1) {
      message.success('登录成功！')
      window.location.href = '/page'
    } else {
      message.warning('用户名或密码错误！')
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form

    return(
      <div className="login-container">
        <h2>登录后台管理系统</h2>
        <Form>
          <FormItem
            {...formItemLayout}
            label=""
          >
            {getFieldDecorator('name', {
              initialValue: ''
            })(
              <Input placeholder="请输入用户名" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label=""
          >
            {getFieldDecorator('password', {
              initialValue: ''
            })(
              <Input type='password' placeholder="请输入密码" />
            )}
          </FormItem>
          <Button style={{ float: 'right' }} type='primary' onClick={this.login.bind(this)}>登录</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login)
