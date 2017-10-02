import { Toptip } from '../../../template/toptip/toptip.js'
import { UserInfo } from '../../../template/userinfo/userinfo.js'
import { Mobile } from '../../../template/mobile/mobile.js'
import { Address } from '../../../template/address/address.js'
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

  loadData(){
    User.getUser({
      fields: 'avatarUrl, nickName, mobileNumber, mobileVerified, address_province, address_city, address_district, address_detail',
    }).then(function (user) {
      if (!user) user = {}
      let userInfo = {
        nickName: user.nickName,
        avatarUrl: user.avatarUrl
      }
      let mobile = {
        number: user.mobileNumber,
        verified: user.mobileVerified == 1
      }
      let address = {
        province: user.address_province,
        city: user.address_city,
        district: user.address_district,
        detail: user.address_detail
      }
      this.userInfo = new UserInfo(userInfo, 'pageWode')
      this.mobile = new Mobile(mobile, 'pageWode')
    }.bind(this))
  }

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
    this.loadData()

    // this.userInfo = new UserInfo({}, 'pageWode')
    // this.mobile = new Mobile({}, 'pageWode')
    // this.address = new Address({}, 'pageWode')
  }

}