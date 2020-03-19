export default
{
  home: {
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
    component: () => import('../views/user/UserAdd.vue')
  },
  menuManage: {
    path: 'menuManage',
    name: 'menuManage',
    component: () => import('../views/menu/MenuManage.vue')
  }
}
