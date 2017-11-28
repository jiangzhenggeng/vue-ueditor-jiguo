<template>
  <div class="page-loading">
    <img class="page-loading-img" src="./page_loading.svg"/>
  </div>
</template>
<script>
  export default {
    name: 'loading'
  }
</script>
<style lang="scss">
  @import "../../style/scss/helpers/functions";

  .page-loading {
    position: fixed;
    z-index: 99999999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }

  .page-loading-img {
    $loading-width: px2rem(80);
    position: absolute;
    z-index: 9999;
    top: 50%;
    left: 50%;
    margin-left: -$loading-width/2;
    margin-top: -$loading-width/2;
    width: $loading-width;
    height: $loading-width;
  }
</style>