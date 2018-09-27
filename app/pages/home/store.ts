import { observable, action } from 'mobx'
import { message } from "antd"
import * as API from '../../apis'
import * as _ from '../../../common/utils'

export default class Store {
  @observable news = {
    id: 0,
    newsList: [],
    newsModal: false,
    newsLoading: true,
    type: 'save'
  }

  @observable sowing = {
    id: 0,
    sowingList: [],
    sowingModal: false,
    sowingLoading: true,
    type: 'save'
  }

  @observable company = {
    id: 0,
    companyList: [],
    companyModal: false,
    companyLoading: true,
    type: 'save'

  }

  @observable activity = {
    id: 0,
    activityList: [],
    activityKeyList: [],
    activityKeyModal: false,
    activityValueModal: false,
    activityLoading: true,
    type: 'save'
  }

  @observable recruit = {
    id: 0,
    recruitList: [],
    recruitModal: false,
    recruitLoading: true,
    type: 'save'
  }

  @observable production = {
    id: 0,
    productionList: [],
    productionModal: false,
    productionLoading: true,
    type: 'save'
  }

  @observable inset = {
    id: 0,
    insetList: [],
    insetModal: false,
    insetLoading: true,
    type: 'save'
  }

  @observable photo = {
    id: 0,
    photoList: [],
    photoModal: false,
    photoLoading: true,
    type: 'save'
  }

  @observable video = {
    id: 0,
    videoList: [],
    videoModal: false,
    videoLoading: true,
    type: 'save'
  }

