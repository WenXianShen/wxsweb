<template>
    <div style="padding: 10px">
        <div style="background: #fff; border-radius: 8px; padding: 40px;height: 1000px;">
          <div style="height: 120px;">
            <Form :model="formItem" :label-width="100">
              <FormItem label="用户名：" style="width: 20%;">
                <Input v-model="formItem.name" placeholder="请输入" ></Input>
              </FormItem>
            </Form>

            <div style="float: right;margin-right: 1%;">
              <Button type="primary" icon="ios-search" @click="initUserInfo(1)">查询</Button>
              <Button type="primary" icon="ios-close" @click="clear()"
              >重置</Button
              >
            </div>
          </div>
          <div style="margin-bottom: 20px;">
            <router-link to="userAdd">
              <Button type="primary" icon="md-add">新增</Button>
            </router-link>
          </div>
            <Table max-height="670" border stripe :columns="columns" :data="tableData"></Table>
            <br>
            <Page :total="totalCount" :page-size="formItem.pager.pagesize" :current="formItem.pager.currentPage"   @on-page-size-change="pageSizeLoad"  @on-change="initUserInfo" show-sizer show-elevator  style="text-align: center;"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'userManage',
  data () {
    return {
      columns: [
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'gender'
        },
        {
          title: '住址',
          key: 'address'
        },
        {
          title: '状态',
          key: 'isDeleted',
          render: (h, params) => {
            return h('div', [
              h('p', {
              }, params.row.isDeleted === '1' ? '禁用' : '启用')
            ])
          }
        }
      ],
      tableData: [],
      totalCount: 0,
      formItem: {
        pager: {currentPage: 1, pagesize: 10},
        id: '',
        name: '',
        userType: 0
      }
    }
  },
  created () {
    this.initUserInfo(1)
  },
  methods: {
    initUserInfo (currentPage) {
      let that = this
      that.formItem.pager.currentPage = currentPage
      this._UTIL.jpost(this._API.user.getUserList, this.formItem, function (data) {
        that.tableData = data.list
        that.totalCount = data.totolCount
      })
    },
    pageSizeLoad (pageSize) { // 更改每页显示的条数
      this.formItem.pager.pagesize = pageSize
      this.formItem.pager.currentPage = 1
      this.initUserInfo(1)
    },
    clear () {
      this.formItem.name = ''
    }
  }

}
</script>

<style scoped>

</style>
