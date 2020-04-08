<template>
  <div style="padding: 10px">
    <div
      style="background: #fff; border-radius: 8px; padding: 40px;height: 1000px;"
    >
      <div style="height: 100px;">
        <Form :model="formItem" :label-width="80">
          <FormItem label="账号：" style="width: 20%;">
            <Input v-model="formItem.account" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="用户名：" style="width: 20%;">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="性别:">
          <RadioGroup v-model="formItem.gender">
            <Radio label="0">男</Radio>
            <Radio label="1">女</Radio>
          </RadioGroup>
        </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userAdd',
  data () {
    return {
      formItem: {
        account: '',
        name: '',
        gender: ''
      }
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped></style>
