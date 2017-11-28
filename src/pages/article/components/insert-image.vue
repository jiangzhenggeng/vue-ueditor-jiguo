<style lang="less" scoped>
  @import "./animate";
</style>
<template>
  <transition name="window__modal">
    <dialog-base
      v-if="inner_visibile"
      @close="close"
      title="插入多图"
    >
      插入多图
    </dialog-base>
  </transition>
</template>
<script>
  import mixins from './mixins'

  export default {
    mixins: [mixins]
  }
</script>