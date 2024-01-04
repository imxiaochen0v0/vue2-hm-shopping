<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search readonly shape="round" background="#ffffff" :value="$route.query.keyword" show-action @click="$router.push('/search')">
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="sort('all')">综合</div>
      <div class="sort-item" @click="sort('sales')">销量</div>
      <div class="sort-item" @click="sort('price')">价格</div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in product" :key="item.goods_id" :proItem="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProductList } from '@/api/product'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      product: [],
      sortPrice: '0'
    }
  },
  async created () {
    const { data: { list } } = await getProductList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.$route.query.keyword,
      page: '1'
    })
    this.product = list.data
  },
  methods: {
    async sort (sortType) {
      this.sortPrice = this.sortPrice === '0' ? '1' : '0'
      const { data: { list } } = await getProductList({
        goodsName: this.$route.query.keyword,
        page: '1',
        sortPrice: this.sortPrice,
        sortType: sortType
      })
      this.product = list.data
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;

    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
