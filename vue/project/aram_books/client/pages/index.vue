<template>
  <div id="contants">
    <div class="main-visual">
      <div class="main-visual-mask">
        <div class="swiper-num">
          <span>{{ swiperNum.current }}</span> / {{ swiperNum.total }}
        </div>
        <div class="swiper-button swiper-button-next" />
        <div class="swiper-button swiper-button-prev" />
      </div>
      <div
        class="main-visual-slide"
        v-swiper:aramSwiper="swiperOption"
        @slideChangeTransitionStart="callback"
        @slideChangeTransitionEnd="callback"
      >
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img
              src="https://contents.arambookclub.com/banner/admin/202012/2021_newyear_p.png"
            />
          </div>
          <div class="swiper-slide">
            <a href="https://www.arambookclub.com/cs/306" target="_self">
              <img
                src="https://contents.arambookclub.com/banner/admin/202012/consulting_p.png"
              />
            </a>
          </div>
          <div class="swiper-slide">
            <a
              href="https://www.arambookclub.com/aram/book/A1032001"
              target="_self"
            >
              <img
                src="https://contents.arambookclub.com/banner/admin/202012/science_event_p_202012.png"
              />
            </a>
          </div>
          <div class="swiper-slide">
            <img
              src="https://contents.arambookclub.com/banner/admin/202011/bn_1_pc.jpg"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="product">
      <h2>Product</h2>
      <p class="txt-sub">큰 나무가 될 작은 씨앗을 위한 아람의 도서</p>
      <ul class="list">
        <li>
          <nuxt-link to="/product/01">
            <div><img src="/main/product01.png" class="img01" /></div>
            <p>아람 전집</p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/product/03">
            <div><img src="/main/product03.png" class="img02" /></div>
            <p>아람 소전집</p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/product/02">
            <div><img src="/main/product02.png" class="img03" /></div>
            <p>아람 스마트북</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="best-product">
      <h2>Best Product</h2>
      <p class="txt-sub">우리 아이를 위한 아람북스의 대표 전집</p>
      <ul class="list">
        <li>
          <a href="https://arambookclub.com/aram/book/A1010005">
            <div><img src="/main/best01.png" /></div>
            <p>우리 자연이랑</p>
          </a>
        </li>
        <li>
          <a href="https://arambookclub.com/aram/book/A1030004">
            <div><img src="/main/best02.png" /></div>
            <p>우리아람이</p>
          </a>
        </li>
        <li>
          <a href="https://arambookclub.com/aram/book/A1029005">
            <div><img src="/main/best03.png" /></div>
            <p>베이비올 영어</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="our-story">
      <h2>Our Story</h2>
      <p class="txt-sub">
        우리 아이들이 가진 작은 씨앗을 알찬 열매로 키우는 아람북스
      </p>
      <ul class="list">
        <li>
          <nuxt-link to="/company/intro">
            <dl>
              <dt>회사 소개</dt>
              <dd>
                아람북스는 어린이와 함께<br />
                미래를 꿈꾸며 동행하는 기업이 되겠습니다.
              </dd>
            </dl>
            <button />
            <div><img src="/main/our01.png" /></div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/company/find">
            <dl>
              <dt>공식 판매처</dt>
              <dd>아람북스는 여러분과 가까운<br />곳에 있습니다.</dd>
            </dl>
            <button />
            <div><img src="/main/our02.png" /></div>
          </nuxt-link>
        </li>
        <li class="half">
          <div>
            <nuxt-link to="/business/01">
              <dl>
                <dt>사업 영역</dt>
              </dl>
              <button />
              <div><img src="/main/our03.png" /></div>
            </nuxt-link>
          </div>
          <div>
            <nuxt-link to="/news/notice">
              <dl>
                <dt>아람 소식</dt>
              </dl>
              <button />
              <div><img src="/main/our04.png" /></div>
            </nuxt-link>
          </div>
        </li>
      </ul>
    </div>
    <div class="board">
      <div class="notice">
        <h2>Notice</h2>
        <nuxt-link to="/news/notice" class="btn-plus" />
        <ul v-if="noticeList.length">
          <li v-for="(l, index) in noticeList" :key="index">
            <nuxt-link :to="`/news/notice/${l.BRD_SEQNO}`">
              <span class="cate">Press Release</span>
              <p class="tit">{{ l.BRD_TITE_NM }}</p>
              <span class="date">{{ l.CRE_DTTM.substr(0, 10) }}</span>
            </nuxt-link>
          </li>
        </ul>
        <p v-else class="main-no-list">등록된 글이 없습니다.</p>
      </div>
      <div class="news">
        <h2>News</h2>
        <nuxt-link to="/news/release" class="btn-plus" />
        <ul v-if="newsList.length">
          <li v-for="(l, index) in newsList" :key="index">
            <a :href="l.BRD_CTT" target="_blank">
              <span class="cate">Press Release</span>
              <p class="tit">{{ l.BRD_TITE_NM }}</p>
              <span class="date">{{ l.CRE_DTTM.substr(0, 10) }}</span>
            </a>
          </li>
        </ul>
        <p v-else class="main-no-list">등록된 글이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
      newsList: [],
      swiperNum: {
        current: '01',
        total: 0,
      },
      // swiper
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        spaceBetween: 0,
        autoplay: true,
        speed: 300,
      },
    }
  },
  mounted() {
    const _this = this
    // 슬라이드 총 갯수 구하기
    this.swiperNum.total = document.querySelectorAll('.swiper-slide').length * 1
    this.swiperNum.total < 10
      ? (this.swiperNum.total = `0${this.swiperNum.total}`)
      : this.swiperNum.total
  },
  layout: 'main',
  created() {
    this.getNoticeList()
    this.getNewsList()
  },
  methods: {
    callback() {
      this.swiperNum.current = this.aramSwiper.activeIndex + 1
      this.swiperNum.current < 10
        ? (this.swiperNum.current = `0${this.swiperNum.current}`)
        : this.swiperNum.current
    },
    // 통신
    async getNoticeList() {
      try {
        const { data } = await this.$axios.get('/homepage/notice')
        if (data.result) {
          this.noticeList = data.result.slice(0, 3)
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async getNewsList() {
      try {
        const { data } = await this.$axios.get('/homepage/news')
        if (data.result) {
          this.newsList = data.result.slice(0, 3)
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.main-visual {
  position: relative;
  & > div {
    &.main-visual-mask {
      position: relative;
      width: 1200px;
      margin: 0 auto;
      // height: 660px;
      // background-color: rgba(0, 0, 0, 0.4);
      z-index: 2;
      .swiper-num {
        position: absolute;
        font-size: 16px;
        font-weight: 200;
        color: #fff;
        span {
          font-weight: 400;
        }
      }
      .swiper-button {
        position: absolute;
        width: 70px;
        height: 70px;
        background: url('/common/arrow_cercle.svg') no-repeat 0 0;
        z-index: 3;
        cursor: pointer;
      }
      .swiper-num {
        top: 584px;
        right: 0;
        width: 70px;
        text-align: center;
      }
      .swiper-button-prev {
        top: 500px;
        right: 0;
      }
      .swiper-button-next {
        top: 406px;
        right: 0;
        transform: rotate(180deg);
      }
    }
    &.main-visual-slide {
      height: 660px;
      z-index: 1;
      .swiper-slide {
        overflow: hidden;
        position: relative;
        img {
          position: absolute;
          left: 0;
          top: 0;
          left: 50%;
          margin-left: -959px;
        }
      }
    }
  }
}
.product {
  text-align: center;
  .txt-cate {
    margin-top: 80px;
    font-size: 20px;
    font-weight: 600;
    color: #72cbd2;
  }
  h2 {
    margin-top: 80px;
    font-size: 55px;
    letter-spacing: -1.1px;
    color: #000;
  }
  .txt-sub {
    margin-top: 18px;
    font-size: 18px;
    color: #666;
  }
  .list {
    overflow: hidden;
    width: 1200px;
    margin: 67px auto 100px;
    li {
      float: left;
      width: 383px;
      & + li {
        margin-left: 25px;
      }
      div {
        width: 383px;
        height: 210px;
        background-color: #f6f6f6;
        line-height: 210px;
        transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
        img {
          text-align: center;
          vertical-align: middle;
          transition: all 0.3s ease 0s;
          -webkit-transition: all 0.3s ease 0s;
          &.img01 {
            width: 233px;
            height: 173px;
          }
          &.img02 {
            width: 263px;
            height: 157px;
          }
          &.img03 {
            width: 308px;
            height: 172px;
          }
        }
      }
      p {
        height: 80px;
        padding: 0 32px;
        font-size: 22px;
        font-weight: 600;
        text-align: left;
        line-height: 80px;
        transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
      }
      a:hover {
        div {
          background-color: #ececec;
          img {
            transform: scale(1.02);
          }
        }
        p {
          background: #72cbd2;
          color: #fff;
        }
      }
    }
  }
}
.best-product {
  text-align: center;
  .txt-cate {
    margin-top: 80px;
    font-size: 20px;
    font-weight: 600;
    color: #72cbd2;
  }
  h2 {
    margin-top: 80px;
    font-size: 55px;
    letter-spacing: -1.1px;
    color: #000;
  }
  .txt-sub {
    margin-top: 18px;
    font-size: 18px;
    color: #666;
  }
  .list {
    overflow: hidden;
    width: 1200px;
    margin: 67px auto 100px;
    li {
      float: left;
      width: 383px;
      & + li {
        margin-left: 25px;
      }
      div {
        width: 383px;
        height: 285px;
        img {
          width: 383px;
          height: 285px;
        }
      }
      p {
        margin-top: 20px;
        font-size: 22px;
        font-weight: 600;
        text-align: center;
      }
    }
  }
}
.our-story {
  overflow: hidden;
  background-color: #f6f6f6;
  h2 {
    margin-top: 80px;
    font-size: 55px;
    letter-spacing: -1.1px;
    color: #000;
  }
  .txt-sub {
    margin-top: 18px;
    font-size: 18px;
    color: #666;
  }
  .list {
    overflow: hidden;
    width: 1200px;
    margin: 53px auto 80px;
    li {
      float: left;
      position: relative;
      width: 383px;
      height: 417px;
      & + li {
        margin-left: 25px;
      }
      dl {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 38px 31px;
        // background-color: rgba(0, 0, 0, 0.5);
        text-align: left;
        z-index: 2;
        dt {
          display: inline-block;
          border-bottom: 1px solid #333;
          font-size: 26px;
          font-weight: 600;
          color: #333;
        }
        dd {
          margin-top: 12px;
          font-size: 18px;
          line-height: 28px;
          color: #666;
        }
      }
      button {
        position: absolute;
        bottom: 42px;
        right: 38px;
        display: block;
        width: 70px;
        height: 70px;
        background: url('/common/arrow_cercle.svg') no-repeat 0 0;
        transform: rotate(180deg);
        z-index: 3;
      }
      &.half {
        & > div {
          position: relative;
          height: 196px;
          & + div {
            margin-top: 25px;
          }
          button {
            bottom: 35px;
          }
        }
      }
    }
  }
}
.board {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto 122px;
  & > div {
    position: relative;
    overflow: hidden;
    width: 540px;
    &.notice {
      float: left;
    }
    &.news {
      float: right;
    }
    h2 {
      position: relative;
      padding: 80px 0 17px;
      border-bottom: 2px solid #cfcfcf;
      font-size: 26px;
      text-align: left;
      color: #333;
      &::before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 84px;
        height: 2px;
        background-color: #72cbd2;
      }
    }
    .btn-plus {
      position: absolute;
      top: 82px;
      right: 0;
      display: block;
      width: 30px;
      height: 30px;
      background: url('/common/ico_plus.svg') no-repeat center center;
      z-index: 2;
    }
    .main-no-list {
      padding: 80px 0 0;
      font-size: 20px;
      text-align: center;
    }
    ul {
      li {
        padding: 17px 0 16px;
        border-bottom: 1px solid #cfcfcf;
        & > * {
          display: block;
          width: 100%;
          text-align: left;
        }
        .cate {
          font-size: 14px;
          color: #72cbd2;
        }
        .tit {
          margin: 10px 0 6px;
          font-size: 20px;
          color: #333;
        }
        .date {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>
