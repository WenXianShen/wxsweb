<template>
  <div style="width: 500px;margin: 5em auto;">
    <Form
      class="user-account-key"
      ref="form"
      :model="form"
      :rules="rules"
    >
      <FormItem label="原密码" prop="password" style="width: 50%;">
        <Input
          type="password"
          placeholder="请输入原密码"
          v-model="form.password"
        ></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPassword" style="width: 50%;">
        <Input
          type="password"
          placeholder="请设置新密码"
          v-model="form.newPassword"
        ></Input>
      </FormItem>
      <FormItem label="确认密码" prop="newPassword2" style="width: 50%;">
        <Input
          type="password"
          placeholder="请确认新密码"
          v-model="form.newPassword2"
        >
        </Input>
      </FormItem>
      <FormItem>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button onclick="javascript:window.history.back(-1);">取消</el-button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data () {
    // 此处即表单发送之前验证
    let validateNewPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位!'))
      } else if (value === this.form.password) {
        callback(new Error('新密码不能与原密码相同!'))
      } else {
        callback()
      }
    }
    let validateNewPassword2 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位!'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请设置新密码', trigger: 'blur'}, // 正则表达式验证},
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        newPassword2: [
          { required: true, message: '请确认新密码', trigger: 'blur'}, // 正则表达式验证},
          { validator: validateNewPassword2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this
          this._UTIL.jpost(
            this._API.user.getUserInfoById,
            JSON.parse(sessionStorage.getItem('users')).id,
            function (data) {
              that.form.id = data.id
              if (data.password !== that.form.password) {
                that.$Message.error('原密码错误')
              } else {
              // 执行修改操作
                let formData = new FormData()
                formData.append('id', that.form.id)
                formData.append('password', that.form.newPassword2)
                that._UTIL.fpost(that._API.user.updateUser, formData, function (
                  data
                ) {
                  that.$Message.success(data)
                  history.back(-1)
                })
              }
            }
          )
        } else {
          this.$message.error('请正确填写表单')
          return false
        }
      })
    }
  }
}
</script>
