<template>
  <div
    v-if="viewMode"
    class="library-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    asfd
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode,
      // userToken: (state) => state.user.userToken,
      isLoggedIn: (state) => state.auth.loggedIn
    })
  }
}
</script>
<style lang="scss" scoped>
//
</style>
