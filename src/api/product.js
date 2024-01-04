// 商品列表接口请求
import request from '@/utils/request'

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
