<style lang="less">
  @import "../components/animate";

  .editor__wrap {
    width: 850px;
    margin: auto;
  }
</style>

<template>
  <div class="editor__wrap">
    <div v-for="item in listArray">哈哈哈😄<br></div>
    <create-editor
      @editor-ready="editorReady"
      @trigger:click:event="TriggerClickEvent"
    />
    <inert-video
      :visibile.sync="InsertVideoVisibile"
      @insert:html="InsertHtml"
    />
    <inert-image
      :visibile.sync="InsertImageVisibile"
      @insert:html="InsertHtml"
    />
    <inert-card
      :visibile.sync="InsertCardVisibile"
      @insert:html="InsertHtml"
    />
    <div v-for="item in listArray">呼呼呼🐯<br></div>
  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'
  import InertVideo from '../components/insert-video.vue'
  import InertImage from '../components/insert-image.vue'
  import InertCard from '../components/insert-card.vue'

  export default {
    data() {
      return {
        listArray: Array(50).fill(3),
        InsertVideoVisibile: false,
        InsertImageVisibile: false,
        InsertCardVisibile: false,
      }
    },
    components: {
      InertVideo,
      InertImage,
      InertCard
    },
    methods: {
      editorReady(editor) {
        this.$nextTick(() => {
          this.hidePageLoading()
        })
        this.editor = editor
      },
      TriggerClickEvent(eventType) {
        switch (eventType) {
          case 'insert_video': {
            this.InsertVideoVisibile = true
            break
          }
          case 'insert_image': {
            this.InsertImageVisibile = true
            break
          }
          case 'insert_card': {
            this.InsertCardVisibile = true
            break
          }
        }
      },
      InsertHtml(html) {
        this.editor.execCommand('inserthtml', html)
      },
      ...mapActions(['hidePageLoading'])
    }
  }
</script>



