<style lang="less">
  .dialog__bottom-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    .dialog__bottom {
      @h: 42px;
      display: block;
      background: #F66039;
      color: #fff;
      font-size: 14px;
      text-align: center;
      height: @h;
      line-height: @h;
      width: 120px;
      border-radius: 3px;
      cursor: pointer;
      user-select: none;
      &:active {
        opacity: 0.8;
      }
    }
    .dialog__bottom-left {
      background: #D8D8D8;
    }

  }
</style>
<template>
  <transition name="window__modal">
    <dialog-base
      v-if="inner_visibile"
      @close="close"
      title="插入多图"
    >
      <insert-image-body />
      <div class="dialog__bottom-wrap" slot="bottom">
        <div class="dialog__bottom dialog__bottom-left">关闭</div>
        <div class="dialog__bottom dialog__bottom-right mgl10">确认</div>
      </div>
    </dialog-base>
  </transition>
</template>
<script>
  import mixins from './mixins'
  import InsertImageBody from './insert-image-body'

  export default {
    mixins: [mixins],
    components: {
      InsertImageBody
    }
  }
</script>