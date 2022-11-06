<template>
  <div>
    <nuxt-link to="/smart/book" class="btn-detail"
      >자세히 보기<img src="~/static/svg2/icon_arrow_gray.svg"
    /></nuxt-link>
    <div v-swiper:aramSwiper="swiperOption" @someSwiperEvent="callback">
      <div class="swiper-wrapper">
        <div v-for="(m, index) in swiperList" :key="index" class="swiper-slide">
          <nuxt-link :to="m.link"
            ><img :src="m.img" class="thume img-shadow160"
          /></nuxt-link>
          <div class="btn-wrap">
            <nuxt-link
              v-if="isLoggedIn"
              to="/smart/book/MA029000"
              class="btn-play"
            >
              이용하기
            </nuxt-link>
            <nuxt-link v-else to="/smart/book" class="btn-play"
              >이용하기</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="swiper-button-next" />
      <div class="swiper-button-prev" />
      <!-- <div class="swiper-pagination" /> -->
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
        // pagination: {
        //   el: '.swiper-pagination'
        // },
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
  // created() {
  //   console.log('swiperList', this.swiperList)
  // },
  computed: {
    ...mapState({ isLoggedIn: (state) => state.auth.loggedIn }),
    userToken: (state) => state.user.userToken,
    swiper() {
      return this.$refs.aramSwiper.swiper
    }
  },
  methods: {
    callback() {}
    // openLink(a) {
    //   window.open(a, 'contents')
    //   localStorage.setItem('token', this.userToken)
    // }
  }
}
</script>
<style lang="scss" scoped>
$shadow: 160;
$fontColor3: #191919;
$fontColor6: #767676;
$fontColor9: #999;
$blueColor: #269bd7;
$borderColor: #cfcfcf;
$errorColor: #ff794a;
.swiper-slide {
  position: relative;
  width: 24.6rem !important;
  margin: 0 3.7rem;
  padding-top: 1rem;
  .thume {
    width: 22rem;
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
  top: 16.5rem;
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
.btn-detail {
  display: inline-block;
  width: 12rem;
  height: 3.5rem;
  margin: 1.9rem 0 2rem;
  padding-left: 0.4rem;
  background: #fff;
  border: 1px solid $borderColor;
  border-radius: 2rem;
  font-size: 1.4rem;
  line-height: 3.4rem;
  color: $fontColor6;
  img {
    width: 0.6rem;
    margin: -0.2rem 0 0 0.9rem;
  }
}
.btn-wrap {
  .btn-play {
    display: inline-block;
    width: 22rem;
    height: 4rem;
    margin-top: 2.9rem;
    background: #269bd7;
    border-radius: 0.6rem;
    font-size: 1.5rem;
    line-height: 4rem;
    color: #fff;
  }
}
</style>
