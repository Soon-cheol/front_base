<template>
  <div class="popup">
    <div class="popup-center">
      <div>
        <!-- 팝업 컨텐츠 -->
        <div class="popup-contants">
          <select @change="changeTerms">
            <option
              v-for="(d, index) in dateList"
              :key="index"
              :value="d.trmsAplyStarDt"
              >{{ d.trmsAplyStarDt }}</option
            >
          </select>
          <h3 v-if="this.termsSel === 'useTerms'">이용약관</h3>
          <h3 v-if="this.termsSel === 'priTerms'">개인정보취급방침</h3>
          <!-- <button @click="popupClose" class="btn-close" /> -->
          <!-- <p class="txt-content">{{ content }}</p> -->
          <p class="txt-content">
            <TuiEditorViewer :value="content" />
          </p>
          <!-- // 팝업 컨텐츠 -->
          <div class="btn-wrap">
            <button @click="popupClose" class="btn btn-cancel">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: '',
      date: '',
      dateList: [],
      content: ''
    }
  },
  props: {
    termsSel: {
      type: String,
      default: null
    }
  },
  created() {
    this.termsConGet()
    this.startListGet()
  },
  methods: {
    // 통신
    async startListGet() {
      if (this.termsSel === 'useTerms') {
        this.code = '001'
      } else if (this.termsSel === 'priTerms') {
        this.code = '002'
      }
      try {
        const { data } = await this.$axios.get('/terms/startDtList', {
          params: {
            trmsCd: this.code
          }
        })
        if (data.ok) {
          this.dateList = data.result
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async termsConGet() {
      if (this.termsSel === 'useTerms') {
        this.code = '001'
      } else if (this.termsSel === 'priTerms') {
        this.code = '002'
      }
      try {
        const { data } = await this.$axios.get('/terms/listOne', {
          params: {
            trmsCd: this.code
          }
        })
        if (data.ok) {
          // console.log('data', data)
          this.content = data.result.trmsSpCtt
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async changeTerms(e) {
      this.date = e.target.value
      try {
        const { data } = await this.$axios.get('/terms/listOne', {
          params: {
            trmsCd: this.code,
            trmsAplyStarDt: this.date
          }
        })
        if (data.ok) {
          this.content = data.result.trmsSpCtt
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    // 기능
    handleAddress(data) {
      this.$emit('closeCall', data)
    },
    popupClose() {
      this.$emit('closeCall')
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
      max-width: 880px;
      height: 100%;
      margin: 0 auto;
      padding: 1rem;
      background: #f6f6f6;
      border-radius: 2px;
      .txt-content {
        padding: 1rem 1rem;
        background: #fff;
        font-size: 1rem;
        color: $fontColor9;
        height: 340px;
      }
      .btn-close {
        position: absolute;
        top: 16px;
        right: 20px;
        padding: 6px 10px;
      }
      .btn-wrap {
        display: table;
        width: 50%;
        margin: 0 auto;
        & > * {
          display: table-cell;
          width: 100%;
        }
      }
    }
  }
}
select {
  width: 100%;
  border: 1px solid $fontColor6;
  border-radius: 0.4rem;
  background-color: #fff;
}
h3 {
  margin: 2.5rem 0;
  font-size: 2.2rem;
  text-align: center;
  font-weight: 400;
}
.txt-content {
  overflow-y: auto;
  height: 26rem;
  border: 1px solid $fontColor9;
  white-space: pre-line;
}
.btn-cancel {
  width: 100%;
  height: 3rem;
  margin: 1rem 0 0.8rem;
  border: 1px solid #666;
  border-radius: 0.4rem;
  background: #666;
  line-height: 3rem;
  font-size: 1.2rem;
  color: #fff;
}
</style>
