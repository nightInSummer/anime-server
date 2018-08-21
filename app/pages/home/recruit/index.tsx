import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input } from 'antd'
import moment from 'moment'
import {inject, observer} from "mobx-react"
import Editor from '../component/editor'
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
  recruit: res.store.recruit,
  getRecruit: res.store.getRecruit,
  saveRecruit: res.store.saveRecruit,
  publishRecruit: res.store.publishRecruit,
  deleteRecruit: res.store.deleteRecruit,
  updateRecruit: res.store.updateRecruit
})) @observer
class Index extends React.Component<any, any> {
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
      if(record.status) {
        return (
          <span>
            <span>已发布</span>
            <a href='javascript:;' onClick={this.changeContent.bind(this, record.id)}>&nbsp;&nbsp;&nbsp;&nbsp;编辑</a>
            <Popconfirm title="确认删除?" onConfirm={ this.deleteRecruit.bind(this, text) } okText="是" cancelText="否">
              <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          </span>
        )
      } else {
        return (
          <span>
            <a href='javascript:;' onClick={ this.publishRecruit.bind(this, text) }>发布</a>
            <a href='javascript:;' onClick={this.changeContent.bind(this, record.id)}>&nbsp;&nbsp;&nbsp;&nbsp;编辑</a>
            <Popconfirm title="确认删除?" onConfirm={ this.deleteRecruit.bind(this, text) } okText="是" cancelText="否">
             <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          </span>
        )
      }
    }
  }]

  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  public componentDidMount() {
    this.props.getRecruit()
  }

  public showModal () {
    this.clearData()
    this.props.recruit.type = 'save'
    this.props.recruit.recruitModal = true
  }

  public deleteRecruit(id) {
    this.props.deleteRecruit({ id })
  }

  public publishRecruit(id) {
    this.props.publishRecruit({ id })
  }

  public handleCancel() {
    this.props.recruit.recruitModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()
    const { type } = this.props.recruit
    if(type === 'save') {
      this.props.saveRecruit({
        title: result.title,
        content: result.recruitContent
      })
    } else if(type === 'edit') {
      this.props.updateRecruit({
        id:  this.props.recruit.id,
        title: result.title,
        content: result.recruitContent
      })
    }
  }

  public async changeContent(id) {
    await this.getOldContent(id)
    this.props.recruit.type = 'edit'
    this.props.recruit.id = id
    this.props.recruit.recruitModal = true
  }

  public async getOldContent(id) {
    const res = await API.recruit.getRecruitInfo({ id })
    this.props.form.setFieldsValue({
      title: res.data[0].title,
      recruitContent: res.data[0].content
    })
  }

  public clearData() {
    this.props.form.setFieldsValue({
      title: '',
      recruitContent: ''
    })
  }


  render() {
    const { recruitList, recruitModal } = this.props.recruit
    const { getFieldDecorator } = this.props.form
    return (
      <div id="main">
        <Button style={{ marginBottom: 24 }} type="primary" onClick={ this.showModal.bind(this) }>添加招聘信息</Button>
        <div>
          <Table columns={this.columns as any} dataSource={recruitList} />
        </div>
        <Modal
          title="新建招聘信息"
          visible={ recruitModal }
          onCancel={ this.handleCancel.bind(this) }
          onOk={ this.submitData.bind(this) }
          width={'1100px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="内容"
            >
              {getFieldDecorator('recruitContent', {
                initialValue: ''
              })(
                <Editor visible={recruitModal} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Index)
