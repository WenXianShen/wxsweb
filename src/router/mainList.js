export default
{
  home: {
    path: '/home',
    name: 'home',
    meta: { title: '主页' },
    component: () => import('../views/index/Home.vue')
  },
  password: {
    path: '/password',
    name: 'password',
    meta: { title: '修改密码' },
    component: () => import('../views/index/Password.vue')
  },
  msg: {
    path: '/msg',
    name: 'msg',
    meta: { title: '通知消息' },
    component: () => import('../views/index/Msg.vue')
  },
  userinfo: {
    path: '/userinfo',
    name: 'userinfo',
    meta: { title: '用户信息' },
    component: () => import('../views/index/UserInfo.vue')
  },
  userManage: {
    path: '/userManage',
    name: 'userManage',
    meta: { title: '用户管理' },
    component: () => import('../views/user/UserManage.vue')
  },
  menuManage: {
    path: '/menuManage',
    name: 'menuManage',
    meta: { title: '菜单管理' },
    component: () => import('../views/menu/MenuManage.vue')
  },
  menuAdd: {
    path: '/menuAdd',
    name: 'menuAdd',
    component: () => import('../views/menu/MenuAdd.vue')
  },
  menuUpdate: {
    path: '/menuUpdate/:id',
    name: 'menuUpdate',
    component: () => import('../views/menu/MenuUpdate.vue')
  },
  roleManage: {
    path: '/roleManage',
    name: 'roleManage',
    meta: { title: '角色管理' },
    component: () => import('../views/role/RoleManage.vue')
  },
  updateRoleMenuList: {
    path: '/updateRoleMenuList/:roleId',
    name: 'updateRoleMenuList',
    meta: { title: '分配菜单' },
    component: () => import('../views/role/UpdateRoleMenuList.vue')
  }
}
