<template>
  <div class="oneday-wrap">
    <ul class="cont-list">
      <li class="step01">
        <router-link :to="{ name: 'onedayStep01' }">
          <h3 class="tit">기본 모음</h3>
        </router-link>
      </li>
      <li class="step02" :class="{ active: steps.step2 }">
        <router-link v-if="steps.step2" :to="{ name: 'onedayStep02' }"
          ><h3 class="tit">기본 자음</h3></router-link
        >
        <span v-else><h3 class="tit">기본 자음</h3></span>
      </li>
      <li class="step03" :class="{ active: steps.step3 }">
        <router-link v-if="steps.step3" :to="{ name: 'onedayStep03' }"
          ><h3 class="tit">복잡한 모음</h3></router-link
        >
        <span v-else><h3 class="tit">복잡한 모음</h3></span>
      </li>
      <li class="step04" :class="{ active: steps.step4 }">
        <router-link v-if="steps.step4" :to="{ name: 'onedayStep04' }"
          ><h3 class="tit">대표 받침</h3></router-link
        >
        <span v-else><h3 class="tit">대표 받침</h3></span>
      </li>
      <li class="step05" :class="{ active: steps.step5 }">
        <router-link v-if="steps.step5" :to="{ name: 'onedayStep05' }"
          ><h3 class="tit">복잡한 받침</h3></router-link
        >
        <span v-else><h3 class="tit">복잡한 받침</h3></span>
      </li>
      <li class="step06" :class="{ active: steps.step6 }">
        <router-link v-if="steps.step6" :to="{ name: 'onedayStep06' }"
          ><h3 class="tit">겹받침</h3></router-link
        >
        <span v-else><h3 class="tit">겹받침</h3></span>
      </li>
    </ul>
    <div class="cont-play">
      <div v-if="!completedAll" class="btn-play">
        <button />
      </div>
      <i v-else class="img-king" />
      <div v-if="!completedAll" class="level">
        <div class="day">
          <span class="num">{{ dayOfStudy }}</span>
        </div>
        <div class="step">
          <h4>복잡한 받침</h4>
          <span class="txt">{{ letter }}</span>
        </div>
      </div>
      <div v-else class="complete">
        <h3 class="tit">한글 완료</h3>
      </div>
    </div>
  </div>
</template>

