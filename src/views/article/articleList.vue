<template>
  <div class="articlelist-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <articleItem
          v-for="obj in list"
          :key="obj.art_id"
          :artObj="obj"
          @dislikeEvent="dislikeFn"
          @badArticleEvent="badArticleFn"
          @click.native="detailClickFn(obj.art_id)"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Notify } from 'vant'
import articleItem from '@/views/article/articelItem.vue'
import { allArticleList, dislikeArticleAPI, badArticleAPI } from '@/api/index.js'
export default {
  name: 'articleList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      theTime: (new Date()).getTime(),
      isLoading: false
    }
  },
  props: {
    // list: Array // 文章列表的数组
    channelId: Number
  },
  components: {
    articleItem
  },
  created () {
    this.getAllArticleListFn()
  },
  methods: {
    // 发送请求
    async getAllArticleListFn () {
      const res = await allArticleList({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp

      this.loading = false // 关闭加载状态
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
      this.isLoading = false // 关闭顶部加载状态
    },
    // 上拉加载事件
    onLoad () {
      if (this.list.length === 0) {
        this.loading = false
        return
      }
      this.getAllArticleListFn()
    },
    // 下拉刷新事件
    onRefresh () {
      this.list = []
      this.theTime = (new Date()).getTime()
      this.getAllArticleListFn()
    },
    // 对文章不感兴趣
    async dislikeFn (id) {
      await dislikeArticleAPI({
        artId: id
      })
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 反馈垃圾内容
    async badArticleFn (id, value) {
      await badArticleAPI({
        artId: id,
        type: value
      })
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 文章详情
    detailClickFn (id) {
      this.$router.push({ path: `/detail?art_id=${id}` })
    }
  }

}
</script>

<style lang="less" scoped>
</style>
