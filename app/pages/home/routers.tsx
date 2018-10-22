import * as React from 'react'
import {
  Route,
  Switch
} from "react-router-dom"

import HomePage from './homepage'
import Company from './company'
import Activity from './activity'
import Recruit from './recruit'
import Inset from './production/inset'
import Photo from './production/cartoon/photo'
import Video from './production/cartoon/video'
import Header from '../../layouts/header'



export default function Routers () {
  return (
    <React.Fragment>
      <Route path='/' component={Header}/>
      <Switch>
        <Route exact path='/' component={ HomePage } />
        <Route exact path='/page/homepage' component={ HomePage } />
        <Route exact path='/page/company' component={ Company } />
        <Route exact path='/page/activity' component={ Activity } />
        <Route exact path='/page/recruit' component={ Recruit } />
        <Route exact path='/page/production/inset' component={ Inset } />
        <Route exact path='/page/production/cartoon/video' component={ Video } />
        <Route exact path='/page/production/cartoon/photo' component={ Photo } />
      </Switch>
    </React.Fragment>
  )
}
