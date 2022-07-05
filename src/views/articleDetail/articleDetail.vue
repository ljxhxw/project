<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ articleObj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="articleObj.aut_name" :label="articleObj.pubdate">
        <template #icon>
          <img :src="articleObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="articleObj.is_followed === true"
              @click="followFn(true)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="followFn(false)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="articleObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="articleObj.attitude === 1"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else
          >点赞</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { articleDetailAPI, userFollowedAPI, userUnFollowedAPI } from '@/api/index.js'
export default {
  name: 'articleDetail',
  data () {
    return {
      articleObj: {}
    }
  },
  async created () {
    const res = await articleDetailAPI({
      artId: this.$route.query.art_id
    })
    console.log(res)
    this.articleObj = res.data.data
  },
  methods: {
    async followFn (bool) {
      if (bool === true) {
        this.articleObj.is_followed = false // 显示关注
        const res = await userUnFollowedAPI({
          userId: this.articleObj.aut_id
        })
        console.log(res)
      } else {
        this.articleObj.is_followed = true // 显示已关注
        const res = await userFollowedAPI({
          userId: this.articleObj.aut_id
        })
        console.log(res)
      }
    }
  }

}
</script>

<style lang="less" scoped >
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
