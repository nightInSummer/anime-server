import * as React from 'react'
import {
  Route,
  Switch
} from "react-router-dom"

import HomePage from './homepage'
import Company from './company'
import Activity from './activity'
import Header from '../../layouts/header'



export default function Routers () {
  return (
    <React.Fragment>
      <Route path='/' component={Header}/>
      <Switch>
        <Route exact path='/' component={ HomePage } />
        <Route exact path='/homepage' component={ HomePage } />
        <Route exact path='/company' component={ Company } />
        <Route exact path='/activity' component={ Activity } />
      </Switch>
    </React.Fragment>
  )
}
