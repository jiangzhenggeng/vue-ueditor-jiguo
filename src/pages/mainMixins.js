import { mapState } from 'vuex'
export default {
  computed: {
    transitionName () {
      return 'page-toggle-scene-' + (this.direction === 'forward' ? 'in' : 'out')
    },
    ...mapState({
      direction: state => state.routerDir.direction
    }),
  }
}