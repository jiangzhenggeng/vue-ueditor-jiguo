<style lang="scss">
  $IMAGES_PATH : '../../style/images/';
  @import '../../style/scss/app.scss';
</style>

<template>
  <div class="page">
    <loading v-show="show"/>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import mainMixins from '../mainMixins'

  export default {
    mixins: [mainMixins],
    computed: {
      ...mapState([
        'show'
      ])
    }
  }
</script>



