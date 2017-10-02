export class Component {

  constructor(scope, parentScope, options, data, methods) {
    let page = getCurrentPages().pop()
    this.scope = parentScope ? parentScope + '.' + scope : scope
    options = Object.assign({}, data.defaults, options)
    page.setData({
      [this.scope]: options
    })
    for (let key in methods) {
      page[this.scope + '.' + key] = methods[key].bind(this)
      page.setData({
        [this.scope + '.' + key]: this.scope + '.' + key
      })
    }
  }

  getData(attr) {
    let page = getCurrentPages().pop()
    let data = page.data
    let scope = this.scope
    let names = scope.split('.')
    for (let i in names) {
      data = data[names[i]]
    }
    if (attr) return data[attr]
    return data
  }

  setData(data) {
    let page = getCurrentPages().pop()
    let _data = {}
    for (let i in data) {
      _data[this.scope + '.' + i] = data[i]
    }
    page.setData(_data)
  }

}