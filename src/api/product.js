// 商品列表接口请求
import request from '@/utils/request'

/**
 * 获取商品列表
 * @param {object} obj
 * @returns promise
 */
export const getProductList = (obj) => {
  const { categoryId, goodsName, page, sortPrice, sortType } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page,
      sortPrice,
      sortType
    }
  })
}

/**
 * 获取商品详情
 * @param {Number} goodsId
 * @returns promise
 */
export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

/**
 * 获取商品评论
 * @param {object} comment
 * @returns promise
 */
export const getProductComment = (comment) => {
  const { goodsId, limit } = comment
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
