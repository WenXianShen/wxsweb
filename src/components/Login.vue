<template>
  <div class="login-vue" :style="bg">
    <div class="container">
      <p class="title">WELCOME</p>
      <div class="input-c">
        <Input prefix="ios-contact"  sytle=autocomplete:off  v-model="loginVo.account" placeholder="用户名" clearable @on-blur="verifyAccount"  @keyup.enter="show"/>
        <p class="error">{{accountError}}</p>
      </div>
      <div class="input-c">
        <Input type="password" v-model="loginVo.password" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"  @keyup.enter="show"/>
        <p class="error">{{pwdError}}</p>
      </div>
      <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
      <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginVo: { account: '', password: '', userType: 0 },
      accountError: '',
      pwdError: '',
      isShowLoading: false,
      bg: {}
    }
  },
  created () {
    this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
  },
  watch: {
    $route: {
      handler (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    verifyAccount () {
      if (this.loginVo.account === '' || this.loginVo.account === undefined) {
        this.accountError = '请输入用户名'
      } else {
        this.accountError = ''
      }
    },
    verifyPwd () {
      if (this.loginVo.password === '' || this.loginVo.password === undefined) {
        this.pwdError = '请输入密码'
      } else {
        this.pwdError = ''
      }
    },
    register () {

    },
    forgetPwd () {

    },
    submit () {
      let that = this
      // 为表单绑定验证功能
      if (this.loginVo.account === '' || this.loginVo.account === undefined) {
        this.$Message.error('请输入用户名')
        return
      }
      if (this.loginVo.password === '' || this.loginVo.password === undefined) {
        this.$Message.error('请输入密码')
        return
      }
      this._UTIL.fpost(this._API.webLogin.login, this.loginVo, function (data) {
        that.isShowLoading = true
        that.$Message.success('登录成功')
        // 登陆成功 设置用户信息
        sessionStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
        sessionStorage.setItem('users', JSON.stringify(data.user))
        // 假设这里是后台返回的 token
        sessionStorage.setItem('token', data.token)
        // 后台返回的动态菜单
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList))
        that.$router.push('/main')
      })
    },
    show: function () {
      this.submit()
    }
  }
}
</script>

<style>
  .login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
  }
  .login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
  }
  .login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
  }
  .login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
  }
  .login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
  }
  .login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
  }
  .login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .login-vue .input-c {
    margin: auto;
    width: 200px;
  }
  .login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
  }
  .login-vue .submit {
    width: 200px;
  }
  .login-vue .account {
    margin-top: 30px;
  }
  .login-vue .account span {
    cursor: pointer;
  }
  .login-vue .ivu-icon {
    color: #eee;
  }
  .login-vue .ivu-icon-ios-close-circle {
    color: #777;
  }
</style>
