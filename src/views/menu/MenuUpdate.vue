<template>
  <div style="padding: 10px" id="menuUpdate">
    <div
      style="background: #fff; border-radius: 8px; padding: 40px;height: 1000px;"
    >
      <div style="height: 100px;width: 100%;">
        <Form
          :model="formItem"
          :label-width="100"
          :rules="ruleValidate"
          ref="formItem"
        >
          <FormItem label="菜单名称：" style="width: 20%;" prop="menuName">
            <Input v-model="formItem.menuName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="菜单级别：" style="width: 20%;" prop="lvl">
            <i-select
              v-model="formItem.lvl"
              name="lvl"
              @on-change="isShowParentMenu"
            >
              <i-option :value="0">一级菜单</i-option>
              <i-option :value="1">二级菜单</i-option>
            </i-select>
          </FormItem>
          <FormItem
            label="父级菜单："
            style="width: 20%;"
            v-if="parentIsShow"
            prop="parentId"
          >
            <i-select v-model="formItem.parentId" name="lvl">
              <i-option
                v-for="item in menuList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</i-option
              >
            </i-select>
          </FormItem>
          <FormItem label="路由名称：" style="width: 20%;" prop="routerPath"   v-if="parentIsShow">
            <Input v-model="formItem.routerPath"></Input>
          </FormItem>
          <FormItem label="排序：" style="width: 20%;" prop="displaySeq">
            <Input v-model="formItem.displaySeq"></Input>
          </FormItem>
          <FormItem label="是否展示：" style="width: 20%;" prop="isHidden">
            <i-select v-model="formItem.isHidden">
              <i-option :value="0">展示</i-option>
              <i-option :value="1">不展示</i-option>
            </i-select>
          </FormItem>
          <FormItem label="菜单icon：" style="width: 20%;">
            <Input v-model="formItem.type"></Input>
          </FormItem>
          <Form-item>
            <Button type="primary" @click="handleSubmit('formItem')"
              >确定</Button
            >
            <Button
              style="margin-left: 20px;"
              onclick="javascript:window.history.back(-1);"
              >取消</Button
            >
          </Form-item>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuUpdate',
  data () {
    return {
      parentIsShow: false,
      formItem: {
        id: '',
        menuName: '',
        lvl: '',
        parentId: '',
        routerPath: '',
        isHidden: '',
        displaySeq: ''
      },
      ruleValidate: {
        menuName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        lvl: [
          {
            required: true,
            message: '请选择菜单级别',
            trigger: 'change',
            type: 'number'
          }
        ],
        parentId: [
          {
            required: true,
            message: '请选择父级菜单',
            trigger: 'change',
            type: 'number'
          }
        ],
        routerPath: [
          { required: true, message: '请输入路由', trigger: 'blur' }
        ],
        isHidden: [
          {
            required: true,
            message: '请选择是否展示',
            trigger: 'change',
            type: 'number'
          }
        ]
      },
      menuList: []
    }
  },
  created () {
    this.formItem.id = this.$route.params.id
    if (this.formItem.id === undefined || this.formItem.id === '') {
      return
    }
    this.getMenuSelect(0) // 获取父级菜单
    this.getMenuInfoByMenuId()
  },
  methods: {
    getMenuInfoByMenuId () {
      // 根据menuId获取详情
      let that = this
      this._UTIL.fpost(
        this._API.menu.getMenuInfoByMenuId,
        { id: this.formItem.id },
        function (data) {
          that.formItem = data
          that.formItem.lvl = parseInt(data.lvl)
          that.formItem.isHidden = parseInt(data.isHidden)
          if (data.parentId !== undefined && data.parentId !== null) {
            that.parentIsShow = true
          }
        }
      )
    },
    isShowParentMenu () {
      if (this.formItem.lvl === 1) {
        this.parentIsShow = true
        return
      }
      this.parentIsShow = false
    },
    getMenuSelect (lvl) {
      // 获取一级父级菜单
      let that = this
      this._UTIL.jpost(this._API.menu.getMenuList, { lvl: lvl }, function (
        data
      ) {
        that.menuList = data.list
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let that = this
          this._UTIL.jpost(this._API.menu.updateMenu, this.formItem, function (
            data
          ) {
            that.$Message.success(data)
            if (data === '修改成功') {
              // 跳转路由
              that.$router.push('/menuManage')
            }
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    }
  }
}
</script>

<style scoped>
#menuUpdate .ivu-btn-ghost {
  color: #515a6e !important;
}
</style>
