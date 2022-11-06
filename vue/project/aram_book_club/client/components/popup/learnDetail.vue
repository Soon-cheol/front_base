<template>
  <div class="popup">
    <div class="popup-center">
      <div class="popup-contants">
        <h1>학습현황</h1>
        <ol class="tab">
          <li>
            <button :class="{ active: active === 1 }" @click="tabMove(1)">
              Level 1
            </button>
          </li>
          <li>
            <button :class="{ active: active === 2 }" @click="tabMove(2)">
              Level 2
            </button>
          </li>
          <li>
            <button :class="{ active: active === 3 }" @click="tabMove(3)">
              Level 3
            </button>
          </li>
        </ol>
        <ol class="view" v-if="learnDetail.length > 0">
          <li v-show="active === 1">
            <detailAchieve
              mainColor="#ff454d"
              childColor="#ff454d"
              :mainNumber="learnDetail[0].progressRate"
              :childNumber="learnDetail[0].childAchvmnts"
              :avgNumber="learnDetail[0].avgAchvmnts"
            />
          </li>
          <li v-show="active === 2">
            <detailAchieve
              mainColor="#ffde44"
              childColor="#ffde44"
              :mainNumber="learnDetail[1].progressRate"
              :childNumber="learnDetail[1].childAchvmnts"
              :avgNumber="learnDetail[1].avgAchvmnts"
            />
          </li>
          <li v-show="active === 3">
            <detailAchieve
              mainColor="#94bd41"
              childColor="#94bd41"
              :mainNumber="learnDetail[2].progressRate"
              :childNumber="learnDetail[2].childAchvmnts"
              :avgNumber="learnDetail[2].avgAchvmnts"
            />
          </li>
        </ol>
        <div class="btn-wrap">
          <button class="btn btn-complate" @click="popupClose">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailAchieve from '~/components/vendors/detailAchieve'
export default {
  data() {
    return {
      active: 1,
      learnDetail: []
    }
  },
  props: {
    selNumber: {
      type: Number,
      default: null
    }
  },
  components: {
    detailAchieve
  },
  created() {
    this.learnDetailGet()
  },
  methods: {
    // 통신
    async learnDetailGet() {
      try {
        const { data } = await this.$axios.get(
          '/learning/management/product/report',
          {
            params: {
              lrngMemSeqno: this.selNumber
            }
          }
        )
        this.learnDetail = data.result
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    tabMove(num) {
      this.active = num
    },
    handleAddress(data) {
      this.$emit('closeCall', data)
    },
    popupClose(data) {
      this.$emit('closeCall', data)
    }
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
.popup {
  position: fixed;
  display: table;
  // top: 3rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1001;
  .popup-center {
    display: table-cell;
    height: 100%;
    vertical-align: middle;
    .popup-contants {
      position: relative;
      overflow: auto;
      width: 80%;
      height: auto;
      max-height: 80%;
      margin: 0 auto;
      padding: 1.5rem 1rem 2rem;
      background: #fff;
      border-radius: 4px;
      h1 {
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #cfcfcf;
        font-size: 1rem;
        font-weight: 400;
      }
      .btn-wrap {
        padding-top: 1rem;
        text-align: center;
        & > * {
          width: 24rem;
          height: 3rem;
          margin: 0 auto;
          border-radius: 0.4rem;
          line-height: 3rem;
          font-size: 1rem;
          color: #fff;
          &.btn-cancel {
            margin-top: 0.6rem;
            border: 1px solid $fontColor6;
            background: $fontColor6;
          }
          &.btn-complate {
            border: 1px solid #269bd7;
            background: #269bd7;
          }
        }
      }
    }
  }
}
.tab {
  display: table;
  width: 24rem;
  margin: 2.2rem auto 2rem;
  background: url('~static/images/mobile/contents/mall/bg_tab01.png') no-repeat
    center top;
  background-size: 100% auto;
  & > * {
    display: table-cell;
    width: 33.3%;
    vertical-align: middle;
    text-align: center;
    button {
      width: 100%;
      height: 2.9rem;
      font-size: 1.2rem;
      color: #fff;
      &.active {
        background: #28b6ff;
        border-radius: 2rem;
        -webkit-box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
        -moz-box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
        box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
      }
    }
  }
}
.view {
  overflow-x: hidden;
}
#wrap.pc {
  .popup-contants {
    max-width: 800px;
    view {
      li {
        width: 100%;
        overflow-x: hidden;
      }
    }
  }
}
#wrap.mo {
  .popup-contants {
    width: 30rem;
    .view {
      li {
        width: 100%;
        overflow-x: scroll;
      }
    }
  }
}
</style>
