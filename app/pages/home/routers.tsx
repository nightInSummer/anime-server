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
        <Route exact path='/homepage' component={ HomePage } />
        <Route exact path='/company' component={ Company } />
        <Route exact path='/activity' component={ Activity } />
        <Route exact path='/recruit' component={ Recruit } />
        <Route exact path='/production/inset' component={ Inset } />
        <Route exact path='/production/cartoon/video' component={ Video } />
        <Route exact path='/production/cartoon/photo' component={ Photo } />
      </Switch>
    </React.Fragment>
  )
}
