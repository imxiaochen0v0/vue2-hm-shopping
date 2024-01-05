<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <!-- 购物车开头 -->
    <div class="cart-title">
      <span class="all">共<i>{{ cartTotal }}</i>件商品</span>
      <span class="edit">
        <van-icon name="edit" @click="show = !show"/>
        编辑
      </span>
    </div>

        <!-- 购物车列表 -->
  <div v-if="this.$store.getters.token && cartList.length > 0">
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox @click="toggleCheck(item.goods_id)" :value="item.isChecked" checked-color="pink"></van-checkbox>
          <div class="show" @click="$router.push(`/proDetail/${item.goods_id}`)">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
              <div class="count-box">
                <CountBox
                  @input="(value) => changeCart(value, item.goods_id, item.goods_sku_id)"
                  :value="item.goods_num">
                </CountBox>
              </div>
            </span>
          </div>
        </div>
      </div>
  </div>
  <div v-else>
    <van-empty description="购物车为空">
    <van-button @click="$router.push('/')" color="pink" round type="danger" class="bottom-button">去逛逛</van-button>
  </van-empty>
  </div>

    <div class="footer-fixed">
      <div class="all-check" @click="toggleAllCheck">
        <van-checkbox icon-size="18" :value="isAllChecked"></van-checkbox>
        全选
      </div>

      <div class="all-total">
        <div class="price">
          <span>合计：</span>
          <span>¥ <i class="totalPrice">{{ cartActivePrice }}</i></span>
        </div>
        <div v-if="show" class="goPay" :class="{disabled:cartActiveTotal === 0}">结算({{ cartActiveTotal }})</div>
        <div v-else @click="handleDel" class="delete" :class="{disabled:cartActiveTotal === 0}">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { changeCart } from '@/api/cart'
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CartPage',
  components: { CountBox },
  data () {
    return {
      show: true
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'cartActive', 'cartActiveTotal', 'cartActivePrice', 'isAllChecked'])
  },
  created () {
    // 必须是登录的用户才能获取购物车列表
    if (this.$store.getters.token) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  methods: {
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    toggleAllCheck () {
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    changeCart (goodsNum, goodsId, goodsSkuId) {
      this.$store.dispatch('cart/changeCartAction', {
        goodsNum,
        goodsId,
        goodsSkuId
      })
    },
    handleDel () {
      if (this.cartActiveTotal === 0) {
        return
      }
      this.$store.dispatch('cart/delCartAction')
      this.show = true
    }
  },
  watch: {
    show (newValue) {
      if (newValue === false) {
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        this.$store.commit('cart/toggleAllCheck', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .bottom-button {
    width: 160px;
    height: 40px;
  }
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;

  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;

    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }

    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }

    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;

        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;

          span {
            font-size: 16px;
          }
        }

        .count-box {
          display: flex;
          width: 110px;

          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }

          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;

    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;

    .price {
      font-size: 14px;
      margin-right: 10px;

      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay,
    .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;

      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}
</style>
