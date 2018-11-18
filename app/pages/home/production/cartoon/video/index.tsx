import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input } from 'antd'
import moment from 'moment'

import {inject, observer} from "mobx-react"
import * as API from "../../../../../apis"

const FormItem = Form.Item
const TextArea = Input.TextArea

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
  video: res.store.video,
  getVideo: res.store.getVideo,
  saveVideo: res.store.saveVideo,
  deleteVideo: res.store.deleteVideo,
  updateVideo: res.store.updateVideo
})) @observer
class Video extends React.Component<any, any>{
  private columns = [{
    title: '序号',
    dataIndex: 'key',
  }, {
    title: '标题',
    dataIndex: 'title',
  }, {
    title: '内容',
    dataIndex: 'code',
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
    this.props.getVideo()
  }

  public showModal () {
    this.clearData()
    this.props.video.type = 'save'
    this.props.video.videoModal = true
  }

  public deleteNews(id) {
    this.props.deleteVideo({ id })
  }

  public handleCancel() {
    this.props.video.videoModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()
    const { type } = this.props.video
    if(type === 'save') {
      this.props.saveVideo({
        title: result.title,
        code: result.videoContent
      })
    } else if(type === 'edit') {
      this.props.updateVideo({
        id:  this.props.video.id,
        title: result.title,
        code: result.videoContent
      })
    }
  }

  public async changeContent(id) {
    await this.getOldContent(id)
    this.props.video.type = 'edit'
    this.props.video.id = id
    this.props.video.videoModal = true
  }

  public async getOldContent(id) {
    const res = await API.video.getVideoInfo({ id })
    this.props.form.setFieldsValue({
      title: res.data[0].title,
      videoContent: res.data[0].code
    })
  }

  public clearData() {
    this.props.form.setFieldsValue({
      title: '',
      videoContent: ''
    })
  }

  render() {
    const { videoList, videoModal } = this.props.video
    const { getFieldDecorator } = this.props.form
    return (
      <div id="main">
        <Button style={{ marginBottom: 24 }} type="primary" onClick={ this.showModal.bind(this) }>添加视频类动画作品</Button>
        <div>
          <Table columns={this.columns as any} dataSource={videoList} />
        </div>
        <Modal
          title="新建视频类动画作品"
          visible={ videoModal }
          onCancel={ this.handleCancel.bind(this) }
          onOk={ this.submitData.bind(this) }
          width={'560px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="视频标题"
            >
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="视频代码"
            >
              {getFieldDecorator('videoContent', {
                initialValue: ''
              })(
                <TextArea rows={4} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Video)
