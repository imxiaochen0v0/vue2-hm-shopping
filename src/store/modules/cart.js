import { getCartList } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 求所有商品累加总数量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    cartActive (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    cartActiveTotal (state, getters) {
      return getters.cartActive.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价格
    cartActivePrice (state, getters) {
      return getters.cartActive.reduce((sum, item) => {
        return sum + item.goods.goods_price_min * item.goods_num
      }, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    // 设置cartList
    setCartList (state, cartList) {
      state.cartList = cartList.map(item => ({
        ...item,
        isChecked: true // 是否选中
      }))
    },
    // 让对应id商品项 状态取反
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 全选 反选
    toggleAllCheck (state, isChecked) {
      state.cartList.forEach(item => {
        item.isChecked = isChecked
      })
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      context.commit('setCartList', data.list)
    }
  }
}
