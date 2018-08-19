import * as NewsInfo from './controllers/News'
import * as SowingInfo from './controllers/Sowing'
import * as CompanyInfo from './controllers/Company'
import * as ActivityInfo from './controllers/Activity'


interface Routers {
  path: string,
  method: string,
  action: object
}


export const AppRoutes: Array<Routers> = [
  {
    path: '/news',
    method: 'get',
    action: NewsInfo.getNewsInfo
  },
  {
    path: '/news',
    method: 'post',
    action: NewsInfo.setNewsInfo
  },
  {
    path: '/news',
    method: 'put',
    action: NewsInfo.publishNews
  },
  {
    path: '/news',
    method: 'delete',
    action: NewsInfo.deleteNews
  },
  {
    path: '/sowing',
    method: 'get',
    action: SowingInfo.getSowingInfo
  },
  {
    path: '/sowing',
    method: 'post',
    action: SowingInfo.setSowingInfo
  },
  {
    path: '/sowing',
    method: 'delete',
    action: SowingInfo.deleteSowing
  },
  {
    path: '/company',
    method: 'get',
    action: CompanyInfo.getCompanyInfo
  },
  {
    path: '/company',
    method: 'post',
    action: CompanyInfo.setCompanyInfo
  },
  {
    path: '/company',
    method: 'delete',
    action: CompanyInfo.deleteCompany
  },
  {
    path: '/activity',
    method: 'get',
    action: ActivityInfo.getActivity
  },
  {
    path: '/activityKey',
    method: 'get',
    action: ActivityInfo.getActivityKey
  },
  {
    path: '/activityKey',
    method: 'post',
    action: ActivityInfo.setActivityKey
  },
  {
    path: '/activityValue',
    method: 'post',
    action: ActivityInfo.setActivityValue
  },
  {
    path: '/activityKey',
    method: 'delete',
    action: ActivityInfo.deleteActivityKey
  },
  {
    path: '/activityValue',
    method: 'delete',
    action: ActivityInfo.deleteActivityValue
  }
]
