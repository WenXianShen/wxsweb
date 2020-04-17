import { LoadingBar } from 'view-design'
import router from './router'
import store from './store'
import createRoutes from '@/utils/createRoutes'
import { getDocumentTitle, resetTokenAndClearUser } from './utils'

// 是否有菜单数据
let hasMenus = false
router.beforeEach((to, from, next) => {
  document.title = getDocumentTitle(to.meta.title)
  LoadingBar.start()
  if (sessionStorage.getItem('token')) { // 判断本地是否存在token，如果不存在则跳转登录页
    if (to.path === '/') {
      next()
    } else if (hasMenus) {
      next()
    } else {
      try {
        // 根据登录的用户角色，加载菜单以及路由
        store.state.menuItems = JSON.parse(sessionStorage.getItem('menuList'))
        const routes = createRoutes(store.state.menuItems)
        // 动态添加路由
        router.addRoutes(routes)
        hasMenus = true
        store.state.isTokenCheck = true // 这里是为了判断后端是否验证token
        next({ path: to.path })
      } catch (error) {
        resetTokenAndClearUser()
        next(`/`)
      }
    }
  } else {
    hasMenus = false
    if (to.path === '/') {
      next()
    } else {
      next(`/`)
    }
  }
})

router.afterEach(() => {
  LoadingBar.finish()
})
