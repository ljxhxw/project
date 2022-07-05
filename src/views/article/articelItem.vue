<template>
  <div class="articleitem-container">
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <img
            class="thumb"
            :src="artObj.cover.images[0]"
            alt=""
            v-if="artObj.cover.type === 1"
          />
        </div>
      </template>
      <!-- 多图 -->

      <div class="thumb-box" v-if="artObj.cover.type > 1">
        <img
          class="thumb"
          v-for="(imgUrl, index) in artObj.cover.images"
          :key="index"
          :src="imgUrl"
          alt=""
        />
      </div>
      <!-- 文章相关的描述信息 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}评论</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @cancel="backFn"
      @close="closeFn"
      :cancel-text="bottomText"
      get-container="body"
    />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/day.js'
import { firstActions, secondActions } from '@/api/report.js'
export default {
  name: 'articleItem',
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  props: {
    artObj: Object
  },
  methods: {
    formatTime: timeAgo,
    onSelect (action, item) {
      // 默认情况下点击选项时不会自动收起
      if (action.name === '反馈垃圾内容') { // 点击‘反馈垃圾内容’，转到二级面板
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('dislikeEvent', this.artObj.art_id) // 获取不感兴趣的文章的id
        this.show = false // 隐藏反馈面板
      } else {
        this.$emit('badArticleEvent', this.artObj.art_id, action.value)
        this.show = false // 隐藏反馈面板
      }
    },
    // 点击返回之后，转到第一个面板，并且更改底部文字
    backFn () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 在二级面板关闭反馈界面后，主动转到第一个面板，并且更改底部文字
    closeFn () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}

</script>

<style lang="less" scoped>
// 标题样式
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

// 文章描述信息的样式
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

//  文章信息样式
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
// 图片的样式
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
