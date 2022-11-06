<template>
  <div class="profile-popup">
    <button class="btn-close" @click="popupClose()" />
    <div class="popup-cell">
      <div class="popup-wrap">
        <h2>프로필</h2>
        <div class="info">
          <ul>
            <li><span class="tit">이름</span>{{ name }}</li>
            <li><span class="tit">하루 한글</span>{{ dayOfStudy }}일차</li>
          </ul>
          <div v-if="face !== ''" class="thume">
            <img src="" alt="" />
          </div>
          <div v-else class="thume default" />
        </div>
        <div class="timer">
          <span class="tit">남은시간</span>
          <span class="time">{{ clock }}:{{ minute }}:{{ second }}</span>
          <!-- <span class="time">00:35:23</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    name: {
      type: String,
      default: '하루한글'
    },
    face: {
      type: String,
      default: null
    },
    dayOfStudy: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      clock: '00',
      minute: '00',
      second: '00',
      playPsTime: 0
    }
  },
  computed: {
    ...mapState({
      //
    })
  },
  created() {
    this.timeUpdate()
  },
  methods: {
    popupClose() {
      this.$emit('popupClose')
    },
    async timeUpdate() {
      try {
        await this.$axios.get('/learning/child/time/remained', {
          remainedTime: this.playPsTime
        })
        console.log('playPsTime', this.playPsTime)
        console.log('data', this.playPsTime)
      } catch (error) {
        console.error(error)
      }
    },
    timeStart() {
      clearInterval(this.setTime)
      this.playPsTime = this.saveTime
      // console.log('가져온 시간', this.playPsTime)

      if (this.playPsTime > 0) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        this.setTime = setInterval(function() {
          _this.timeout()
        }, 1000)
      } else {
        console.log('이용시간 부족')
        console.log('playPsTime', this.playPsTime)
        this.playPsTime = 'limit'
      }
    },
    timeout() {
      if (this.playPsTime > 0) {
        this.playPsTime -= 1

        if (Number.isInteger(this.playPsTime / 10)) {
          this.timeUpdate()
        }

        if (this.playPsTime <= 0) {
          console.log('클리어 인터벌')
          clearInterval(this.setTime)
          this.playPsTime = 'limit'
          this.timeSave('limit')
          if (this.$route.name !== 'main') {
            this.$router.push({
              name: `main`
            })
          }
        } else {
          this.timeSave(this.playPsTime)
        }
      }
      // console.log('this.playPsTime', this.playPsTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-popup {
  position: absolute;
  top: -0.1%;
  left: -0.1%;
  // top: 0;
  // left: 0;
  display: table;
  width: 100.2%;
  height: 100.2%;
  // width: 1280px;
  // height: 720px;
  background: rgba(0, 0, 0, 0.8);
  font-family: 'tmoney-bold';
  z-index: 100;
  .btn-close {
    position: fixed;
    top: 40px;
    right: 40px;
    width: 68px;
    height: 68px;
    background: url('~@/assets/images/main/card/btn_close.png');
    z-index: 101;
  }
  .popup-cell {
    overflow: hidden;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    .popup-wrap {
      overflow: hidden;
      width: 758px;
      height: 568px;
      background: url('~@/assets/images/common/bg_profile.svg');
      margin: 0 auto;
      padding: 0 40px;
      border-radius: 30px;
      h2 {
        margin: 46px 20px 0 0;
        text-align: right;
        color: #00b4f2;
      }
      .info,
      .timer {
        background: $colorF;
        border-radius: 24px;
      }
      .info {
        overflow: hidden;
        padding: 25px 30px;
        margin: 30px 0;
        font-size: 32px;
        text-align: left;
        color: $color3;
        ul {
          float: left;
          margin: 11px 0;
          li {
            & + li {
              margin-top: 21px;
            }
            .tit {
              display: inline-block;
              width: 163px;
              font-family: 'tmoney-regular';
              color: $color9;
            }
          }
        }
        .thume {
          float: right;
          width: 190px;
          height: 190px;
          border-radius: 18px;
          &.default {
            background: #e6e6e6 url('~@/assets/images/common/ico_baby.svg')
              no-repeat center center;
          }
        }
      }
      .timer {
        overflow: hidden;
        height: 120px;
        padding: 0 30px;
        .tit {
          float: left;
          font-family: 'tmoney-regular';
          font-size: 32px;
          line-height: 120px;
          color: $color9;
        }
        .time {
          float: right;
          padding-left: 66px;
          background: url('~@/assets/images/common/ico_clock.svg') no-repeat
            left center;
          font-size: 50px;
          line-height: 120px;
          color: #ff4747;
        }
      }
    }
  }
}
</style>
