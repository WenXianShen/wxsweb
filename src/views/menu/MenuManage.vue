<template>
  <div style="padding: 10px">
    <div style="background: #fff; border-radius: 8px; padding: 40px;height: 1000px;">
      <div style="height: 120px;width: 100%;">
        <Form :model="formItem" :label-width="100">
          <row>
          <FormItem label="菜单名称：" style="width: 20%;float:left;">
            <Input v-model="formItem.menuName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="菜单级别：" style="width: 20%;float:left;margin-left: 20px;">
            <i-select v-model="formItem.lvl" name="lvl">
              <i-option :value="0">一级菜单</i-option>
              <i-option :value="1">二级菜单</i-option>
            </i-select>
          </FormItem>
            <FormItem label="父级菜单：" style="width: 20%;float:left;margin-left: 20px;">
              <i-select v-model="formItem.parentId" name="parentId">
                <i-option v-for="item in menuList" :value="item.id" :key="item.id">{{ item.name }}</i-option>
              </i-select>
            </FormItem>
          </row>
        </Form>
        <div style="float: right;margin-right: 1%;">
          <Button type="primary" icon="ios-search" @click="initMenu(1)"
            >查询</Button
          >
          <Button type="primary" icon="ios-close" @click="clear()"
            >重置</Button
          >
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <router-link to="menuAdd">
          <Button type="primary" icon="md-add" >新增</Button>
        </router-link>
        <Button type="primary" icon="ios-build" @click="update">修改</Button>
        <Button type="primary" icon="ios-trash" @click="del">删除</Button>
      </div>
      <Table
        max-height="670"
        border
        stripe
        :columns="columns"
        :data="tableData"
        @on-selection-change="selectRow"
      ></Table>
      <br />
      <Page
        :total="totalCount"
        :page-size="formItem.pager.pagesize"
        :current="formItem.pager.currentPage"
        @on-page-size-change="pageSizeLoad"
        @on-change="initMenu"
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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '菜单名称',
          key: 'name'
        },
        {
          title: '菜单级别',
          key: 'lvl',
          render: (h, params) => {
            return h('div', [
              h('p', {
              }, params.row.lvl === '0' ? '一级菜单' : '二级菜单')
            ])
          }
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
        menuName: '',
        lvl: '',
        parentId: ''
      },
      menuList: [],
      selection: []
    }
  },
  created () {
    this.initMenu(1)
    this.getMenuSelect(0)
  },
  methods: {
    initMenu (currentPage) {
      let that = this
      that.formItem.pager.currentPage = currentPage
      this._UTIL.jpost(this._API.menu.getMenuList, this.formItem, function (data) {
        that.tableData = data.list
        that.totalCount = data.totolCount
      })
    },
    getMenuSelect (lvl) { // 获取一级父级菜单
      let that = this
      this._UTIL.jpost(this._API.menu.getMenuList, {lvl: lvl}, function (data) {
        that.menuList = data.list
      })
    },
    pageSizeLoad (pageSize) {
      // 更改每页显示的条数
      this.formItem.pager.pagesize = pageSize
      this.formItem.pager.currentPage = 1
      this.initMenu(1)
    },
    clear () {
      this.formItem.menuName = ''
      this.formItem.lvl = ''
      this.formItem.parentId = ''
    },
    selectRow (selection) {
      this.selection = selection
    },
    del () {
      if (this.selection.length > 0) {
        let that = this
        that.selectionIds = []
        that.selection.forEach(function (item, index) {
          that.selectionIds.push(item.id)
        })
        this._UTIL.jpost(this._API.menu.deleteMenu, that.selectionIds, function (data) {
          that.$Message.success(data)
          if (data === '删除成功') {
          // 刷新列表
            that.initMenu(1)
          }
        })
      } else {
        this.$Message.warning('请选择删除项！')
      }
    },
    update () {
      if (this.selection.length === 0) {
        this.$Message.warning('请选择修改项！')
      } else if (this.selection.length === 1) {
        this.$router.push('/menuUpdate/' + this.selection[0].id)
        // this.$router.push('/menuUpdate')
      } else {
        this.$Message.warning('每次只能修改一项！')
      }
    }
  }
}
</script>

<style scoped></style>
