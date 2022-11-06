<template>
  <div>
    <div class="prod-thume">
      <div class="box">
        <div class="phone">
          <img src="~/static/images/mobile/contents/detail/bg_phone.png" />
        </div>
        <img :src="detail.thnlUrl" class="thume" />
      </div>
    </div>
    <div class="prod-info">
      <dl>
        <dt class="name">{{ detail.prodNm }}</dt>
        <dd><span class="tit-sub">대상 연령</span>{{ detail.trgtAgerNm }}</dd>
        <dd><span class="tit-sub">교육 영역</span>{{ detail.eduAraNm }}</dd>
        <dd><span class="tit-sub">제품 구성</span>{{ detail.prodCmptCtt }}</dd>
      </dl>
      <div class="price" v-if="detail.prodAplyPric">
        <span>{{
          detail.prodAplyPric.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }}</span
        >원 (VAT 포함)
      </div>
    </div>
    <div v-if="!isLoggedIn" class="option">
      <button @click="isLogin()">체험하기</button>
      <button @click="isLogin()">장바구니</button>
      <button @click="isLogin()">즉시구매</button>
    </div>
    <div v-else class="option">
      <button>체험하기</button>
      <button @click="basketAdd()">장바구니</button>
      <button @click="directBuy()">즉시구매</button>
    </div>
    <div class="detail" v-if="detail.prodDstnList">
      <ul class="tab">
        <li class="active" @click="tabMove(0)">제품 구성</li>
        <li @click="tabMove(1)">제품 특징</li>
        <li @click="tabMove(2)">활용법</li>
      </ul>
      <TuiEditorViewer ref="editorView" :value="editor.brdCtt" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      detail: this.$props.info,
      editor: {
        brdCtt: ''
      }
    }
  },
  created() {
    this.prodList()
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.loggedIn
    })
  },
  methods: {
    // 통신
    async prodList() {
      try {
        const { data } = await this.$axios.get(
          '/prod/selsmartmallprodlisttone',
          {
            params: {
              prodId: this.$route.params.id
            }
          }
        )
        this.detail = data.result
        this.editor.brdCtt = this.detail.prodDstnList[0].prodDtlCtt
      } catch (error) {
        console.error(error)
      }
    },
    async directBuy() {
      const prodList = []
      const pckgList = []
      prodList.push(this.detail.prodId)
      pckgList.push(this.detail.pckgProdId)
      try {
        const { data } = await this.$axios.post('/buy/inscartbuy', {
          totSetlAmt: this.detail.prodAplyPric * 1,
          prodIds: prodList,
          pckgProdIds: pckgList
        })
        this.$router.push({
          name: 'payment-point',
          params: {
            ordNo: data.result.ordNo
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    async basketAdd() {
      try {
        const { data } = await this.$axios.post('/shpb/insshpb', {
          prodId: this.detail.prodId,
          pckgProdId: this.detail.pckgProdId,
          imdySetlYn: 'N'
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
    // 기능
    isLogin() {
      alert('로그인 후 이용 가능합니다.')
      this.$router.push({
        name: 'login'
      })
    },
    tabMove(n) {
      const sel = document.querySelectorAll('.detail .tab li')
      for (const a of sel) {
        a.classList.remove('active')
      }
      sel[n].classList.add('active')
      this.detail.prodDstnList[n]
        ? (this.editor.brdCtt = this.detail.prodDstnList[n].prodDtlCtt)
        : (this.editor.brdCtt = '내용 없음')
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
.prod-thume {
  width: 32rem;
  height: 18.5rem;
  margin-top: -3.8rem;
  .box {
    position: relative;
    width: 30rem;
    height: 100%;
    padding: 1.5rem 1.3rem;
    margin: 0 1rem;
    background: #fff;
    border-radius: 1.2rem 1.2rem 0 0;
    .phone {
      position: absolute;
      z-index: 2;
      img {
        width: 27.7rem;
        height: 16.5rem;
      }
    }
    .thume {
      position: absolute;
      top: 2.7rem;
      left: 4.8rem;
      width: 21.2rem;
      height: 11.9rem;
      z-index: 1;
    }
  }
}
.prod-info {
  overflow: hidden;
  padding: 0 1.5rem;
  .name {
    margin-bottom: 2.4rem;
    font-size: 2rem;
    text-align: center;
    font-weight: 600;
    img {
      width: 4rem;
    }
    p {
      margin-top: 1.4rem;
    }
  }
  dl {
    dd {
      padding: 0 1rem;
      font-size: 1.1rem;
      color: $fontColor3;
      & + dd {
        margin-top: 1rem;
      }
      .tit-sub {
        display: inline-block;
        width: 6.2rem;
        padding-left: 0.5rem;
        margin-right: 0.9rem;
        background: url('~static/images/common/ico_dot.png') no-repeat left
          center;
        border-right: 1px solid $fontColor9;
        text-align: left;
        color: $fontColor9;
      }
    }
  }
  .price {
    margin: 2rem 1rem 3.7rem;
    padding-top: 2rem;
    border-top: 1px solid #c9c9c9;
    font-size: 1.3rem;
    text-align: right;
    color: #999;
    span {
      font-size: 2.3rem;
      color: #ff4747;
    }
  }
}
.option {
  overflow: hidden;
  padding: 0 1.5rem 14.3rem;
  background: url('~static/images/mobile/contents/detail/bg_char.png') no-repeat
    center 16.4rem;
  background-size: 22.7rem auto;
  button {
    float: left;
    width: 14.3rem;
    height: 4rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    &:nth-child(1) {
      background: #93bd41;
    }
    &:nth-child(2) {
      float: right;
      background: #ff4747;
    }
    &:nth-child(3) {
      width: 29rem;
      margin-top: 0.8rem;
      background: $blueColor;
    }
  }
}
.detail {
  .tab {
    position: relative;
    width: 26.1rem;
    height: 2.85rem;
    background: #f6f6f6;
    margin: 3.5rem 2.9rem 0;
    li {
      position: absolute;
      width: 8.7rem;
      height: 2.9rem;
      border: 1px solid #dfdfdf;
      line-height: 2.9rem;
      text-align: center;
      &.active {
        background: #fff;
        border: 1px solid #383838;
        border-bottom: 0 none;
      }
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        left: 8.7rem;
      }
      &:nth-child(3) {
        left: 17.4rem;
      }
    }
  }
  & > img {
    width: 100%;
  }
}
</style>
