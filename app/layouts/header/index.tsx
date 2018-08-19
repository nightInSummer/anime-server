import * as React from 'react'
import { Breadcrumb, Select } from 'antd'

import './index.scss'


const routerConfig = {
  'homepage': {
    text: '首页'
  },
  'company': {
    text: '公司介绍'
  },
  'activity': {
    text: '活动'
  },
  'recruit': {
    text: '招聘'
  }
}

export default class Header extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }


  public createCrumb() {
    const pathname = this.props.serverPath ? this.props.serverPath.url : this.props.location.pathname + this.props.location.search
    const pathKey = pathname.split('?')[0].replace('/', '')
    let routerMap = []

    routerMap.push({ href: '', text: routerConfig[pathKey] ? routerConfig[pathKey]['text'] : '项目管理', key: routerConfig[pathKey] ? routerConfig[pathKey]['key'] : '1pm1' })

    return routerMap.map((res, index) => {
      const href = res.href ? { href: res.href } : {}
      return <Breadcrumb.Item key={ index } { ...href }>{ res.text }</Breadcrumb.Item>
    })

  }

  public render() {
    return (
      <div className='console-header'>
        <div className='header-left'>
          <Breadcrumb separator=">">
            { this.createCrumb() }
          </Breadcrumb>
        </div>
      </div>
    )
  }
}
