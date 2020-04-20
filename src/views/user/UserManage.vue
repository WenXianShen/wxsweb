<template>
  <div style="padding: 10px">
    <div
      style="background: #fff; border-radius: 8px; padding: 40px;height: 1000px;"
    >
      <div style="height: 120px;">
        <Form :model="formItem" :label-width="100">
          <FormItem label="用户名：" style="width: 20%;">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </FormItem>
        </Form>

        <div style="float: right;margin-right: 1%;">
          <Button type="primary" icon="ios-search" @click="initUserList(1)"
            >查询</Button
          >
          <Button type="primary" icon="ios-close" @click="clear()">重置</Button>
        </div>
      </div>
      <div style="margin-bottom: 20px;">
        <Button type="primary" icon="md-add" @click="openChoosePage('insert')"
          >新增</Button
        >
      </div>
      <Table
        max-height="670"
        border
        stripe
        :columns="columns"
        :data="tableData"
      ></Table>
      <br />
      <Page
        :total="totalCount"
        :page-size="formItem.pager.pagesize"
        :current="formItem.pager.currentPage"
        @on-page-size-change="pageSizeLoad"
        @on-change="initUserList"
        show-sizer
        show-elevator
        style="text-align: center;"
      />
    </div>
    <UserDialog
      v-if="choosePage.isOpen"
      :choosePage="choosePage"
      @chooseResult="chooseResult"
    ></UserDialog>
    <el-dialog title="分配角色" :visible.sync="allocDialogVisible" width="30%">
      <el-select
        v-model="allocRoleIds"
        multiple
        placeholder="请选择"
        size="small"
        style="width: 80%"
      >
        <el-option
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="handleAllocDialogConfirm()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UserDialog from './dialog/UserDialog'
export default {
  name: 'userManage',
  data () {
    return {
      columns: [
        {
          type: 'index',
          title: '序号',
          align: 'center'
        },
        {
          title: '账户',
          key: 'account'
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'gender',
          render: (h, params) => {
            return h('div', [
              h('p', {}, params.row.gender === '0' ? '男' : '女')
            ])
          }
        },
        {
          title: '状态',
          key: 'isDeleted',
          render: (h, params) => {
            return h('div', [
              h('p', {}, params.row.isDeleted === '1' ? '禁用' : '启用')
            ])
          }
        },
        {
          title: '操作',
          key: 'isDeleted',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openChoosePage('update', params.row)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      var form = {}
                      form.id = params.row.id
                      form.isDeleted = params.row.isDeleted === '2' ? 1 : 2
                      let that = this
                      this._UTIL.jpost(
                        this._API.user.updateUser,
                        form,
                        function (data) {
                          that.$Message.success(data)
                          that.initUserList(1)
                        }
                      )
                    }
                  }
                },
                params.row.isDeleted === '2' ? '禁用' : '启用'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.allocRoleIds = []
                      this.formItem.id = params.row.id
                      let that = this
                      this._UTIL.jpost(
                        this._API.role.getUserRoleByUserId,
                        params.row.id,
                        function (data) {
                          data.forEach(function (item) {
                            that.allocRoleIds.push(item.id)
                          })
                        }
                      )
                      this.allocDialogVisible = true
                    }
                  }
                },
                '分配角色'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let that = this
                      this._UTIL.jpost(
                        this._API.user.deleteUser,
                        params.row.id,
                        function (data) {
                          that.$Message.success(data)
                          that.initUserList(1)
                        }
                      )
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      tableData: [],
      totalCount: 0,
      formItem: {
        pager: { currentPage: 1, pagesize: 10 },
        id: '',
        name: '',
        userType: 0
      },
      choosePage: { isOpen: false, width: '800px', type: '', object: null },
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: []
    }
  },
  created () {
    this.initUserList(1)
    this.initRoleList()
  },
  methods: {
    initRoleList () {
      let that = this
      this._UTIL.jpost(this._API.role.getRoleList, this.formItem, function (
        data
      ) {
        that.allRoleList = data.list
      })
    },
    initUserList (currentPage) {
      let that = this
      that.formItem.pager.currentPage = currentPage
      this._UTIL.jpost(this._API.user.getUserList, this.formItem, function (
        data
      ) {
        that.tableData = data.list
        that.totalCount = data.totolCount
      })
    },
    pageSizeLoad (pageSize) {
      // 更改每页显示的条数
      this.formItem.pager.pagesize = pageSize
      this.formItem.pager.currentPage = 1
      this.initUserList(1)
    },
    clear () {
      this.formItem.name = ''
    },
    openChoosePage (type, object) {
      this.choosePage.type = type
      this.choosePage.object = object
      this.choosePage.isOpen = true
    },
    chooseResult (val) {
      if (val === 1) {
        this.initUserList(1)
      }
    },
    handleAllocDialogConfirm () {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        this._UTIL.jpost(
          this._API.role.updateUserRole,
          {id: this.formItem.id, roleIds: this.allocRoleIds},
          function (data) {
            if (data === '分配成功') { // 跳转路由
              that.$message({
                type: 'success',
                message: data
              })
              that.allocDialogVisible = false
              that.initUserList(1)
            } else {
              that.$message({
                type: 'error',
                message: data
              })
            }
          }
        )
      })
    }
  },
  components: {
    UserDialog
  }
}
</script>

<style scoped></style>
