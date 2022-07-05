import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token.js'
// import loginPage from '@/views/Login/loginPage.vue'
// import layoutPage from '@/views/layout/layoutPage.vue'
// import homePage from '@/views/home/homePage.vue'
// import userPage from '@/views/user/userPage.vue'
// import articleDetail from '@/views/articleDetail/articleDetail.vue'
// import userEdit from '@/views/user/userEdit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layoutpage/homepage'
  },
  {
    path: '/loginpage',
    component: () =>
      import(/* webpackChunkName: "loginPage" */ '@/views/Login/loginPage.vue')
  },
  {
    path: '/layoutpage',
    component: () =>
      import(/* webpackChunkName: "layoutPage" */ '@/views/layout/layoutPage.vue'),
    children: [
      {
        path: 'homepage',
        component: () =>
          import(/* webpackChunkName: "homePage" */ '@/views/home/homePage.vue')
      },
      {
        path: 'userpage',
        component: () =>
          import(/* webpackChunkName: "userPage" */ '@/views/user/userPage.vue')
      }
    ]
  },
  {
    path: '/detail',
    component: () =>
      import(/* webpackChunkName: "articleDetail" */ '@/views/articleDetail/articleDetail.vue')
  },
  {
    path: '/useredit',
    component: () =>
      import(/* webpackChunkName: "userEdit" */ '@/views/user/userEdit.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫，不允许用户在登陆之后跳转至登录页
router.beforeEach((to, from, next) => {
  // ?.可选链操作符，前面对象中没有length，返回undefined
  if (getToken()?.length > 0 && to.path === '/loginpage') {
    next(false)
  } else {
    next()
  }
})
export default router
