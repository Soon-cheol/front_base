<template>
  <div>
    <div v-swiper:aramSwiper="swiperOption" @someSwiperEvent="callback">
      <div
        class="swiper-wrapper"
        :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
      >
        <div v-for="(m, index) in swiperList" :key="index" class="swiper-slide">
          <span>
            <img v-if="!m.bnnrUrlAddrNm" :src="m.filePathNm" />
            <img
              v-else
              :src="m.filePathNm"
              @click="openLink(m.bnnrUrlAddrNm)"
            />
          </span>
        </div>
      </div>
      <!-- <div class="swiper-button-next" />
      <div class="swiper-button-prev" /> -->
      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Swiper',
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
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
    ...mapState({
      viewMode: (state) => state.user.viewMode
    }),
    swiper() {
      return this.$refs.aramSwiper.swiper
    }
  },
  methods: {
    callback() {},
    openLink(a) {
      location.href = a
    }
  }
}
</script>
<style lang="scss" scoped>
.mo {
  .swiper-slide {
    width: 32rem;
    height: 37.5rem;
    img {
      width: 32rem;
      height: 37.5rem;
    }
  }
}
.pc {
  .swiper-wrapper {
    height: 660px;
    .swiper-slide {
      overflow: hidden;
      a,
      span {
        display: block;
        position: absolute;
        left: 50%;
        text-align: center;
        img {
          width: 1920px;
          height: 660px;
          margin-left: -950px;
          cursor: pointer;
        }
      }
    }
  }
  .swiper-pagination {
    bottom: 64px;
    width: 100%;
  }
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  /* background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E"); */
  background-image: url('~static/images/mobile/common/btn_arrow.png');
  left: 2%;
  right: auto;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  /* background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E"); */
  background-image: url('~static/images/mobile/common/btn_arrow.png');
  transform: rotate(180deg);
  right: 2%;
  left: auto;
}
</style>
