<template>
  <div>
    <div class="layoutpage-container">
      <router-view></router-view>
    </div>
    <div>
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" replace to="/layoutpage/homepage"
          >首页</van-tabbar-item
        >
        <van-tabbar-item icon="user-o" replace to="/layoutpage/userpage"
          >个人中心</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutPage',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layoutpage-container {
  padding-bottom: 50px;
}
.van-tabbar-item {
  border-top: 2px solid grey;
}
</style>
