// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 请求的根路径
$http.baseUrl='https://www.uinav.com'
// $http.baseUrl='http://localhost:8080'

// 
uni.$showMsg = function(title = "网络异常",duration = 1500){
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// 参照：https://www.npmjs.com/package/@escook/request-miniprogram
//  请求开始之前做一些事情
$http.beforeRequest = function (options) {
  wx.showLoading({
    title: '数据加载中...',
  })
  
  // 判断当前访问的接口是否是有权限的接口
  if(options.url.indexOf('/api/')!== -1){
    options.header = {
      Authorization:store.state.m_user.token
    }
    
  }
  console.log(options)
}

//  响应拦截器 请求完成之后做一些事情
$http.afterRequest = function () {
  wx.hideLoading()
}


// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
// import VueResource from 'vue-resource'

// Vue.use(VueResource)


Vue.config.productionTip = false

App.mpType = 'app'

// 导入 store 的实例对象

Vue.prototype.$store=store
console.log(store,"this.$store.state.cart")
const app = new Vue({
    ...App,
     // 将 store 挂载到 Vue 实例上
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
    store
  }
}
// #endif