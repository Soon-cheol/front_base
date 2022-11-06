<template>
  <div
    v-if="viewMode"
    class="join-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <joinHeader :active="1" />
    <div class="terms">
      <label for="allAgree" class="btn-check all" @click="allCheck">
        <input type="checkbox" id="allAgree" />
        <span>전체동의</span>
      </label>
      <div v-for="(t, index) in termsList" :key="index">
        <label :for="'agree' + index" class="btn-check sel" @click="termsCheck">
          <input type="checkbox" :id="'agree' + index" />
          <span>{{ t.trmsCdNm }}</span>
          <button
            v-if="t.trmsCd === '001'"
            @click="popupOpen('useTerms')"
            class="btn-terms"
          >
            보기
          </button>
          <button
            v-if="t.trmsCd === '002'"
            @click="popupOpen('priTerms')"
            class="btn-terms"
          >
            보기
          </button>
        </label>
      </div>
    </div>
    <div class="btn-wrap">
      <button
        @click="nextStep"
        ref="btnTerms"
        class="btn btn-complate"
        disabled="disabled"
      >
        다음
      </button>
      <nuxt-link to="/" class="btn btn-cancel">취소</nuxt-link>
    </div>
    <!-- 팝업 컴포넌트 -->
    <termsDetail
      v-if="popup === 'useTerms'"
      termsSel="useTerms"
      @closeCall="popupClose"
    />
    <termsDetail
      v-if="popup === 'priTerms'"
      termsSel="priTerms"
      @closeCall="popupClose"
    />
    <!-- // 팝업 컴포넌트 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import joinHeader from '~/components/layouts/joinHeader'
import termsDetail from '~/components/popup/termsDetail'
export default {
  components: { joinHeader, termsDetail },
  layout: 'join',
  data() {
    return {
      aNum: 0,
      trmsI: [],
      allAgree: {
        agree: false
      },
      popup: '',
      termsSel: '',
      termsList: []
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  async mounted() {
    try {
      const { data } = await this.$axios.get('/terms/list')
      if (data.ok) {
        this.termsList = data.result
      }
    } catch (error) {
      console.log('error', error)
    }
  },
  methods: {
    allCheck() {
      this.allAgree.agree = document.querySelector('#allAgree').checked
      const sel = document.querySelectorAll('.btn-check input')
      for (let i = 0; i < sel.length; i++) {
        if (this.allAgree.agree) {
          sel[i].checked = true
          this.aNum = sel.length
          this.$refs.btnTerms.removeAttribute('disabled')
        } else {
          sel[i].checked = false
          this.aNum = 0
          this.$refs.btnTerms.setAttribute('disabled', 'disabled')
        }
      }
    },
    termsCheck() {
      this.aNum = 0
      const all = document.querySelector('#allAgree')
      const sel = document.querySelectorAll('.btn-check.sel input')
      for (let i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
          this.aNum += 1
        }
      }
      if (sel.length === this.aNum) {
        this.$refs.btnTerms.removeAttribute('disabled')
        all.checked = true
      } else {
        this.$refs.btnTerms.setAttribute('disabled', 'disabled')
        all.checked = false
      }
    },
    nextStep() {
      const sel = document.querySelectorAll('.btn-check.sel input')
      for (let i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
          this.trmsI.push({
            trmsRvsnSeqno: this.termsList[i].trmsRvsnSeqno,
            trmsCd: this.termsList[i].trmsCd
          })
        }
      }
      console.log('this.trmsI', this.trmsI)
      this.$router.push({
        name: 'join-step02',
        params: {
          trmsI: this.trmsI
        }
      })
    },
    popupOpen(txt) {
      document.body.style.overflow = 'hidden'
      this.popup = txt
    },
    popupClose() {
      document.body.style.overflow = 'auto'
      this.popup = false
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
.join-wrap {
  .terms {
    margin-top: 1.8rem;
    padding-bottom: 1.6rem;
    border: 1px solid #ddd;
    color: $fontColor6;
    input[type='checkbox'] {
      width: 1.5rem;
      border: 1px solid #a0a0a0;
      margin: 0 0.8rem 0 0;
    }
    .btn-check {
      overflow: hidden;
      display: block;
      &.all {
        padding: 1.2rem 0.9rem;
        border-bottom: 1px solid #ddd;
      }
      &.sel {
        position: relative;
        padding: 1.6rem 0.9rem 0;
      }
      & > * {
        float: left;
        font-size: 1rem;
        height: 1rem;
        line-height: 1rem;
        font-weight: 300;
      }
      .btn-terms {
        position: absolute;
        right: 0.9rem;
        padding: 0;
        width: 5rem;
        font-size: 0.9rem;
        text-align: right;
        text-decoration: underline;
        z-index: 100;
      }
    }
  }
  &.pc {
    width: 1080px;
    padding: 70px 0 100px;
    margin: 0 auto;
    .btn-wrap {
      overflow: hidden;
      width: 100%;
      margin-top: 2rem;
      text-align: center;
      & > * {
        display: inline-block;
        width: 170px;
        height: 2.5rem;
        border-radius: 3rem;
        margin: 0 0.2rem;
        font-size: 1rem;
        line-height: 2.5rem;
        color: #fff;
      }
      .btn-complate {
        background: #269bd7;
        &:disabled {
          background: #c9c9c9;
          cursor: default;
        }
      }
      .btn-cancel {
        background: $fontColor6;
      }
    }
  }
  &.mo {
    padding: 3rem 3rem 6rem;
    .btn-wrap {
      width: 100%;
      margin-top: 3rem;
      & > * {
        display: block;
        width: 100%;
        height: 4rem;
        border-radius: 0.6rem;
        font-size: 1.5rem;
        line-height: 4rem;
        text-align: center;
        color: #fff;
      }
      .btn-complate {
        background: #269bd7;
        &:disabled {
          background: #c9c9c9;
          cursor: default;
        }
      }
      .btn-cancel {
        background: $fontColor6;
        margin-top: 0.7rem;
      }
    }
  }
}
</style>
