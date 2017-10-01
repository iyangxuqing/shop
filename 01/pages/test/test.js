import { Loading } from '../../template/loading/loading.js'
import { Tabbar } from '../../template/tabbar/tabbar.js'
import { Resource } from '../../utils/resource.js'
import { Products } from '../../utils/products.js'

import { PageProducts } from '../../pages/products/_products.js'
import { PageShop } from '../../pages/shop/_shop.js'
import { PageWode } from '../../pages/wode/wode/_wode.js'
import { PageAdmin } from '../../pages/admin/admin/_admin.js'

let app = getApp()

Page({

  data: {
    youImageMode: app.youImageMode,
    page: 0,
    // pageWode: {
    //   userInfo,
    //   mobile,
    //   address,
    //   coupons: []
    // }
  },

  onTabChanged: function (index) {
    this.setData({
      page: index
    })
    if (index == 0) {
      this.pageProducts.loadData()
    }
    if (index == 1) {
      this.pageShop.loadData()
    }
  },

  onResourceUpdate: function (resource) {
    this.pageProducts.onResourceUpdate(resource)
  },

  onProductsUpdate: function (products) {
    this.pageProducts.onProductsUpdate(products)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()
    this.tabbar = new Tabbar({
      onTabChanged: this.onTabChanged
    })
    this.pageProducts = new PageProducts()
    this.pageProducts.loadData()
    this.pageShop = new PageShop()
    this.pageWode = new PageWode()
    this.pageAdmin = new PageAdmin()

    app.listener.on('resource', this.onResourceUpdate)
    app.listener.on('products', this.onProductsUpdate)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})