
let methods = {

  onAdminProductTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/admin/products/products',
    })
  },

  onAdminCouponTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/coupons/coupons',
    })
  },

  onAdminShopTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/shop/shop',
    })
  },

  onCustomerTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/customer/customer'
    })
  },

  onDataverTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/datavers/datavers',
    })
  },

  onDataverShow: function (e) {
    let page = getCurrentPages().pop()
    page.setData({
      'pageAdmin.dataverShow': true
    })
  },

}

export class PageAdmin{

  constructor(options){
    let page = getCurrentPages().pop()
    page.setData({
      pageAdmin: {}
    })
    for (let key in methods) {
      page['pageAdmin.' + key] = methods[key].bind(this)
      page.setData({
        ['pageAdmin.' + key]: 'pageAdmin.' + key
      })
    }
  }

}