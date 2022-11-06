<template>
  <div
    v-swiper:aramSwiper="swiperOption"
    @slideChangeTransitionStart="callback"
    @slideChangeTransitionEnd="callback"
    class="wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <div class="swiper-wrapper">
      <div
        v-for="(s, index) in swiperList"
        :key="index"
        class="swiper-slide box-shadow180"
      >
        <div v-if="swiperList.length > 0">
          <h3>
            <img
              src="~/static/images/mobile/contents/buy/tit_babyall_small.png"
            />
          </h3>
          <nuxt-link to="/study/learn">
            <img :src="s.filePathNm" class="thume" />
          </nuxt-link>
          <ul>
            <li>
              <span><span class="tit">구매일</span></span
              ><span>{{ s.ordDttm.substring(0, 10) }}</span>
            </li>
            <li>
              <span><span class="tit">구매매장</span></span
              ><span>{{ s.orgNm }}</span>
            </li>
            <li>
              <span><span class="tit">결제정보</span></span
              ><span class="point"
                ><span class="num">
                  {{ s.setlDvceTpNm }}
                </span>
                <span class="ico-p"
              /></span>
            </li>
          </ul>
          <p class="txt-warning">
            매장에서 구매한 제품에 대한 궁금한 사항은 해당 매장에 문의해 주세요.
          </p>
          <a
            v-if="s.shipInfoUrl"
            :href="s.shipInfoUrl"
            target="_blank"
            class="btn-delivery"
            >배송조회</a
          >
          <a
            v-else
            href="javascript:alert('현재 배송 준비중입니다.')"
            class="btn-delivery"
          >
            배송조회
          </a>
          <button
            v-if="s.reviewStatus === 'Y'"
            @click="reviewMod(s)"
            class="btn-receipt"
          >
            리뷰 수정
          </button>
          <button
            v-else-if="s.reviewStatus === 'N'"
            class="btn-receipt"
            @click="review(s)"
          >
            리뷰 쓰기
          </button>
          <button
            v-else-if="s.reviewStatus === 'D'"
            class="btn-receipt delete"
            disabled="disabled"
          >
            삭제된 리뷰
          </button>
        </div>
      </div>
    </div>
    <div v-if="swiperList.length <= 0" class="no-list box-shadow180">
      <h3>
        <img src="~/static/images/mobile/contents/buy/tit_babyall_small.png" />
      </h3>
      <p class="tit-no-list">구매 내역이 없습니다.</p>
      <p class="txt-no-list">
        매장에서 구매한 정보가 나오지 않는다면<br /><span
          >고객센터(1577-4521)</span
        >로 문의해 주세요.
      </p>
      <!-- hyh 20.10.16 <nuxt-link to="/mall/smart">아람 스마트 몰 바로가기</nuxt-link> -->
    </div>
    <div class="page-navi" v-if="swiperList.length > 0">
      <button class="swiper-button-prev" />
      <span>{{ currentSwiper + 1 }} / {{ swiperList.length }}</span>
      <button class="swiper-button-next" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Swiper',
  data() {
    return {
      // swiperList: [],
      currentSwiper: 0,
      // swiper
      swiperOption: {
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        spaceBetween: 20,
        autoplay: {
          delay: 5000
        },
        speed: 700
      }
    }
  },
  props: {
    // swiperNum: {
    //   type: Number,
    //   default: null
    // },
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
    callback() {
      this.currentSwiper = this.aramSwiper.activeIndex
    },
    review(prod) {
      const id = prod.prodId
      this.$router.push({
        name: `parents-review`,
        params: {
          prod: prod,
          cate: 'mini'
        }
      })
    },
    reviewMod(prod) {
      this.$router.push({
        name: `parents-review-modify`,
        params: {
          prod: prod,
          cate: 'mini'
        }
      })
    }
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
.wrap {
  position: relative;
  margin: 0 auto;
  text-align: center;
  .swiper-wrapper {
    .swiper-slide {
      max-width: 26rem;
      padding: 6rem 1.5rem 1.9rem;
      border-radius: 1rem 1rem 0.4rem 0.4rem;
      h3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 26rem;
        img {
          width: 26rem;
        }
      }
      .thume {
        width: 21.6rem;
        height: 14.7rem;
        border-radius: 0.4rem;
      }
      .btn-study {
        display: block;
        width: 100%;
        height: 4rem;
        margin: 0 0 1.2rem;
        background: #94bd41;
        font-size: 1.5rem;
        line-height: 4rem;
        text-align: center;
        color: #fff;
      }
      ul {
        padding: 0.4rem 0;
        text-align: left;
        border-bottom: 1px solid #c9c9c9;
        li {
          display: table;
          width: 100%;
          margin-top: 0.4rem;
          font-size: 1.3rem;
          color: $fontColor6;
          // &:last-child {
          //   margin-top: 0.8rem;
          // }
          & > span {
            display: table-cell;
            height: 2.9rem;
            line-height: 2.9rem;
            &:first-child {
              width: 8.5rem;
              padding-right: 1.2rem;
            }
          }
          .tit {
            display: inline-block;
            width: 100%;
            border: 1px solid #d0d0d0;
            border-radius: 1.4rem;
            font-weight: 400;
            text-align: center;
          }
        }
      }
      .btn-delivery {
        float: left;
        margin-top: 0.8rem;
        width: 10.9rem;
        height: 3rem;
        border: 1px solid #cfcfcf;
        line-height: 3rem;
        color: $fontColor3;
      }
      .btn-receipt {
        float: right;
        width: 10.9rem;
        height: 3rem;
        background: #313232;
        margin-top: 0.8rem;
        font-weight: 400;
        line-height: 2.6rem;
        font-size: 1.3rem;
        text-align: center;
        color: #fff;
        &.delete {
          background: #9c9c9c;
          cursor: default;
        }
      }
    }
  }
  .txt-warning {
    margin-top: 1rem;
  }
  .no-list {
    overflow: hidden;
    border-radius: 1rem 1rem 0.4rem 0.4rem;
    .tit-no-list {
      padding: 1.2rem 0 1.6rem;
      font-size: 1.6rem;
      font-weight: 600;
    }
    .txt-no-list {
      background: url('~static/svg2/icon_exclamation.svg') no-repeat 0 0.2rem;
      background-size: 1.4rem;
      width: 22rem;
      padding-left: 1.9rem;
      margin: 0 auto 2.4rem;
      font-size: 1.2rem;
      line-height: 1.8rem;
      letter-spacing: -1px;
      text-align: left;
      color: $fontColor9;
      span {
        color: $fontColor6;
      }
    }
    a {
      display: inline-block;
      width: 22rem;
      height: 3.6rem;
      margin: 2.2rem auto 2.6rem;
      background: #93c340;
      border-radius: 4rem;
      font-size: 1.3rem;
      line-height: 3.6rem;
      color: #fff;
    }
  }
  .page-navi {
    position: absolute;
    bottom: 2rem;
    left: 0;
    width: 100%;
    span {
      display: inline-block;
      width: 5rem;
      font-size: 1.2rem;
    }
    button {
      width: 1.2rem;
      height: 0.7rem;
      background: url('~static/svg2/icon_arw.svg') no-repeat center center;
      background-size: 100% auto;
      &.swiper-button-next {
        transform: rotate(180deg);
      }
    }
  }
}
.wrap.mo {
  overflow: hidden;
  width: 32rem;
  padding: 2rem 3rem 4.5rem;
  margin: 0 auto;
  h3 {
    img {
      width: 100%;
    }
  }
  .no-list {
    margin-top: 2rem;
  }
}
.wrap.pc {
  overflow: visible;
  width: 1080px;
  padding: 2rem 14rem;
  margin: 0 auto;
  .swiper-wrapper {
    .swiper-slide {
      margin-bottom: 2.8rem;
    }
  }
}
</style>
