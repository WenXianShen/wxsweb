import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 左侧菜单栏数据
    menuItems: sessionStorage.getItem('menuList') ? JSON.parse(sessionStorage.getItem('menuList')) : [
      {
        /* name: 'home', // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: 'md-home', // icon类型
        text: '主页' // 文本内容 */
      }/*,
      {
        text: '二级菜单',
        type: 'ios-paper',
        children: [
          {
            type: 'ios-grid',
            name: 't1',
            text: '表格'
            // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
            // hidden: true,
          },
          {
            text: '三级菜单',
            type: 'ios-paper',
            children: [
              {
                type: 'ios-notifications-outline',
                name: 'msg',
                text: '查看消息'
              },
              {
                type: 'md-lock',
                name: 'password',
                text: '修改密码'
              },
              {
                type: 'md-person',
                name: 'userinfo',
                text: '基本资料'
              }
            ]
          }
        ]
      } */
    ],
    /*  这里是为了判断后台是否验证token
     *   例子:进入某个页面，这个页面加载完之后会调用后端方法，后端验证token，如token失效，会提示信息，
     *        但如果页面加载完调用多次后台方法，则后端会返回多次信息，所以为了用户体验，这里只要后台返回一次token失效信息，则将更改变量值
     * */
    isTokenCheck: true
  },
  mutations: {
    setMenus (state, items) {
      state.menuItems = [...items]
    }
  }
})

export default store