<script>
// import { main } from '@/assets/js/data.js'
import config from '@/activity/gameUtil/config'
export default {
  data() {
    return {
      completedAll: false,
      dayOfStudy: '',
      letter: '',
      // steps: main.steps
      steps: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 통신
    async getList() {
      try {
        const { data } = await this.$axios.get('/learning/hangul')
        this.steps = data.result.availableContents
        this.letter = data.result.letter
        this.completedAll = data.result.completedAll
        config.studyDay = this.dayOfStudy = data.result.dayOfStudy
        console.log(`${config.studyDay}일차시`)

        if (this.dayOfStudy < 10) {
          this.dayOfStudy = '00' + this.dayOfStudy
        } else if (this.dayOfStudy >= 10 && this.dayOfStudy <= 99) {
          this.dayOfStudy = '0' + this.dayOfStudy
        }
      } catch (error) {
        console.error(error)
      }
    }
    // 기능
  }
}
</script>

<style lang="scss" scoped>
.oneday-wrap {
  height: 632px;
  padding: 42px 30px 30px;
  .cont-list {
    float: left;
    width: 850px;
    li {
      @include boxShadow(6px, 0.6);
      float: left;
      width: 270px;
      height: 270px;
      margin-left: 20px;
      background: $colorF;
      border-radius: 20px;
      font-family: 'tmoney-bold';
      font-size: 40px;
      text-align: center;
      color: $colorB;
      &:nth-child(n + 4) {
        margin-top: 20px;
      }
      &:nth-child(1),
      &:nth-child(4) {
        margin-left: 0;
      }
      a,
      span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        .tit {
          position: absolute;
          top: 40px;
          display: block;
          width: 100%;
          font-size: 40px;
          text-align: center;
        }
        &::before {
          content: '';
          position: absolute;
          top: 116px;
          left: 85px;
          display: block;
          width: 110px;
          height: 114px;
          background: transparent
            url('~@/assets/images/main/oneday/menu_sprite.svg') no-repeat 5px 0;
        }
      }
      &.step01 {
        color: #ffb612;
      }
      &.step02 {
        a,
        span {
          &::before {
            background-position: -105px -124px;
          }
        }
        &.active {
          color: #fc615d;
          a {
            &::before {
              background-position: -105px 0;
            }
          }
        }
      }
      &.step03 {
        a,
        span {
          &::before {
            background-position: -215px -124px;
          }
        }
        &.active {
          color: #34cc67;
          a {
            &::before {
              background-position: -215px 0;
            }
          }
        }
      }
      &.step04 {
        a,
        span {
          &::before {
            background-position: -325px -124px;
          }
        }
        &.active {
          color: #00b4f2;
          a {
            &::before {
              background-position: -325px 0;
            }
          }
        }
      }
      &.step05 {
        a,
        span {
          &::before {
            background-position: -435px -124px;
          }
        }
        &.active {
          color: #ff5e9b;
          a {
            &::before {
              background-position: -435px 0;
            }
          }
        }
      }
      &.step06 {
        a,
        span {
          &::before {
            background-position: -545px -124px;
          }
        }
        &.active {
          color: #9a73ff;
          a {
            &::before {
              background-position: -545px 0;
            }
          }
        }
      }
    }
  }
  .cont-play {
    position: relative;
    float: right;
    width: 330px;
    height: 100%;
    font-family: 'tmoney-bold';
    .btn-play {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 180px;
      background: url('~@/assets/images/main/oneday/btn_play_char.svg')
        no-repeat 224px bottom;
      &::before {
        content: '시작';
        display: block;
        margin-top: 44px;
        padding-right: 20px;
        font-size: 35px;
        text-align: right;
        color: #ff4747;
      }
      button {
        position: absolute;
        top: 16px;
        right: 105px;
        width: 119px;
        height: 119px;
        background: url('~@/assets/images/main/oneday/btn_play.svg') no-repeat 0
          0;
        animation-name: btnAnimate;
        animation-duration: 1.4s;
        animation-duration: leaner;
        animation-iteration-count: infinite;
      }
      font-size: 0;
      @keyframes btnAnimate {
        0% {
          transform: scale(1);
          filter: brightness(1);
        }
        50% {
          transform: scale(1.05);
          filter: brightness(1.25);
        }
        100% {
          transform: scale(1);
          filter: brightness(1);
        }
      }
    }
    .img-king {
      position: absolute;
      display: block;
      right: 0;
      top: 40px;
      width: 172px;
      height: 172px;
      background: url('~@/assets/images/main/oneday/ico_king.svg') no-repeat 0 0;
    }
    .level {
      // @include boxShadow(6px, 0.6);
      position: relative;
      overflow: hidden;
      width: 348px;
      height: 398px;
      margin: 171px 0 0 -9px;
      background: url('~@/assets/images/main/oneday/bg_scroe.svg') no-repeat 0 0;
      background-size: 100% auto;
      .day {
        margin-top: 90px;
        font-family: 'tmoney-bold';
        font-size: 70px;
        text-align: center;
      }
      .step {
        margin-top: 49px;
        h4 {
          text-align: center;
          color: $colorF;
        }
        .txt {
          display: block;
          margin-top: 20px;
          font-size: 70px;
          text-align: center;
          color: $color3;
        }
      }
    }
    .complete {
      @include boxShadow(6px, 0.6);
      position: relative;
      width: 100%;
      height: 348px;
      margin-top: 212px;
      border-radius: 20px;
      background: #fff5ce url('~@/assets/images/main/oneday/img_complete.svg')
        no-repeat center 35px;
      .tit {
        position: absolute;
        top: -26px;
        left: 0;
        width: 140px;
        height: 71px;
        background: url('~@/assets/images/main/oneday/txt_complete.svg')
          no-repeat 0 0;
        font-size: 26px;
        line-height: 44px;
        text-align: center;
        color: $colorF;
      }
    }
  }
}
</style>
