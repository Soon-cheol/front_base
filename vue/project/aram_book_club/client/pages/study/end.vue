<template>
  <div
    v-if="viewMode"
    class="study-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div class="txt-no-data" v-if="list.length < 1">
      종료 내역이 존재하지 않습니다.
    </div>
    <ul class="list" v-else>
      <li v-for="(l, index) in list" :key="index" class="box-shadow160">
        <div class="thume">
          <img :src="l.prodThumbnail" />
        </div>
        <h4>{{ l.prodNm }}</h4>

        <div class="info" v-if="l.mappingChildYn === 'Y'">
          <span class="tit">자녀이름</span
          ><span class="name">{{ l.chldMemNm }}</span>
        </div>
        <div class="info">
          <span class="tit">학습기간</span>
          <span class="term">{{ l.fstLrngStarDt }} ~ {{ l.lstLrngEndDt }}</span>
        </div>
        <div class="option link">
          <button class="btn-default" @click="learnDetailOpen(l.lrngMemSeqno)">
            학습현황
          </button>
        </div>
      </li>
    </ul>
    <!-- 팝업 컴포넌트 -->
    <selChild v-if="selChild" :selProd="selProd" @closeCall="selChildClose" />
    <learnDetail
      v-if="learnDetail"
      :selNumber="selNumber"
      @closeCall="learnDetailClose"
    />
    <!-- // 팝업 컴포넌트 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
import selChild from '~/components/popup/selChild'
import learnDetail from '~/components/popup/learnDetail'
export default {
  data() {
    return {
      list: [],
      selProd: {},
      selNumber: '',
      selChild: false,
      learnDetail: false
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    this.getProdList()
  },
  components: {
    loginConfirm,
    selChild,
    learnDetail
  },
  methods: {
    // 통신
    async getProdList() {
      try {
        const { data } = await this.$axios.get(
          '/learning/management/expired-product'
        )
        this.list = data.result
      } catch (error) {
        console.error(error)
      }
    },
    async openLink(a, prod) {
      try {
        const { data } = await this.$axios.get('/auth/child/token', {
          params: {
            lrngMemSeqno: prod.lrngMemSeqno,
            pckgProdId: prod.pckgProdId,
            prodId: prod.prodId
          }
        })
        console.log('data', data)
      } catch (error) {
        console.error(error)
      }
      // window.open(a, 'contents')
      // localStorage.setItem('token', userToken)
    },
    // 기능
    selChildOpen(prod) {
      this.selProd = prod
      this.selChild = true
    },
    selChildClose() {
      this.selChild = false
      this.getProdList()
    },
    learnDetailOpen(num) {
      this.selNumber = num
      this.learnDetail = true
    },
    learnDetailClose() {
      this.learnDetail = false
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
.txt-no-data {
  margin: 0 1.5rem 2rem;
  font-size: 1.6rem;
  width: 1080px;
  height: 200px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
// pc
.study-wrap.pc {
  width: 1080px;
  margin: 0 auto 120px;
  h3 {
    position: relative;
    padding-left: 0.9rem;
    margin-bottom: 30px;
    font-size: 1.5rem;
    font-weight: 400;
    color: $fontColor3;
    &::before {
      position: absolute;
      content: '';
      display: inline-block;
      top: 0.3rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: #a3c15d;
      border-radius: 100%;
    }
    span {
      display: inline-block;
      padding-left: 0.2rem;
      font-size: 1.1rem;
      color: $fontColor6;
    }
  }
  .list {
    margin-top: 60px;
    li {
      position: relative;
      overflow: hidden;
      padding: 20px;
      margin-bottom: 40px;
      text-align: center;
      & > * {
        float: right;
        width: calc(100% - 405px);
        text-align: right;
      }
      .thume {
        float: left;
        width: 360px;
        border-radius: 0.6rem;
        img {
          width: 100%;
        }
      }
      h4 {
        margin-bottom: 18px;
        font-size: 26px;
        font-weight: 600;
        text-align: left;
      }
      .info {
        margin-top: 3px;
        font-size: 18px;
        text-align: left;
        .tit {
          display: inline-block;
          min-width: 84px;
          padding-right: 17px;
          margin-right: 23px;
          border-right: 1px solid #d6d6d6;
        }
        .name {
          color: $fontColor3;
        }
        .term {
          margin-top: 0.5rem;
          color: $fontColor6;
        }
        .use {
          display: block;
          margin-top: 4px;
          padding-left: 110px;
        }
      }
      .option {
        position: absolute;
        bottom: 20px;
        right: 20px;
        [class*='btn'] {
          display: inline-block;
          width: 168px;
          height: 50px;
          margin-left: 9px;
          border-radius: 30px;
          font-size: 20px;
          font-weight: 400;
          text-align: center;
          line-height: 50px;
          color: $fontColor3;
        }
        .btn-default {
          border: 1px solid #cfcfcf;
        }
        .btn-sel {
          background: #28b6fe;
          color: #fff;
        }
        .btn-study {
          background: #93c340;
          color: #fff;
        }
      }
    }
  }
}
// mo
.study-wrap.mo {
  padding: 2rem;
  h3 {
    position: relative;
    padding-left: 0.9rem;
    margin-bottom: 2.1rem;
    font-size: 1.5rem;
    font-weight: 400;
    color: $fontColor3;
    &::before {
      position: absolute;
      content: '';
      display: inline-block;
      top: 0.3rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: #a3c15d;
      border-radius: 100%;
    }
    span {
      display: inline-block;
      padding-left: 0.2rem;
      font-size: 1.1rem;
      color: $fontColor6;
    }
  }
  .list {
    li {
      overflow: hidden;
      position: relative;
      padding: 1rem;
      margin-bottom: 3rem;
      text-align: center;
      h4 {
        margin: 1.8rem 0 1.6rem;
        font-size: 1.8rem;
        font-weight: 600;
      }
      .thume {
        overflow: hidden;
        border-radius: 0.6rem;
        img {
          width: 100%;
        }
      }
      .info {
        font-size: 1.6rem;
        text-align: center;
        & > span {
          display: block;
          &.tit {
            width: 8.5rem;
            height: 3rem;
            margin: 0 auto;
            background: #93c340;
            border-radius: 3rem;
            font-size: 1.4rem;
            line-height: 2.8rem;
            color: #fff;
          }
          &.day,
          &.name {
            padding: 1.2rem 0 1.6rem;
            font-size: 1.8rem;
          }
          &.term {
            padding: 1.2rem 0 0.4rem;
            font-size: 1.8rem;
          }
          &.use {
            display: block;
            font-size: 1.4rem;
          }
        }
      }
      .option {
        width: 100%;
        text-align: center;
        &.select {
          .btn-detail {
            margin-top: 2rem;
          }
        }
        &.link {
          margin-top: 2rem;
        }
        [class*='btn'] {
          display: block;
          width: 100%;
          height: 3.9rem;
          border-radius: 0.6rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 3.9rem;
        }
        .btn-default {
          border: 1px solid #cfcfcf;
          color: $fontColor3;
        }
        .btn-sel {
          background: #28b6fe;
          color: #fff;
        }
        .btn-study {
          background: #93c340;
          color: #fff;
        }
      }
    }
  }
}
</style>
