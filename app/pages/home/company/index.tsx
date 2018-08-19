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
  company: res.store.company,
  getCompany: res.store.getCompany,
  saveCompany: res.store.saveCompany,
  deleteCompany: res.store.deleteCompany
})) @observer
class Company extends React.Component<any, any>{
  private columns = [{
    title: '序号',
    dataIndex: 'key',
  }, {
    title: '标题',
    dataIndex: 'title',
  }, {
    title: '内容',
    dataIndex: 'content',
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
            <Popconfirm title="确认删除?" onConfirm={ this.deleteNews.bind(this, text) } okText="是" cancelText="否">
              <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          </span>
        )
      } else {
        return (
          <span>
            <Popconfirm title="确认删除?" onConfirm={ this.deleteNews.bind(this, text) } okText="是" cancelText="否">
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
    this.props.getCompany()
  }

  public showModal () {
    this.props.company.companyModal = true
  }

  public deleteNews(id) {
    this.props.deleteCompany({ id })
  }

  public handleCancel() {
    this.props.company.companyModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()

    this.props.saveCompany({
      title: result.title,
      content: result.newsContent
    })
  }

  render() {
    const { companyList, companyModal } = this.props.company
    const { getFieldDecorator } = this.props.form
    return (
      <div id="main">
        <Button type="primary" onClick={ this.showModal.bind(this) }>添加新闻</Button>
        <div style={{ marginTop: 24 }}>
          <Table columns={this.columns as any} dataSource={companyList} />
        </div>
        <Modal
          title="新建新闻"
          visible={ companyModal }
          onCancel={ this.handleCancel.bind(this) }
          onOk={ this.submitData.bind(this) }
          width={'560px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="文章标题"
            >
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章内容"
            >
              {getFieldDecorator('newsContent', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻内容" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Company)
