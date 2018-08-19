import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input } from 'antd'
import moment from 'moment'
import {inject, observer} from "mobx-react"

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  }
}

@inject((res: any) => ({
  sowing: res.store.sowing,
  getSowing: res.store.getSowing,
  saveSowing: res.store.saveSowing,
  deleteSowing: res.store.deleteSowing,
})) @observer
class Sowing extends React.Component<any, any> {
  private columns = [{
    title: '序号',
    dataIndex: 'key',
  }, {
    title: '标题',
    dataIndex: 'title',
  }, {
    title: '轮播图地址',
    dataIndex: 'image',
  }, {
    title: '跳转地址',
    dataIndex: 'url',
  }, {
    title: '时间',
    dataIndex: 'createTime',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  }, {
    title: '操作',
    dataIndex: 'id',
    render: (text, record) => {
      if(record.status) {
        return (
          <span>
            <Popconfirm title="确认删除?" onConfirm={ this.deleteSowing.bind(this, text) } okText="是" cancelText="否">
              <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          </span>
        )
      } else {
        return (
          <span>
            <Popconfirm title="确认删除?" onConfirm={ this.deleteSowing.bind(this, text) } okText="是" cancelText="否">
             <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          </span>
        )
      }
    }
  }]
  constructor(props) {
    super(props)
  }

  public componentDidMount() {
    this.props.getSowing()
  }

  public showModal () {
    this.props.sowing.sowingModal = true
  }

  public deleteSowing(id) {
    this.props.deleteSowing({ id })
  }

  public handleCancel() {
    this.props.sowing.sowingModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()

    this.props.saveSowing(result)
  }

  render() {
    const { sowingList, sowingModal } = this.props.sowing
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Button type="primary" onClick={ this.showModal.bind(this) }>添加轮播图</Button>
        <div style={{ marginTop: 24 }}>
          <Table columns={this.columns as any} dataSource={sowingList} />
        </div>
        <Modal
          title="新轮播图"
          visible={ sowingModal }
          onCancel={ this.handleCancel.bind(this) }
          onOk={ this.submitData.bind(this) }
          width={'560px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="轮播图标题"
            >
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="轮播图"
            >
              {getFieldDecorator('image', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻内容" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="跳转地址"
            >
              {getFieldDecorator('url', {
                initialValue: ''
              })(
                <Input placeholder="请输入跳转地址" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Sowing)
