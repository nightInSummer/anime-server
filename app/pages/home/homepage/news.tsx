import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input } from 'antd'
import moment from 'moment'
import {inject, observer} from "mobx-react"
import Editor from '../component/editor'
import './news.scss'

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
  news: res.store.news,
  getNews: res.store.getNews,
  saveNews: res.store.saveNews,
  publishNews: res.store.publishNews,
  deleteNews: res.store.deleteNews,
})) @observer
class News extends React.Component<any, any> {
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
            <Popconfirm title="确认删除?" onConfirm={ this.deleteNews.bind(this, text) } okText="是" cancelText="否">
              <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
            </Popconfirm>
          </span>
        )
      } else {
        return (
          <span>
            <a href='javascript:;' onClick={ this.publishNews.bind(this, text) }>发布</a>
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
    this.props.news.newsModal = true
  }

  public deleteNews(id) {
    this.props.deleteNews({ id })
  }

  public publishNews(id) {
    this.props.publishNews({ id })
  }

  public handleCancel() {
    this.props.news.newsModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()

    this.props.saveNews({
      title: result.title,
      content: result.newsContent
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
          width={'1100px'}
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
              {getFieldDecorator('newsContent', {
                initialValue: ''
              })(
                <Editor />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(News)
