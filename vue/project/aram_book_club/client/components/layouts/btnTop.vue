<template>
  <button
    v-if="!scrTop"
    id="btnTop"
    @click="moveTop"
    :class="{ main: option }"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    option: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      scrTop: true
    }
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
        if (scrollValue <= 0) {
          _this.scrTop = true
        } else {
          _this.scrTop = false
        }
      })
    },
    moveTop() {
      $('html, body').animate({ scrollTop: '0' }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
#btnTop {
  position: fixed;
  bottom: 2.5rem;
  right: 1.5rem;
  width: 4rem;
  height: 4rem;
  background: rgba(51, 51, 51, 0.8)
    url('~static/images/mobile/common/btn_top.png') no-repeat center center;
  background-size: 2.1rem 2rem;
  z-index: 999;
}
#wrap.mo {
  #btnTop.main {
    bottom: 6.5rem;
  }
}
#wrap.pc {
}
</style>
