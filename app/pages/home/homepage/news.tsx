import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input, Select } from 'antd'
import moment from 'moment'
import {inject, observer} from "mobx-react"
import * as API from '../../../apis'
import './news.scss'

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

const typeList = ['公司介绍', '活动', '插画类作品', '动画-视频类', '动画-图片类']

@inject((res: any) => ({
  news: res.store.news,
  getNews: res.store.getNews,
  saveNews: res.store.saveNews,
  publishNews: res.store.publishNews,
  deleteNews: res.store.deleteNews,
  updateNews: res.store.updateNews
})) @observer
class News extends React.Component<any, any> {
  private columns = [{
    title: '序号',
    dataIndex: 'key',
  }, {
    title: '标题',
    dataIndex: 'title',
  }, {
    title: '新闻类型',
    dataIndex: 'type',
    render: (text) =>  typeList[text]
  }, {
    title: '时间',
    dataIndex: 'createTime',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  }, {
    title: '操作',
    align: 'right',
    dataIndex: 'id',
    render: (text, record) => {
      if(record.status) {
        return (
          <span>
            <span>已发布</span>
            <a href='javascript:;' onClick={this.changeContent.bind(this, record.id)}>&nbsp;&nbsp;&nbsp;&nbsp;编辑</a>
            <Popconfirm title="确认删除?" onConfirm={ this.deleteNews.bind(this, text) } okText="是" cancelText="否">
              <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          </span>
        )
      } else {
        return (
          <span>
            <a href='javascript:;' onClick={ this.publishNews.bind(this, text, record.type) }>发布</a>
             <a href='javascript:;' onClick={this.changeContent.bind(this, record.id)}>&nbsp;&nbsp;&nbsp;&nbsp;编辑</a>
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
    this.state = {
      content: ''
    }
  }

  public componentDidMount() {
    this.props.getNews()
  }

  public showModal () {
    this.clearData()
    this.props.news.type = 'save'
    this.props.news.newsModal = true
  }

  public deleteNews(id) {
    this.props.deleteNews({ id })
  }

  public publishNews(id, type) {
    this.props.publishNews({ id, type })
  }

  public handleCancel() {
    this.props.news.newsModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()
    const { type } = this.props.news
    if(type === 'save') {
      this.props.saveNews({
        title: result.title,
        type: result.type
      })
    } else if(type === 'edit') {
      this.props.updateNews({
        id:  this.props.news.id,
        title: result.title,
        type: result.type
      })
    }
  }

  public async changeContent(id) {
    await this.getOldContent(id)
    this.props.news.type = 'edit'
    this.props.news.id = id
    this.props.news.newsModal = true
  }

  public async getOldContent(id) {
    const res = await API.news.getNewsInfo({ id })
    this.props.form.setFieldsValue({
      title: res.data[0].title,
      type: res.data[0].type
    })
  }

  public clearData() {
    this.props.form.setFieldsValue({
      title: '',
      newsContent: ''
    })
  }


  render() {
    const { newsList, newsModal } = this.props.news
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Button type="primary" onClick={ this.showModal.bind(this) }>添加新闻</Button>
        <div style={{ marginTop: 24 }}>
          <Table columns={this.columns as any} dataSource={newsList} />
        </div>
        <Modal
          title="新建新闻"
          visible={ newsModal }
          onCancel={ this.handleCancel.bind(this) }
          onOk={ this.submitData.bind(this) }
          width={'600px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="新闻标题"
            >
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input placeholder="请输入新闻标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新闻内容"
            >
              {getFieldDecorator('type', {
                initialValue: ''
              })(
                <Select
                  style={{ width: 460 }}
                  showSearch
                  optionFilterProp='children'
                >
                  <Option value='0'>公司介绍</Option>
                  <Option value='1'>活动</Option>
                  <Option value='2'>插画类作品</Option>
                  <Option value='3'>动画-视频类</Option>
                  <Option value='4'>动画-图片类</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(News)
