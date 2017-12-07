<style lang="scss">
  @import "../../style/scss/helpers/functions";

  .editor__wrap {
    background: #f2f2f2;
    &.full__screen {
      &, .edui-editor-toolbarbox {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
      }
    }
    .editor__inner {
      margin: auto;
    }
  }
</style>

<template>
  <div class="editor__wrap" ref="editor__wrap">
    <div class="editor__inner" :style="`width:${width}px`">
      <textarea :id="editorId" :style="`height:${height}px;width:${width}px`"></textarea>
    </div>
  </div>
</template>

<script>
  import {
    createId,
    editorReady,
    editorBindScrollFun,
    editorBindToolBarTips,
    editorRefresh
  } from './create-id'
  import $ from 'jquery'

  export default {
    name: 'create-editor',
    props: {
      content: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: $(window).height() - 60
      },
      width: {
        type: [Number],
        default: 850
      },
      full_screen: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        editorId: createId(),
        fullScreen: this.full_screen
      }
    },
    watch: {
      fullScreen() {
        editorRefresh(this, this.editor)
      }
    },
    computed: {
      editorNumberKey() {
        window.__ueditorNumber__ = (window.__ueditorNumber__ || 0) + 1
        return 'editor-index-' + window.__ueditorNumber__
      }
    },
    created() {
      var vm = this
      vm.editor = UE.getEditor(vm.editorId, {
        onready: function () {
          editorReady(vm, this)
          //绑定toolbar提示文字
          editorBindToolBarTips(vm, this)
        }
      })
      vm.editor.fullScreen = this.fullScreen
      vm.editor.key = this.editorNumberKey
      vm.editor.$emitEvent = (eventType, params) => {
        this.$emit('trigger:click:event', eventType, params)
        if (eventType === 'full_screen') {
          this.fullScreen = vm.editor.fullScreen = !this.fullScreen
        }
      }

      //绑定滚动事件
      $(window).on('scroll.editor', function () {
        editorBindScrollFun(vm, vm.editor)
      })

    },
    methods: {
      setContent(content) {
        vm.editor.setContent(content || '')
      }
    },
    beforeDestroy() {
      $(window).off('scroll.editor')
      if (this['ToolBarWrap']) {
        vm['ToolBarWrap'].off('mouseenter.editor')
        vm['ToolBarWrap'].off('mouseleave.editor')
      }
    }
  }
</script>