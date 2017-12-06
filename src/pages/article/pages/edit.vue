<template>
  <div>
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
  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'
  import InertVideo from '../components/insert-video.vue'
  import InertImage from '../components/insert-image.vue'
  import InertCard from '../components/insert-card.vue'

  export default {
    data: function () {
      var fg = function () {

      }
      fg.prototype = {
        construct: fg,
        df: function () {

        }
      }
      console.log(new fg())
      return {
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
        console.log(this.editor.getContent())
      },
      ...mapActions(['hidePageLoading'])
    }
  }
</script>



