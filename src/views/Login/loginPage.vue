<template>
  <div class="loginpage-container">
    <van-nav-bar title="登录页面"> </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        required
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        :rules="[
          { required: true, message: '请填写手机号', pattern: /^1[3-9]\d{9}$/ },
        ]"
      />
      <van-field
        required
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        placeholder="请输入6位密码(密码是246810)"
        :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="isLoading"
          :loading="isLoading"
          loading-text="登录中..."
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { Notify } from 'vant'
import { setToken } from '@/utils/token.js'
export default {
  name: 'loginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isLoading: false
    }
  },
  methods: {
    // 提交按钮的事件
    async onSubmit (values) {
      console.log('submit', values)
      console.log(this.user)
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登陆成功' })
        setToken(res.data.data.token) // 把token的值存在本地
        this.$router.replace('/layoutpage/homepage')
      } catch (error) {
        // 当信息出错时，会有弹出框提示
        Notify({ type: 'danger', message: '手机号或密码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
