import request from '@/utils/request.js'
import { getToken } from '@/utils/token.js'

// 登录接口
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 所有的频道
export const allChannelsAPI = () => request({
  url: '/v1_0/channels',
  methods: 'GET'
})

// 用户选择的频道
export const userChooseAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 文章列表
export const allArticleList = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  params: {
    channel_id,
    timestamp
  }
})

// 对文章不感兴趣
export const dislikeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 反馈文章垃圾内容
export const badArticleAPI = ({ artId, type }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: artId,
    type: type,
    remark: ''
  }
})

// 更新用户已选频道
export const updateUserChooseAPI = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    channels
  }
})

// 获取文章详情
export const articleDetailAPI = ({ artId }) => request({
  url: `/v1_0/articles/${artId}`,
  method: 'GET'
})

// 关注
export const userFollowedAPI = ({ userId }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: userId
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 取消关注
export const userUnFollowedAPI = ({ userId }) => request({
  url: `/v1_0/user/followings/${userId}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 用户个人信息
export const userInformationAPI = () => request({
  url: '/v1_0/user',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 用户个人资料
export const userProfileAPI = () => request({
  url: '/v1_0/user/profile',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 编辑用户头像
export const userPhotoAPI = (fd) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: fd
})
