<template>
  <div
    v-if="render"
    id="wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <div id="topMenu">
      <topMenu :option="main" />
    </div>
    <btnTop :option="main" />
    <nuxt-link v-if="viewMode === 'mo'" id="btnStudy" to="/study/learn"
      >학습하기</nuxt-link
    >
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
  data() {
    return {
      render: false,
      main: true
    }
  },
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
  created() {
    const _this = this
    this.$nextTick(function() {
      _this.render = true
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
  margin: 3.5rem auto 5rem;
  #btnStudy {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 32rem;
    height: 5rem;
    background-color: rgba(154, 193, 78, 0.9);
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    line-height: 5rem;
    color: #fff;
    z-index: 1000;
  }
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
    margin-top: 178px;
    // transition: all 0.2s ease 0s;
    // -webkit-transition: all 0.2s ease 0s;
    &.scroll {
      margin-top: 118px;
    }
  }
}
@media screen and (min-width: 320px) {
  #btnStudy {
    left: 50%;
    margin-left: -16rem;
  }
}
@media screen and (max-width: 319px) {
  #btnStudy {
    left: 0;
    margin-left: 0;
  }
}
</style>
