import { User } from '../../utils/user.js'

let data = {
  address: {
    province: '',
    city: '',
    district: '',
    detail: '',
  }
}

let methods = {

  onAddressTap: function (e) {
    let address = this.getData()
    let province = address.province || ''
    let city = address.city || ''
    let district = address.district || ''
    let detail = address.detail || ''
    wx.navigateTo({
      url: '/pages/wode/addressEditor/addressEditor?province=' + province + '&city=' + city + '&district=' + district + '&detail=' + detail,
    })
  }

}

export class Address {

  constructor(options, parentScope) {
    let page = getCurrentPages().pop()
    this.scope = parentScope ? parentScope + '.address' : 'address'
    this.data = data.mobile
    page.setData({
      [this.scope]: data.mobile
    })
    for (let key in methods) {
      page[this.scope + '.' + key] = methods[key].bind(this)
      page.setData({
        [this.scope + '.' + key]: this.scope + '.' + key
      })
    }
  }

  getData() {
    let page = getCurrentPages().pop()
    let data = page.data
    let scope = this.scope
    let names = scope.split('.')
    for(let i in names){
      data = data[names[i]]
    }
    return data
  }

}