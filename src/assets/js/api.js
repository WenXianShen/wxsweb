/**
 * Created by jcg on 2017/5/15.
 */
export default {
  webLogin: {
    // 用户登录接口
    login: 'WebLogin/login.do'
  },
  user: {// 用户
    // 根据条件查询用户列表
    getUserList: 'user/getUserList'
  },
  menu: { // 菜单
    getMenuList: 'menu/getMenuList', // 查询菜单列表
    saveMenu: 'menu/saveMenu', // 保存菜单
    updateMenu: 'menu/updateMenu', // 修改菜单
    deleteMenu: 'menu/deleteMenu', // 删除菜单,
    getMenuInfoByMenuId: 'menu/getMenuInfoByMenuId' // 获取菜单详情
  },
  role: {// 角色
    getRoleList: 'role/getRoleList'
  }
}
