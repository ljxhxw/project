<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="editObj.photo"
            @click="imageFn"
          />
          <!-- file 选择框 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="editObj.name"
        @click="nameChangeFn"
      />
      <van-cell title="生日" is-link :value="editObj.birthday" />
    </van-cell-group>
    <!-- 修改姓名的弹窗 -->
    <van-dialog v-model="show" title="请修改你的名称" show-cancel-button>
      <input type="text" v-model="inputName" />
    </van-dialog>
  </div>
</template>

<script>
import { userProfileAPI, userPhotoAPI } from '@/api/index.js'
export default {
  name: 'userEdit',
  data () {
    return {
      editObj: {},
      show: false,
      inputName: ''
    }
  },
  async created () {
    // 用户个人资料
    const res = await userProfileAPI()
    console.log(res)
    this.editObj = res.data.data
  },
  methods: {
    // 图片点击事件
    imageFn () {
      this.$refs.iptFile.click()
    },
    // 选择头像文件
    async onFileChange (e) {
      if (e.target.files.length === 0) return
      console.log(e.target.files[0])
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const res = await userPhotoAPI(theFd)
      console.log(res)
      this.editObj.photo = res.data.data.photo
    },
    // 改变名称
    nameChangeFn () {
      this.show = true
      this.inputName = this.editObj.name
    }
  }

}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}
.avatar {
  width: 50px;
  height: 50px;
}
/deep/ .van-dialog__content {
  text-align: center;
}
input {
  border: none;
  outline: none;
  text-align: center;
}
</style>