  /**
   * 获取新闻列表
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getNews(data): Promise<void> {
    this.news.newsLoading = true
    const res = await API.news.getNewsInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.news.newsList = res.data
    this.news.newsLoading = false
  }

  /**
   * 添加新闻
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveNews(data): Promise<void> {
    const res = await API.news.saveNewsInfo(data)
    if(res.statusNo) {
      message.success('添加新闻成功！')
      this.news.newsModal = false
      await this.getNews({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取新闻列表
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async publishNews(data): Promise<void> {
    const res = await API.news.publishNews(data)
    if(res.statusNo) {
      message.success('发布新闻成功！')
      await this.getNews({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取新闻列表
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteNews(data): Promise<void> {
    const res = await API.news.deleteNewsInfo(data)
    if(res.statusNo) {
      message.success('删除新闻成功！')
      await this.getNews({})
    } else {
      message.error(res.data)
    }
  }

  @action.bound
  async updateNews(data): Promise<void> {
    const res = await API.news.updateNewsInfo(data)
    if(res.statusNo) {
      message.success('修改新闻成功！')
      this.news.newsModal = false
      await this.getNews({})
    } else {
      message.error(res.data)
    }
  }


  /**
   * 获取轮播图
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getSowing(data): Promise<void> {
    this.sowing.sowingLoading = true
    const res = await API.sowing.getSowingInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.sowing.sowingList = res.data
    this.sowing.sowingLoading = false
  }

  /**
   * 添加轮播图
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveSowing(data): Promise<void> {
    const res = await API.sowing.saveSowingInfo(data)
    if(res.statusNo) {
      message.success('添加轮播图成功！')
      this.sowing.sowingModal = false
      await this.getSowing({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除轮播图
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteSowing(data): Promise<void> {
    const res = await API.sowing.deleteSowingInfo(data)
    if(res.statusNo) {
      message.success('删除轮播图成功！')
      await this.getSowing({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取公司文章
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getCompany(data): Promise<void> {
    this.company.companyLoading = true
    const res = await API.company.getCompanyInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.company.companyList = res.data
    this.company.companyLoading = false
  }

  /**
   * 添加公司文章
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveCompany(data): Promise<void> {
    const res = await API.company.saveCompanyInfo(data)
    if(res.statusNo) {
      message.success('添加公司文章成功！')
      this.company.companyModal = false
      await this.getCompany({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除公司文章
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteCompany(data): Promise<void> {
    const res = await API.company.deleteCompanyInfo(data)
    if(res.statusNo) {
      message.success('删除公司文章成功！')
      await this.getCompany({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 更新公司文章
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async updateCompany(data): Promise<void> {
    const res = await API.company.updateCompanyInfo(data)
    if(res.statusNo) {
      message.success('修改成功！')
      this.company.companyModal = false
      await this.getCompany({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取活动列表
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getActivity(data): Promise<void> {
    this.activity.activityLoading = true
    const res = await API.activity.getActivityInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.activity.activityList = res.data
    this.activity.activityLoading= false
  }

  /**
   * 获取活动一级标题
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getActivityKey(data): Promise<void> {
    const res = await API.activity.getActivityKey({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.activity.activityKeyList = res.data
  }

  /**
   * 添加一级标题
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveActivityKey(data): Promise<void> {
    const res = await API.activity.saveActivityKey(data)
    if(res.statusNo) {
      message.success('添加成功！')
      this.activity.activityKeyModal = false
      await this.getActivity({})
      await this.getActivityKey({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 添加活动
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveActivityValue(data): Promise<void> {
    const res = await API.activity.saveActivityValue(data)
    if(res.statusNo) {
      message.success('添加成功！')
      this.activity.activityValueModal = false
      await this.getActivity({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除一级
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteActivityKey(data): Promise<void> {
    const res = await API.activity.deleteCompanyKey(data)
    if (res.statusNo) {
      message.success('删除成功！')
      await this.getActivity({})
      await this.getActivityKey({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除活动
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteActivityValue(data): Promise<void> {
    const res = await API.activity.deleteCompanyValue(data)
    if (res.statusNo) {
      message.success('删除成功！')
      await this.getActivity({})
    } else {
      message.error(res.data)
    }
  }

  @action.bound
  async updateActivityKey(data): Promise<void> {
    const res = await API.activity.updateActivityKey(data)
    if(res.statusNo) {
      message.success('修改成功！')
      this.activity.activityKeyModal = false
      await this.getActivity({})
    } else {
      message.error(res.data)
    }
  }

  @action.bound
  async updateActivityValue(data): Promise<void> {
    const res = await API.activity.updateActivityValue(data)
    if(res.statusNo) {
      message.success('修改成功！')
      this.activity.activityValueModal = false
      await this.getActivity({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取招聘列表
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getRecruit(data): Promise<void> {
    this.recruit.recruitLoading = true
    const res = await API.recruit.getRecruitInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.recruit.recruitList = res.data
    this.recruit.recruitLoading = false
  }

  /**
   * 添加招聘信息
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveRecruit(data): Promise<void> {
    const res = await API.recruit.saveRecruitInfo(data)
    if(res.statusNo) {
      message.success('添加招聘信息成功！')
      this.recruit.recruitModal = false
      await this.getRecruit({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 发布招聘信息
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async publishRecruit(data): Promise<void> {
    const res = await API.recruit.publishRecruit(data)
    if(res.statusNo) {
      message.success('发布招聘信息成功！')
      await this.getRecruit({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除招聘信息
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteRecruit(data): Promise<void> {
    const res = await API.recruit.deleteRecruitInfo(data)
    if(res.statusNo) {
      message.success('删除招聘信息成功！')
      await this.getRecruit({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 更新招聘信息
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async updateRecruit(data): Promise<void> {
    const res = await API.recruit.updateRecruitInfo(data)
    if(res.statusNo) {
      message.success('修改招聘信息成功！')
      this.recruit.recruitModal = false
      await this.getRecruit({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取插画类作品信息
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getInset(data): Promise<void> {
    this.inset.insetLoading = true
    const res = await API.inset.getInsetInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.inset.insetList = res.data
    this.inset.insetLoading = false
  }

  /**
   * 添加插画类作品
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveInset(data): Promise<void> {
    const res = await API.inset.saveInsetInfo(data)
    if(res.statusNo) {
      message.success('添加成功！')
      this.inset.insetModal = false
      await this.getInset({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除插画类作品
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteInset(data): Promise<void> {
    const res = await API.inset.deleteInsetInfo(data)
    if(res.statusNo) {
      message.success('删除轮播图成功！')
      await this.getInset({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取图片类动画作品信息
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getPhoto(data): Promise<void> {
    this.photo.photoLoading = true
    const res = await API.photo.getPhotoInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.photo.photoList = res.data
    this.photo.photoLoading = false
  }

  /**
   * 添加图片类动画作品
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async savePhoto(data): Promise<void> {
    const res = await API.photo.savePhotoInfo(data)
    if(res.statusNo) {
      message.success('添加成功！')
      this.photo.photoModal = false
      await this.getPhoto({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除图片类动画作品
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deletePhoto(data): Promise<void> {
    const res = await API.photo.deletePhotoInfo(data)
    if(res.statusNo) {
      message.success('删除轮播图成功！')
      await this.getPhoto({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 获取视频类动画作品信息
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async getVideo(data): Promise<void> {
    this.video.videoLoading = true
    const res = await API.video.getVideoInfo({})
    res.data.forEach((ret, i) => { ret['key'] = i + 1 })
    this.video.videoList = res.data
    this.video.videoLoading = false
  }

  /**
   * 添加视频类动画作品
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async saveVideo(data): Promise<void> {
    const res = await API.video.saveVideoInfo(data)
    if(res.statusNo) {
      message.success('添加公司文章成功！')
      this.video.videoModal = false
      await this.getVideo({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 删除视频类动画作品
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async deleteVideo(data): Promise<void> {
    const res = await API.video.deleteVideoInfo(data)
    if(res.statusNo) {
      message.success('删除公司文章成功！')
      await this.getVideo({})
    } else {
      message.error(res.data)
    }
  }

  /**
   * 更新视频类动画作品
   * @param data
   * @returns {Promise<void>}
   */
  @action.bound
  async updateVideo(data): Promise<void> {
    const res = await API.video.updateVideoInfo(data)
    if(res.statusNo) {
      message.success('修改成功！')
      this.video.videoModal = false
      await this.getVideo({})
    } else {
      message.error(res.data)
    }
  }



}
