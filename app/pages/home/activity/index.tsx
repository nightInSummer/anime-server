import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input, Select } from 'antd'
import moment from 'moment'
import Editor from '../component/editor'
import {inject, observer} from "mobx-react"
import * as API from "../../../apis"

const FormItem = Form.Item
const Option = Select.Option

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

const formItemLayoutKey = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  }
}

@inject((res: any) => ({
  activity: res.store.activity,
  getActivity: res.store.getActivity,
  getActivityKey: res.store.getActivityKey,
  saveActivityKey: res.store.saveActivityKey,
  saveActivityValue: res.store.saveActivityValue,
  deleteActivityKey: res.store.deleteActivityKey,
  deleteActivityValue: res.store.deleteActivityValue,
  updateActivityKey: res.store.updateActivityKey,
  updateActivityValue: res.store.updateActivityValue
})) @observer
class Company extends React.Component<any, any>{
  private columns = [{
    title: '序号',
    dataIndex: 'key',
  }, {
    title: '一级标题',
    dataIndex: 'title',
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
          <a href='javascript:;' onClick={this.changeContentKey.bind(this, record.id)}>&nbsp;&nbsp;&nbsp;&nbsp;编辑</a>
          <Popconfirm title="确认删除?" onConfirm={ this.deleteActivityKey.bind(this, text) } okText="是" cancelText="否">
           <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
          </Popconfirm>
        </span>
      )
    }
  }]

  private expandedRowRender = (record) => {
    const columns = [
      { title: '序号', dataIndex: 'key', key: 'key' },
      { title: '标题', dataIndex: 'title', key: 'title' },
      { title: '内容', dataIndex: 'content', key: 'content', render: (text) =>  `${(text || '').slice(0,50)}...` },
      { title: '时间', dataIndex: 'createTime', key: 'createTime', render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss') },
      { title: '操作', dataIndex: 'id', key: 'id', render: (text, other) =>  (
        <span>
           <a href='javascript:;' onClick={this.changeContentValue.bind(this, other.id)}>&nbsp;&nbsp;&nbsp;&nbsp;编辑</a>
          <Popconfirm title="确认删除?" onConfirm={ this.deleteActivityValue.bind(this, text) } okText="是" cancelText="否">
           <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
          </Popconfirm>
        </span>
        )
      }
    ]
    record.activityValues.forEach((ret, i) => { ret['key'] = i + 1 })
    return (
      <Table
        columns={columns}
        dataSource={record.activityValues}
        pagination={false}
      />
    )
  }
  constructor(props) {
    super(props)
  }

  public componentDidMount() {
    this.props.getActivity()
    this.props.getActivityKey()
  }

  public showModal (type) {
    this.clearData()
    this.props.activity.type = 'save'
    this.props.activity[type] = true
  }

  public deleteActivityKey(id) {
    this.props.deleteActivityKey({ id })
  }

  public deleteActivityValue(id) {
    this.props.deleteActivityValue({ id })
  }

  public handleCancel(type) {
    this.props.activity[type] = false
  }

  public submitData(postType) {
    const result = this.props.form.getFieldsValue()
    const { type } = this.props.activity
    if(type === 'save') {
      if (postType === 'activityKey') {
        this.props.saveActivityKey({
          title: result.activityKeyTitle
        })
      } else {
        this.props.saveActivityValue({
          id: result.activityKeyId,
          title: result.activityValueTitle,
          content: result.activityValueContent
        })
      }
    } else if(type === 'edit') {
      if (postType === 'activityKey') {
        this.props.updateActivityKey({
          id: this.props.activity.id,
          title: result.activityKeyTitle
        })
      } else {
        this.props.updateActivityValue({
          id: this.props.activity.id,
          title: result.activityValueTitle,
          content: result.activityValueContent
        })
      }
    }
  }

  public async changeContentKey(id) {
    await this.getOldContentKey(id)
    this.props.activity.type = 'edit'
    this.props.activity.id = id
    this.props.activity.activityKeyModal = true
  }

  public async getOldContentKey(id) {
    const res = await API.activity.getOldActivityKey({ id })
    this.props.form.setFieldsValue({
      activityKeyTitle: res.data[0].title
    })
  }

  public async changeContentValue(id) {
    await this.getOldContentValue(id)
    this.props.activity.type = 'edit'
    this.props.activity.id = id
    this.props.activity.activityValueModal = true
  }

  public async getOldContentValue(id) {
    const res = await API.activity.getOldActivityValue({ id })
    this.props.form.setFieldsValue({
      activityValueTitle: res.data[0].title,
      activityValueContent: res.data[0].content
    })
  }

  public clearData() {
    this.props.form.setFieldsValue({
      activityKeyTitle: '',
      activityKeyId: '',
      activityValueTitle: '',
      activityValueContent: ''
    })
  }

  public createActivityKey() {
    const { activityKeyList } = this.props.activity
    return activityKeyList.map((ret, index) => <Option key={index} value={ret.id}>{ret.title}</Option>)
  }

  render() {
    const { activityList, activityKeyModal, activityValueModal, type } = this.props.activity
    const { getFieldDecorator } = this.props.form
    return (
      <div id="main">
        <Button style={{ marginBottom: 24 }} type="primary" onClick={ this.showModal.bind(this, 'activityKeyModal') }>添加一级标题</Button>
        <Button type="primary" style={{ marginLeft: 15 }} onClick={ this.showModal.bind(this, 'activityValueModal') }>添加活动</Button>
        <div>
          <Table
            columns={this.columns as any}
            dataSource={activityList}
            expandedRowRender={this.expandedRowRender}
          />
        </div>
        <Modal
          title="新建一级标题"
          visible={ activityKeyModal }
          onCancel={ this.handleCancel.bind(this, 'activityKeyModal') }
          onOk={ this.submitData.bind(this, 'activityKey') }
          width={'560px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <FormItem
              {...formItemLayoutKey}
              label="一级活动标题"
            >
              {getFieldDecorator('activityKeyTitle', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻标题" />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="新建活动"
          visible={ activityValueModal }
          onCancel={ this.handleCancel.bind(this, 'activityValueModal') }
          onOk={ this.submitData.bind(this, 'activityValue') }
          width={'1100px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            { type === 'save' ?
              <FormItem
                {...formItemLayout}
                label="所属一级分类"
              >
                {getFieldDecorator('activityKeyId', { initialValue: '' })(
                  <Select
                    style={{ width: 200 }}
                    showSearch
                    optionFilterProp='children'
                  >
                    { this.createActivityKey() }
                  </Select>
                )}
              </FormItem> : ''
            }
            <FormItem
              {...formItemLayout}
              label="活动标题"
            >
              {getFieldDecorator('activityValueTitle', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="活动内容"
            >
              {getFieldDecorator('activityValueContent', {
                initialValue: ''
              })(
                <Editor visible={activityValueModal} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Company)
