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
  }
]
// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = mainList

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
