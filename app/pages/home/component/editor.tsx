import * as React from 'react';
import hmacsha1 from "hmacsha1";
import {Base64} from "js-base64";
import md5 from "md5";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import LzEditor from 'react-lz-editor'
export default class Editor extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      responseList: []
    }
    this.receiveHtml = this.receiveHtml.bind(this);
    this.onChange = this.onChange.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.getSignature = this.getSignature.bind(this);
    this.getPolicy = this.getPolicy.bind(this);
  }

  receiveHtml(content) {
    this.setState({responseList:[]});
    this.props.onChange(content)
  }
  componentDidMount() {
    this.setState({
      htmlContent: this.props.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.visible && !this.props.visible) {
      this.setState({
        htmlContent: nextProps.value
      })
    }
    if(!nextProps.visible && this.props.visible) {
      this.setState({
        htmlContent: ''
      })
    }
  }

  onChange(info) {
    // console.log("onChange:", info);
    // console.log("upload onChange this.state.files",this.state.files,info)
    let currFileList = info.fileList;

    currFileList = currFileList.filter((f) => (!f.length));
    //读取远程路径并显示链接
    const url = 'http://localhost:3000'
    currFileList = currFileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = url + info.file.response[info.file.name]
      }
      if (!file.length) {
        return file;
      }
    });
    let me = this;
    //按照服务器返回信息筛选成功上传的文件
    currFileList = currFileList.filter((file) => {
      //根据多选选项更新添加内容
      let hasNoExistCurrFileInUploadedList = !~findIndex(me.state.responseList, (item: any) => item.name === file.name)
      if (hasNoExistCurrFileInUploadedList) {
        if (!!me.props.isMultiple == true) {
          me.state.responseList.push(file);
        } else {
          (me.state as any).responseList = [file];
        }
      }
      return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
    });
    currFileList = uniqBy(currFileList, "name");
    if (!!currFileList && currFileList.length != 0) {
      // console.log("upload set files as fileList", currFileList);
      this.setState({responseList: currFileList});
    }
    me.forceUpdate();
  }

  beforeUpload(file) {
    console.log("beforeUpload like", file);
  }

  getSignature(fileName) {
    let now = new Date();
    let h = hmacsha1('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
    let Signature = Base64.encode(h);
    return Signature;
  }

  getPolicy(fileName) {
    let now = new Date();
    let afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000); //过期时间1小时后
    let policy = Base64.encode(JSON.stringify({
      "bucket": "devopee",
      "save-key": "/" + fileName,
      "expiration": Math.round(afterHour.getTime() / 1000),
      "date": now
    }));
    return policy;
  }
  render() {

    let policy = "";

    //uploadProps 配置方法见 https://ant.design/components/upload-cn/
    const uploadProps = {
      action: "/api/uploadImage",
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.responseList,
      data: (file) => { //自定义上传参数，这里使用UPYUN
        return {
          Authorization: "UPYUN reactlzeditor:" + this.getSignature(file.name),
          policy: (() => {
            policy = this.getPolicy(file.name);
            return policy;
          })(),
          signature: md5(policy + '&pLv/J4I6vfpeznxtwU+g/dsUcEY=')
        }
      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }

    return (
      <LzEditor
        active={true}
        importContent={this.state.htmlContent}
        cbReceiver={this.receiveHtml}
        uploadProps={uploadProps}
      />
    )
  }
}
