import { Loading } from '../../template/loading/loading.js'
import { Resource } from '../../utils/resource.js'
import { Products } from '../../utils/products.js'

let app = getApp()

Page({

  data: {
    youImageMode: app.youImageMode,
  },

  onResourceUpdate: function (resource) {
    let homeHeadImages = resource['homeHeadImages'] || '[]'
    homeHeadImages = JSON.parse(homeHeadImages) || []
    let homeSlogan = resource['homeSlogan']
    let homeLogo = resource['homeLogo']
    this.setData({
      homeHeadImages: homeHeadImages,
      homeSlogan: homeSlogan,
      homeLogo: homeLogo
    })
  },

  onProductsUpdate: function (products) {
    this.setData({
      products: products
    })
  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()
    app.listener.on('resource', this.onResourceUpdate)
    app.listener.on('products', this.onProductsUpdate)

    let page = this
    page.loading.show()
    Promise.all([Resource.get(), Products.getProducts()]).then(function (res) {
      let resource = res[0]
      let products = res[1];
      let homeHeadImages = resource['homeHeadImages'] || '[]'
      homeHeadImages = JSON.parse(homeHeadImages) || []
      let homeSlogan = resource['homeSlogan']
      let homeLogo = resource['homeLogo']
      page.setData({
        homeHeadImages: homeHeadImages,
        homeSlogan: homeSlogan,
        homeLogo: homeLogo,
        products: products,
        ready: true,
      })
      page.loading.hide()
    })
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
    let page = this
    Promise.all([Resource.get(), Products.getProducts()]).then(function (res) {
      let resource = res[0]
      let products = res[1];
      let homeHeadImages = resource['homeHeadImages'] || '[]'
      homeHeadImages = JSON.parse(homeHeadImages) || []
      let homeSlogan = resource['homeSlogan']
      let homeLogo = resource['homeLogo']
      page.setData({
        homeHeadImages: homeHeadImages,
        homeSlogan: homeSlogan,
        homeLogo: homeLogo,
        products: products,
        ready: true,
      })
      wx.stopPullDownRefresh()
    })
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