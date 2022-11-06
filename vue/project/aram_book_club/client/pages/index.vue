<template>
  <div>
    <!-- pc -->
    <div v-if="viewMode !== 'mo'" id="pc">
      <div class="mian-swiper">
        <Swiper :swiperList="mainSwiperPc" />
      </div>
      <div class="book-club" />
      <div class="prod-series">
        <p class="txt-sub">우리아이 첫 프리미엄 스마트 북</p>
        <p class="txt-tit">아람 스마트북 시리즈</p>
        <nuxt-link to="/smart/book" class="btn-detail">자세히 보기</nuxt-link>
        <ul class="prod-list">
          <li class="box-shadow160">
            <nuxt-link to="/smart/book/MA029000"
              ><img src="~static/images/pc/contents/main/img_prod_list01.jpg"
            /></nuxt-link>
          </li>
          <!-- hyh 2020.10.19 
            <li class="box-shadow160">
            <nuxt-link to="/smart/book/mew"
              ><img src="~static/images/pc/contents/main/img_prod_list02.jpg"
            /></nuxt-link>
          </li> -->
        </ul>
        <nuxt-link to="/smart/book" class="btn-use">이용하기</nuxt-link>
      </div>
      <div class="prod-series hidden">
        <p class="txt-sub">아람 포인트몰</p>
        <p class="txt-tit">소단위 전집 시리즈</p>
        <nuxt-link to="/mall/point" class="btn-detail">자세히 보기</nuxt-link>
        <div class="sm-swiper">
          <mainSmallSwiperPc :swiperList="smallSeriesPc" />
        </div>
      </div>
    </div>
    <!-- // pc -->
    <!-- mo -->
    <div v-if="viewMode === 'mo'" id="mo">
      <Swiper :swiperList="mainSwiperMo" />
      <div class="book-club01" />
      <div class="book-club02" />
      <div class="book-club03" />
      <div class="prod-series">
        <p class="sub-tit">우리아이 첫 프리미엄 스마트 북</p>
        <h2>아람 스마트북 시리즈</h2>
        <mainBookSwiper :swiperList="bookSeries" />
      </div>
      <div class="prod-series hidden">
        <p class="sub-tit">아람 포인트몰</p>
        <h2>소단위 전집 시리즈</h2>
        <nuxt-link to="/mall/point" class="btn-detail"
          >자세히 보기<img src="~/static/svg2/icon_arrow_gray.svg"
        /></nuxt-link>
        <mainSmallSwiperMo :swiperList="smallSeriesMo" />
      </div>
    </div>
    <!-- // mo -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from '~/components/vendors/swiper'
