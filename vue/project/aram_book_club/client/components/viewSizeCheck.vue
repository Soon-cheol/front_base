<template>
  <div v-if="view" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      view: false
    }
  },
  mounted() {
    const size = 1080
    const _this = this
    $(window).load(function() {
      // console.log('load')
      if ($(window).width() > size) {
        // PC
        _this.sizeCheck('pc')
      } else if ($(window).width() <= size) {
        // Mobile
        _this.sizeCheck('mo')
      }
    })
    $(window).resize(function() {
      // console.log('resize')
      if ($(window).width() > size) {
        // PC
        _this.sizeCheck('pc')
        document.querySelector('body').removeAttribute('style')
      } else if ($(window).width() <= size) {
        // Mobile
        _this.sizeCheck('mo')
      }
    })
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        // console.log('route')
        const size = 1080
        if ($(window).width() > size) {
          // PC
          this.sizeCheck('pc')
        } else if ($(window).width() <= size) {
          // Mobile
          this.sizeCheck('mo')
        }
      }
    }
  },
  methods: {
    sizeCheck(size) {
      // console.log('Size Check', size)
      // this.$emit('mode', size)
      this.$store.dispatch('user/viewMode', size)
    }
  }
}
</script>
