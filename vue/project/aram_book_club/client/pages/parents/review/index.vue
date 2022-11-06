<template>
  <div
    v-if="viewMode"
    class="review-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <h2 v-if="viewMode === 'pc'">리뷰쓰기</h2>
    <p class="txt-sub" v-if="viewMode === 'pc'">솔직한 리뷰를 남겨주세요.</p>
    <div class="review-area">
      <img :src="prod.filePathNm" v-if="viewMode === 'pc'" />
      <div class="input">
        <p class="title" v-if="cate === 'smart'">
          <span class="cate smart">스마트북</span
          ><span class="name">{{ prod.prodNm }}</span>
        </p>
        <p class="title" v-else-if="cate === 'book'">
          <span class="cate book">전집</span
          ><span class="name">{{ prod.prodNm }}</span>
        </p>
        <p class="title" v-else-if="cate === 'mini'">
          <span class="cate mini">소전집</span
          ><span class="name">{{ prod.prodNm }}</span>
        </p>
        <p class="option" v-if="viewMode === 'mo'">
          <span>구매일 : {{ prod.ordDttm.substring(0, 10) }}</span
          ><span>구매 매장 : {{ prod.orgNm }}</span>
        </p>
        <p class="txt-sub" v-if="viewMode === 'mo'">
          솔직한 리뷰를 남겨주세요.
        </p>
        <textarea
          minlength="10"
          maxlength="5000"
          v-model="txtReview"
          @input="typing"
          placeholder="최소 10자 이상 입력해주세요."
        />
        <div class="number">
          {{ txtReview.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }}<span>/50,000자</span>
        </div>
        <p class="option" v-if="viewMode === 'pc'">
          <span>구매일 : {{ prod.ordDttm.substring(0, 10) }}</span
          ><span>구매 매장 : {{ prod.orgNm }}</span>
        </p>
      </div>
    </div>
    <div class="btn-wrap">
      <button class="btn-cancel" @click="reviewCancel">취소</button>
      <button
        v-if="txtReview.length > 10"
        class="btn-register"
        @click="reviewRegist"
      >
        등록
      </button>
      <button v-else class="btn-register" disabled="disabled">등록</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      txtReview: '',
      id: this.$route.params.id,
      prod: this.$route.params.prod,
      cate: this.$route.params.cate
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    if (this.prod === undefined || this.prod === null) {
      this.$router.push('/buy/smart')
    }
  },
  methods: {
    // 통신
    async reviewRegist() {
      try {
        const { data } = await this.$axios.post(
          `/purchase/${this.prod.ordNo}/${this.prod.prodId}/review`,
          {
            prodId: this.prod.prodId,
            ordNo: this.prod.ordNo,
            reviewCtt: this.txtReview
          }
        )
        alert('리뷰 등록이 완료되었습니다.')
        this.$router.push('/buy/smart')
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 기능
    reviewCancel() {
      this.$router.go(-1)
    },
    typing(e) {
      this.txtReview = e.target.value
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
.review-wrap {
  &.pc {
    padding-bottom: 380px;
    text-align: center;
    & > * {
      margin: 0 auto;
      width: 1080px;
    }
    h2 {
      margin-top: 70px;
      font-size: 44px;
      font-weight: 600;
    }
    .txt-sub {
      font-size: 18px;
      margin-top: 10px;
    }
    .review-area {
      overflow: hidden;
      margin-top: 70px;
      img {
        float: left;
        width: 267px;
      }
      .input {
        position: relative;
        float: right;
        width: 773px;
        .title {
          display: table;
          width: 100%;
          height: 40px;
          margin-bottom: 20px;
          span {
            display: table-cell;
            vertical-align: middle;
            &.cate {
              width: 132px;
              padding: 0 21px;
              font-size: 22px;
              text-align: center;
              color: #fff;
              &.smart {
                background: #28b6ff;
              }
              &.book {
                background: #fdc140;
              }
              &.mini {
                background: #7754c0;
              }
            }
            &.name {
              padding-left: 20px;
              text-align: left;
              color: $fontColor3;
            }
          }
        }
        textarea {
          overflow-y: auto;
          overflow-x: hidden;
          width: 100%;
          height: 136px;
          padding: 13px 20px;
          border: 1px solid #cfcfcf;
          line-height: 24px;
        }
        .number {
          position: absolute;
          top: 14px;
          right: 10px;
          font-size: 14px;
          color: $fontColor3;
          span {
            color: $fontColor9;
          }
        }
        .option {
          margin-top: 6px;
          font-size: 14px;
          text-align: right;
          color: $fontColor6;
          span {
            display: inline-block;
            & + span {
              padding-left: 10px;
              margin-left: 10px;
              border-left: 1px solid $fontColor6;
            }
          }
        }
      }
    }
    .btn-wrap {
      margin-top: 14px;
      text-align: center;
      button {
        display: inline-block;
        width: 170px;
        height: 50px;
        margin: 0 3px;
        border-radius: 25px;
        font-size: 20px;
        &:first-child {
          border: solid 1px #cfcfcf;
          color: $fontColor6;
        }
        &:last-child {
          background: #313232;
          color: #fff;
        }
        &:disabled {
          background: #dfdfdf;
          cursor: default;
        }
      }
    }
  }
  &.mo {
    .title {
      width: 32rem;
      padding: 3.2rem 0 0.6rem;
      text-align: center;
      span {
        &.cate {
          display: inline-block;
          width: 7.2rem;
          height: 2.3rem;
          font-size: 1.3rem;
          line-height: 2.3rem;
          color: #fff;
          &.smart {
            background: #28b6ff;
          }
          &.book {
            background: #fdc140;
          }
          &.mini {
            background: #7754c0;
          }
        }
        &.name {
          display: block;
          margin-top: 0.8rem;
          font-size: 1.5rem;
          font-weight: 400;
          color: $fontColor3;
        }
      }
    }
    .option {
      padding-bottom: 4rem;
      text-align: center;
      font-size: 1rem;
      color: $fontColor6;
      span {
        display: inline-block;
        padding: 0 0.4rem;
      }
    }
    .txt-sub {
      margin-bottom: 1rem;
      font-size: 1.3rem;
      text-align: center;
      color: $fontColor3;
    }
    textarea {
      width: 29rem;
      height: 17.8rem;
      padding: 1rem 1.5rem;
      margin: 0 1.5rem;
      font-size: 1.1rem;
    }
    .number {
      width: 29rem;
      margin: 0 1.5rem;
      font-size: 1rem;
      text-align: right;
      color: $fontColor3;
      span {
        color: $fontColor9;
      }
    }
    .btn-wrap {
      text-align: center;
      margin: 1.5rem 0 6rem;
      button {
        width: 12.5rem;
        height: 3.5rem;
        margin: 0 0.3rem;
        border-radius: 1.7rem;
        font-size: 1.1rem;
        &.btn-cancel {
          border: 1px solid #cfcfcf;
          color: $fontColor6;
        }
        &.btn-register {
          background: $fontColor3;
          color: #fff;
        }
      }
    }
  }
}
</style>
