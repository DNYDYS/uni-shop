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
}

//  响应拦截器 请求完成之后做一些事情
$http.afterRequest = function () {
  wx.hideLoading()
}


// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// import VueResource from 'vue-resource'

// Vue.use(VueResource)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif