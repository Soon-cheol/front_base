<template>
  <div ref="wrapMain" class="wrap-main">
    <timerCheck />
    <div class="header-menu">
      <img src="~@/assets/images/header/img_logo.svg" class="logo" />
      <ul class="info">
        <li class="name" @click="profileStart">
          <img v-if="userFace !== ''" :src="userFace" />
          <span v-else class="face-default" />
          <span>{{ userName }}</span>
        </li>
        <li class="char">
          <span class="img" :class="`img${randomKey}`" />
          <span class="chat">
            {{ keyword[randomKey] }}
          </span>
        </li>
      </ul>
      <ul class="menu">
        <li
          class="oneday"
          :class="{ active: swiperIndex === 0 }"
          @click="next(0)"
        >
          <span class="name">하루 한글</span>
          <span class="ico" />
        </li>
        <li
          class="card"
          :class="{ active: swiperIndex === 1 }"
          @click="next(1)"
        >
          <span class="name">한글 카드</span>
          <span class="ico" />
        </li>
        <li
          class="mypet"
          :class="{ active: swiperIndex === 2 }"
          @click="next(2)"
        >
          <span class="name">그림 퍼즐</span>
          <span class="ico" />
        </li>
        <li class="parent" @click="parentStart()">
          <span class="name">부모님</span>
          <span class="ico" />
        </li>
      </ul>
    </div>
    <swiper
      ref="swiperMain"
      class="main-swiper"
      :options="swiperOption"
      @slideChangeTransitionStart="callback"
      @slideChangeTransitionEnd="callback"
    >
      <swiper-slide><onedayComponent /></swiper-slide>
      <swiper-slide><cardComponent /></swiper-slide>
      <swiper-slide><puzzleComponent /></swiper-slide>
    </swiper>
    <!-- 카드 팝업 -->
    <div v-if="cardPopup">
      <cardPopupComponent />
    </div>
    <!-- 이전 진도~ 팝업 -->
    <div v-if="alertPopup">
      <alertComponent />
    </div>
    <!-- 부모님 팝업 -->
    <div v-if="parentPopup">
      <parentComponent @popupClose="parentClose" />
    </div>
    <!-- 프로필 팝업 -->
    <div v-if="profilePopup">
      <profileComponent
        :name="userName"
        :face="userFace"
        :day-of-study="dayOfStudy"
        @popupClose="profileClose"
      />
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import '@/assets/css/swiper.css'

import { mapState, mapActions } from 'vuex'

import timerCheck from '@/components/timer'

import onedayComponent from '@/components/main/onedayComponent'
import cardComponent from '@/components/main/cardComponent'
import puzzleComponent from '@/components/main/puzzleComponent'
import parentComponent from '@/components/main/parentComponent'

import cardPopupComponent from '@/components/main/card/popupComponent'
import alertComponent from '@/components/main/popup/alertComponent'
import profileComponent from '@/components/main/popup/profileComponent'

