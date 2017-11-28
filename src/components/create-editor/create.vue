<style lang="scss">
  @import "../../style/scss/helpers/functions";
</style>

<template>
  <textarea :id="editorId"></textarea>
</template>

<script>
  import { createId } from './create-id'

  export default {
    name: 'create-editor',
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        editorId: createId()
      }
    },
    computed: {
      number () {
        return 'editor-index-' + window.__ueditorNumber__ || 1
      }
    },
    created () {
      var vm = this
      vm.editor = UE.getEditor(this.editorId, {
        onready: function () {
          vm.$emit('editor-ready', this)
          vm.editor = this
          vm.content && this.setContent(vm.content)
        }
      })
      window.__ueditorNumber__ = (window.__ueditorNumber__ || 0) + 1
      vm.editor.key = this.number
      vm.editor.$emitEvent = (eventType, params) => {
        this.$emit('trigger:click:event', eventType, params)
      }
    },
    methods: {
      setContent (content) {
        vm.editor.setContent(content || '')
      }
    }
  }
</script>