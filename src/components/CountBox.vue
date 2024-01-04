<template>
    <div class="CountBox">
        <button @click="handleSub" class="minus">-</button>
        <input @change="change" :value="value" class="inp" type="text">
        <button @click="handleAdd" class="add">+</button>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    change (e) {
      const flag = +e.target.value
      if (isNaN(flag) || flag < 1 || !Number.isInteger(flag)) {
        e.target.value = this.value
        return
      }
      this.$emit('input', +e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.CountBox{
    width: 110px;
    display: flex;
    .add ,.minus{
        width: 30px;
        height: 30px;
        outline: none;
        border: none;
        background-color: #efefef;
    }
    .inp{
        width: 40px;
        height: 30px;
        outline: none;
        border: none;
        margin: 0 5px;
        background-color: #efefef;
        text-align: center;
    }
}
</style>
