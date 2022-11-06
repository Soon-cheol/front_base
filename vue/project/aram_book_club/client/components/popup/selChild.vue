<template>
  <div class="popup">
    <div class="popup-center">
      <div class="popup-contants">
        <h1>자녀 선택하기</h1>
        <ul class="child-list">
          <li v-for="(c, index) in childList" :key="index">
            <span><input type="radio" :id="c.chldMemId" name="selChild"/></span>
            <label v-if="c.filePathNm !== ''" :for="c.chldMemId">
              <img :src="c.filePathNm" />
            </label>
            <label v-else :for="c.chldMemId">
              <img
                v-if="c.chldSexCd === 'F'"
                src="~/static/images/mobile/contents/children/img_child_2.png"
              />
              <img
                v-else-if="c.chldSexCd === 'M'"
                src="~/static/images/mobile/contents/children/img_child_1.png"
              />
            </label>
            <ul>
              <li>자녀이름 : {{ c.chldMemNm }}</li>
              <li>
                생년월일 : {{ c.chldBthYmd.substr(0, 4) }}.{{
                  c.chldBthYmd.substr(4, 2)
                }}.{{ c.chldBthYmd.substr(6, 2) }}
              </li>
              <li v-if="c.chldSexCd === 'F'">
                성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;별 : 여
              </li>
              <li v-else>
                성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;별 : 남
              </li>
            </ul>
          </li>
        </ul>
        <div class="btn-wrap">
          <button class="btn btn-complate" @click="selComplate">
            선택완료
          </button>
          <button @click="popupClose" class="btn btn-cancel">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selChild: '',
      childList: []
    }
  },
  props: {
    selProd: {
      type: Object,
      default: null
    }
  },
  created() {
    this.childListGet()
  },
  methods: {
    // 통신
    async childListGet() {
      this.add = this.modify = false
      try {
        const { data } = await this.$axios.get('/child/list')
        this.childList = data.result
        if (this.childList.length === 0) {
          alert('현재 등록된 자녀가 없습니다.\n자녀 등록이 필요합니다.')
          this.$router.push({
            name: 'parents-children'
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    async selChildSave() {
      try {
        const { data } = await this.$axios.post(
          '/learning/management/child/mapping/prod',
          {
            chldMemId: this.selChild,
            ordNo: this.selProd.ordNo,
            pckgProdId: this.selProd.pckgProdId,
            prodId: this.selProd.prodId,
            ordDtlSeqno: this.selProd.ordDtlSeqno
          }
        )
        if (data.result) {
          this.popupClose()
        }
      } catch (error) {
        console.error(error)
        alert(error.error.message)
      }
    },
    // 기능
    selComplate() {
      const sel = document.querySelectorAll('.child-list input[type="radio"]')
      for (let i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
          this.selChild = sel[i].id
          this.selChildSave()
        }
      }
      if (this.selChild === '') {
        alert('온라인 학습을 진행할 자녀를 선택해주세요.')
      }
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
      height: auto;
      /* min-height: 60%; */
      max-height: 80%;
      max-width: 520px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      h1 {
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #cfcfcf;
        font-size: 1.2rem;
        font-weight: 400;
      }
      .btn-wrap {
        padding-top: 1rem;
        border-top: 1px solid #cfcfcf;
        & > * {
          width: 100%;
          height: 3rem;
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
.child-list {
  & > li {
    display: table;
    width: 100%;
    padding: 2rem 0;
    color: $fontColor6;
    & > * {
      display: table-cell;
      vertical-align: top;
    }
    & + li {
      border-top: 1px solid #c9c9c9;
    }
    input[type='radio'] {
      width: 1.2rem;
      height: 1.2rem;
      margin: -0.4rem 0 0 0.8rem;
    }
    label {
      width: 8rem;
      text-align: center;
      img {
        width: auto;
        height: 6.6rem;
      }
    }
    ul {
      padding-left: 1rem;
      font-size: 1.2rem;
      & > * {
        & + li {
          margin-top: 0.4rem;
        }
      }
    }
  }
}
</style>
