<template>
  <div style="
    position: absolute;
    left: 0;
    right: 0;
    width: 720px;
    padding: 35px 35px 15px;
    margin: 20px auto;
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    transition: .3s;
">
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedList"
      :props="defaultProps"
      :default-expand-all="true"
    >
    </el-tree>
    <div style="margin-top: 10px;text-align: center;">
      <Button type="primary" @click="handleSubmit()">确定</Button>
      <Button style="margin-left: 20px;" @click="clear()">清空</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updateRoleMenuList',
  data () {
    return {
      formItem: {
        roleId: ''
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedList: [],
      menuMap: new Map()
    }
  },
  created () {
    this.formItem.roleId = this.$route.params.roleId
    if (
      this.formItem.roleId === undefined ||
      this.formItem.roleId === null ||
      this.formItem.roleId === ''
    ) {
      return
    }
    this.initMenuList()
  },
  methods: {
    initMenuList () {
      // 初始化菜单tree
      let that = this
      that.data = []
      this._UTIL.fpost(
        this._API.menu.getMenuTreeByRoleId,
        { roleId: this.formItem.roleId },
        function (data) {
          that.data = data.menuTree
          if (data.roleMenuList.length > 0 && data.allMenuList.length > 0) {
            data.allMenuList.forEach(function (item) {
              that.menuMap.set(item.id, item.id)
            })
            data.roleMenuList.forEach(function (item) {
              if (that.menuMap.get(item.id) > 0) {
                that.checkedList.push(item.id)
              }
            })
          }
        }
      )
    },
    handleSubmit () {
      let res = this.$refs.tree.getCheckedNodes()
      let res2 = this.$refs.tree.getHalfCheckedNodes()
      let arr = []
      res2.forEach(item => {
        arr.push(item.id)
      })
      res.forEach(item => {
        arr.push(item.id)
      })
      this.$confirm('是否分配菜单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let that = this
          this._UTIL.jpost(
            this._API.menu.updateRoleMenuListByRoleId,
            { id: this.formItem.roleId, menuList: arr },
            function (data) {
              if (data === '保存成功!') { // 跳转路由
                that.$message({
                  type: 'success',
                  message: data
                })
                that.$router.push('/roleManage')
              }
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    clear () {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>

<style scoped></style>
