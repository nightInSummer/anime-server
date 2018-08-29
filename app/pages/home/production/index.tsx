import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input } from 'antd'
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
  production: res.store.production,
  getProduction: res.store.getProduction,
  saveProduction: res.store.saveProduction,
  deleteProduction: res.store.deleteProduction,
  updateProduction: res.store.updateProduction
})) @observer
class Production extends React.Component<any, any>{
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
    this.props.getProduction()
  }

  public showModal () {
    this.clearData()
    this.props.production.type = 'save'
    this.props.production.productionModal = true
  }

  public deleteNews(id) {
    this.props.deleteProduction({ id })
  }

  public handleCancel() {
    this.props.production.productionModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()
    const { type } = this.props.production
    if(type === 'save') {
      this.props.saveProduction({
        title: result.title,
        content: result.productionContent
      })
    } else if(type === 'edit') {
      this.props.updateProduction({
        id:  this.props.production.id,
        title: result.title,
        content: result.productionContent
      })
    }
  }

  public async changeContent(id) {
    await this.getOldContent(id)
    this.props.production.type = 'edit'
    this.props.production.id = id
    this.props.production.productionModal = true
  }

  public async getOldContent(id) {
    const res = await API.production.getProductionInfo({ id })
    console.log(res)
    this.props.form.setFieldsValue({
      title: res.data[0].title,
      productionContent: res.data[0].content
    })
  }

  public clearData() {
    this.props.form.setFieldsValue({
      title: '',
      productionContent: ''
    })
  }

  render() {
    const { productionList, productionModal } = this.props.production
    const { getFieldDecorator } = this.props.form
    return (
      <div id="main">
        <Button style={{ marginBottom: 24 }} type="primary" onClick={ this.showModal.bind(this) }>添加作品文章</Button>
        <div>
          <Table columns={this.columns as any} dataSource={productionList} />
        </div>
        <Modal
          title="新建作品文章"
          visible={ productionModal }
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
              {getFieldDecorator('productionContent', {
                initialValue: ''
              })(
                <Editor visible={productionModal} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Production)
