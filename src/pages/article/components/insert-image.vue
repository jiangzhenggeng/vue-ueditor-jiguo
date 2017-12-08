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
    .dialog__insert-type {
      cursor: pointer;
      user-select: none;
      color: #f86337;
      text-decoration: underline;
    }
  }
</style>
<template>
  <transition name="window__modal">
    <dialog-base
      v-show="inner_visibile"
      @close="close"
      title="插入多图"
    >
      <insert-image-body
        @insert:image:event="insertImage"
        :mode="mode"
        v-model="selectedList"
        ref="insert-image-body"
        :visible="inner_visibile"
      />
      <div class="dialog__bottom-wrap" slot="bottom">
        <div class="dialog__insert-type" @click="mode=mode==1?2:1">
          {{ mode==1?'分段插入':'连续插入'}}
        </div>
        <div class="dialog__bottom dialog__bottom-left mgl10" @click="close">关闭</div>
        <div class="dialog__bottom dialog__bottom-right mgl10" @click="clickOkInsertImage">
          {{selectedList.length?'插入选中':'全部插入'}}
        </div>
      </div>
    </dialog-base>
  </transition>
</template>
<script>
  import mixins from './mixins'
  import InsertImageBody from './insert-image-body'

  export default {
    mixins: [mixins],
    data() {
      return {
        mode: 1,
        selectedList: []
      }
    },
    components: {
      InsertImageBody
    },
    methods: {
      insertImage(html) {
        this.$emit('insert:html', html)
      },
      clickOkInsertImage() {
        var html = this.$refs['insert-image-body'].getInsertHtml()
        if (html) {
          this.insertImage(html)
          this.close()
        } else if (this.$parent.editor) {
          this.$parent.editor.trigger('showmessage', {
            content: '请选中图片',
            type: 'error',
            timeout: 2000
          });
        }
      }
    }
  }
</script>