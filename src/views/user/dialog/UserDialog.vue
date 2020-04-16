<template>
  <div class="v-transfer-dom" id="roleDialog">
    <div class="ivu-modal-mask" style=""></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal" :style="{width: choosePage.width}">
        <div class="ivu-modal-content">
          <a class="ivu-modal-close" @click="choosePage.isOpen=false">
            <Icon type="md-close" />
                    </a>
          <div class="ivu-modal-body">
            <row>
              <div class='box-title'>
                <div class="box-title-letter">{{choosePage.title}}</div>
              </div>
            </row>
            <row>
              <Form :model="formItem" :label-width="100" :rules="ruleValidate"  ref="formItem" style="margin-top: 5%;">
                <FormItem label="账号：" style="width: 40%;" prop="userAccount" >
                  <Input v-model="formItem.userAccount" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="用户名：" style="width: 40%;" prop="userNameZh">
                  <Input v-model="formItem.userNameZh"   sytle=autocomplete:off autocomplete="new-password" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="密码：" style="width: 40%;" prop="password">
                  <Input v-model="formItem.password"  sytle=autocomplete:off autocomplete="new-password" placeholder="请输入" type="password" password ></Input>
                </FormItem>
                <FormItem label="性别:" style="width: 40%;">
                  <RadioGroup v-model="formItem.gender">
                    <Radio :label="0" checked="checked">男</Radio>
                    <Radio :label="1">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="邮箱：" style="width: 40%;" prop="mail">
                  <Input v-model="formItem.mail" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="手机号：" style="width: 40%;" prop="telephone">
                  <Input v-model="formItem.telephone" placeholder="请输入"></Input>
                </FormItem>
                <Form-item>
                  <Button type="primary" @click="handleSubmit('formItem') ">确定</Button>
                  <Button style="margin-left: 20px;" @click="choosePage.isOpen=false">取消</Button>
                </Form-item>
              </Form>
            </row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formItem: {
        userAccount: '',
        userNameZh: '',
        gender: 0,
        password: '',
        mail: '',
        telephone: '',
        userType: 0
      },
      ruleValidate: {
        userAccount: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ],
        userNameZh: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能少于6位', trigger: 'blur', pattern: /^[0-9A-Za-z]{6,}$/}// 正则表达式验证
        ]
      }
    }
  },
  created: function () {
    if (this.choosePage.type === 'update') {
      this.choosePage.title = '编辑用户'
      let that = this
      if (that.choosePage.object.id === undefined && that.choosePage.object.id === '') {
        return
      }
      this._UTIL.jpost(this._API.user.getUserInfoById, this.choosePage.object.id, function (data) {
        that.formItem = data
        that.formItem.gender = parseInt(data.gender)
      })
    } else {
      this.choosePage.title = '添加用户'
    }
  },
  props: {
    choosePage: {
      type: Object
    }
  },
  components: {
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let that = this
          if (this.choosePage.type === 'update') {
            this._UTIL.jpost(this._API.user.updateUser, this.formItem, function (data) {
              that.$Message.success(data)
              if (data === '修改成功') {
                that.choosePage.isOpen = false
                that.$emit('chooseResult', 1)
              }
            })
          } else {
            this._UTIL.jpost(this._API.user.insertUser, this.formItem, function (data) {
              that.$Message.success(data)
              if (data === '添加成功') {
                that.choosePage.isOpen = false
                that.$emit('chooseResult', 1)
              }
            })
          }
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    }
  }
}
</script>

<style scoped>
  #roleDialog .ivu-modal-close {
    font-size: 20px !important;
  }
</style>
