// 首页接口请求
import request from '@/utils/request'

/**
 * @param 获取首页数据
 * @returns promise
 */
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
