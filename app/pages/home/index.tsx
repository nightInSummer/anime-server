import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'mobx-react'
import Routers from './routers'
import { HashRouter } from "react-router-dom"

import Sidebar from '../../layouts/sidebar'

import Store from './store'

import '../../styles/_color.scss'
import '../../styles/antd-extension.scss'
import '../../styles/app.scss'
import '../../styles/en-US.scss'

const store = new Store()


ReactDom.hydrate(
  <Provider store={ store }>
    <div className='console'>
      <Sidebar />
      <div className='console-body'>
        <HashRouter>
          <Routers />
        </HashRouter>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
)
