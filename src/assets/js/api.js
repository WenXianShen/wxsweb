/**
 * Created by jcg on 2017/5/15.
 */
export default {
  webLogin: {
    // 用户登录接口
    login: 'WebLogin/login.do'
  },
  user: {// 用户
    getUserList: 'user/getUserList', // 根据条件查询用户列表
    insertUser: 'user/insertUser',
    getUserInfoById: 'user/getUserInfoById',
    updateUser: 'user/updateUser',
    deleteUser: 'user/deleteUser'
  },
  menu: { // 菜单
    getMenuList: 'menu/getMenuList', // 查询菜单列表
    saveMenu: 'menu/saveMenu', // 保存菜单
    updateMenu: 'menu/updateMenu', // 修改菜单
    deleteMenu: 'menu/deleteMenu', // 删除菜单,
    getMenuInfoByMenuId: 'menu/getMenuInfoByMenuId', // 获取菜单详情,
    getMenuTreeByRoleId: 'menu/getMenuTreeByRoleId', // 根据角色id获取对应菜单
    updateRoleMenuListByRoleId: 'menu/updateRoleMenuListByRoleId' // 给角色分配菜单
  },
  role: {// 角色
    getRoleList: 'role/getRoleList',
    saveRole: 'role/saveRole', // 保存角色
    updateRole: 'role/updateRole', // 修改角色
    deleteRole: 'role/deleteRole', // 删除角色,
    getRoleInfoByRoleId: 'role/getRoleInfoByRoleId', // 获取角色详情,
    getUserRoleByUserId: 'role/getUserRoleByUserId', // 获取用户的角色,
    updateUserRole: 'role/updateUserRole' // 获取用户的角色,
  }

}
