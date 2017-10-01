import { User } from '../../utils/user.js'

let data = {
  userinfo: {
    avatarUrl: '',
    nickName: ''
  }
}

let methods = {

  getUserInfo: function(e){
    let page = getCurrentPages().pop()
    if (e.detail.userInfo) {
      page.setData({
        [this.scope]: e.detail.userInfo
      })
      User.setUser(e.detail.userInfo)
    }
  },

}

export class UserInfo {

  constructor(options, parentScope) {
    let page = getCurrentPages().pop()
    this.scope = parentScope ? parentScope + '.userInfo' : 'userInfo'
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

}