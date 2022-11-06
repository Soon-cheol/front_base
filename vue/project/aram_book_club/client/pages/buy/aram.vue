<template>
  <div
    v-if="list !== false"
    class="buy-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div class="txt-no-data" v-if="list.length === 0">
      <p class="tit-no-list">구매 내역이 존재하지 않습니다.</p>
      <p class="txt-no-list">
        매장에서 구매한 정보가 나오지 않는다면<br /><a href="tel:1577-4521"
          >고객센터(1577-4521)</a
        >로 문의해 주세요.
      </p>
      <p class="txt-prev-date">
        2020년 10월 21일 이후<br />구매 내역부터 조회 가능합니다.
      </p>
    </div>
    <div v-else>
      <p class="list-prev-date">
        2020년 10월 21일 이후 구매 내역부터 조회 가능합니다.
      </p>
      <ul class="list">
        <li v-for="(l, index) in list" :key="index" class="box-shadow160">
          <div class="thume">
            <img :src="l.filePathNm" />
          </div>
          <h4>{{ l.prodNm }}</h4>
          <div class="info">
            <span class="tit">구매일</span
            ><span class="name">{{ l.ordDttm.substring(0, 10) }}</span>
          </div>
          <div class="info">
            <span class="tit">구매매장</span
            ><span class="name">{{ l.orgNm }}</span>
          </div>
          <div class="info">
            <span v-if="l.mappingChildYn === 'Y'" class="use"
              >({{ l.remainedLrngPridDay }}일 남음)</span
            >
          </div>
          <p class="txt-store">
            매장에서 구매한 제품에 대한 궁금한 사항은 해당 매장에 문의해 주세요.
          </p>
          <!-- 버튼 -->
          <div class="option">
            <a
              v-if="l.shipInfoUrl"
              :href="l.shipInfoUrl"
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
              v-if="l.reviewStatus === 'Y'"
              @click="reviewMod(l)"
              class="btn-modify"
            >
              리뷰 수정
            </button>
            <button
              v-else-if="l.reviewStatus === 'N'"
              @click="review(l)"
              class="btn-write"
            >
              리뷰 쓰기
            </button>
            <button
              v-else-if="l.reviewStatus === 'D'"
              class="btn-delete"
              disabled="disabled"
            >
              삭제된 리뷰
            </button>
          </div>
          <!-- // 버튼 -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  components: {
    loginConfirm
  },
  data() {
    return {
      list: false
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    this.getList()
  },
  methods: {
    // 통신
    async getList() {
      try {
        const { data } = await this.$axios.get(
          '/purchase/selpurchasesmartmalloffprodlist'
        )
        this.list = data.result
      } catch (error) {
        console.error(error)
        this.list = []
      }
    },
    // 기능
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
.buy-wrap.pc {
  width: 1080px;
  margin: 0 auto 120px;
  .txt-prev-date {
    border-top: 1px solid #dfdfdf;
    margin-top: 40px;
    padding-top: 40px;
    font-size: 26px;
    line-height: 40px;
    color: #ff794a;
  }
  .list-prev-date {
    margin: 40px 0 20px;
    font-size: 18px;
    text-align: right;
    line-height: 40px;
    color: #ff794a;
  }
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
          padding-left: 107px;
        }
      }
      .txt-store {
        height: 40px;
        border-top: 1px solid #dfdfdf;
        margin-top: 20px;
        padding: 10px 0 0 34px;
        background: url('~static/images/mobile/contents/buy/ico_exclam.svg')
          no-repeat 4px 10px;
        background-size: 20px;
        font-size: 18px;
        text-align: left;
        color: $fontColor9;
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
          color: #fff;
        }
        .btn-delivery {
          border: 1px solid #cfcfcf;
          color: $fontColor3;
        }
        .btn-write {
          background: #fdc140;
        }
        .btn-modify {
          background: #93c340;
        }
        .btn-delete {
          background: #9c9c9c;
          cursor: default;
        }
      }
    }
  }
  .tit-no-list {
    margin: 80px 0 20px;
    font-size: 30px;
  }
  .txt-no-list {
    font-size: 20px;
    line-height: 32px;
    a {
      color: $blueColor;
    }
  }
}
// mo
.buy-wrap.mo {
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
      .txt-store {
        border-top: 1px solid #dfdfdf;
        padding: 2rem 0 2rem 2.2rem;
        background: url('~static/images/mobile/contents/buy/ico_exclam.svg')
          no-repeat 0.2rem 2rem;
        background-size: 1.4rem;
        font-size: 1.2rem;
        text-align: left;
        line-height: 1.6rem;
        color: $fontColor9;
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
          color: #fff;
        }
        .btn-delivery {
          border: 1px solid #cfcfcf;
          color: $fontColor3;
        }
        .btn-write {
          background: #fdc140;
        }
        .btn-modify {
          background: #93c340;
        }
        .btn-delete {
          background: #9c9c9c;
          cursor: default;
        }
      }
    }
  }
  .tit-no-list {
    margin: 0 0 1rem;
    font-size: 1.5rem;
  }
  .txt-no-list {
    font-size: 1rem;
    line-height: 1.6rem;
    a {
      color: $blueColor;
    }
  }
  .txt-prev-date {
    border-top: 1px solid #dfdfdf;
    margin-top: 2rem;
    padding-top: 2rem;
    font-size: 1.3rem;
    line-height: 2rem;
    color: #ff794a;
  }
  .list-prev-date {
    margin: 0 0 2rem;
    font-size: 1.1rem;
    text-align: center;
    line-height: 2rem;
    color: #ff794a;
  }
}
</style>
