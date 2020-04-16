import { asyncRoutes } from '@/router'
// 将菜单信息转成对应的路由信息 动态添加
export default function createRoutes (data) {
  const result = []
  const children = []
  result.push({
    path: '/home', // 这里写home是登录后跳转的页面(对应login页面的登录成功后跳转的路由)
    component: () => import('../components/Index.vue'),
    children
  })
  /**
   * 默认页面任何用户角色都可以看到
   */
  data.unshift({name: 'msg', size: 20, type: '', text: '通知消息', hidden: true})
  data.unshift({name: 'password', size: 20, type: '', text: '修改密码', hidden: true})
  data.unshift({name: 'userinfo', size: 20, type: '', text: '用户信息', hidden: true})
  data.unshift({name: 'home', size: 20, type: 'md-home', text: '主页'})
  /**
   * 这里根据用户角色对应的菜单动态生成路由
   */
  data.forEach(item => {
    generateRoutes(children, item)
  })
  // 最后添加404页面 否则会在登陆成功后跳到404页面
  result.push(
    { path: '*', redirect: '/404' }
  )
  return result
}

function generateRoutes (children, item) {
  if (item.name) {
    if (asyncRoutes[item.name] === undefined) { // 这里判断是有可能先在后台管理中添加菜单，没有页面时，会出问题
      var routerName = item.name
      children.push({path: '/' + routerName, name: routerName, meta: { title: item.text }})
    } else {
      children.push(asyncRoutes[item.name])
    }
  }
  if (item.children) {
    item.children.forEach(e => {
      generateRoutes(children, e)
    })
  }
}
