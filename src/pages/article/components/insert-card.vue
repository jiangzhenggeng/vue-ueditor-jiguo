<style lang="less" scoped>

</style>
<template>
  <dialog-base
    v-if="inner_visibile"
    @close="close"
    title="插入卡片"
  >
    插入卡片
  </dialog-base>
</template>
<script>
  import mixins from './mixins'

  export default {
    mixins: [mixins]
  }
</script>