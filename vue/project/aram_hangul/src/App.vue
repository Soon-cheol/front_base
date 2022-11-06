<template>
  <div id="app">
    <div id="wrap">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery'
import gsap from 'gsap'

const $ = jQuery
window.$ = $

export default {
  data() {
    return {
      //
    }
  },
  computed: {},
  mounted() {
    if (window[`currentVideo`]) {
      window[`currentVideo`].pause()
      window[`currentVideo`] = null
    }
    this.sizeSetting()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    $(window).resize(function() {
      _this.sizeSetting()
    })
  },
  methods: {
    sizeSetting() {
      const w = '128%'
      const h = $(window).height()
      // if ($(window).width() > 1280) {
      //   w = '128%'
      // } else {
      //   w = ($(window).width() - 4) * 0.1 + '%'
      // }
      const bw = window.innerWidth
      const bh = window.innerHeight

      let scale = bw / 1280
      if (720 * scale > bh) {
        scale = bh / 720
      }
      $('html').css('font-size', w)
      $('#app').css('height', h)
      $('#wrap').css('transform', `scale(${scale})`)
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background: $color3;
  #wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1280px;
    height: 720px;
    margin: -360px 0 0 -640px;
  }
}
</style>
