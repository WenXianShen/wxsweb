import Vue from 'vue'
import Router from 'vue-router'
import mainList from './mainList'
Vue.use(Router)
const commonRoutes = [
  {
    path: '/',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('../components/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('../components/404.vue')
  },
  { path: '/main', redirect: '/home' }
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = mainList

/* home: {
    path: 'home',
    name: 'home',
    meta: { title: '主页' },
    component: () => import('../views/index/Home.vue')
  },
  t1: {
    path: 't1',
    name: 't1',
    meta: { title: '表格' },
    component: () => import('../views/index/T1.vue')
  },
  password: {
    path: 'password',
    name: 'password',
    meta: { title: '修改密码' },
    component: () => import('../views/index/Password.vue')
  },
  msg: {
    path: 'msg',
    name: 'msg',
    meta: { title: '通知消息' },
    component: () => import('../views/index/Msg.vue')
  },
  userinfo: {
    path: 'userinfo',
    name: 'userinfo',
    meta: { title: '用户信息' },
    component: () => import('../views/index/UserInfo.vue')
  },
  userManage: {
    path: 'userManage',
    name: 'userManage',
    meta: { title: '账号管理' },
    component: () => import('../views/user/UserManage.vue')
  },
  userAdd: {
    path: 'userAdd',
    name: 'userAdd',
    component: () => import('../views/user/UserAdd.vue'),
    hidden: true
  } */

const createRouter = () => new Router({
  routes: commonRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
/**
 *防止报Uncaught (in promise)
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
