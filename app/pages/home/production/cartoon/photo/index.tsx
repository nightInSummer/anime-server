import * as React from 'react'
import { Button, Table, Popconfirm, Form, Modal, Input, Upload, Icon } from 'antd'
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
  photo: res.store.photo,
  getPhoto: res.store.getPhoto,
  savePhoto: res.store.savePhoto,
  deletePhoto: res.store.deletePhoto,
})) @observer
class Photo extends React.Component<any, any> {
  private columns = [{
    title: '序号',
    dataIndex: 'key',
  }, {
    title: '标题',
    dataIndex: 'title',
  }, {
    title: '图片',
    dataIndex: 'image',
    render: (text) => {
      return <a href='javascript:;' onClick={ this.showPhoto.bind(this, text) }>查看</a>
    }
  }, {
    title: '时间',
    dataIndex: 'createTime',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  }, {
    title: '操作',
    align: 'right',
    dataIndex: 'id',
    render: (text) => {
      return (
        <span>
          <Popconfirm title="确认删除?" onConfirm={ this.deletePhoto.bind(this, text) } okText="是" cancelText="否">
            <a href='javascript:;'>&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
          </Popconfirm>
        </span>
      )
    }
  }]
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  public componentDidMount() {
    this.props.getPhoto()
  }

  public showModal () {
    this.props.photo.photoModal = true
  }

  public deletePhoto(id) {
    this.props.deletePhoto({ id })
  }

  public handleCancel() {
    this.props.photo.photoModal = false
  }

  public submitData() {
    const result = this.props.form.getFieldsValue()
    const { fileList } = this.state

    this.props.savePhoto({
      title: result.title,
      url: result.url,
      image: fileList[0].response[fileList[0].name]
    })
  }

  handleCancelUpload = () => this.setState({ previewVisible: false })

  handleChange = ({ fileList }) => this.setState({ fileList })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  public showPhoto(url) {
    this.handlePreview({ url })
  }

  render() {
    const { photoList, photoModal } = this.props.photo
    const { getFieldDecorator } = this.props.form

    const { previewVisible, previewImage, fileList } = this.state

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <div id="main">
        <Button style={{ marginBottom: 24 }} type="primary" onClick={ this.showModal.bind(this) }>添加图片类动画作品</Button>
        <div>
          <Table columns={this.columns as any} dataSource={photoList} />
        </div>
        <Modal
          title="新增图片类动画作品"
          visible={ photoModal }
          onCancel={ this.handleCancel.bind(this) }
          onOk={ this.submitData.bind(this) }
          width={'560px'}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="作品标题"
            >
              {getFieldDecorator('title', {
                initialValue: ''
              })(
                <Input placeholder="请输入作品标题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图片"
            >
              <Upload
                action="/api/uploadImage"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>

            </FormItem>
          </Form>
        </Modal>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelUpload}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Photo)
