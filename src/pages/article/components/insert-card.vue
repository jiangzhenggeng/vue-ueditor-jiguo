<style lang="less" scoped>

</style>
<template>
  <transition name="window__modal">
    <dialog-base
      v-show="inner_visibile"
      @close="close"
      title="插入卡片"
    >
      插入卡片
    </dialog-base>
  </transition>
</template>
<script>
  import mixins from './mixins'

  export default {
    mixins: [mixins]
  }
</script>