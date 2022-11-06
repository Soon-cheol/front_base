<template>
  <div
    v-if="viewMode"
    class="saypen-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div v-if="viewMode === 'pc'">
      <h2>세이펜 자료실</h2>
      <div class="pin-list">
        <h3>
          <span class="num">1</span>
          <span class="tit">음원(pin파일) 다운 받기</span>
        </h3>
        <boardTable />
      </div>
      <div class="say-pen">
        <h3>
          <span class="num">2</span>
          <span class="tit">PC에 세이펜 연결하기</span>
        </h3>
        <ul>
          <li>
            <img src="/images/pc/contents/saypen/img_saypen01.png" />
            <p class="txt">1. 세이펜을 준비합시다.</p>
          </li>
          <li>
            <img src="/images/pc/contents/saypen/img_saypen02.png" />
            <p class="txt">2. 세이펜에 5핀 케이블을 연결합니다.</p>
          </li>
          <li>
            <img src="/images/pc/contents/saypen/img_saypen03.png" />
            <p class="txt">3. 케이블을 컴퓨터 USB에 연결합니다.</p>
          </li>
        </ul>
        <p class="txt-saypen">
          ※ 세이펜의 종류에 따라 단자의 위치가 상이할 수 있습니다.
        </p>
      </div>
      <div class="say-pen">
        <h3>
          <span class="num">3</span>
          <span class="tit">BOOK 폴더에 다운받은 음원(pin파일) 복사하기</span>
        </h3>
        <ul>
          <li>
            <img src="/images/pc/contents/saypen/img_down01.png" />
            <p class="txt">1. "BOOK"폴더를 오픈합니다.</p>
          </li>
          <li>
            <img src="/images/pc/contents/saypen/img_down02.png" />
            <p class="txt">
              2. 다운받은 음원(*.pin 파일)을 북폴더에 복사합니다.
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="no-list">
      <i />
      <p class="txt">
        세이펜 자료실은 PC 버젼에서만 이용 가능합니다.
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
import boardTable from '~/components/layouts/saypenTable'
export default {
  data() {
    return {}
  },
  // mounted() {
  //   const isIE = /trident/i.test(navigator.userAgent.toLowerCase())
  //   console.warn('isIE', isIE)
  // },
  components: {
    boardTable,
    loginConfirm
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode,
      userToken: (state) => state.user.userToken,
      isLoggedIn: (state) => state.auth.loggedIn
    })
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
.saypen-wrap {
  h2 {
    margin: 70px 0;
    font-size: 36px;
    text-align: center;
    color: $fontColor3;
  }
  .no-list {
    padding: 10rem 0;
    text-align: center;
    i {
      display: block;
      width: 4.1rem;
      height: 4.1rem;
      background: url('/images/common/ico_exc.svg');
      background-size: 100%;
      margin: 0 auto 1.5rem;
    }
    .txt {
      padding: 0 5rem;
      font-size: 1.6rem;
      font-weight: 600;
    }
    .sub {
      margin-top: 0.7rem;
      font-size: 1rem;
      color: $fontColor9;
    }
  }
  &.pc {
    padding-bottom: 50px;
    & > div {
      width: 1080px;
      margin: 0 auto 70px;
      h3 {
        overflow: hidden;
        margin-bottom: 20px;
        span {
          float: left;
          &.num {
            display: inline-block;
            width: 32px;
            height: 36px;
            margin-right: 11px;
            background: #00a0ea;
            border-radius: 6px;
            font-size: 25px;
            font-weight: 200;
            line-height: 35px;
            text-align: center;
            color: #fff;
          }
        }
      }
      .pin-list {
        ul {
          overflow: hidden;
          width: 1098px;
          margin-left: -18px;
          li {
            float: left;
            width: 256px;
            margin-left: 18px;
            text-align: center;
            &:nth-child(n + 5) {
              margin-top: 30px;
            }
            img {
              width: 100%;
              height: 190px;
            }
            button {
              width: 170px;
              height: 50px;
              margin: 12px auto 0;
              border: solid 1px #cfcfcf;
              border-radius: 35px;
              font-size: 18px;
            }
          }
        }
      }
      .say-pen {
        margin-top: 2rem;
        ul {
          overflow: hidden;
          li {
            float: left;
            width: 300px;
            text-align: center;
            &:nth-child(n + 2) {
              position: relative;
              margin-left: 85px;
              &::before {
                position: absolute;
                content: '';
                display: block;
                top: 42px;
                left: -51.5px;
                width: 19px;
                height: 106px;
                background: url('/images/pc/contents/saypen/ico_path.png')
                  no-repeat 0 0;
              }
            }
            img {
              width: auto;
              height: 190px;
            }
            .txt {
              margin-top: 14px;
              font-size: 18px;
              line-height: 25px;
              color: $fontColor6;
            }
          }
        }
        .txt-saypen {
          margin-top: 23px;
          font-size: 18px;
          text-align: center;
          color: #ff8d36;
        }
      }
    }
  }
}
</style>
