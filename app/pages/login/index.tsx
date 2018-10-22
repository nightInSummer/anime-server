import * as React from 'react'
import * as ReactDom from 'react-dom'
import Login from './login'
import './login.scss'


ReactDom.hydrate(
  <div style={{ backgroundColor: '#eee' }}>
    <Login />
  </div>,
  document.getElementById('root')
)
