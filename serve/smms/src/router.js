import Vue from 'vue'  //引入vue
import Router from 'vue-router'  //引入路由


Vue.use(Router)  //注册路由

export default new Router({  //创建路由实列对象暴露出去
  routes: [
    { path: '/', redirect:'/login'}, //根目录重定向
    { path :'/login', component: () => import('./views/Login/Login.vue')},//登录
    {
      path:'/home',
      component:() => import('./views/Home/Home.vue'),//父组件
      redirect:'/home/systeminfo',
      children: [ //子组件
        //系统信息
        {
          path: '/home/systeminfo',
          component: () => import('./views/Systemlnfo/Systemlnfo.vue'),
        },
        //账号管理
        {
          path:'/home/accountmanage',
          component: () => import('./views/AccountManage/AccountManage.vue'),
        },
        {
          path:'/home/accountadd',
          component: () => import('./views/AccountAdd/AccountAdd.vue'),
        },
        {
          path:'/home/passwordmodify',
          component: () => import('./views/PasswordModify/PasswordModify.vue')
        },
        // 商品管理
        {
          path:'/home/goodsmanage',
          component: () => import('./views/GoodsManage/GoodsManage.vue'),
        },
        {
          path:'/home/goodsadd',
          component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
        },
        //统计管理
        {
          path:'/home/selltotal',
          component: () => import('./views/SellTotal/SellTotal.vue'),
        },
        {
          path:'/home/stocktotal',
          component: () => import('./views/StockTotal/StockTotal.vue'),
        },
        // 进货管理
        {
          path:'/home/stockcontrol',
          component: () => import('./views/StockControl/StockControl.vue'),
        },
        {
          path:'/home/stockadd',
          component: () => import('./views/StockAdd/StockAdd.vue'),
        },
        //个人中心
        {
          path:'/home/personal',
          component:() => import('./views/Personal/Personal.vue'),
        }

      ]
     


  }
]
})
