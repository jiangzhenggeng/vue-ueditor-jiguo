import DialogBase from '../base/dialog-base.vue'

export default {
  props: {
    visibile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inner_visibile: this.visibile
    }
  },
  watch: {
    visibile(newVal) {
      this.inner_visibile = !!newVal
    }
  },
  components: {
    DialogBase
  },
  methods: {
    close() {
      this.$emit('update:visibile', false)
      this.inner_visibile = false
    }
  }
}