import { User } from '../../utils/user.js'

let data = {
  mobile: {
    codeRequestText: '发送验证码',
    number: '',
    code: '',
    numberError: false,
    codeError: false,
    verified: false,
    codeInputAnimateCss: ''
  }
}

let methods = {

  onCodeRequest: function (e) {
    let page = getCurrentPages().pop()
    let mobile = e.detail.value.number
    if (mobile == '') return

    let codeRequestText = this.data.codeRequestText
    if (codeRequestText != '发送验证码') return

    var reg = /^1[3|4|5|7|8]\d{9}$/
    if (!reg.test(mobile)) {
      getApp().listener.trigger('toptip', '手机号码输入有误')
      page.setData({
        [this.scope + '.numberError']: true
      })
      return
    }

    this.data.number = mobile
    page.setData({
      [this.scope + '.number']: this.data.number
    })

    User.mobileCodeRequest(mobile)
      .then(function (res) {
        if (res.error == 'this mobile is used') {
          getApp().listener.trigger('toptip', '手机号码已被绑定')
          page.setData({
            [this.scope + '.numberError']: true
          })
        }
      }.bind(this))

    let second = 60
    this.data.codeRequestText = '60秒后重发'
    page.setData({
      [this.scope + '.codeRequestText']: this.data.codeRequestText
    })
    let timer = setInterval(function () {
      second--
      if (second == 0) {
        this.data.codeRequestText = '发送验证码'
        page.setData({
          [this.scope + '.codeRequestText']: this.data.codeRequestText
        })
        clearInterval(timer)
      } else {
        this.data.codeRequestText = second + '秒后重发'
        if (second < 10) this.data.codeRequestText = '0' + this.data.codeRequestText
        page.setData({
          [this.scope + '.codeRequestText']: this.data.codeRequestText
        })
      }
    }.bind(this), 1000)
  },

  onNumberInputFocus: function (e) {
    let page = getCurrentPages().pop()
    page.setData({
      [this.scope + '.numberError']: false
    })
  },

  onCodeInput: function (e) {
    let page = getCurrentPages().pop()
    this.data.code = e.detail.value
    page.setData({
      [this.scope + '.code']: this.data.code
    })
  },

  onCodeInputFocus: function (e) {
    let page = getCurrentPages().pop()
    page.setData({
      [this.scope + '.codeError']: false
    })
  },

  onCodeConfirm: function (e) {
    let page = getCurrentPages().pop()
    let mobile = this.data.number
    let code = this.data.code
    if (code == '') return;

    User.mobileCodeVerify(mobile, code)
      .then(function (res) {
        if (!res.error) {
          page.setData({
            [this.scope + '.codeInputAnimateCss']: 'slideUp'
          })
          setTimeout(function () {
            page.setData({
              [this.scope + '.verified']: true
            })
          }.bind(this), 3000)
        } else {
          page.setData({
            [this.scope + '.codeError']: true
          })
          getApp().listener.trigger('toptip', '验证码错误')
        }
      }.bind(this))
      .catch(function (res) {
        page.setData({
          [this.scope + '.codeError']: true
        })
        getApp().listener.trigger('toptip', '验证码错误')
      }.bind(this))
  }
}

export class Mobile {

  constructor(options, parentScope) {
    let page = getCurrentPages().pop()
    this.scope = parentScope ? parentScope + '.mobile' : 'mobile'
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