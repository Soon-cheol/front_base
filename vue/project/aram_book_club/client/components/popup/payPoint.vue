<template>
  <div class="popup">
    <div class="popup-center">
      <div class="popup-contants">
        <button @click="pointSave" class="btn-close" />
        <!-- 팝업 컨텐츠 -->
        <h3>포인트 적용</h3>
        <ul class="price">
          <!-- <li class="txt-num">
            <span class="tit">나의 보유 포인트</span>
            <span v-if="total">{{
              total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }}</span>
            <span class="ico-p" />
          </li> -->
          <li>
            <span class="tit">상품가 적용</span>
            <!-- <input type="text" v-model="useProd" @click="priceReset(1)" /> -->
            <input
              type="text"
              v-model="result.useProd"
              @input="numberOnly('p1')"
              @click="priceReset(1)"
            />
            <span class="ico-p" />
          </li>
          <li class="txt-prod-price">
            <p>
              (상품가:
              <span>{{
                pPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }}</span
              >P )
            </p>
          </li>
          <li>
            <span class="tit">배송비 적용 </span>
            <!-- <input type="text" v-model="useDelivery" @click="priceReset(2)" /> -->
            <input
              type="text"
              v-model="result.useDelivery"
              @input="numberOnly('p2')"
              @click="priceReset(2)"
            />
            <span class="ico-p" />
          </li>
          <li class="txt-prod-price">
            <p>
              (배송비:
              <span>{{
                pDlv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }}</span
              >P )
            </p>
          </li>
          <!-- <li class="txt-num">
            <span class="tit">사용 후 잔여포인트</span>
            <span>{{
              result.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }}</span>
            <span class="ico-p" />
          </li> -->
        </ul>
        <!-- // 팝업 컨텐츠 -->
        <div class="btn-wrap">
          <button class="btn btn-cancel" @click="pointSave">취소</button>
          <button class="btn btn-complate" @click="pointSave">
            적용
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pPrice: this.$props.pointObj.price, // 상품 가격
      cDlv: this.$props.pointObj.cashDlv, // 현금으로 결제해야할 택배비 가격
      pDlv: this.$props.pointObj.pointDlv, // 포인트로 결제해야할 택배비 가격
      result: {
        // 부모로 다시 전달해줄 팝업 정보
        total: 0,
        useProd: 0,
        useDelivery: 0,
        index: this.$props.pointObj.index
      }
    }
  },
  props: {
    pointObj: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      total: (state) => state.payment.currentPoint
    })
  },
  watch: {
    useProd: function() {
      if (this.result.useProd === isNaN || this.result.useProd === '') {
        this.result.useProd = 0
      }
      this.result.total = this.result.useDelivery - this.result.useProd
    },
    useDelivery: function() {
      if (this.result.useDelivery === isNaN || this.result.useDelivery === '') {
        this.result.useDelivery = 0
      }
      this.result.total = this.result.useDelivery - this.result.useProd
    }
  },
  methods: {
    popupClose() {
      this.$emit('closeCall')
    },
    priceReset(n) {
      if (n === 1) {
        if (this.result.useProd === 0 || this.result.useProd === isNaN) {
          this.result.useProd = ''
        }
        if (
          this.result.useDelivery === '' ||
          this.result.useDelivery === isNaN
        ) {
          this.result.useDelivery = 0
        }
      } else if (n === 2) {
        if (
          this.result.useDelivery === 0 ||
          this.result.useDelivery === isNaN
        ) {
          this.result.useDelivery = ''
        }
        if (this.result.useProd === '' || this.result.useProd === isNaN) {
          this.result.useProd = 0
        }
      }
    },
    numberOnly(n) {
      const v = /^[0-9]+$/
      switch (n) {
        case 'p1':
          if (!v.test(this.result.useProd)) {
            this.useProd = ''
          }
          break
        case 'p2':
          if (!v.test(this.result.useDelivery)) {
            this.useDelivery = ''
          }
          break
      }
    },
    pointSave() {
      this.$emit('closeCall', this.result)
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
.popup {
  position: fixed;
  display: table;
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
      max-width: 1080px;
      height: auto;
      /* min-height: 60%; */
      max-height: 80%;
      margin: 0 auto;
      background: #fff;
      border-radius: 4px;
      h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid #dfdfdf;
        font-size: 16px;
        font-weight: 400;
      }
      .btn-close {
        position: absolute;
        top: 0;
        right: 0.8rem;
        width: 2.4rem;
        height: 3.8rem;
        background: url('~static/svg2/icon_head_x02.svg') no-repeat center
          center;
        background-size: 1.2rem;
      }
    }
  }
}
h3 {
  padding: 1.1rem 1.9rem;
  background: #ff4747;
  font-size: 1.3rem;
  font-weight: 400;
  color: #fff;
}
.price {
  padding: 2rem 0.9rem;
  input[type='text'] {
    width: 100%;
    height: 3.5rem;
    border: 1px solid #cfcfcf;
    border-radius: 0.4rem;
    color: $fontColor3;
    &:disabled {
      border: 0 none;
      background: #fff;
    }
  }
  .ico-p {
    width: 2.5rem;
    height: 2.5rem;
    background: url('~static/svg2/icon_shop_point2.svg') no-repeat 0 0.5rem;
    background-size: 100%;
  }
  li {
    display: table;
    width: 100%;
    & + li {
      margin-top: 1.2rem;
    }
    & > * {
      display: table-cell;
      vertical-align: middle;
      &.tit {
        text-align: center;
      }
      &:nth-child(1) {
        width: 10.5rem;
      }
      &:nth-child(2) {
        width: 10.2rem;
        height: 3.5rem;
        padding-right: 0.8rem;
        font-size: 1.8rem;
        text-align: right;
      }
      &:nth-child(3) {
        width: 2.5rem;
      }
    }
  }
  .txt-prod-price {
    padding-right: 3rem;
    margin-top: 0.5rem;
    font-weight: 200;
    text-align: right;
    span {
      display: inline-block;
      min-width: 4rem;
    }
  }
  .txt-num {
    height: 3.5rem;
    &:first-child {
      padding-bottom: 1.2rem;
      border-bottom: 1px solid #c9c9c9;
    }
    &:last-child {
      padding-top: 1.2rem;
      border-top: 1px solid #c9c9c9;
    }
  }
}
.btn-wrap {
  overflow: hidden;
  width: 100%;
  padding: 0 0.9rem 1.9rem;
  & > * {
    width: 11.5rem;
    height: 4rem;
    border-radius: 0.4rem;
    font-size: 1.5rem;
    line-height: 4rem;
    color: #fff;
    &:nth-child(1) {
      float: left;
      background: $fontColor6;
    }
    &:nth-child(2) {
      float: right;
      background: #ff4747;
    }
  }
}
</style>
