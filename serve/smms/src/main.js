import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'; //引入js组件
import 'element-ui/lib/theme-chalk/index.css'; //引入css样式
import './assets/css/reset.css';  //引入重置样式
import './assets/css/common.css';  //引入公共样式

import axios from 'axios' //引入axios
Vue.prototype.req = axios; //挂载vue原型上
import qs from 'qs';  //引入qs
Vue.prototype.qs = qs;  //挂载vue原型上
import echarts  from 'echarts'//引入echarts
Vue.prototype.echarts = echarts;


import local from '@/utils/local'

Vue.use( ElementUI )


// 路由守卫
router.beforeEach((to, from, next) => {
  //获取token
  const token = local.get('hhh_token')
   //判断
   if (token) {
     next()  //放行
   } else {
     //如果去得是登录页面，直接放行
     if (to.path === '/login') {
       next()
     } else {
       next({path:'/login'})
     }
   }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
