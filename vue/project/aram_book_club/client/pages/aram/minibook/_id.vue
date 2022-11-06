<template>
  <div
    v-if="prodInfo.prodNm"
    class="prod-detail"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <div class="prod-info">
      <div class="thume">
        <img :src="prodInfo.thnlUrl" />
      </div>
      <div class="info">
        <p class="prod-name">{{ prodInfo.prodNm }}</p>
        <!-- <ul>
          <li>
            <span class="tit-info">대상 연령</span>
            <p class="txt-info">{{ prodInfo.trgtAgerNm }}</p>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="option" v-if="optionTab">
      <ul class="tab">
        <!-- <li class="active" @click="tabMove(0)">제품 구성</li> -->
        <li
          v-for="(p, index) in prodInfo.prodDstnList"
          :key="index"
          :class="{ active: index === 0 }"
          @click="tabMove(index)"
        >
          {{ p.prodDtlTite }}
        </li>
      </ul>
      <div class="thume">
        <client-only>
          <TuiEditorViewer
            v-if="prodInfo.prodDstnList"
            ref="editorView"
            :value="detailThume"
          />
        </client-only>
      </div>
    </div>
    <div class="review" v-if="reviewView">
      <h2>사용자 리뷰</h2>
      <p class="txt-write">
        구매 후 리뷰 작성 시, 구매내역에서 쓰실 수 있습니다.
      </p>
      <ul v-if="review.length > 0">
        <li v-for="(r, index) in review" :key="index">
          <div class="info">
            {{ r.loginId }}<span>|</span>{{ r.reviewDate }}
          </div>
          <p class="txt">{{ r.reviewCtt }}</p>
        </li>
      </ul>
      <p v-else class="no-list">등록된 리뷰가 없습니다.</p>
    </div>
    <div class="paging" v-if="viewMode === 'pc' && reviewView">
      <span class="btn-first" @click="pageMove(1)" />
      <span class="btn-prev" @click="pageMove(page.nowPage - 1)" />
      <span
        v-for="(n, index) in page.totalPage"
        :key="index"
        @click="pageMove(n)"
        class="num"
        :class="{ active: index === pageNum - 1 }"
        >{{ n }}</span
      >
      <span class="btn-next" @click="pageMove(page.nowPage + 1)" />
      <span class="btn-last" @click="pageMove(page.totalPage)" />
    </div>
    <div class="paging" v-else-if="viewMode === 'mo' && reviewView">
      <button class="btn-prev" @click="pageMoMove(page.nowPage - 1)" />
      <div class="num">
        <span class="now">{{ page.nowPage }}</span
        >/<span class="total">{{ page.totalPage }}</span>
      </div>
      <button class="btn-next" @click="pageMoMove(page.nowPage + 1)" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      page: {},
      pageNum: 1,
      review: [],
      reviewView: false,
      pordId: '',
      detailThume: '',
      optionTab: true,
      prodInfo: {}
    }
  },
  created() {
    // console.log('this.$route.params.id', this.$route.params.id)
    this.getProdDetail()
    this.getProdReview()
  },
  // mounted() {
  //   const urlArr = window.location.href.split('/')
  //   this.pordId = urlArr[urlArr.length - 1]
  //   this.getProdDetail()
  // },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    // 통신
    async getProdDetail() {
      try {
        const { data } = await this.$axios.get(
          `/prod/mini/${this.$route.params.id}`,
          {
            params: {
              prodId: this.$route.params.id
            }
          }
        )
        if (data.result) {
          this.prodInfo = data.result
          // this.prodInfo.prodAplyPric = this.prodInfo.prodAplyPric
          //   .toString()
          //   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          // console.log('데이터 가져옴1')
          if (this.prodInfo.prodDstnList.length === 0) {
            this.optionTab = false
          } else if (this.prodInfo.prodDstnList.length > 0) {
            this.detailThume = this.prodInfo.prodDstnList[0].prodDtlCtt
          }
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async getProdReview() {
      try {
        const { data } = await this.$axios.get(
          `/prod/${this.$route.params.id}/review`,
          {
            params: {
              nowPage: this.pageNum
            }
          }
        )
        this.page = data.page
        this.review = data.result
        for (let i = 0; i < this.review.length; i++) {
          this.review[i].open = false
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 페이지 이동
    async pageMove(n) {
      if (n < 1) {
        alert('현재 첫 페이지 입니다.')
        return false
      } else if (n > this.page.totalPage) {
        alert('현재 마지막 페이지 입니다.')
        return false
      }
      const sel = document.querySelectorAll('.paging .num')
      for (let i = 0; i < sel.length; i++) {
        sel[i].classList.remove('active')
      }
      sel[n - 1].classList.add('active')
      try {
        const { data } = await this.$axios.get(
          `/prod/${this.$route.params.id}/review`,
          {
            params: {
              nowPage: n
            }
          }
        )
        if (data.result) {
          this.page = data.page
          this.review = data.result
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async pageMoMove(n) {
      if (n < 1) {
        alert('현재 첫 페이지 입니다.')
        return false
      } else if (n > this.page.totalPage) {
        alert('현재 마지막 페이지 입니다.')
        return false
      }
      try {
        const { data } = await this.$axios.get(
          `/prod/${this.$route.params.id}/review`,
          {
            params: {
              nowPage: n
            }
          }
        )
        if (data.result) {
          this.page = data.page
          this.review = data.result
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 기능
    tabMove(n) {
      const sel = document.querySelectorAll('.option .tab li')
      for (const a of sel) {
        a.classList.remove('active')
      }
      sel[n].classList.add('active')
      this.detailThume = this.prodInfo.prodDstnList[n].prodDtlCtt
    }
  }
}
</script>

<style lang="scss" scoped>
$fontColor3: #191919;
$fontColor6: #767676;
$fontColor9: #999;
$redColor: #ff4548;
// pc
.prod-detail.pc {
  overflow: hidden;
  width: 1080px;
  margin: 60px auto 100px;
  .prod-info {
    display: table;
    width: 100%;
    padding-bottom: 30px;
    & > * {
      display: table-cell;
      vertical-align: top;
    }
    .thume {
      width: 384px;
      img {
        width: 100%;
      }
    }
    .info {
      padding-left: 126px;
      line-height: 30px;
      .prod-name {
        margin-bottom: 30px;
        font-size: 30px;
        font-weight: 600;
        color: $fontColor3;
      }
      ul {
        overflow: hidden;
        & > li {
          width: 273px;
          margin-top: 22px;
          &:nth-child(odd) {
            float: left;
          }
          &:nth-child(even) {
            float: right;
          }
          .tit-info {
            font-size: 14px;
            color: $fontColor9;
          }
          .txt-info {
            font-size: 18px;
            color: $fontColor3;
          }
        }
      }
    }
  }
  .option {
    .tab {
      display: table;
      width: 100%;
      padding-top: 80px;
      margin-top: 22px;
      border-top: 2px solid #cfcfcf;
      border-bottom: 2px solid $fontColor3;
      li {
        display: table-cell;
        width: 33.3%;
        height: 60px;
        vertical-align: middle;
        font-size: 20px;
        text-align: center;
        color: $fontColor6;
        cursor: pointer;
        &.active {
          background: $fontColor3;
          color: #fff;
        }
      }
    }
    .thume {
      text-align: center;
    }
  }
  .review {
    position: relative;
    margin-top: 36px;
    h2 {
      padding: 0 0 20px 20px;
      border-bottom: 2px solid #333;
      font-size: 26px;
    }
    .txt-write {
      position: absolute;
      top: 20px;
      right: 19px;
      font-size: 14px;
      color: $redColor;
    }
    .no-list {
      padding: 100px 0;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20px;
      text-align: center;
    }
    ul {
      li {
        overflow: hidden;
        padding: 20px;
        border-bottom: 1px solid #cfcfcf;
        font-size: 14px;
        .info {
          margin-bottom: 16px;
          font-size: 12px;
          text-align: right;
          color: #999;
          span {
            display: inline-block;
            padding: 0 10px;
          }
        }
        .txt {
          // display: -webkit-box;
          // -webkit-line-clamp: 2; /* 라인수 */
          // -webkit-box-orient: vertical;
          // white-space: normal;
          // line-height: 18px;
          // height: 36px;
          margin-bottom: 11px;
          white-space: pre-line;
          // overflow: hidden;
          // text-overflow: ellipsis;
          color: $fontColor6;
        }
        button {
          float: right;
          position: relative;
          padding: 0 24px 0 0;
          &:after {
            position: absolute;
            top: 0;
            right: 0;
            display: inline-block;
            content: '';
            width: 24px;
            height: 18px;
            background: url('~static/svg2/icon_review_arr.svg') no-repeat right
              center;
          }
          &.btn-close {
            &:after {
              top: 2px;
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
  .paging {
    margin: 42px 0 120px;
    text-align: center;
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      font-size: 16px;
      vertical-align: top;
      line-height: 38px;
      cursor: pointer;
      &.btn-first {
        background: url('/images/common/arrow_page02.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.btn-prev {
        background: url('/images/common/arrow_page01.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.btn-next {
        background: url('/images/common/arrow_page01.svg') no-repeat 0 0;
      }
      &.btn-last {
        background: url('/images/common/arrow_page02.svg') no-repeat 0 0;
      }
      &.num {
        margin: 0 2px;
        border: 1px solid #dfdfdf;
        color: #dfdfdf;
        &.active {
          border: 1px solid #333;
          color: $fontColor3;
        }
      }
    }
  }
}
// mo
.prod-detail.mo {
  .prod-info {
    overflow: hidden;
    .thume {
      margin: 3.5rem 0 2.5rem;
      text-align: center;
      img {
        width: 22rem;
      }
    }
    .info {
      padding: 0 1.5rem;
      .prod-name {
        font-size: 1.8rem;
        font-weight: 600;
        color: $fontColor3;
      }
      ul {
        padding: 0.5rem 0 2.7rem;
        & > li {
          display: table;
          width: 100%;
          padding-top: 1.5rem;
          & > * {
            display: table-cell;
            vertical-align: bottom;
          }
          .tit-info {
            width: 6.7rem;
            font-size: 1.1rem;
            color: $fontColor9;
          }
          .txt-info {
            font-size: 1.3rem;
            color: $fontColor3;
          }
        }
      }
    }
  }
  .option {
    padding: 3.5rem 1.5rem;
    border-top: 0.5rem solid #f6f6f6;
    .tab {
      display: table;
      width: 100%;
      border-bottom: 2px solid $fontColor3;
      li {
        display: table-cell;
        width: 33.3%;
        height: 4rem;
        text-align: center;
        vertical-align: middle;
        color: $fontColor6;
        &.active {
          background: $fontColor3;
          color: #fff;
        }
      }
    }
  }
  .review {
    margin-top: 3.5rem;
    h2 {
      padding: 0 1.5rem;
      font-size: 2rem;
      font-weight: 400;
    }
    .txt-write {
      padding: 0.9rem 1.5rem 1rem;
      border-bottom: 2px solid #333;
      font-size: 1.1rem;
      color: $redColor;
    }
    .no-list {
      padding: 5rem 0;
      border-bottom: 1px solid #dfdfdf;
      font-size: 1.4rem;
      text-align: center;
    }
    ul {
      li {
        padding: 1.5rem;
        border-bottom: 1px solid #cfcfcf;
        .info {
          margin-bottom: 13px;
          font-size: 1rem;
          color: #999;
          span {
            display: inline-block;
            padding: 0 0.5rem;
          }
        }
        .txt {
          font-size: 1.1rem;
        }
      }
    }
  }
  .paging {
    display: table;
    width: 32rem;
    height: 3rem;
    border-bottom: 1px solid #cfcfcf;
    margin-bottom: 0.5rem;
    & > * {
      display: table-cell;
      height: 100%;
      vertical-align: middle;
    }
    button {
      width: 4.3rem;
      padding: 0;
      background: url('/images/common/arrow_page03.svg') no-repeat center center;
      background-size: 2.5rem;
      &.btn-prev {
        transform: rotate(180deg);
        border-left: 1px solid #cfcfcf;
      }
      &.btn-next {
        border-left: 1px solid #cfcfcf;
      }
    }
    .num {
      width: 23.4rem;
      text-align: center;
      font-size: 1rem;
      color: $fontColor9;
      span {
        display: inline-block;
        padding: 0 0.5rem;
        &.now {
          color: $fontColor3;
        }
      }
    }
  }
}
</style>