import mainBookSwiper from '~/components/vendors/mainBookSwiper'
import mainSmallSwiperPc from '~/components/vendors/mainSmallSwiperPc'
import mainSmallSwiperMo from '~/components/vendors/mainSmallSwiperMo'
export default {
  layout: 'main',
  data() {
    return {
      mainSwiperPc: [],
      mainSwiperMo: [],
      bookSeries: [
        {
          img: 'images/mobile/contents/main/img_book_series01.png',
          link: '/smart/book/MA029000'
        }
        // hyh 2020.10.19
        // ,
        // {
        //   img: 'images/mobile/contents/main/img_book_series02.png',
        //   link: '/smart/book/mew'
        // }
      ],
      smallSeriesPc: [
        {
          img: 'images/pc/contents/main/img_sm_series01.jpg',
          link: '/mall/point'
        },
        {
          img: 'images/pc/contents/main/img_sm_series02.jpg',
          link: '/mall/point'
        },
        {
          img: 'images/pc/contents/main/img_sm_series03.jpg',
          link: '/mall/point'
        },
        {
          img: 'images/pc/contents/main/img_sm_series01.jpg',
          link: '/mall/point'
        },
        {
          img: 'images/pc/contents/main/img_sm_series02.jpg',
          link: '/mall/point'
        },
        {
          img: 'images/pc/contents/main/img_sm_series03.jpg',
          link: '/mall/point'
        }
      ],
      smallSeriesMo: [
        {
          img: 'images/mobile/contents/main/img_sm_series01.jpg',
          link: '/mall/point'
        },
        {
          img: 'images/mobile/contents/main/img_sm_series02.jpg',
          link: '/mall/point'
        },
        {
          img: 'images/mobile/contents/main/img_sm_series03.jpg',
          link: '/mall/point'
        }
      ]
    }
  },
  created() {
    this.getBannerListPc()
    this.getBannerListMo()
    this.getProdBabyall()
    // this.getProdMew() // hyh 2020.10.19
  },
  computed: {
    ...mapState({
      userToken: (state) => state.user.userToken,
      viewMode: (state) => state.user.viewMode,
      isLoggedIn: (state) => state.auth.loggedIn
    })
  },
  components: {
    Swiper,
    mainBookSwiper,
    mainSmallSwiperPc,
    mainSmallSwiperMo
  },
  methods: {
    async getBannerListPc() {
      try {
        const { data } = await this.$axios.get('/main/bannerList', {
          params: {
            bnnrDvceTpCd: 'BD1',
            bnnrKindCd: 'BK01'
          }
        })
        this.mainSwiperPc = data.result
        // console.log('data.result', data.result)
      } catch (error) {
        console.error(error)
      }
    },
    async getBannerListMo() {
      try {
        const { data } = await this.$axios.get('/main/bannerList', {
          params: {
            bnnrDvceTpCd: 'BD2',
            bnnrKindCd: 'BK01'
          }
        })
        this.mainSwiperMo = data.result
        // console.log('data.result', data.result)
      } catch (error) {
        console.error(error)
      }
    },
    async getProdBabyall() {
      try {
        const { data } = await this.$axios.get('/main/prod/babyall')
        console.log('babyall', data)
      } catch (error) {
        console.error(error)
      }
    }
    // hyh 2020.10.19
    // ,
    // async getProdMew() {
    //   try {
    //     const { data } = await this.$axios.get('/main/prod/mew')
    //     console.log('mew', data)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
$fontColor3: #191919;
$fontColor6: #767676;
$fontColor9: #999;
$blueColor: #269bd7;
$borderColor: #cfcfcf;
$errorColor: #ff794a;
#pc {
  .mian-swiper {
    height: 660px;
  }
  .book-club {
    height: 850px;
    background: #397fd5 url('~static/images/pc/contents/main/img_bookclub.png')
      no-repeat center top;
    background-size: auto 100%;
  }
  .prod-series {
    overflow: hidden;
    text-align: center;
    .txt-sub {
      margin-top: 118px;
      font-size: 24px;
      color: $fontColor6;
      font-weight: 300;
    }
    .txt-tit {
      margin-top: 10px;
      font-size: 46px;
      color: $fontColor3;
      font-weight: 600;
    }
    .btn-detail {
      display: inline-block;
      width: 170px;
      height: 50px;
      border: 1px solid #cfcfcf;
      border-radius: 30px;
      margin-top: 30px;
      padding-left: 35px;
      background: url('~static/svg2/icon_arrow_gray.svg') no-repeat 140px 16px;
      background-size: 11px 20px;
      font-size: 18px;
      text-align: left;
      line-height: 50px;
      color: $fontColor6;
    }
    .prod-list {
      margin-top: 90px;
      li {
        display: inline-block;
        width: 440px;
        height: 631px;
        & + li {
          margin-left: 99px;
        }
      }
    }
    .btn-use {
      display: block;
      width: 200px;
      height: 50px;
      margin: 60px auto 120px;
      background: $blueColor;
      border-radius: 50px;
      font-size: 22px;
      line-height: 50px;
      color: #fff;
    }
    .sm-swiper {
      overflow: hidden;
      width: 998px;
      padding: 10px;
      margin: 0 auto 138px;
    }
    & + .prod-series {
      background: #fafafa;
      .btn-detail {
        margin-bottom: 88px;
        background-color: #fff;
        border: 0 none;
      }
    }
  }
}
#mo {
  .book-club01 {
    height: 54.4rem;
    background: #397fd5
      url('~static/images/mobile/contents/main/img_bookclub01.png') no-repeat
      center 0;
    background-size: 32rem auto;
  }
  .book-club02 {
    height: 54.5rem;
    background: #397fd5
      url('~static/images/mobile/contents/main/img_bookclub02.png') no-repeat
      center 0;
    background-size: 32rem auto;
  }
  .book-club03 {
    height: 53.5rem;
    background: #397fd5
      url('~static/images/mobile/contents/main/img_bookclub03.png') no-repeat
      center 0;
    background-size: 32rem auto;
  }
  .prod-series {
    & + .prod-series {
      background: #f6f6f6;
    }
    padding: 5.6rem 0 6rem;
    text-align: center;
    .sub-tit {
      font-size: 1.4rem;
      color: $fontColor6;
    }
    h2 {
      margin-top: 0.4rem;
      font-size: 2.5rem;
      font-weight: 600;
      color: $fontColor3;
    }
    .btn-detail {
      display: inline-block;
      width: 12rem;
      height: 3.5rem;
      margin: 1.9rem 0 3rem;
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
  }
}
</style>
