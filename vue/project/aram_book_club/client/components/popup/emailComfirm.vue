<template>
  <div class="popup">
    <div class="popup-center">
      <div class="popup-contants">
        <!-- <button @click="popupClose" class="btn-close" /> -->
        <!-- 팝업 컨텐츠 -->
        <div class="email-wrap">
          <h3>이메일 인증</h3>
          <div class="confirm mail">
            <input
              v-model="email"
              type="text"
              ref="inputEmail"
              placeholder="이메일"
              @input="emailValidate"
            />
            <button disabled="disabled" ref="btnNumber" @click="sendNumber">
              인증번호 받기
            </button>
          </div>
          <p class="txt-val">{{ emailVal.text }}</p>
          <p class="txt-val">{{ numberVal.text }}</p>
          <p class="txt-confirm">
            문자 입력 후 [확인] 버튼을 클릭하시면 인증이 완료됩니다.
          </p>
          <div class="confirm number">
            <input
              v-model="number"
              type="text"
              minlength="6"
              maxlength="6"
              ref="inputNumber"
              disabled="disabled"
              placeholder="인증번호"
              @input="numberInput"
            />
            <button ref="btnConfirm" disabled="disabled" @click="confirmNumber">
              확인
            </button>
          </div>
        </div>
        <!-- // 팝업 컨텐츠 -->
        <div class="btn-wrap">
          <button @click="popupClose" class="btn btn-cancel">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    trmsI: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      emailVal: {
        bool: false,
        text: 'e-mail 을 입력해주세요.'
      },
      numberVal: {
        bool: false,
        text: ''
      },
      email: '',
      number: ''
    }
  },
  methods: {
    // 통신
    async emailCheck() {
      try {
        // 이메일 중복체크
        const { data } = await this.$axios.get('/member/join/checkEmailUse', {
          params: {
            memEmlNm: this.email
          }
        })
        if (data.result.memResult === '0') {
          this.valOk()
        } else {
          this.email = ''
          this.$refs.btnNumber.setAttribute('disabled', 'disabled')
          this.emailVal.text = '이미 사용중인 이메일입니다.'
        }
      } catch (error) {
        console.error(error)
      }
    },
    async sendNumber() {
      this.$refs.inputNumber.removeAttribute('disabled')
      this.$refs.btnConfirm.removeAttribute('disabled')
      this.$refs.inputEmail.setAttribute('readonly', 'readonly')
      this.$refs.inputEmail.setAttribute('disabled', 'disabled')
      this.$refs.btnNumber.setAttribute('disabled', 'disabled')

      this.numberVal.text = '입력하신 메일로 발송된 인증번호를 입력해 주세요.'
      const data = await this.$axios.get('/auth/sendJoinAuthMail', {
        params: {
          memEmlNm: this.email
        }
      })
    },
    async confirmNumber() {
      const v = /^[0-9]*$/
      if (v.test(this.number)) {
        try {
          const { data } = await this.$axios.get('/auth/checkAuthCode', {
            params: {
              memEmlNm: this.email,
              certCd: this.number
            }
          })
          if (data.result) {
            alert('인증이 완료되었습니다.')
            this.$router.push({
              name: 'join-step03',
              params: {
                email: this.email,
                trmsI: this.trmsI
              }
            })
          } else {
            this.numberVal.text = '인증번호가 일치하지 않습니다.'
          }
        } catch (error) {
          console.log('API 오류')
          this.$router.push({
            name: 'join-step01'
          })
        }
      } else {
        this.numberVal.text = '숫자만 입력해주세요.'
        this.number = ''
      }
    },
    // 기능
    emailValidate() {
      // eslint-disable-next-line no-useless-escape
      const v = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{0,3}$/i
      if (v.test(this.email)) {
        this.emailVal.text = ''
        this.emailCheck()
      } else if (
        this.email === '' ||
        this.email === null ||
        this.email === undefined
      ) {
        this.emailVal.text = 'e-mail 을 입력해주세요.'
        this.valFail()
      } else {
        this.emailVal.text = 'e-mail 형식이 올바르지 않습니다.'
        this.valFail()
      }
    },
    valOk() {
      this.emailVal.bool = true
      this.$refs.btnNumber.removeAttribute('disabled')
    },
    valFail() {
      this.emailVal.bool = false
      this.$refs.btnNumber.setAttribute('disabled', 'disabled')
      this.$refs.inputNumber.setAttribute('disabled', 'disabled')
      this.$refs.btnConfirm.setAttribute('disabled', 'disabled')
    },
    numberInput() {
      this.numberVal.text = ''
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
  top: 4rem;
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
      max-width: 520px;
      height: auto;
      /* min-height: 60%; */
      max-height: 80%;
      margin: 0 auto;
      padding: 1.5rem;
      background: #fff;
      border-radius: 4px;
      font-size: 0.9rem;
      h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid $borderColor;
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
.email-wrap {
  font-weight: 200;
  color: $fontColor6;
  h3 {
    padding-bottom: 0.8rem;
    margin-bottom: 1.2rem;
    border-bottom: 1px solid #dfdfdf;
    font-size: 1.1rem;
    font-weight: 400;
  }
  input[type='text'] {
    width: 100%;
    height: 2.5rem;
    margin-bottom: 0.8rem;
    border: 1px solid $borderColor;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-align: center;
    &:disabled {
      background: #ececec;
      border: 1px solid $borderColor;
      color: $fontColor6;
    }
  }
  button {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.4rem;
    line-height: 2.5rem;
    font-size: 1rem;
    color: #fff;
    &:disabled {
      color: $fontColor9;
    }
  }
  .txt-val {
    margin-top: 0.9rem;
    text-align: center;
    color: $errorColor;
  }
  .txt-confirm {
    margin: 1rem 0;
    padding-top: 1rem;
    border-top: 1px solid #cfcfcf;
    text-align: center;
  }
  .confirm.mail {
    button {
      background: $fontColor3;
      &:disabled {
        background: #dfdfdf;
      }
    }
  }
  .confirm.number {
    button {
      background: #7348ae;
      &:disabled {
        background: #dfdfdf;
      }
    }
  }
  .phone {
    overflow: hidden;
    margin-top: 1rem;
    .input {
      float: left;
      display: table;
      & > * {
        display: table-cell;
      }
      span {
        width: 5%;
        text-align: center;
      }
    }
  }
}
.btn-wrap {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid $borderColor;
  .btn-cancel {
    width: 100%;
    height: 2.5rem;
    // margin: 1rem 0;
    border: 1px solid $fontColor6;
    border-radius: 0.4rem;
    background: $fontColor6;
    line-height: 2.5rem;
    font-size: 1rem;
    color: #fff;
  }
}
</style>
