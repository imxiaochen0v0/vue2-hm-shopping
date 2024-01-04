// 获取分类数据
import request from '@/utils/request'

/**
 * 获取商品分类
 * @returns promise
 */
export const getCategoryData = () => {
  return request.get('/category/list')
}
