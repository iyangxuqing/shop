import { Shop } from '../../utils/shop.js'

let methods = {

  onPhoneTap: function (e) {
    let page = getCurrentPages().pop()
    let shop = page.data.pageShop.shop
    wx.makePhoneCall({
      phoneNumber: shop.phone,
    })
  },

  onAddressTap: function (e) {
    let page = getCurrentPages().pop()
    let shop = page.data.pageShop.shop
    wx.openLocation({
      name: shop.name,
      address: shop.address,
      latitude: shop.latitude,
      longitude: shop.longitude,
    })
  },

}

export class PageShop {

  constructor(options) {
    let page = getCurrentPages().pop()
    page.setData({
      pageShop: {}
    })
    for (let key in methods) {
      page['pageShop.' + key] = methods[key].bind(this)
      page.setData({
        ['pageShop.' + key]: 'pageShop.' + key
      })
    }
  }

  loadData() {
    let page = getCurrentPages().pop()
    Shop.get().then(function (shop) {
      page.setData({
        'pageShop.shop': shop,
      })
      wx.setNavigationBarTitle({
        title: shop.name
      })
    })
  }

  onShopUpdate(shop) {
    let page = getCurrentPages().pop()
    page.setData({
      'pageShop.shop': shop
    })
    wx.setNavigationBarTitle({
      title: shop.name,
    })
  }

}