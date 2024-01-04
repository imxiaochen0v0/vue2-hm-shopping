// 购物车接口请求
import request from '@/utils/request'

/**
 * 加入购物车
 * @param {object} obj
 * @returns promise
 */
export const addCart = (obj) => {
  const { goodsId, goodsNum, goodsSkuId } = obj
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

/**
 * 获取购物车商品总数量
 * @returns promise
 */
export const getCartTotal = () => {
  return request.get('/cart/total')
}

/**
 * 获取购物车商品列表
 * @returns promise
 */
export const getCartList = () => {
  return request.get('/cart/list')
}
