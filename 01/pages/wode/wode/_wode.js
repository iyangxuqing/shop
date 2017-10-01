import { Toptip } from '../../../template/toptip/toptip.js'
import { UserInfo } from '../../../template/userinfo/userinfo.js'
import { Mobile } from '../../../template/mobile/mobile.js'
import { User } from '../../../utils/user.js'
import { Coupons } from '../../../utils/coupons.js'

let methods = {

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
      User.setUser(e.detail.userInfo)
    }
  },

  onAddressTap: function (e) {
    console.log(e)
    let address = this.data.address || {}
    let province = address.province || ''
    let city = address.city || ''
    let district = address.district || ''
    let detail = address.detail || ''
    wx.navigateTo({
      url: '/pages/wode/addressEditor/addressEditor?province=' + province + '&city=' + city + '&district=' + district + '&detail=' + detail,
    })
  },

  onToptip: function (message) {
    this.toptip.show({
      title: message
    })
  },

  onUserAddressUpdate: function (address) {
    this.setData({
      address,
    })
  },

  onCouponsUpdate: function (coupons) {
    this.setData({
      coupons: coupons
    })
  },
}

export class PageWode {

  constructor(options) {
    let page = getCurrentPages().pop()
    page.setData({
      pageWode: {}
    })
    for (let key in methods) {
      page['pageWode.' + key] = methods[key].bind(this)
      page.setData({
        ['pageWode.' + key]: 'pageWode.' + key
      })
    }

    this.userInfo = new UserInfo({}, 'pageWode')
    this.mobile = new Mobile({}, 'pageWode')
  }

}