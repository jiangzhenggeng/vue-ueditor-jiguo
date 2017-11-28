<template>
  <create-editor @editor-ready="editorReady" />
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  export default {
    data: function () {
      return {}
    },
    components: {},
    methods: {
      editorReady (editor) {
        this.$nextTick(()=>{
          this.hidePageLoading()
        })
      },
      ...mapActions(['hidePageLoading'])
    }
  }
</script>



