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
          <h3 v-if="viewMode === 'pc'" />
          <h3 v-else-if="viewMode === 'mo'">
            <img src="~static/images/mobile/contents/buy/tit_aram.png" />
          </h3>
          <nuxt-link to="/study/learn" class="thume">
            <img :src="s.filePathNm" />
          </nuxt-link>
          <ul class="info">
            <li>
              <span class="tit">구매일</span>
              <span class="txt">{{ s.ordDttm.substring(0, 10) }}</span>
            </li>
            <li>
              <span class="tit">구매매장</span
              ><span class="txt">{{ s.orgNm }}</span>
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
      <h3 v-if="viewMode === 'pc'" />
      <h3 v-else-if="viewMode === 'mo'">
        <img src="~static/images/mobile/contents/buy/tit_aram.png" />
      </h3>
      <p class="tit-no-list">구매 내역이 없습니다.</p>
      <p class="txt-no-list">
        매장에서 구매한 정보가 나오지 않는다면<br /><span
          >고객센터(1577-4521)</span
        >로 문의해 주세요.
      </p>
      <p class="txt-prev-date">
        2020년 10월 21일 이후<br />구매 내역부터 조회 가능합니다.
      </p>
    </div>
    <div class="page-navi" :class="{ hidden: swiperList.length <= 0 }">
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
          cate: 'book'
        }
      })
    },
    reviewMod(prod) {
      this.$router.push({
        name: `parents-review-modify`,
        params: {
          prod: prod,
          cate: 'book'
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
// pc
.wrap.pc {
  padding: 0 30%;
  margin-top: 2.4rem;
  .swiper-wrapper {
    .swiper-slide {
      overflow-y: hidden;
      overflow-x: auto;
      width: 100% !important;
      // min-height: 508px;
      border-radius: 1rem;
      background: url('~static/images/pc/contents/buy/bg_aram.jpg') repeat-x
        left top;
      & > div {
        overflow: hidden;
        max-width: 760px;
        margin: 0 auto;
        padding: 122px 48px 50px;
        text-align: center;
        h3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5.2rem;
          background: url('~static/images/pc/contents/buy/tit_aram.png')
            no-repeat center top;
          img {
            width: 100%;
            height: 5.2rem;
          }
        }
        .thume {
          display: block;
          position: relative;
          width: 290px;
          margin-bottom: 1rem;
          span {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2.5rem;
            background: rgba(148, 189, 65, 0.7);
            font-size: 0.9rem;
            line-height: 2.4rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
          }
          img {
            width: 100%;
          }
        }
        .info {
          width: 344px;
          padding-bottom: 0rem;
          border-bottom: 1px solid #c9c9c9;
          li {
            overflow: hidden;
            margin-bottom: 0.5rem;
            & > span {
              float: left;
              height: 2rem;
              font-size: 0.9rem;
              line-height: 1.8rem;
              color: $fontColor6;
            }
            .tit {
              width: 6.5rem;
              border: 1px solid #d0d0d0;
              border-radius: 2.4rem;
              // font-weight: 600;
              text-align: center;
            }
            .txt {
              padding-left: 1rem;
            }
          }
        }
        .btn-delivery {
          float: left;
          width: 42%;
          height: 3rem;
          margin: 0.8rem 0 0 7%;
          border: 1px solid #cfcfcf;
          line-height: 2.8rem;
          font-size: 1rem;
          color: $fontColor3;
        }
        .btn-receipt {
          float: right;
          width: 42%;
          height: 3rem;
          background: #313232;
          margin: 0.8rem 7% 0 0;
          font-weight: 400;
          line-height: 2.8rem;
          font-size: 1rem;
          text-align: center;
          color: #fff;
          &.delete {
            background: #9c9c9c;
            cursor: default;
          }
        }
      }
    }
  }
  .txt-warning {
    float: left;
    background: url('/images/mobile/contents/buy/ico_exclam.svg') no-repeat left
      top;
    margin: 0 0 0.4rem;
    padding-left: 1.8rem;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 200;
    color: $fontColor9;
  }
  .no-list {
    position: relative;
    overflow: hidden;
    max-width: 760px;
    margin: 0 auto 44px;
    padding: 122px 48px 50px;
    text-align: center;
    border-radius: 1rem;
    background: url('~static/images/pc/contents/buy/bg_aram.jpg') repeat-x left
      top;
    h3 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5.2rem;
      background: url('~static/images/pc/contents/buy/tit_aram.png') no-repeat
        center top;
      img {
        width: 100%;
        height: 5.2rem;
      }
    }
    .tit-no-list {
      padding: 20px 0 30px;
      font-size: 30px;
      font-weight: 600;
    }
    .txt-no-list {
      background: url('~static/svg2/icon_exclamation.svg') no-repeat 0 0.2rem;
      background-size: 1.4rem;
      width: 22rem;
      padding-left: 1.9rem;
      margin: 0 auto;
      font-size: 1.2rem;
      line-height: 1.8rem;
      letter-spacing: -1px;
      text-align: left;
      color: $fontColor9;
      a {
        color: $fontColor6;
      }
    }
    .txt-prev-date {
      margin: 1rem auto 0;
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #ff794a;
    }
  }
  .page-navi {
    width: 100%;
    margin: 1.6rem 0 2rem;
    text-align: center;
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
// mo
.wrap.mo {
  position: relative;
  overflow: hidden;
  width: 32rem;
  padding: 3rem 3rem 4.5rem;
  margin: 0 auto;
  text-align: center;
  .swiper-wrapper {
    .swiper-slide {
      max-width: 26rem;
      padding: 6rem 1.5rem 1.6rem;
      border-radius: 1rem 1rem 0.4rem 0.4rem;
      h3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 26rem;
        img {
          width: 100%;
        }
      }
      .thume {
        position: relative;
        display: block;
        span {
          position: absolute;
          bottom: 0;
          left: 0.7rem;
          display: block;
          width: 21.6rem;
          height: 2.5rem;
          line-height: 2.5rem;
          background: rgba(169, 195, 54, 0.8);
          font-size: 1rem;
          color: #fff;
        }
        img {
          width: 21.6rem;
          height: 14.7rem;
          border-radius: 0.4rem;
        }
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
        overflow: hidden;
        padding: 0.4rem 0;
        text-align: left;
        border-bottom: 1px solid #c9c9c9;
        li {
          float: left;
          width: 100%;
          padding: 0.4rem 0;
          font-size: 1.3rem;
          color: $fontColor6;
          & > span {
            float: left;
            // height: 2.9rem;
            line-height: 2.9rem;
          }
          .tit {
            width: 8.5rem;
            border: 1px solid #d0d0d0;
            border-radius: 1.4rem;
            font-weight: 400;
            text-align: center;
          }
          .txt {
            width: 14.5rem;
            padding-left: 1.2rem;
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
    background: url('/images/mobile/contents/buy/ico_exclam.svg') no-repeat 0
      0.1rem;
    background-size: 1.2rem auto;
    margin: 1rem 0 0.6rem;
    padding-left: 1.7rem;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 200;
    color: $fontColor9;
  }
  .no-list {
    overflow: hidden;
    margin-top: 2rem;
    border-radius: 1rem 1rem 0.4rem 0.4rem;
    h3 {
      img {
        width: 100%;
      }
    }
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
      margin: 0 auto 1rem;
      font-size: 1.2rem;
      line-height: 1.8rem;
      letter-spacing: -1px;
      text-align: left;
      color: $fontColor9;
      a {
        color: $fontColor6;
      }
    }
    .txt-prev-date {
      margin: 0 auto 2rem;
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #ff794a;
    }
    // a {
    //   display: inline-block;
    //   width: 22rem;
    //   height: 3.6rem;
    //   margin: 2.2rem auto 2.6rem;
    //   background: #93c340;
    //   border-radius: 4rem;
    //   font-size: 1.3rem;
    //   line-height: 3.6rem;
    //   color: #fff;
    // }
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
@media screen and (min-width: 1981px) {
  .wrap {
    .swiper-slide {
      .thume {
        float: left;
      }
      .btn-review,
      .info {
        float: right;
      }
    }
  }
}
@media screen and (max-width: 1890px) and (min-width: 1081px) {
  .wrap {
    .swiper-slide {
      .thume,
      .info,
      .btn-review {
        float: unset;
      }
      .thume {
        margin: 0 auto;
      }
      .info {
        margin: 30px auto;
      }
      .btn-review {
        margin: 0 auto;
      }
    }
  }
}
</style>
