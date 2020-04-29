<template>
  <div class="v-transfer-dom">
    <Form
      :model="formItem"
      :label-width="100"
      :rules="ruleValidate"
      ref="formItem"
      style="margin-top: 5%;"
    >
      <FormItem
        label="用户名："
        style="width: 20%;"
        prop="userNameZh"
      >
        <Input
          v-model="formItem.userNameZh"
          sytle="autocomplete:off"
          autocomplete="new-password"
          placeholder="请输入"
        ></Input>
      </FormItem>
      <FormItem label="用户头像:">
        <div style="display: inline-flex;">
          <div style="width: 120px;height: 120px;">
            <Upload
              multiple
              type="drag"
              ref="upload"
              name="fileimage"
              :before-upload="changeImage"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"
              :max-size="2048"
              :action="uploadImgUrl"
              :on-exceeded-size="handleMaxSize">
              <div style="width: 120px;height:120px;line-height: 120px;">
              <Icon type="ios-camera" size="20"></Icon>
              <!--<Icon type="ios-trash-outline" @click=""></Icon>-->
              </div>
            </Upload>
          </div>
          <div style="margin-left: 2em;" v-show="imgShow" >
            <img :src="imguRL" style="width: 120px;height:120px;"/>
          </div>
        </div>
      </FormItem>
      <FormItem label="性别:" style="width: 20%;">
        <RadioGroup v-model="formItem.gender">
          <Radio :label="0" checked="checked">男</Radio>
          <Radio :label="1">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="邮箱：" style="width: 20%;" prop="mail">
        <Input v-model="formItem.mail" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="手机号：" style="width: 20%;" prop="telephone">
        <Input
          v-model="formItem.telephone"
          placeholder="请输入"
        ></Input>
      </FormItem>
      <Form-item>
        <Button type="primary" @click="handleSubmit('formItem')"
        >确定</Button
        >
        <Button
          style="margin-left: 20px;"  onclick="javascript:window.history.back(-1);"
        >取消</Button
        >
      </Form-item>
    </Form>
        </div>
</template>

<script>
export default {
  data () {
    return {
      imgShow: false,
      formItem: {
        userNameZh: '',
        gender: 0,
        password: '',
        mail: '',
        telephone: '',
        userType: 0

      },
      ruleValidate: {
        userNameZh: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      },
      uploadImgUrl: '',
      imguRL: '',
      uploadList: [],
      picList: []
    }
  },
  created: function () {
    this.getUserInfo()
  },
  components: {},
  methods: {
    getUserInfo () {
      let that = this
      this._UTIL.jpost(
        this._API.user.getUserInfoById,
        JSON.parse(sessionStorage.getItem('users')).id,
        function (data) {
          that.formItem.id = data.id
          that.formItem.userNameZh = data.userNameZh
          that.formItem.telephone = data.telephone
          that.imguRL = data.imageUrl
          if (that.imguRL !== undefined && that.imguRL !== '' && that.imguRL !== null && that.imguRL !== 'null') {
            that.imgShow = true
          }
          that.formItem.gender = data.gender
          that.formItem.gender = parseInt(data.gender)
        }
      )
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let that = this
          let formData = new FormData()
          formData.append('id', this.formItem.id)
          formData.append('userNameZh', this.formItem.userNameZh)
          formData.append('telephone', this.formItem.telephone)
          formData.append('gender', this.formItem.gender)
          if (this.picList.length > 0) {
            formData.append('userImg', this.picList[0])
          }
          this._UTIL.fpost(this._API.user.updateUser, formData, function (
            data
          ) {
            that.$Message.success(data)
            history.back(-1)
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    changeImage (file) {
      let _this = this
      let reader = new FileReader()
      // תbase64
      reader.onload = function (e) {
        _this.imguRL = e.target.result // img里可以显示未上传的图片文件以供预览

        let splic = file.type.substring(file.type.length, file.type.lastIndexOf('/'))

        if (splic === '/png' || splic === 'jpeg' || splic === '/jpeg') {
        } else {
          alert(1)
          _this.handleRemove()
        }
      }
      reader.readAsDataURL(file)
      /* if (this.picList.length > 0) {
        this.$Notice.warning({
          title: '只能上传1张头像'
        })
      } */
      this.picList.shift()
      this.picList.push(file)
      this.imgShow = true
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确 ',
        desc: '文件必须是 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出图片大小限制',
        desc: '图片不能超过2m '
      })
    },
    handleRemove () {
      let that = this
      that.picList = []
      that.imguRL = ''
      this.imgShow = false
    }
  }
}
</script>

<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
</style>
