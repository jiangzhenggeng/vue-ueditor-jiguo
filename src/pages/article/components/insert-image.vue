<style lang="less" scoped>

</style>
<template>

  <dialog-base
    v-if="inner_visibile"
    @close="close"
    title="插入多图"
  >
    插入多图
  </dialog-base>
</template>
<script>
  import mixins from './mixins'

  export default {
    mixins: [mixins]
  }
</script>