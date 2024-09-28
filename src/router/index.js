import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/desktop/HomeView.vue'
import HomeViewM from '@/views/mobile/HomeView.vue'

import LoginVue from '@/views/desktop/LoginView.vue'
import LoginVueM from '@/views/mobile/LoginView.vue'

import LayoutVue from '@/views/desktop/Layout.vue'
import LayoutMVue from '@/views/mobile/Layout.vue'

const routes = [
  
  { path: '/loginM',component: LoginVueM },
  { path:'/login',component: LoginVue },
  //桌面端
  { path: '/',component: LayoutVue,redirect: '/home' ,children:[
      {path: '/home',component: HomeView},
  
  ] },
  //移动端
  {
      path: '/mobile',component: LayoutMVue,redirect: '/mobile/home' ,children:[
          
        {path: '/mobile/home',component: HomeViewM},

      ]
  }
  
  
]

//创建路由器
const router = createRouter(
  {
      history: createWebHistory(),
      routes: routes
  }
)

// 路由前置守卫
// router.beforeEach((to, from, next) => {
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
//   if (isMobile) {
//     // 如果是移动端，重定向到移动端路由
//     if (to.path === '/') {
//       next('/mobile');
//     } else {
//       next();
//     }
//   } else {
//     next(); // 如果是桌面端，继续正常路由
//   }
// });



export default router
