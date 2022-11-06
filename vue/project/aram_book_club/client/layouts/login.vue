<template>
  <div id="wrap" :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }">
    <div id="topMenu">
      <topMenu />
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import topMenu from '~/components/layouts/topMenu'
export default {
  data() {
    return {
      mount: false
    }
  },
  components: {
    topMenu
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  }
}
</script>
<style lang="scss" scoped>
#wrap {
  position: fixed;
  display: table;
  min-width: 32rem;
  width: 100%;
  height: 100%;
  // background: url('~static/images/mobile/login/bg_login.png') no-repeat center
  //   bottom;
  // background-size: 32rem auto;
  #topMenu {
    display: none;
  }
}
</style>
