<template>
  <div>
    <!-- pc -->
    <div v-if="viewMode !== 'mo'" id="pc">
      <div class="tit-page">
        <Swiper :swiperList="swiperPc" />
      </div>
      <div class="contants">
        <div class="box" />
        <p class="tit-smartbook">아람 스마트북 시리즈<span>소개</span></p>
        <div class="txt-smartbook">
          <dl>
            <dt><span>아람 스마트북</span> 이란?</dt>
            <dd>
              아람의 우수한 책과 짝을 이루어 미래를 이끌어 갈 소중한 우리아이의
              독서활동을 도와주는 디지털 콘텐츠입니다.
            </dd>
          </dl>
          <dl>
            <dt><span>아람 스마트북</span> 구성과 특징</dt>
            <dd>
              <span>1. </span
              ><span
                >아람 스마트북은 우리아이가 책의 내용을 쉽게 이해하고 응용 할 수
                있도록 도와줍니다.</span
              >
            </dd>
            <dd>
              <span>2. </span
              ><span
                >아람 스마트북은 우리아이의 학습 결과를 분석하여 부모님께서
                아이들을 쉽게 지도관리 할 수 있도록 도와줍니다.</span
              >
            </dd>
          </dl>
        </div>
        <ol class="prod-list">
          <li>
            <div class="smartbook">
              <div id="smtThume" ref="smtThume" />
              <div class="option">
                <div class="num one" />
                <dl>
                  <dt>베이비올 영어 스마트북</dt>
                  <dd>
                    디지털원어민,<br />Z세대를 위한 더 스마트한 영어 활동!
                  </dd>
                </dl>
                <ul class="smartbook-list">
                  <li @mouseover="babyallImg(1)" @mouseleave="babyallImg(1)">
                    <span>Story Books</span>
                  </li>
                  <li @mouseover="babyallImg(2)" @mouseleave="babyallImg(1)">
                    <span>Alphabet</span>
                  </li>
                  <li @mouseover="babyallImg(3)" @mouseleave="babyallImg(1)">
                    <span>My Room</span>
                  </li>
                  <li @mouseover="babyallImg(4)" @mouseleave="babyallImg(1)">
                    <span>My Pet</span>
                  </li>
                </ul>
                <div v-if="!isLoggedIn" class="btn-wrap">
                  <button class="btn-exp" @click="isLogin()">
                    체험하기
                  </button>
                  <nuxt-link to="/smart/book/MA029000">
                    자세히보기
                  </nuxt-link>
                </div>
                <div v-else class="btn-wrap">
                  <nuxt-link v-if="prodBabyAll.payYn === 'Y'" to="/study/learn">
                    학습하기
                  </nuxt-link>
                  <button
                    v-if="
                      prodBabyAll.usedTrlvrsn === 'N' &&
                        prodBabyAll.payYn === 'N'
                    "
                    @click="openLinkMap('/babyall')"
                  >
                    체험판 시작하기
                  </button>
                  <button
                    v-if="
                      prodBabyAll.usedTrlvrsn === 'Y' &&
                        prodBabyAll.remainTrlvrsnDays >= 1 &&
                        prodBabyAll.payYn === 'N'
                    "
                    @click="openLink('/babyall')"
                  >
                    체험하기 ({{ prodBabyAll.remainTrlvrsnDays }}일 남음)
                  </button>
                  <button
                    v-if="
                      prodBabyAll.usedTrlvrsn === 'Y' &&
                        prodBabyAll.remainTrlvrsnDays < 1 &&
                        prodBabyAll.payYn === 'N'
                    "
                    class="disabled"
                    @click="testEnd()"
                  >
                    체험하기 (이용 종료)
                  </button>
                  <nuxt-link to="/smart/book/MA029000">
                    자세히보기
                  </nuxt-link>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <!-- // pc -->
    <!-- mo -->
    <div v-if="viewMode === 'mo'" id="mo">
      <div class="tit-page">
        <Swiper :swiperList="swiperMo" />
      </div>
      <div class="contants">
        <div class="prod-thume">
          <div class="box" />
        </div>
        <div class="txt-smartbook">
          <p class="txt-aram-series">아람 스마트북 시리즈<span>소개</span></p>
        </div>
        <dl>
          <dt><span>아람 스마트북</span>이란?</dt>
          <dd>
            아람의 우수한 책과 짝을 이루어 미래를 이끌어 갈 소중한<br />우리아이의
            독서활동을 도와주는 디지털 콘텐츠입니다.
          </dd>
        </dl>
        <dl>
          <dt><span>아람 스마트북</span> 구성과 특징</dt>
          <dd>
            <span>1. </span
            ><span
              >아람 스마트북은 우리아이가 책의 내용을 쉽게 이해하고<br />응용 할
              수 있도록 도와줍니다.</span
            >
          </dd>
          <dd>
            <span>2. </span
            ><span
              >아람 스마트북은 우리아이의 학습 결과를 분석하여 부모님<br />께서
              아이들을 쉽게 지도관리 할 수 있도록 도와줍니다.</span
            >
          </dd>
        </dl>
        <ul class="prod-list">
          <li>
            <div class="num one" />
            <dl class="prod">
              <dt>베이비올 영어 스마트북</dt>
              <dd>디지털원어민, Z세대를 위한 더 스마트한<br />영어 활동!</dd>
            </dl>
            <div class="img">
              <img src="~/static/svg2/icon_new.svg" class="new" />
              <img
                src="~/static/images/mobile/contents/book/img_babyall.png"
                class="thume"
              />
            </div>
            <div v-if="!isLoggedIn" class="btn">
              <button class="btn-exp" @click="isLogin()">
                체험하기
              </button>
              <nuxt-link class="btn-view" to="/smart/book/MA029000">
                자세히 보기
              </nuxt-link>
            </div>
            <div v-else class="btn">
              <nuxt-link
                v-if="prodBabyAll.payYn === 'Y'"
                class="btn-exp"
                to="/study/learn"
              >
                학습하기
              </nuxt-link>
              <button
                v-if="
                  prodBabyAll.usedTrlvrsn === 'N' && prodBabyAll.payYn === 'N'
                "
                @click="openLinkMap('/babyall')"
                class="btn-exp"
              >
                체험판 시작하기
              </button>
              <button
                v-if="
                  prodBabyAll.usedTrlvrsn === 'Y' &&
                    prodBabyAll.remainTrlvrsnDays >= 1 &&
                    prodBabyAll.payYn === 'N'
                "
                @click="openLink('/babyall')"
                class="btn-exp"
              >
                체험하기 ({{ prodBabyAll.remainTrlvrsnDays }}일 남음)
              </button>
              <button
                v-if="
                  prodBabyAll.usedTrlvrsn === 'Y' &&
                    prodBabyAll.remainTrlvrsnDays < 1 &&
                    prodBabyAll.payYn === 'N'
                "
                class="btn-exp disabled"
                @click="testEnd()"
              >
                체험하기 (이용 종료)
              </button>
              <nuxt-link to="/smart/book/MA029000" class="btn-view">
                자세히보기
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- // mo -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from '~/components/vendors/smartBookSwiper'
export default {
  data() {
    return {
      babyallThume: '/images/pc/contents/book/img_babyall01.png',
      prodBabyAll: {},
      prodMew: {},
      swiperMo: [
        {
          img: '/images/mobile/contents/detail/top_babyall_img01.jpg',
          link: '/smart/book'
        },
        {
          img: '/images/mobile/contents/detail/top_babyall_img02.jpg',
          link: '/smart/book'
        }
      ],
      swiperPc: [
        {
          img: '/images/pc/contents/detail/top_babyall_img01.jpg',
          link: '/smart/book'
        },
        {
          img: '/images/pc/contents/detail/top_babyall_img02.jpg',
          link: '/smart/book'
        }
      ]
    }
  },
  components: {
    Swiper
  },
  created() {
    this.prodListBabyAll()
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode,
      userToken: (state) => state.user.userToken,
      isLoggedIn: (state) => state.auth.loggedIn
    })
  },
  methods: {
    // 통신
    async prodListBabyAll() {
      try {
        const { data } = await this.$axios.get('/main/prod/babyall')
        this.prodBabyAll = data.result
        console.log('prodBabyAll', data)
      } catch (error) {
        console.error(error)
      }
    },
    async directBuy(prod, prodId, price) {
      const prodList = []
      const pckgList = []
      prodList.push(prod)
      pckgList.push(prodId)
      try {
        const { data } = await this.$axios.post('/buy/inscartbuy', {
          totSetlAmt: price * 1,
          prodIds: prodList,
          pckgProdIds: pckgList
        })
        this.$router.push({
          name: 'payment-mall',
          params: {
            ordNo: data.result.ordNo
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    async basketAdd(prod, prodId, payYn) {
      try {
        const { data } = await this.$axios.post('/shpb/insshpb', {
          prodId: prod,
          pckgProdId: prodId,
          imdySetlYn: payYn
        })
        if (data.ok) {
          if (
            confirm('장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?')
          ) {
            this.$router.push({
              name: 'basket'
            })
          }
        } else {
          console.log('data.errorState.message', data.errorState.message)
        }
      } catch (error) {
        if (error.error.message === '중복된 상품이 있습니다.') {
          alert('장바구니에 이미 등록되어있습니다.')
        }
      }
    },
    // 처음 체험판 열 경우, 매핑
    async openLinkMap(a) {
      try {
        const { data } = await this.$axios.post(
          '/learning/management/trialversion',
          {
            prodId: this.prodBabyAll.prodId
          }
        )
        if (data.ok) {
          localStorage.setItem('trlvrsnDays', 'true')
          localStorage.setItem('token', '')
          // window.open(a, 'contents')
          location.href = a
        }
      } catch (error) {
        console.log('error', error)
        alert('체험판 상품 연결에 오류가 발생했습니다.')
      }
    },
    // 기능
    isLogin() {
      alert('로그인 후 이용 가능합니다.')
      this.$router.push({
        name: 'login'
      })
    },
    // 처음 체험판이 아닌 경우 = 매핑이 된 상황
    openLink(a, detail) {
      localStorage.setItem('trlvrsnDays', 'true')
      localStorage.setItem('token', '')
      // window.open(a, 'contents')
      location.href = a
    },
    // 체험판 종료
    testEnd() {
      localStorage.setItem('trlvrsnDays', 'false')
      localStorage.setItem('token', '')
      alert(
        '체험판 이용 기간이 만료되었습니다.\n추가적인 이용을 원하시면 구매를 해주세요.'
      )
    },
    babyallImg(num) {
      // this.babyallThume = `/images/pc/contents/book/img_babyall0${num}.png`
      if (num === 2) {
        this.$refs.smtThume.classList.add('alphabet')
      } else if (num === 3) {
        this.$refs.smtThume.classList.add('myroom')
      } else if (num === 4) {
        this.$refs.smtThume.classList.add('mypet')
      } else if (num === 1) {
        this.$refs.smtThume.removeAttribute('class')
      }
    },
    prodDetail(id) {
      this.$router.push({
        name: `${this.$route.name}-id`,
        params: {
          id: id
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
#pc {
  overflow: hidden;
  .contants {
    position: relative;
    width: 1080px;
    margin: 0 auto;
    z-index: 100;
    .box {
      width: 100%;
      padding-top: 80px;
      margin-top: -80px;
      border-radius: 20px 20px 0 0;
      background: #fff;
    }
    .tit-smartbook {
      margin: 16px 0 60px;
      font-size: 40px;
      font-weight: 600;
      text-align: center;
      span {
        display: block;
        font-weight: 200;
        line-height: 50px;
      }
    }
    .txt-smartbook {
      overflow: hidden;
      dl {
        width: 508px;
        margin-bottom: 70px;
        &:first-child {
          float: left;
        }
        &:last-child {
          float: right;
        }
        dt {
          font-size: 26px;
          span {
            font-weight: 600;
          }
        }
        dd {
          display: table;
          margin-top: 18px;
          font-size: 20px;
          font-weight: 200;
          line-height: 30px;
          span {
            display: table-cell;
            &:first-child {
              padding-right: 10px;
            }
          }
        }
      }
    }
    .prod-list {
      & > li {
        width: 1920px;
        margin-left: -420px;
        &:nth-child(1) {
          height: 820px;
          background: #f6f6f6;
        }
        &:nth-child(2) {
          height: 1111px;
        }
        & > div {
          overflow: hidden;
          width: 1080px;
          height: 100%;
          margin: 0 auto;
          text-align: center;
          #smtThume {
            margin: 86px auto 0;
          }
          .option {
            position: relative;
            text-align: left;
            .num {
              height: 79px;
              margin: 80px 0 40px;
              border-bottom: 1px solid #c9c9c9;
              &.one {
                background: transparent url('~static/svg2/icon_number_1.svg')
                  no-repeat 0 0;
                background-size: auto 65px;
              }
              &.two {
                background: transparent url('~static/svg2/icon_number_2.svg')
                  no-repeat 24px 0;
                background-size: auto 65px;
              }
              &.thr {
                background: transparent url('~static/svg2/icon_number_3.svg')
                  no-repeat 0 0;
                background-size: auto 65px;
              }
            }
            dl {
              dt {
                font-size: 36px;
                font-weight: 600;
              }
              dd {
                margin-top: 24px;
                font-size: 20px;
                font-weight: 300;
                line-height: 30px;
                color: $fontColor6;
              }
            }
            .smartbook-list {
              margin-top: 56px;
              li {
                position: relative;
                padding-left: 66px;
                &::before {
                  position: absolute;
                  content: '';
                  top: 6px;
                  left: 14px;
                  display: block;
                  width: 20px;
                  height: 20px;
                  border-radius: 100%;
                  transition: all 0.3s ease 0s;
                  -webkit-transition: all 0.3s ease 0s;
                }
                &:hover {
                  &::before {
                    top: -8px;
                    left: 0;
                    width: 50px;
                    height: 50px;
                  }
                  span {
                    padding-right: 66px;
                  }
                }
                & + li {
                  margin-top: 44px;
                }
                &:nth-child(1) {
                  &::before {
                    background: #f05574;
                  }
                }
                &:nth-child(1):hover {
                  &::before {
                    background: url('~static/images/pc/contents/book/button01.png');
                  }
                }
                &:nth-child(2) {
                  &::before {
                    background: #269bd7;
                  }
                }
                &:nth-child(2):hover {
                  &::before {
                    background: url('~static/images/pc/contents/book/button02.png');
                  }
                }
                &:nth-child(3) {
                  &::before {
                    background: #7348ae;
                  }
                }
                &:nth-child(3):hover {
                  &::before {
                    background: url('~static/images/pc/contents/book/button03.png');
                  }
                }
                &:nth-child(4) {
                  &::before {
                    background: #62c04f;
                  }
                }
                &:nth-child(4):hover {
                  &::before {
                    background: url('~static/images/pc/contents/book/button04.png');
                  }
                }
                span {
                  display: inline-block;
                  padding-right: 60px;
                  background: url('~static/svg2/icon_main_web_arrow.svg')
                    no-repeat right center;
                  background-size: 46px auto;
                  transition: all 0.3s ease 0s;
                  -webkit-transition: all 0.3s ease 0s;
                  cursor: pointer;
                }
              }
            }
            .btn-wrap {
              position: absolute;
              overflow: hidden;
              right: 0;
              width: 100%;
              & > * {
                display: block;
                min-width: 168px;
                height: 50px;
                border: 1px solid #cfcfcf;
                border-radius: 26px;
                padding: 0 20px;
                font-size: 20px;
                text-align: center;
                line-height: 46px;
                color: $fontColor3;
                &:nth-child(n + 2) {
                  margin-left: 8px;
                }
              }
              a,
              button {
                &:hover {
                  background: #93c340;
                  border: 1px solid #93c340;
                  color: #fff;
                }
                &.disabled {
                  cursor: default;
                  &:hover {
                    background: $fontColor9;
                    border: 1px solid $fontColor9;
                    color: #dedede;
                  }
                }
              }
            }
          }
          &.smartbook {
            #smtThume {
              float: left;
              width: 436px;
              height: 734px;
              background: url('~static/images/pc/contents/book/img_smartbook.png')
                no-repeat 0 0;
              transition: all 0.3s ease 0s;
              -webkit-transition: all 0.3s ease 0s;
              &.alphabet {
                background-position: -436px 0;
              }
              &.myroom {
                background-position: -872px 0;
              }
              &.mypet {
                background-position: -1308px 0;
              }
            }
            .option {
              float: right;
              width: 520px;
              height: 100%;
              .btn-wrap {
                bottom: 50px;
                & > * {
                  float: left;
                }
              }
            }
          }
          &.mew {
            .option {
              .btn-wrap {
                float: left;
                top: 11px;
                left: 0;
                & > * {
                  float: right;
                }
              }
              .mew-list {
                overflow: hidden;
                margin-top: 34px;
                li {
                  position: relative;
                  float: left;
                  width: 33.3%;
                  margin: 16px 0 20px;
                  padding-left: 66px;
                  &::before {
                    position: absolute;
                    content: '';
                    top: 6px;
                    left: 14px;
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                  }
                  &:nth-child(1) {
                    &::before {
                      background: #f05574;
                    }
                  }
                  &:nth-child(2) {
                    &::before {
                      background: #ff6870;
                    }
                  }
                  &:nth-child(3) {
                    &::before {
                      background: #ff7753;
                    }
                  }
                  &:nth-child(4) {
                    &::before {
                      background: #ffad39;
                    }
                  }
                  &:nth-child(5) {
                    &::before {
                      background: #7ed047;
                    }
                  }
                  &:nth-child(6) {
                    &::before {
                      background: #15ab5c;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
#mo {
  .contants {
    position: relative;
    .prod-thume {
      width: 32rem;
      height: 4rem;
      margin-top: -3.8rem;
      .box {
        position: relative;
        width: 30rem;
        height: 100%;
        padding: 1.5rem 1.3rem;
        margin: 0 1rem;
        background: #fff;
        border-radius: 1.2rem 1.2rem 0 0;
        z-index: 100;
      }
    }
    .txt-smartbook {
      margin: 1rem 0 4.5rem;
      text-align: center;
      .txt-aram-series {
        font-size: 2.3rem;
        font-weight: 600;
        span {
          display: block;
          margin-top: 0.5rem;
          font-weight: 200;
        }
      }
      // margin: 4rem 0 5.3rem;
      // text-align: center;
      // img {
      //   width: 3.9rem;
      //   margin-bottom: 0.9rem;
      // }
      // .txt {
      //   font-size: 2.2rem;
      //   line-height: 2.6rem;
      //   & + .txt {
      //     margin-top: 1.2rem;
      //     font-size: 2.5rem;
      //     font-weight: 600;
      //     color: $blueColor;
      //   }
      // }
    }
    & > dl {
      & + dl {
        margin-top: 4rem;
      }
      text-align: center;
      dt {
        margin-bottom: 1.4rem;
        font-size: 1.8rem;
        font-weight: 200;
        span {
          font-weight: 600;
        }
      }
      dd {
        display: table;
        width: 85%;
        margin: 0 auto;
        font-size: 1.1rem;
        line-height: 1.7rem;
        color: $fontColor6;
        span {
          display: table-cell;
          text-align: left;
          vertical-align: top;
          &:first-child {
            padding-right: 0.3rem;
          }
        }
      }
    }
    .prod-list {
      margin: 5rem 0 2rem;
      & > li {
        padding: 4rem 3rem;
        &:nth-child(odd) {
          background: #f6f6f6;
        }
        .num {
          height: 3.9rem;
          border-bottom: 1px solid #c9c9c9;
          &.one {
            background: transparent url('~static/svg2/icon_number_1.svg')
              no-repeat 0 0;
            background-size: auto 3.2rem;
          }
          &.two {
            background: transparent url('~static/svg2/icon_number_2.svg')
              no-repeat 0 0;
            background-size: auto 3.2rem;
          }
          &.thr {
            background: transparent url('~static/svg2/icon_number_3.svg')
              no-repeat 0 0;
            background-size: auto 3.2rem;
          }
        }
        .prod {
          text-align: left;
          dt {
            margin-top: 2rem;
            font-size: 1.9rem;
            font-weight: 600;
            color: $fontColor3;
          }
          dd {
            margin-top: 1.5rem;
            font-size: 1.3rem;
            line-height: 1.7rem;
            color: $fontColor6;
          }
        }
        .img {
          position: relative;
          width: 32rem;
          margin: 3.3rem -3rem 0.8rem;
          .new {
            position: absolute;
            width: 4.8rem;
            top: -0.3rem;
            left: 3.6rem;
            &.mew {
              top: 1.6rem;
              left: 1rem;
            }
          }
          img {
            width: 100%;
          }
          #smtThume {
            width: 100%;
          }
        }
        .btn {
          overflow: hidden;
          width: 26rem;
          margin: 0 auto;
          a,
          button {
            display: block;
            width: 100%;
            height: 4rem;
            border-radius: 0.8rem;
            font-size: 1.5rem;
            line-height: 4rem;
            text-align: center;
            color: #fff;
            &.btn-exp {
              background: #ff4747;
            }
            &.btn-view {
              margin-top: 0.8rem;
              background: $fontColor6;
            }
            &.btn-basket {
              margin-top: 0.8rem;
              background: #93c340;
            }
            &.disabled {
              background: $fontColor9;
              color: #dedede;
              cursor: default;
            }
          }
          // a:nth-child(1),
          // button:nth-child(1) {
          //   background: #ff4747;
          // }
          // a:nth-child(2),
          // button:nth-child(2) {
          //   margin-top: 0.8rem;
          //   background: $fontColor6;
          // }
          // a,
          // button {
          //   float: left;
          //   height: 4rem;
          //   border-radius: 0.5rem;
          //   font-size: 1.5rem;
          //   text-align: center;
          //   line-height: 4rem;
          // }
          // a:nth-child(1),
          // button:nth-child(1) {
          //   width: 13.2rem;
          //   background: $fontColor6;
          //   border: 1px solid $fontColor6;
          //   color: #fff;
          // }
          // a:nth-child(2),
          // button:nth-child(2) {
          //   width: 13.2rem;
          //   margin-left: 0.6rem;
          //   border: 1px solid $fontColor6;
          //   color: $fontColor3;
          // }
          // a:nth-child(3),
          // button:nth-child(3) {
          //   width: 100%;
          //   background: $blueColor;
          //   margin-top: 0.6rem;
          //   border: 1px solid $blueColor;
          //   color: #fff;
          // }
        }
      }
    }
  }
}
</style>
