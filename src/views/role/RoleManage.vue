<template>
  <div style="padding: 10px">
    <div
      style="background: #fff; border-radius: 8px; padding: 40px;height: 1000px;"
    >
      <div style="height: 120px;">
        <Form :model="formItem" :label-width="100">
          <FormItem label="角色名称：" style="width: 30%;">
            <Input v-model="formItem.roleName" placeholder="请输入"></Input>
          </FormItem>
        </Form>

        <div style="float: right;margin-right: 1em;">
          <Button type="primary" icon="ios-search" @click="initRoleList(1)"
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
        @on-change="initRoleList"
        show-sizer
        show-elevator
        style="text-align: center;"
      />
    </div>
    <RoleDialog
      v-if="choosePage.isOpen"
      :choosePage="choosePage"
      @chooseResult="chooseResult"
    ></RoleDialog>
  </div>
</template>

<script>
import RoleDialog from './dialog/RoleDialog'
export default {
  name: 'roleManage',
  data () {
    return {
      columns: [
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '角色类型',
          key: 'roleType',
          render: (h, params) => {
            return h('div', [
              h(
                'p',
                {},
                params.row.roleType === '0' ? '超级管理员' : '普通管理员'
              )
            ])
          }
        },
        {
          title: '描述',
          key: 'description'
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
          key: '',
          minWidth: 130,
          maxWidth: 300,
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
                        this._API.role.updateRole,
                        form,
                        function (data) {
                          that.$Message.success(data)
                          that.initRoleList(1)
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
                      this.$router.push('/updateRoleMenuList/' + params.row.id)
                    }
                  }
                },
                '分配菜单'
              )
            ])
          }
        }
      ],
      tableData: [
      ],
      totalCount: 0,
      formItem: {
        pager: { currentPage: 1, pagesize: 10 },
        id: '',
        roleName: '',
        roleType: 0
      },
      choosePage: { isOpen: false, width: '800px', type: '', object: null }
    }
  },
  created () {
    this.initRoleList(1)
  },
  methods: {
    initRoleList (currentPage) {
      let that = this
      that.formItem.pager.currentPage = currentPage
      this._UTIL.jpost(this._API.role.getRoleList, this.formItem, function (
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
      this.initRoleList(1)
    },
    clear () {
      this.formItem.roleName = ''
    },
    openChoosePage (type, object) {
      this.choosePage.type = type
      this.choosePage.object = object
      this.choosePage.isOpen = true
    },
    chooseResult (val) {
      if (val === 1) {
        this.initRoleList(1)
      }
    }
  },
  components: {
    RoleDialog
  }
}
</script>

<style scoped></style>