export default {
  components: {
    timerCheck,
    swiper,
    swiperSlide,
    onedayComponent,
    cardComponent,
    puzzleComponent,
    parentComponent,
    alertComponent,
    cardPopupComponent,
    profileComponent
  },
  data() {
    return {
      swiperOption: {
        initialSlide: 0
      },
      userName: '',
      userFace: '',
      dayOfStudy: 0,
      swiperIndex: 0,
      profilePopup: false,
      parentPopup: false,
      randomKey: 0,
      keyword: [
        '안녕?',
        '신난다!',
        '대단해.',
        '출발!',
        '빠져든다~',
        '영차영차!',
        '흠...',
        '짜잔~',
        '놀라워!',
        '자음? 모음?',
        '재미있어!',
        '감동이야.',
        '옳지.',
        '얍!',
        '최고야!'
      ]
    }
  },
  computed: {
    ...mapState({
      playTime: (state) => state.timer.timer,
      cardPopup: (state) => state.cardView.popup.visible,
      alertPopup: (state) => state.popup.alert.visible
    })
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    this.callback()
    if (this.$route.params.puzzle === 'true') {
      this.$refs.swiperMain.swiper.slideTo(2, 0)
    }
  },
  methods: {
    ...mapActions('timer', ['timeSave']),
    ...mapActions('parentPage', ['userinfoUpdate']),
    async timeUpdate(t) {
      try {
        await this.$axios.post('/learning/child/time/remained', {
          remainedTime: t
        })
        // console.log('data', data)
      } catch (error) {
        console.error(error)
      }
    },
    async getUserInfo() {
      try {
        const { data } = await this.$axios.get('/learning/hangul/user')
        if (data.result.playStgupTime === 0 && !data.result.isLimitToPlay) {
          this.$router.push({
            name: `opening`
          })
          return false
        }
        console.log(data.result)
        this.userinfoUpdate(data)
        this.userName = data.result.name
        this.userFace = data.result.profile
        this.dayOfStudy = data.result.dayOfStudy
        this.randomKey = Math.floor(Math.random() * data.result.lastPuzzleIndex)
        if (this.$route.params.timeUpdate) {
          this.timeSave(data.result.playStgupTime)
          this.timeUpdate(data.result.playStgupTime)
          // this.timeSave(10)
          // this.timeUpdate(10)
          return false
        }
        if (data.result.playPosbTime <= 0) {
          this.timeSave(data.result.playStgupTime)
        } else {
          this.timeSave(data.result.playPosbTime)
        }
        // this.timeSave(200)
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    next(v) {
      this.$refs.swiperMain.swiper.slideTo(v)
      this.swiperIndex = v
      // console.log('activeIndex', this.$refs.swiperMain.swiper.activeIndex)
    },
    parentClose() {
      this.parentPopup = false
    },
    parentStart() {
      this.parentPopup = true
    },
    profileClose() {
      this.profilePopup = false
    },
    profileStart() {
      this.profilePopup = true
    },
    callback() {
      this.swiperIndex = this.$refs.swiperMain.swiper.activeIndex
      if (this.swiperIndex === 0) {
        this.$refs.wrapMain.style.backgroundColor = '#7fd9f8'
      } else if (this.swiperIndex === 1) {
        this.$refs.wrapMain.style.backgroundColor = '#d5c8ff'
      } else if (this.swiperIndex === 2) {
        this.$refs.wrapMain.style.backgroundColor = '#ffe76d'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-main {
  .header-menu {
    position: relative;
    width: 100%;
    height: 130px;
    padding: 12px 0 12px 180px;
    background: url('~@/assets/images/header/bg.png') no-repeat 0 0;
    background-size: 100% auto;
    z-index: 2;
    .logo {
      position: absolute;
      top: 18px;
      left: 54px;
      width: 70px;
      z-index: 1;
    }
    .info {
      overflow: hidden;
      width: 600px;
      li {
        position: relative;
        display: table;
        float: left;
        height: 64px;
        & + li {
          margin-left: 24px;
        }
        & > * {
          display: table-cell;
          vertical-align: middle;
        }
        &.name {
          padding: 0 50px 0 90px;
          border: 2px solid #c7ecff;
          border-radius: 32px;
          cursor: pointer;
          img,
          .face-default {
            position: absolute;
            top: 3px;
            left: 4px;
            width: 54px;
            border-radius: 100%;
          }
          .face-default {
            display: block;
            height: 54px;
            background: #e6e6e6 url('~@/assets/images/common/ico_baby.svg')
              no-repeat center center;
            background-size: 40px auto;
          }
        }
        &.char {
          .img {
            width: 64px;
            // background: url('~@/assets/images/header/char/01.svg') no-repeat center center;
            background: url('~@/assets/images/main/puzzle/puzzle_main_clear.svg')
              no-repeat 0 0;
            background-size: 340px auto;
            &.img1 {
              background-position: 0 0;
            }
            &.img2 {
              background-position: -68px 0;
            }
            &.img3 {
              background-position: -68px * 2 0;
            }
            &.img4 {
              background-position: -68px * 3 0;
            }
            &.img5 {
              background-position: -68px * 4 0;
            }
            &.img6 {
              background-position: 0 -68px;
            }
            &.img7 {
              background-position: -68px -68px;
            }
            &.img8 {
              background-position: -68px * 2 -68px;
            }
            &.img9 {
              background-position: -68px * 3 -68px;
            }
            &.img10 {
              background-position: -68px * 4 -68px;
            }
            &.img11 {
              background-position: 0 -68px * 2;
            }
            &.img12 {
              background-position: -68px -68px * 2;
            }
            &.img13 {
              background-position: -68px * 2 -68px * 2;
            }
            &.img14 {
              background-position: -68px * 3 -68px * 2;
            }
            &.img0 {
              background-position: -68px * 4 -68px * 2;
            }
          }
          .chat {
            width: 159px;
            padding-left: 10px;
            background: url('~@/assets/images/header/bg_speech.svg') no-repeat
              right center;
            text-align: center;
          }
        }
      }
    }
    .menu {
      position: absolute;
      top: 0;
      right: 29px;
      width: 436px;
      z-index: 1;
      li {
        position: relative;
        float: left;
        width: 94px;
        height: 116px;
        padding-top: 1px;
        border-radius: 0 0 52px 52px;
        font-size: 16px;
        font-weight: 200;
        text-align: center;
        color: $color9;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
        & + li {
          margin-left: 20px;
        }
        & > * {
          position: absolute;
          display: block;
          text-align: center;
        }
        &.active {
          @include boxShadow(6px, 0.6);
        }
        .name {
          top: 10px;
          left: 0;
          width: 100%;
        }
        .ico {
          top: 37px;
          left: 15px;
          width: 64px;
          height: 64px;
        }
        &.oneday {
          .ico {
            background: url('~@/assets/images/header/ico_oneday_off.svg')
              no-repeat center 1px;
          }
          &.active {
            background: #00b5f2;
            color: $colorF;
            .ico {
              background: url('~@/assets/images/header/ico_oneday_on.svg')
                no-repeat center center;
            }
          }
        }
        &.card {
          .ico {
            background: url('~@/assets/images/header/ico_card_off.svg')
              no-repeat center 1px;
          }
          &.active {
            background: #9a73ff;
            color: $colorF;
            .ico {
              background: url('~@/assets/images/header/ico_card_on.svg')
                no-repeat center center;
            }
          }
        }
        &.mypet {
          .ico {
            background: url('~@/assets/images/header/ico_puzzle_off.svg')
              no-repeat center 1px;
          }
          &.active {
            background: #ffb612;
            color: $colorF;
            .ico {
              background: url('~@/assets/images/header/ico_puzzle_on.svg')
                no-repeat center center;
            }
          }
        }
        &.parent {
          .ico {
            background: url('~@/assets/images/header/ico_parent_off.svg')
              no-repeat center 1px;
          }
          &.active {
            background: #c7ecff;
            color: #50acdb;
            .ico {
              background: url('~@/assets/images/header/ico_parent_on.svg')
                no-repeat center center;
            }
          }
        }
      }
    }
  }
  .main-swiper {
    margin-top: -42px;
  }
}
</style>
