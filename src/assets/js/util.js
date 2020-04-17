/**
 * Created by jcg on 2017/5/15.
 */
// 加密相关
import md5 from 'js-md5'
import store from '../../store'
let base64 = require('js-base64').Base64

export default function (Vue) {
  if (Vue.prototype._UTIL) {
    return
  }
  Vue.prototype._UTIL = {
    // json类型post请求
    jpost: function (url, body, callback) {
      // appId 请求的来源标识，多系统共用接口时可配置区别或其它业务逻辑使用
      /* body.appId = 'REM_WEB' */
      let token = sessionStorage.getItem('token')
      if (token !== undefined && token !== '' && token !== null) {
        Vue.http.headers.common['token'] = token
      }
      Vue.http.post(process.env.BASE_API + url, body).then(response => {
        if (response.body.status === 1) {
          callback(response.body.result)
        } else if (response.body.status === 2) { // 业务检验失败
          Vue.prototype.$Message.warning(response.body.message)
        } else if (response.body.status === 0) { // 登录失效
          if (store.state.isTokenCheck) { // 判断后端是否验证过token
            store.state.isTokenCheck = false
            Vue.prototype.$Message.warning(response.body.message)
            window.location.href = '#/'
          }
        } else { // 系统错误
          Vue.prototype.$Message.warning(response.body.message)
        }
      }, response => {
        // TODO 网络请求失败后的处理
      })
    },
    // form类型post请求
    fpost: function (url, body, callback) {
      // appId 请求的来源标识，多系统共用接口时可配置区别或其它业务逻辑使用
      body.appId = 'REM_WEB'
      // 用户唯一标识，提交给服务器校验
      /* let userKey = this.getUserKey()
      if (userKey) {
        body.userKey = userKey
      }
      if (!this.arrayExists(url, ignoreUrlList)) {
        // 针对不同权限，添加对应参数
        let userInfo = this.getLoginUser()
        if (userInfo === null) {
          window.location.href = '#/'
        } else {
          if (userInfo.orgType === '2') {
            body.educationBureauId = userInfo.educationBureauId
          }
          if (userInfo.orgType === '4') {
            body.schoolId = userInfo.schoolId
          }
        }
      } */
      let token = sessionStorage.getItem('token')
      if (token !== undefined && token !== '' && token !== null) {
        Vue.http.headers.common['token'] = token
      }
      // 请求类型设置
      let options = {emulateJSON: true}
      Vue.http.post(process.env.BASE_API + url, body, options).then(response => {
        if (response.body.status === 1) {
          callback(response.body.result)
        } else if (response.body.status === 2) { // 业务检验失败
          Vue.prototype.$Message.warning(response.body.message)
        } else if (response.body.status === 0) { // 登录失效
          if (store.state.isTokenCheck) { // 判断后端是否验证过token
            store.state.isTokenCheck = false
            Vue.prototype.$Message.warning(response.body.message)
            window.location.href = '#/'
          }
        } else { // 系统错误
          Vue.prototype.$Message.warning(response.body.message)
        }
      }, response => {

      })
    },
    // upload类型post请求
    // TODO 工具方法
    btrim: function (str) {
      str = str.replace(/^(\s|\u00A0)+/, '')
      for (let i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
          str = str.substring(0, i + 1)
          break
        }
      }
      return str
    },
    arrayExists: function (str, list) {
      if (str && list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i] === str) {
            return true
          }
        }
      }
      return false
    },
    // TODO 存储相关
    setLoginUserData: function (loginUserData) {
      this.setObject('login_user_json', loginUserData.user)
      this.setObject('menu_list_json', loginUserData.menuList)
    /*  this.setObject('function_list_json', loginUserData.functionList)
      this.setObject('router_list_json', loginUserData.routerList)
      this.setValue('login_user_key', loginUserData.userKey)
      this.setObject('recent_import_time', loginUserData.recentImportTime) */
    },
    checkRouter: function (str) {
      /* let key = md5(this.getUserKey() + str)
      let list = this.getObject('router_list_json')
      if (list === null || list.length === 0) {
        return false
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i] === key) {
          return true
        }
      }
      return false */
      let list = this.getObject('menu_list_json')
      if (list === null || list.length === 0) {
        return false
      }
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].children.length; j++) {
          if (list[i].children[j].path === str) {
            return true
          }
        }
      }
      return false
    },
    setObject: function (key, obj) {
      sessionStorage.setItem(md5(key), this.base64Encode(JSON.stringify(obj)))
    },
    getObject: function (key) {
      let obj = sessionStorage.getItem(md5(key))
      if (obj === null) {
        return null
      }
      return JSON.parse(this.base64Decode(obj))
    },
    getUserKey: function () {
      return this.getValue('login_user_key')
    },
    getValue: function (key) {
      let obj = sessionStorage.getItem(md5(key))
      if (obj === null) {
        return null
      }
      return this.base64Decode(obj)
    },
    base64Encode: function (str) {
      return base64.encode(str)
    },
    base64Decode: function (str) {
      return base64.decode(str)
    },
    getDaysByMonth (value) { // 任意输入某个月的日期，如2018-01-01或2018-01-02，就能等到这个月份有多少天，这里得到2018年1月的31
      let date = new Date(value)
      // 获取年份
      let year = date.getFullYear()
      // 获取当前月份
      let mouth = date.getMonth() + 1
      let days = 0
      // 当月份为二月时，根据闰年还是非闰年判断天数
      if (mouth === 2) {
        days = year % 4 === 0 ? 29 : 28
      } else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
        // 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31
      } else {
        // 其他月份，天数为：30.
        days = 30
      }
      return days
    },
    timeSort (arr) { // 对时间数组进行排序
      arr.sort(function (a, b) {
        return a > b ? 1 : -1
      })
    },
    getNowTime: function () {
      let now = new Date()
      let time = now.toLocaleDateString().replace('/', '年').replace('/', '月') + '日 '
      time += this.toTimeNum(now.getHours()) + ':' + this.toTimeNum(now.getMinutes()) + ':' + this.toTimeNum(now.getSeconds())
      return time
    },
    getTime () {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let h = date.getHours()
      let mi = date.getMinutes()
      let s = date.getSeconds()
      return y + '-' + (m > 9 ? m : ('0' + m)) + '-' + (d > 9 ? d : ('0' + d)) + ' ' + (h > 9 ? h : '0' + h) + ':' + (mi > 9 ? mi : '0' + mi) + ':' + (s > 9 ? s : '0' + s)
    },
    toTimeNum: function (num) {
      if (num < 10) {
        return '0' + num
      } else {
        return '' + num
      }
    },
    getDateFormat (date) {
      if (date !== '' && date !== null) {
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        return y + '-' + (m > 9 ? m : ('0' + m)) + '-' + (d > 9 ? d : ('0' + d))
      }
    },
    getDateFormatAll (date) {
      if (date !== '' && date !== null) {
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getHours()
        let mm = date.getMinutes()
        let s = date.getSeconds()
        return y + '-' + (m > 9 ? m : ('0' + m)) + '-' + (d > 9 ? d : ('0' + d)) + ' ' + (h > 9 ? h : ('0' + h)) + ':' + (mm > 9 ? mm : ('0' + mm)) + ':' + (s > 9 ? s : ('0' + s))
      }
    },
    getMonthSub (month) {
      let date = new Date()
      let day = this.getDaysByMonth(date)
      let newDay = day > date.getDate() ? date.getDate() : day
      let newDate = new Date(date.getFullYear(), date.getMonth() - month, newDay)
      return this.getDateFormatAll(newDate)
    }
  }
};
