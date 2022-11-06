<template>
  <div id="wrap" :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }">
    <div id="topMenu">
      <topMenu />
    </div>
    <btnTop />
    <!-- <loginMenu /> -->
    <div id="content">
      <nuxt />
    </div>
    <footerMenu />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import topMenu from '~/components/layouts/topMenu'
import btnTop from '~/components/layouts/btnTop'
// import loginMenu from '~/components/layouts/loginMenu'
import footerMenu from '~/components/layouts/footerMenu'
export default {
  components: {
    topMenu,
    footerMenu,
    btnTop
    // loginMenu
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  mounted() {
    this.scrollTop()
  },
  methods: {
    scrollTop() {
      const _this = this
      $(window).scroll(function() {
        var scrollValue = $(document).scrollTop()
        if (scrollValue > 80) {
          document.querySelector('#content').classList.add('scroll')
        } else {
          document.querySelector('#content').classList.remove('scroll')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#wrap.mo {
  position: relative;
  min-width: 32rem;
  max-width: 32rem;
  margin: 9rem auto 0;
}
#wrap.pc {
  overflow: hidden;
  #topMenu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 9999;
  }
  #content {
    overflow: hidden;
    margin-top: 178px;
    transition: all 0.2s ease 0s;
    -webkit-transition: all 0.2s ease 0s;
    &.scroll {
      margin-top: 118px;
    }
  }
}
</style>
