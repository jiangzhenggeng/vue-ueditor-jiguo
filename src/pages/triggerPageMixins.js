import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      pageRouterLoading: (state) => state['page-router-loading']
    })
  },
  watch: {
    pageRouterLoading (newVal) {
      if (newVal) {
        this.Loading().show()
      } else {
        this.Loading().close()
      }
    }
  }
}