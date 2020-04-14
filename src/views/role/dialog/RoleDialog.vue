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
                <FormItem label="角色名称：" style="width: 40%;" prop="roleName">
                  <Input v-model="formItem.roleName" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="角色级别:" style="width: 40%;" prop="roleType">
                  <i-select
                    v-model="formItem.roleType"
                  >
                    <i-option :value="0">超级管理员</i-option>
                    <i-option :value="1">普通管理员</i-option>
                  </i-select>
                </FormItem>
                <FormItem label="角色描述:" style="width: 40%;" >
                  <Input v-model="formItem.description" placeholder="请输入"></Input>
                </FormItem>
                <Form-item>
                  <Button type="primary" @click="handleSubmit('formItem') ">确定</Button>
                  <Button style="margin-left: 20px;" @click="choosePage.isOpen=false">取消</Button>
                </Form-item>
              </Form>
            </row>
            <br><br>
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
        roleName: '',
        roleType: '',
        description: ''
      },
      ruleValidate: {
        roleName: [
          {required: true, message: '角色名称不能为空', trigger: 'blur'}
        ],
        roleType: [
          {required: true, message: '请选择角色级别', trigger: 'change', type: 'number'}
        ]

      }
    }
  },
  created: function () {
    if (this.choosePage.type === 'update') {
      this.choosePage.title = '编辑角色信息'
      let that = this
      if (that.choosePage.object.id === undefined && that.choosePage.object.id === '') {
        return
      }
      this._UTIL.jpost(this._API.role.getRoleInfoByRoleId, this.choosePage.object.id, function (data) {
        that.formItem = data
        that.formItem.roleType = parseInt(data.roleType)
      })
    } else {
      this.choosePage.title = '添加角色信息'
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
            this._UTIL.jpost(this._API.role.updateRole, this.formItem, function (data) {
              that.$Message.success(data)
              if (data === '修改成功') {
                that.choosePage.isOpen = false
                that.$emit('chooseResult', 1)
              }
            })
          } else {
            this._UTIL.jpost(this._API.role.saveRole, this.formItem, function (data) {
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
