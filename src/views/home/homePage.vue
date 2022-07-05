<template>
  <div class="homepage-container">
    <!-- 导航栏-->
    <van-nav-bar title="新闻头条" fixed>
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 二级导航栏 -->
    <div class="main">
      <van-tabs animated v-model="channelId" sticky offset-top="46px">
        <van-tab
          :name="obj.id"
          :title="obj.name"
          v-for="obj in userChooseList"
          :key="obj.id"
        >
          <articleList :channelId="channelId"></articleList>
        </van-tab>
      </van-tabs>
      <!-- 编辑频道图标 -->
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="plusFn"
      />
    </div>
    <!-- 点击“+”之后的弹出层 -->
    <van-popup v-model="show" class="edit" get-container="body"
      ><channelEdit
        :userList="userChooseList"
        :unCheckList="unCheckChannelList"
        @addChannelEvent="addChannelFn"
        @deleteChannelEvent="deleteChannelFn"
        @closeEvent="closeFn"
        ref="editRef"
      ></channelEdit
    ></van-popup>
  </div>
</template>

<script>
import { userChooseAPI, allChannelsAPI, updateUserChooseAPI } from '@/api/index.js'
import articleList from '@/views/article/articleList.vue'
import channelEdit from '@/views/edit/channelEdit.vue'
import '@/assets/reset.css'
export default {
  name: 'homePage',
  data () {
    return {
      channelId: 0,
      userChooseList: [],
      allChannelsList: [],
      show: false
    }
  },
  async created () {
    // 用户选择的频道
    const res = await userChooseAPI()
    console.log(res)
    this.userChooseList = res.data.data.channels
    // 所有的频道
    const res2 = await allChannelsAPI()
    console.log(res2)
    this.allChannelsList = res2.data.data.channels
  },
  methods: {
    plusFn () {
      this.show = true
    },
    async addChannelFn (obj) {
      this.userChooseList.push(obj)
      const newArr = this.userChooseList.filter(obj => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj } // 浅拷贝
        delete newObj.name
        newObj.seq = index

        return newObj // map方法将对象收集起来形成一个新数组
      })
      const res = await updateUserChooseAPI({
        channels: theNewArr
      })
      console.log(res)
    },
    // 删除用户已经选择的频道
    async deleteChannelFn (channelObj) {
      const index = this.userChooseList.findIndex(obj => obj.id === channelObj.id)
      this.userChooseList.splice(index, 1)
    },
    closeFn () {
      this.show = false
      this.$refs.editRef.isEdit = false // 在编辑时退出，初始化
    }
  },
  // 计算属性：更多的=所有的频道-用户已经选择的频道
  computed: {
    unCheckChannelList () {
      // 取出所有频道中的对象，在用户选择的频道中查找
      const newArr = this.allChannelsList.filter(bigObj => {
        const index = this.userChooseList.findIndex(smallObj => {
          return smallObj.id === bigObj.id
        })
        // 如果查找到相同的就返回false，否则就保留
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }

  },
  components: {
    articleList,
    channelEdit
  }
}

</script>

<style lang="less" scoped>
.main {
  padding-top: 46px;
}

/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

.moreChannels {
  position: fixed;
  top: 60px;
  right: 8px;
  z-index: 999;
}
.edit {
  width: 100vw;
  height: 100vh;
}
</style>
