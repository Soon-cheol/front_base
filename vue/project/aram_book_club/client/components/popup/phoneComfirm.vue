<template>
  <div class="popup">
    <div class="popup-center">
      <div class="popup-contants">
        <!-- <button @click="popupClose" class="btn-close" /> -->
        <!-- 팝업 컨텐츠 -->
        <div class="phone-wrap">
          <h3>휴대폰 인증</h3>
          <div class="name">
            <span>이름</span>
            <input
              v-model="userName"
              type="text"
              class="user-name"
              maxlength="10"
              @input="nameValidate"
            />
            <p class="txt-val">{{ nameVal.text }}</p>
          </div>
          <div class="phone">
            <div class="input">
              <input
                v-model="phone.p1"
                type="text"
                minlength="3"
                maxlength="3"
                ref="phoneNum1"
                @input="numberOnly('p1')"
              />
              <span>-</span>
              <input
                v-model="phone.p2"
                type="text"
                minlength="3"
                maxlength="4"
                ref="phoneNum2"
                @input="numberOnly('p2')"
              />
              <span>-</span>
              <input
                v-model="phone.p3"
                type="text"
                minlength="4"
                maxlength="4"
                ref="phoneNum3"
                @input="numberOnly('p3')"
              />
            </div>
            <button ref="btnNumber" class="btn-number" @click="checkPhone">
              인증번호 받기
            </button>
            <p class="txt-val">{{ numberVal.text }}</p>
          </div>
          <p class="txt-confirm">
            문자 입력 후 [확인] 버튼을 클릭하시면 인증이 완료됩니다.
          </p>
          <div class="confirm">
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
            <button
              ref="btnConfirm"
              class="btn-confirm"
              disabled="disabled"
              @click="confirmNumber"
            >
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
      userName: '',
      phoneNumber: '',
      nameVal: {
        text: ''
      },
      number: '',
      phone: {
        p1: '',
        p2: '',
        p3: ''
      },
      numberVal: {
        bool: false,
        text: '휴대전화번호를 입력해주세요.'
      }
    }
  },
  methods: {
    async checkPhone() {
      this.phoneNumber = this.phone.p1 + this.phone.p2 + this.phone.p3
      if (
        this.userName === '' ||
        this.userName === null ||
        this.userName === undefined
      ) {
        alert('이름을 입력해주세요.')
        return false
      }
      if (
        this.phone.p1.length !== 3 ||
        this.phone.p2.length <= 2 ||
        this.phone.p3.length !== 4
      ) {
        alert('휴대전화번호를 확인해주세요.')
        this.phone.p1 = this.phone.p2 = this.phone.p3 = ''
        return false
      }
      try {
        const { data } = await this.$axios.get('/member/join/checkPhoneUse', {
          params: {
            memTelNum: this.phoneNumber
          }
        })
        if (data.ok) {
          if (data.result.memResult === '1') {
            this.numberVal.text = '이미 가입된 전화번호 입니다.'
            this.phone.p1 = this.phone.p2 = this.phone.p3 = ''
            this.$refs.phoneNum1.focus()
            return false
          } else {
            this.sendPhone()
          }
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async sendPhone() {
      this.phoneNumber = this.phone.p1 + this.phone.p2 + this.phone.p3
      this.$refs.inputNumber.removeAttribute('disabled')
      this.$refs.btnConfirm.removeAttribute('disabled')
      this.$refs.phoneNum1.setAttribute('readonly', 'readonly')
      this.$refs.phoneNum2.setAttribute('readonly', 'readonly')
      this.$refs.phoneNum3.setAttribute('readonly', 'readonly')
      this.$refs.phoneNum1.setAttribute('disabled', 'disabled')
      this.$refs.phoneNum2.setAttribute('disabled', 'disabled')
      this.$refs.phoneNum3.setAttribute('disabled', 'disabled')

      this.$refs.btnNumber.setAttribute('disabled', 'disabled')

      this.numberVal.text =
        '입력하신 휴대전화번호로 발송된 인증번호를 입력해주세요.'
      const data = await this.$axios.get('/auth/sendAuthSms', {
        params: {
          userName: this.userName,
          memTelNum: this.phoneNumber
        }
      })
    },
    async confirmNumber() {
      const v = /^[0-9]*$/
      if (v.test(this.number)) {
        try {
          const { data } = await this.$axios.get('/auth/checkAuthCode', {
            params: {
              memTelNum: this.phoneNumber,
              certCd: this.number
            }
          })
          if (data.result) {
            this.checkUser()
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
    async checkUser() {
      try {
        const { data } = await this.$axios.get('/auth/checkUser', {
          params: {
            memTelNum: this.phoneNumber,
            userName: this.userName
          }
        })
        if (data.result) {
          alert('인증이 완료되었습니다.')
          this.$router.push({
            name: 'join-step03',
            params: {
              memInfo: data.result,
              mblTelRcgnNo: this.phone.p1,
              mblTelNatnNo: this.phone.p2,
              mblTelSeqno: this.phone.p3,
              memNm: this.userName,
              trmsI: this.trmsI
            }
          })
        } else {
          // 오프라인 구매 내역이 없는 경우
          alert('인증이 완료되었습니다.')
          this.$router.push({
            name: 'join-step03',
            params: {
              memInfo: {
                memId: ''
              },
              mblTelRcgnNo: this.phone.p1,
              mblTelNatnNo: this.phone.p2,
              mblTelSeqno: this.phone.p3,
              memNm: this.userName,
              trmsI: this.trmsI
            }
          })
        }
      } catch (error) {
        console.log('API 오류')
        this.$router.push({
          name: 'join-step01'
        })
      }
    },
    // 기능
    nameValidate() {
      // eslint-disable-next-line no-useless-escape
      const v = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|_ ]*$/ // 공백 허용
      if (this.userName.length > 0) {
        if (v.test(this.userName)) {
          this.nameVal.text = ''
        } else {
          this.nameVal.text = '(한글과 영문만 가능합니다.)'
          this.userName = ''
        }
        this.userName = this.userName.trim()
      } else {
        this.nameVal.text = ''
      }
    },
    numberOnly(n) {
      const v = /^[0-9]+$/
      switch (n) {
        case 'p1':
          if (!v.test(this.phone.p1)) {
            this.phone.p1 = ''
          }
          break
        case 'p2':
          if (!v.test(this.phone.p2)) {
            this.phone.p2 = ''
          }
          break
        case 'p3':
          if (!v.test(this.phone.p3)) {
            this.phone.p3 = ''
          }
          break
      }
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
.phone-wrap {
  font-weight: 200;
  color: $fontColor6;
  h3 {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid $borderColor;
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
    &.user-name {
      margin: 0.8rem 0 0;
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
  .name {
    overflow: hidden;
    margin-top: 0.8rem;
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
    button {
      background: $fontColor3;
      &:disabled {
        background: #dfdfdf;
      }
    }
  }
  .confirm {
    button {
      background: #7348ae;
      &:disabled {
        background: #dfdfdf;
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
