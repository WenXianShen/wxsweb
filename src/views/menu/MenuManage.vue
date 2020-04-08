<template>
  <div style="padding: 10px">
    <div
      style="background: #fff; border-radius: 8px; padding: 40px;height: 1000px;"
    >
      <div style="height: 100px;">
        <Form :model="formItem" :label-width="100">
          <FormItem label="菜单名称：" style="width: 20%;">
            <Input v-model="formItem.menuName" placeholder="请输入"></Input>
          </FormItem>
        </Form>

        <div style="float: right;margin-right: 1%;">
          <Button type="primary" icon="ios-search" @click="initUserInfo(1)"
            >查询</Button
          >
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
        @on-change="initUserInfo"
        show-sizer
        show-elevator
        style="text-align: center;"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuManage',
  data () {
    return {
      columns: [
        {
          title: '菜单名称',
          key: 'name'
        },
        {
          title: '菜单级别',
          key: 'lvl'
        },
        {
          title: '菜单顺序',
          key: 'displaySeq'
        },
        {
          title: '父级菜单',
          key: 'parentName'
        },
        {
          title: '菜单路由',
          key: 'text'
        }
      ],
      tableData: [],
      totalCount: 0,
      formItem: {
        pager: { currentPage: 1, pagesize: 10 },
        id: '',
        menuName: ''
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
      this._UTIL.jpost(this._API.menu.getMenuList, this.formItem, function (
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
      this.initUserInfo(1)
    },
    clear () {
      this.formItem.menuName = ''
    }
  }
}
</script>

<style scoped></style>
