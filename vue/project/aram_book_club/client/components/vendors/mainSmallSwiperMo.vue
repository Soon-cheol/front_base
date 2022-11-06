<template>
  <div>
    <div v-swiper:aramSwiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="(m, index) in swiperList" :key="index" class="swiper-slide">
          <nuxt-link :to="m.link"><img :src="m.img" class="thume"/></nuxt-link>
        </div>
      </div>
      <div class="swiper-button-next" />
      <div class="swiper-button-prev" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  data() {
    return {
      view: '',
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: true
      }
    }
  },
  props: {
    swiperList: {
      type: Array,
      default: null
    }
  },
  computed: {
    swiper() {
      return this.$refs.aramSwiper.swiper
    }
  },
  methods: {
    callback() {}
  }
}
</script>
<style lang="scss" scoped>
.swiper-slide {
  position: relative;
  width: 22rem !important;
  margin: 0 5rem;
  .thume {
    width: 100%;
  }
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-next {
  background-image: url('~static/svg2/icon_arrow_gray.svg');
  right: 1.5rem;
  left: auto;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-prev {
  background-image: url('~static/svg2/icon_arrow_gray.svg');
  transform: rotate(180deg);
  left: 1.5rem;
  right: auto;
}
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 12rem;
  width: 1.9rem;
  height: 3.8rem;
  z-index: 10;
  cursor: pointer;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.new {
  position: absolute;
  top: -0.5rem;
  left: 1.4rem;
  width: 4.8rem;
}
</style>
