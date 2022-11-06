<template>
  <div>
    <div v-swiper:aramSwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="(m, index) in swiperList"
          :key="index"
          class="swiper-slide box-shadow160"
        >
          <nuxt-link :to="m.link"><img :src="m.img" class="thume"/></nuxt-link>
        </div>
      </div>
      <div class="swiper-button-next" />
      <div class="swiper-button-prev" />
      <!-- <div class="swiper-pagination" /> -->
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
        spaceBetween: 18,
        slidesPerView: 3,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // pagination: {
        //   el: '.swiper-pagination'
        // },
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
.swiper-container {
  overflow: visible;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-next {
  background-image: url('~static/svg2/icon_arrow_gray.svg');
  right: -50px;
  left: auto;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-prev {
  background-image: url('~static/svg2/icon_arrow_gray.svg');
  transform: rotate(180deg);
  left: -50px;
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
.swiper-pagination {
  bottom: -35px;
  width: 100%;
}
</style>
