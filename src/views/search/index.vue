<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="keyword"
    show-action
    placeholder="请输入搜索关键词"
    @search="search(keyword)"
    :clearable="false">
      <template #action>
        <div @click="search(keyword)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clear"/>
      </div>
      <div class="list">
        <div v-for="(item, index) in history"
        :key="index"
        class="list-item"
        @click="search(item)">
        {{ item }}
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      keyword: '',
      history: ['炒锅', '电视', '冰箱', '手机']
    }
  },
  methods: {
    search (keyword) {
      console.log('🚀 ~ search ~ keyword:', keyword)
      this.history = this.history.filter(item => item !== keyword)
      this.history.unshift(keyword)
      // this.$router.push('/searchList')
    },
    clear () {
      this.history = []
    }
  }
}
</script>

<style lang="scss" scoped>
.search {

  ::v-deep .van-search__action {
    background-color: pink;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}</style>
