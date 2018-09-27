import * as React from 'react'
import * as _ from '../../../common/utils'
import {
  Menu,
  Icon,
  Tooltip
} from "antd"

import './index.scss'

const SubMenu = Menu.SubMenu

const MenuItem = Menu.Item


export default class Sidebar extends React.Component<{}, { pathname: String, sidebarIsOpen: Boolean, menus: Array<any>, activeKey: String }>{
  constructor(props: any) {
    super(props)
    this.state = {
      pathname: '',
      sidebarIsOpen: true,
      activeKey: '',
      menus: [{
        icon: 'home',
        href: 'homepage',
        text: '首页'
      }, {
        icon: 'idcard',
        href: 'company',
        text: '公司介绍',
      }, {
        icon: 'camera',
        href: 'production',
        text: '作品简介',
        children: [{
          icon: '',
          href: 'production/inset',
          text: '插画类作品'
        }, {
          icon: '',
          href: 'production/cartoon',
          text: '动画类作品',
          children: [{
            icon: '',
            href: 'production/cartoon/video',
            text: '视频类'
          }, {
            icon: '',
            href: 'production/cartoon/photo',
            text: '图片类'
          }]
        }]
      }, {
        icon: 'bars',
        href: 'activity',
        text: '活动'
      }, {
        icon: 'calendar',
        href: 'recruit',
        text: '招聘'
      }]
    }
  }

  public toggleSidebar() {
    this.setState({
      sidebarIsOpen: !this.state.sidebarIsOpen
    })
  }

  public componentDidMount() {
    console.log(_.gePathname())
    this.setState({
      pathname: _.gePathname()
    })
  }

  public changeTab(tab) {
    this.setState({
      pathname: tab
    })
  }

  public createMenu(obj) {
    if(obj.children) {
      const item = obj.icon ?(
        <a href='javascript:void(0);'>
          <Icon type={ obj.icon }/>
          <div className='sidebar-menu-item-text' style={{ color: '#fff', fontSize: 14 }}>{ obj.text }</div>
        </a>
      ) : (
        <a  href='javascript:void(0);' style={{ color: '#fff', fontSize: 14 }}>
          { obj.text }
        </a>
      )
      return (
        <SubMenu
          key={obj.href}
          title={item}
        >
          { obj.children.map((item) => this.createMenu(item)) }
        </SubMenu>
      )
    } else {

      return (
        <Menu.Item key={obj.href}>
          { obj.icon ? (
            <a style={{ color: '#fff', fontSize: 14 }} href={ `#/${obj.href}` } onClick={this.changeTab.bind(this, obj.href)}>
              <Icon type={ obj.icon }/>
              <div className='sidebar-menu-item-text' style={{ color: '#fff', fontSize: 14 }}>{ obj.text }</div>
            </a>
          ) : (
            <a style={{ color: '#fff', fontSize: 14 }} href={ `#/${obj.href}` } onClick={this.changeTab.bind(this, obj.href)}>
              { obj.text }
            </a>
          )}
        </Menu.Item>
      )
    }
  }

  public render() {
    const { menus, sidebarIsOpen, pathname } = this.state
    const me = this
    return (
      <div className={`console-sidebar ${sidebarIsOpen ? 'open' : 'close'}`}>
        <div className='logo-box'>
            <div className='logo'></div>
          <div className='coast-arrow'>
            <Icon type={`${sidebarIsOpen ? 'left' : 'right'}`} className='sidebar-switch' onClick={ this.toggleSidebar.bind(this) }/>
          </div>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          className='sidebar-menu'
          selectedKeys={[pathname as string]}
        >
          {
            _.map(menus, (menu) => {
              return me.createMenu(menu)
            })
          }
        </Menu>
      </div>
    )
  }
}
