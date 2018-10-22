import * as NewsInfo from './controllers/News'
import * as SowingInfo from './controllers/Sowing'
import * as CompanyInfo from './controllers/Company'
import * as ActivityInfo from './controllers/Activity'
import * as RecruitInfo from './controllers/Recruit'
import * as InsetInfo from './controllers/Inset'
import * as PhotoInfo from './controllers/Photo'
import * as VideoInfo from './controllers/Video'
import * as User from './controllers/User'



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
    path: '/updateNews',
    method: 'put',
    action: NewsInfo.updateNewsInfo
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
    path: '/company',
    method: 'put',
    action: CompanyInfo.updateCompanyInfo
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
    path: '/activityKeyOld',
    method: 'get',
    action: ActivityInfo.getOldActivityKey
  },
  {
    path: '/activityKey',
    method: 'post',
    action: ActivityInfo.setActivityKey
  },
  {
    path: '/activityKey',
    method: 'put',
    action: ActivityInfo.updateOldActivityKey
  },
  {
    path: '/activityValueOld',
    method: 'get',
    action: ActivityInfo.getOldActivityValue
  },
  {
    path: '/activityValue',
    method: 'post',
    action: ActivityInfo.setActivityValue
  },
  {
    path: '/activityValue',
    method: 'put',
    action: ActivityInfo.updateOldActivityValue
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
  },
  {
    path: '/recruit',
    method: 'get',
    action: RecruitInfo.getRecruitInfo
  },
  {
    path: '/recruit',
    method: 'post',
    action: RecruitInfo.setRecruitInfo
  },
  {
    path: '/recruit',
    method: 'put',
    action: RecruitInfo.publishRecruit
  },
  {
    path: '/recruit',
    method: 'delete',
    action: RecruitInfo.deleteRecruit
  },
  {
    path: '/updateRecruit',
    method: 'put',
    action: RecruitInfo.updateRecruitInfo
  },
  {
    path: '/inset',
    method: 'get',
    action: InsetInfo.getInsetInfo
  },
  {
    path: '/inset',
    method: 'post',
    action: InsetInfo.setInsetInfo
  },
  {
    path: '/inset',
    method: 'delete',
    action: InsetInfo.deleteInset
  },
  {
    path: '/photo',
    method: 'get',
    action: PhotoInfo.getPhotoInfo
  },
  {
    path: '/photo',
    method: 'post',
    action: PhotoInfo.setPhotoInfo
  },
  {
    path: '/photo',
    method: 'delete',
    action: PhotoInfo.deletePhoto
  },
  {
    path: '/video',
    method: 'get',
    action: VideoInfo.getVideoInfo
  },
  {
    path: '/video',
    method: 'post',
    action: VideoInfo.setVideoInfo
  },
  {
    path: '/video',
    method: 'put',
    action: VideoInfo.updateVideoInfo
  },
  {
    path: '/video',
    method: 'delete',
    action: VideoInfo.deleteVideo
  },
  {
    path: '/login',
    method: 'post',
    action: User.login
  },
  {
    path: '/userInfo',
    method: 'get',
    action: User.userInfo
  },
  {
    path: '/web/news',
    method: 'get',
    action: NewsInfo.getNewsInfo
  },
  {
    path: '/web/sowing',
    method: 'get',
    action: SowingInfo.getSowingInfo
  },
  {
    path: '/web/company',
    method: 'get',
    action: CompanyInfo.getCompanyInfo
  },
  {
    path: '/web/activity',
    method: 'get',
    action: ActivityInfo.getActivity
  },
  {
    path: '/web/recruit',
    method: 'get',
    action: RecruitInfo.getRecruitInfo
  },
  {
    path: '/web/inset',
    method: 'get',
    action: InsetInfo.getInsetInfo
  },
  {
    path: '/web/photo',
    method: 'get',
    action: PhotoInfo.getPhotoInfo
  },
  {
    path: '/web/video',
    method: 'get',
    action: VideoInfo.getVideoInfo
  }
]
