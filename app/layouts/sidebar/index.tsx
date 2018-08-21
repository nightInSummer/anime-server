import * as React from 'react'
import * as _ from '../../../common/utils'
import {
  Menu,
  Icon,
  Tooltip
} from "antd"

import './index.scss'


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
        text: '公司介绍'
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

  public render() {
    const { menus, sidebarIsOpen, pathname } = this.state

    return (
      <div className={`console-sidebar ${sidebarIsOpen ? 'open' : 'close'}`}>
        <div className='logo-box'>
            <div className='logo'></div>
          <div className='coast-arrow'>
            <Icon type={`${sidebarIsOpen ? 'left' : 'right'}`} className='sidebar-switch' onClick={ this.toggleSidebar.bind(this) }/>
          </div>
        </div>
        <Menu className='sidebar-menu' selectedKeys={[pathname as string]}>
          {
            _.map(menus, (menu) => {
              const item = (
                <a href={ `#/${menu.href}` } onClick={this.changeTab.bind(this, menu.href)}>
                  <Icon type={ menu.icon }/>
                  <div className='sidebar-menu-item-text'>{ menu.text }</div>
                </a>
              );
              return (
                <MenuItem style={{ height: 48, paddingLeft: 32, marginTop: 10, fontSize: 16 }} className='sidebar-menu-item' key={menu.href}>
                  {
                    sidebarIsOpen ? item : <Tooltip title={menu.text} placement='right' key={menu.href}>{item}</Tooltip>
                  }
                </MenuItem>
              );
            })
          }
        </Menu>
      </div>
    )
  }
}
