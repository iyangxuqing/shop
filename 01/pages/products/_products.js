import { Resource } from '../../utils/resource.js'
import { Products } from '../../utils/products.js'

let methods = {

  onProductTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

}

export class PageProducts {

  constructor(options) {
    let page = getCurrentPages().pop()
    page.setData({
      pageProducts: {}
    })
    for (let key in methods) {
      page['pageProducts.' + key] = methods[key].bind(this)
      page.setData({
        ['pageProducts.' + key]: 'pageProducts.' + key
      })
    }
  }

  loadData() {
    let page = getCurrentPages().pop()
    Promise.all([Resource.get(), Products.getProducts()]).then(function (res) {
      let resource = res[0]
      let products = res[1]
      let homeLogo = resource['homeLogo']
      let homeSlogan = resource['homeSlogan']
      let homeHeadImages = JSON.parse(resource['homeHeadImages'] || '[]')
      page.setData({
        'pageProducts.products': products,
        'pageProducts.homeLogo': homeLogo,
        'pageProducts.homeSlogan': homeSlogan,
        'pageProducts.homeHeadImages': homeHeadImages
      })
    })
  }

  onResourceUpdate(resource) {
    let page = getCurrentPages().pop()
    let homeLogo = resource['homeLogo']
    let homeSlogan = resource['homeSlogan']
    let homeHeadImages = JSON.parse(resource['homeHeadImages'] || '[]')
    page.setData({
      'pageProduct.homeLogo': homeLogo,
      'pageProduct.homeSlogan': homeSlogan,
      'pageProduct.homeHeadImages': homeHeadImages,
    })
  }

  onProductsUpdate(products) {
    let page = getCurrentPages().pop()
    page.setData({
      'pageProduct.products': products
    })
  }

}