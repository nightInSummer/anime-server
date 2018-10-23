import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input, Checkbox } from 'antd'
import moment from 'moment'
import Editor from '../component/editor'
import {inject, observer} from "mobx-react"
import * as API from "../../../apis"

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  }
}

@inject((res: any) => ({
  company: res.store.company,
  getCompany: res.store.getCompany,
  saveCompany: res.store.saveCompany,
  deleteCompany: res.store.deleteCompany,
  updateCompany: res.store.updateCompany
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
    render: (text) =>  `${(text || '').slice(0,50)}...`
  }, {
    title: '时间',
    dataIndex: 'createTime',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  }, {
    title: '操作',
    align: 'right',
    dataIndex: 'id',
    render: (text, record) => {
      return (
        <span>
          <a href='javascript:;' onClick={this.changeContent.bind(this, record.id)}>&nbsp;&nbsp;&nbsp;&nbsp;编辑</a>
          <Popconfirm title="确认删除?" onConfirm={ this.deleteNews.bind(this, text) } okText="是" cancelText="否">
           <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
          </Popconfirm>
        </span>
      )
    }
  }]
  constructor(props) {
    super(props)
  }

  public componentDidMount() {
    this.props.getCompany()
  }

  public showModal () {
    this.clearData()
    this.props.company.type = 'save'
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
    const { type } = this.props.company
    if(type === 'save') {
      this.props.saveCompany({
        title: result.title,
        content: result.companyContent,
        member: result.member
      })
    } else if(type === 'edit') {
      this.props.updateCompany({
        id:  this.props.company.id,
        title: result.title,
        content: result.companyContent,
        member: result.member
      })
    }
  }

  public async changeContent(id) {
    await this.getOldContent(id)
    this.props.company.type = 'edit'
    this.props.company.id = id
    this.props.company.companyModal = true
  }

  public async getOldContent(id) {
    const res = await API.company.getCompanyInfo({ id })
    this.props.form.setFieldsValue({
      title: res.data[0].title,
      companyContent: res.data[0].content,
      member: res.data[0].member
    })
  }

  public clearData() {
    this.props.form.setFieldsValue({
      title: '',
      companyContent: ''
    })
  }

  render() {
    const { companyList, companyModal } = this.props.company
    const { getFieldDecorator } = this.props.form
    return (
      <div id="main">
        <Button style={{ marginBottom: 24 }} type="primary" onClick={ this.showModal.bind(this) }>添加公司文章</Button>
        <div>
          <Table columns={this.columns as any} dataSource={companyList} />
        </div>
        <Modal
          title="新建公司文章"
          visible={ companyModal }
          onCancel={ this.handleCancel.bind(this) }
          onOk={ this.submitData.bind(this) }
          width={'1100px'}
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
              {getFieldDecorator('companyContent', {
                initialValue: ''
              })(
                <Editor visible={companyModal} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="成员介绍"
            >
              {getFieldDecorator('member', {
                initialValue: false,
                valuePropName: 'checked'
              })(
                <Checkbox>是否为成员介绍</Checkbox>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Company)
