import { Loading } from '../../template/loading/loading.js'
import { Toptip } from '../../template/toptip/toptip.js'
import { Tabbar } from '../../template/tabbar/tabbar.js'

import { PageProducts } from '../../template/pageProducts/index.js'
import { PageShop } from '../../template/pageShop/index.js'
import { PageWode } from '../../template/pageWode/index.js'
import { PageAdmin } from '../../template/pageAdmin/index.js'

let app = getApp()

Page({

  data: {
    youImageMode: app.youImageMode,
    page: 0,
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
    if (index == 2) {
      this.pageWode.loadData()
    }
  },

  onToptip: function (message) {
    this.toptip.show({
      title: message,
    })
  },

  onShopUpdate: function (shop) {
    this.pageShop.onShopUpdate(shop)
  },

  onResourceUpdate: function (resource) {
    this.pageProducts.onResourceUpdate(resource)
  },

  onProductsUpdate: function (products) {
    this.pageProducts.onProductsUpdate(products)
  },

  onAddressUpdate: function (address) {
    this.pageWode.address.onAddressUpdate(address)
  },

  onCouponsUpdate: function (coupons) {
    this.pageWode.__coupons.onCouponsUpdate(coupons)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()
    this.toptip = new Toptip()
    this.tabbar = new Tabbar({
      onTabChanged: this.onTabChanged
    })
    this.pageProducts = new PageProducts()
    this.pageProducts.loadData()
    this.pageShop = new PageShop()
    this.pageWode = new PageWode()
    this.pageAdmin = new PageAdmin()

    app.listener.on('toptip', this.onToptip)
    app.listener.on('shop', this.onShopUpdate)
    app.listener.on('resource', this.onResourceUpdate)
    app.listener.on('products', this.onProductsUpdate)
    app.listener.on('addressUpdate', this.onAddressUpdate)
    app.listener.on('couponsUpdate', this.onCouponsUpdate)

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