import * as React from 'react'
import { Tabs } from 'antd'

import News from './news'
import Sowing from './sowing'

const TabPane = Tabs.TabPane

export default class HomePage extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="main">
        <Tabs defaultActiveKey="1" >
          <TabPane tab='首页新闻' key="1">
            <News />
          </TabPane>
          <TabPane tab='首页轮播图' key="2">
            < Sowing/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
