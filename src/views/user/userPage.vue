<template>
  <div class="userpage-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="userInfo.photo" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{ userInfo.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/useredit" />
      <van-cell icon="warning-o" title="退出登录" is-link @click="quitFn" />
    </van-cell-group>
  </div>
</template>

<script>
import { userInformationAPI } from '@/api/index.js'
import { Dialog } from 'vant'
import { removeToken } from '@/utils/token.js'
export default {
  name: 'userPage',
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    // 用户个人信息
    const res = await userInformationAPI()
    console.log(res)
    this.userInfo = res.data.data
  },
  methods: {
    quitFn () {
      Dialog.confirm({
        title: '是否退出登录？'
        // message: '弹窗内容'
      })
        .then(() => {
          // on confirm
          removeToken()
          this.$router.replace('/loginpage')
        })
        .catch(() => {
          // on cancel
        })
    }

  }
}
</script>

<style lang="less" scoped>
.user-card {
  background-color: #00b3ff;
  color: white;
  padding-top: 20px;
  .van-cell {
    background: #00b3ff;
    color: white;
    &::after {
      display: none;
    }
  }
}
.username {
  font-size: 14px;
  font-weight: bold;
}
.avatar {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 10px;
}
.user-data {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 14px;
  padding: 30px 0;
}
.user-data-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.33%;
}
</style>
