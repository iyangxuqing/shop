import { Component } from '../component.js'
import { User } from '../../utils/user.js'

let data = {
  defaults: {
    nickName: '',
    avatarUrl: '',
  }
}

let methods = {
  getUserInfo: function (e) {
    let page = getCurrentPages().pop()
    if (e.detail.userInfo) {
      page.setData({
        [this.scope]: e.detail.userInfo
      })
      User.setUser(e.detail.userInfo)
    }
  }
}

export class UserInfo extends Component {
  constructor(options, parentScope) {
    super('userInfo', parentScope, options, data, methods)
  }
}