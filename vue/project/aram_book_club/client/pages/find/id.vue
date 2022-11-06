<template>
  <div
    v-if="viewMode"
    class="find-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <ul class="tab">
      <li class="active">
        <nuxt-link to="/find/id">아이디 찾기</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/find/pwd">비밀번호 찾기</nuxt-link>
      </li>
    </ul>
    <div v-if="!findId.bool">
      <div class="find">
        <input
          type="radio"
          id="findP"
          ref="findP"
          checked="checked"
          @click="selFind('findP')"
          name="find"
        />
        <label for="findP">휴대폰으로 찾기</label>
        <div v-if="checkFind === 'findP'">
          <div class="field phone">
            <div class="input">
              <input
                v-model="phone.p1"
                type="text"
                minlength="3"
                maxlength="3"
                @input="numberOnly('p1')"
              />
              <span>-</span>
              <input
                v-model="phone.p2"
                type="text"
                minlength="3"
                maxlength="4"
                @input="numberOnly('p2')"
              />
              <span>-</span>
              <input
                v-model="phone.p3"
                type="text"
                minlength="4"
                maxlength="4"
                @input="numberOnly('p3')"
              />
            </div>
            <button @click="sendPhone" ref="btnPhone" disabled="disabled">
              인증번호 받기
            </button>
          </div>
          <p class="txt-val" v-if="phoneVal.text != ''">{{ phoneVal.text }}</p>
          <div class="field">
            <input
              type="text"
              v-model="number"
              ref="phoneNumber"
              disabled="disabled"
            />
            <button
              disabled="disabled"
              ref="btnPhConfirm"
              @click="confirmPhNumber"
            >
              확인
            </button>
          </div>
          <p class="txt-val" v-if="numberVal.text != ''">
            {{ numberVal.text }}
          </p>
        </div>
      </div>
      <!-- <div class="find">
        <input
          type="radio"
          id="findE"
          ref="findE"
          name="find"
          @click="selFind('findE')"
        />
        <label for="findE">이메일로 찾기</label>
        <div v-if="checkFind === 'findE'">
          <div class="field">
            <input
              type="text"
              v-model="email"
              ref="inputEmail"
              @input="emailValidate"
            />
            <button disabled="disabled" ref="btnNumber" @click="sendNumber()">
              인증번호 받기
            </button>
          </div>
          <p class="txt-val">{{ emailVal.text }}</p>
          <div class="field">
            <input
              v-model="number"
              type="text"
              minlength="6"
              maxlength="6"
              ref="inputNumber"
              disabled="disabled"
              @input="numberInput"
            />
            <button ref="btnConfirm" disabled="disabled" @click="confirmNumber">
              확인
            </button>
          </div>
          <p class="txt-val">{{ numberVal.text }}</p>
        </div>
      </div> -->
    </div>
    <div class="result" v-else>
      <p class="txt-findid">
        회원님 아이디는 아래와 같습니다. <span>[{{ findId.text }}]</span>
      </p>
      <nuxt-link to="/login" class="btn btn-complate">로그인 하기</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      phone: {
        p1: '',
        p2: '',
        p3: ''
      },
      emailVal: {
        bool: false,
        text: 'e-mail 을 입력해주세요.'
      },
      phoneVal: {
        bool: false,
        text: ''
      },
      numberVal: {
        bool: false,
        text: ''
      },
      findId: {
        bool: false,
        text: ''
      },
      checkFind: 'findP',
      number: '',
      email: ''
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    // 통신
    async sendNumber() {
      this.$refs.inputNumber.removeAttribute('disabled')
      this.$refs.btnConfirm.removeAttribute('disabled')
      this.$refs.inputEmail.setAttribute('readonly', 'readonly')
      this.$refs.inputEmail.setAttribute('disabled', 'disabled')
      this.$refs.btnNumber.setAttribute('disabled', 'disabled')

      this.numberVal.text = '입력하신 메일로 발송된 인증번호를 입력해 주세요.'
      const data = await this.$axios.get('/auth/sendFindIdPwdMail', {
        params: {
          memEmlNm: this.email
        }
      })
    },
    async phoneValidate() {
      const pNum = this.phone.p1 + this.phone.p2 + this.phone.p3
      if (
        this.phone.p1.length === 3 &&
        this.phone.p3.length === 4 &&
        this.phone.p2.length >= 3
      ) {
        // 전번 10개 이상일 경우
        const { data } = await this.$axios.get('/member/join/checkPhoneUse', {
          params: {
            memTelNum: pNum
          }
        })
        if (data.result.memResult === '1') {
          this.$refs.btnPhone.removeAttribute('disabled')
          this.phoneVal.text = ''
        } else {
          this.phoneVal.text = '전화번호가 존재하지 않습니다.'
        }
      } else {
        this.$refs.btnPhone.setAttribute('disabled', 'disabled')
      }
    },
    async sendPhone() {
      const pNum = this.phone.p1 + this.phone.p2 + this.phone.p3
      const sel = document.querySelectorAll('.field.phone input')
      for (let i = 0; i < sel.length; i++) {
        sel[i].setAttribute('disabled', 'disabled')
      }
      this.$refs.btnPhone.setAttribute('disabled', 'disabled')
      this.$refs.phoneNumber.removeAttribute('disabled')
      this.$refs.btnPhConfirm.removeAttribute('disabled')
      const data = await this.$axios.get('/auth/sendAuthSms', {
        params: {
          memTelNum: pNum
        }
      })
    },
    numberOnly(n) {
      const v = /^[0-9]+$/
      switch (n) {
        case 'p1':
          if (!v.test(this.phone.p1)) {
            this.phone.p1 = ''
          } else {
            this.phoneValidate()
          }
          break
        case 'p2':
          if (!v.test(this.phone.p2)) {
            this.phone.p2 = ''
          } else {
            this.phoneValidate()
          }
          break
        case 'p3':
          if (!v.test(this.phone.p3)) {
            this.phone.p3 = ''
          } else {
            this.phoneValidate()
          }
          break
      }
    },
    async confirmPhNumber() {
      const v = /^[0-9]*$/
      const pNum = this.phone.p1 + this.phone.p2 + this.phone.p3
      if (v.test(this.number)) {
        try {
          const { data } = await this.$axios.get('/auth/checkAuthCode', {
            params: {
              memTelNum: pNum,
              certCd: this.number
            }
          })
          if (data.result) {
            alert('인증이 완료되었습니다.')
            this.getId()
          } else {
            this.numberVal.text = '인증번호가 일치하지 않습니다.'
          }
        } catch (error) {
          console.log('error', error)
        }
      } else {
        this.numberVal.text = '숫자만 입력해주세요.'
        this.number = ''
      }
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
          if (data.ok) {
            alert('인증이 완료되었습니다.')
            this.getId()
          }
        } catch (error) {
          this.numberVal.text = '인증번호가 일치하지 않습니다.'
        }
      } else {
        this.numberVal.text = '숫자만 입력해주세요.'
        this.number = ''
      }
    },
    async getId() {
      const pNum = this.phone.p1 + this.phone.p2 + this.phone.p3
      try {
        const { data } = await this.$axios.get('/auth/findId', {
          params: {
            memEmlNm: this.email,
            memTelNum: pNum
          }
        })
        console.log('data', data)
        if (data.ok) {
          this.findId.bool = true
          this.findId.text = data.result
        }
      } catch (error) {
        // console.log(error)
        alert(error.data.errorState.message)
      }
    },
    // 기능
    emailValidate() {
      // eslint-disable-next-line no-useless-escape
      const v = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{0,3}$/i
      if (v.test(this.email)) {
        this.emailVal.text = ''
        this.valOk()
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
    selFind(txt) {
      this.$router.push({
        name: 'find-id'
      })
      this.phone.p1 = ''
      this.phone.p3 = ''
      this.phone.p2 = ''
      this.email = ''
      this.checkFind = txt
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
input[type='text'] {
  border: 1px solid $borderColor;
  &:disabled {
    background: #ececec;
    border: 1px solid $borderColor;
    color: $fontColor9;
  }
}
.find-wrap {
  &.pc {
    max-width: 1080px;
    margin: 0 auto;
    padding: 70px 0 100px;
    input[type='text'] {
      font-size: 22px;
    }
    .tab {
      position: relative;
      width: 1080px;
      height: 60px;
      background: #f6f6f6;
      font-size: 1.1rem;
      li {
        position: absolute;
        width: 540px;
        height: 60px;
        border: 1px solid #dfdfdf;
        line-height: 60px;
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
          left: 540px;
        }
        a {
          display: block;
        }
      }
    }
    .find {
      width: 1080px;
      padding: 2.6rem 255px 0;
      &:last-child {
        // border-top: 1px solid $borderColor;
        margin-bottom: 2.6rem;
      }
      label {
        font-size: 1.1rem;
        color: $fontColor6;
      }
      input[type='radio'] {
        width: 1rem;
        height: 1rem;
        margin: -0.3rem 0.4rem 0 0;
      }
      button,
      input[type='text'] {
        border-radius: 0.4rem;
      }
      .field {
        overflow: hidden;
        margin-top: 16px;
        &.phone {
          margin-top: 30px;
        }
        & > * {
          float: left;
        }
        input[type='text'] {
          width: 67%;
          height: 2.5rem;
          padding: 0;
          text-align: center;
        }
        button {
          width: 29%;
          height: 2.5rem;
          margin-left: 4%;
          background: $fontColor6;
          font-size: 0.9rem;
          color: #fff;
          &:disabled {
            background: #dfdfdf;
            color: $fontColor6;
          }
        }
      }
      .txt-val {
        font-size: 0.9rem;
        text-align: center;
        margin: 1rem 0;
        color: $errorColor;
      }
    }
    .phone {
      overflow: hidden;
      .input {
        float: left;
        display: table;
        width: 67%;
        & > * {
          display: table-cell;
          vertical-align: middle;
        }
        input[type='text'] {
          width: 100%;
          text-align: center;
        }
        span {
          width: 8%;
          text-align: center;
        }
      }
      button {
        float: right;
        width: 20%;
        height: 38px;
      }
    }
    .result {
      text-align: center;
      .txt-findid {
        padding: 3.5rem 0;
        margin: 3rem 0;
        background: #f6f6f6;
        font-size: 1.5rem;
        line-height: 2.2rem;
        color: $fontColor6;
        span {
          display: block;
        }
      }
    }
    .btn-complate {
      display: block;
      width: 570px;
      height: 4rem;
      background: $blueColor;
      margin: 0 auto 3rem;
      border-radius: 0.6rem;
      font-size: 1.5rem;
      line-height: 4rem;
      color: #fff;
    }
  }
  &.mo {
    padding: 3rem 3rem 0;
    input[type='text'] {
      font-size: 1.2rem;
    }
    .tab {
      position: relative;
      width: 26rem;
      height: 4.2rem;
      background: #f6f6f6;
      li {
        position: absolute;
        width: 13rem;
        height: 4.2rem;
        border: 1px solid #dfdfdf;
        line-height: 4.2rem;
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
          left: 13rem;
        }
        a {
          display: block;
        }
      }
    }
    .find {
      margin-top: 2.6rem;
      &:last-child {
        margin-bottom: 2.6rem;
      }
      label {
        font-size: 1.5rem;
        color: $fontColor6;
      }
      input[type='radio'] {
        width: 1.6rem;
        height: 1.6rem;
        margin: -0.3rem 0.4rem 0 0;
      }
      button,
      input[type='text'] {
        border-radius: 0.4rem;
      }
      .field {
        overflow: hidden;
        margin-top: 1.4rem;
        & > * {
          float: left;
        }
        input[type='text'] {
          width: 67%;
          height: 3.8rem;
          padding: 0;
          text-align: center;
        }
        button {
          width: 30%;
          height: 3.8rem;
          margin-left: 3%;
          background: $fontColor6;
          font-size: 1.1rem;
          color: #fff;
          &:disabled {
            background: #dfdfdf;
            color: $fontColor9;
          }
        }
      }
      .txt-val {
        font-size: 1.4rem;
        text-align: center;
        margin: 2rem 0;
        color: $errorColor;
      }
    }
    .phone {
      overflow: hidden;
      .input {
        float: left;
        display: table;
        width: 67%;
        & > * {
          display: table-cell;
          vertical-align: middle;
        }
        input[type='text'] {
          width: 100%;
          text-align: center;
        }
        span {
          width: 8%;
          text-align: center;
        }
      }
      button {
        float: right;
        width: 20%;
        height: 38px;
      }
    }
    .result {
      text-align: center;
      .txt-findid {
        padding: 3.5rem 0;
        margin: 3rem 0;
        background: #f6f6f6;
        font-size: 1.5rem;
        line-height: 2.2rem;
        color: $fontColor6;
        span {
          display: block;
        }
      }
    }
    .btn-complate {
      display: block;
      height: 4rem;
      background: $blueColor;
      margin-bottom: 3rem;
      border-radius: 0.6rem;
      font-size: 1.5rem;
      line-height: 4rem;
      color: #fff;
    }
  }
}
</style>
