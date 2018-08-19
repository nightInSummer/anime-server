import { observable, action } from 'mobx'
import { message } from "antd"
import * as API from '../../apis'
import * as _ from '../../../common/utils'

export default class Store {
  @observable news = {
    newsList: [],
    newsModal: false,
    newsLoading: true
  }

  @observable sowing = {
    sowingList: [],
    sowingModal: false,
    sowingLoading: true
  }

  @observable company = {
    companyList: [],
    companyModal: false,
    companyLoading: true
  }

  @observable activity = {
    activityList: [],
    activityKeyList: [],
    activityKeyModal: false,
    activityValueModal: false,
    activityLoading: true
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

}
