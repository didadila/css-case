<template>
  <div :class="{'basic-container--block':block}"
    class="yh-container">
      <slot/>
  </div>
</template>

<script>
export default {
  name: 'YhContainer',
  props: {
    block: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.yh-container {
  padding: 8px 10px;
  border-radius: 10px;
  box-sizing: border-box;

  &:first-child {
    padding-top: 0;
  }
  &--block {
    height: 100%;
    .el-card {
      height: 100%;
    }
  }
  .el-col >div{
    background: #fff;
  }
}
</style>
