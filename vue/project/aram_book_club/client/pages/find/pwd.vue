<template>
  <div
    v-if="viewMode"
    class="find-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <ul class="tab">
      <li>
        <nuxt-link to="/find/id">아이디 찾기</nuxt-link>
      </li>
      <li class="active">
        <nuxt-link to="/find/pwd">비밀번호 찾기</nuxt-link>
      </li>
    </ul>
    <div v-if="!findPw.bool">
      <p class="txt-pwd">
        아이디와 가입 시 입력한 휴대폰 번호 또는 이메일을 통해 비밀번호 재설정을
        하실 수 있습니다.
      </p>
      <span class="tit-id">아이디</span>
      <input
        type="text"
        v-model="loginId"
        ref="inputId"
        class="input-id"
        minlength="6"
        maxlength="12"
        placeholder=""
      />

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
              placeholder="이메일"
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
              placeholder="인증번호"
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
      <p class="txt-pwd">
        인증이 완료되었습니다.<br />사용하실 비밀번호를 재설정 해주세요.
      </p>
      <div class="field">
        <input
          v-model="pwdVal1.pwd"
          type="password"
          minlength="8"
          maxlength="15"
          @input="pwdValidate1"
          placeholder="비밀번호"
        />
        <p class="txt-val">{{ pwdVal1.text }}</p>
        <input
          ref="pwdVal2"
          v-model="pwdVal2.pwd"
          type="password"
          minlength="8"
          maxlength="15"
          :class="{ disabled: !pwdVal1.bool }"
          disabled="disabled"
          @input="pwdValidate2"
          placeholder="비밀번호 확인"
        />
        <p class="txt-val" v-if="pwdVal2.text != ''">{{ pwdVal2.text }}</p>
      </div>
      <button class="btn btn-complate" @click="savePwd">
        비밀번호 변경
      </button>
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
      phoneVal: {
        bool: false,
        text: ''
      },
      emailVal: {
        bool: false,
        text: 'e-mail 을 입력해주세요.'
      },
      numberVal: {
        bool: false,
        text: ''
      },
      changePw: {
        bool: false,
        text: ''
      },
      findPw: {
        bool: false,
        text: ''
      },
      pwdVal1: {
        bool: false,
        pwd: '',
        text: '9~15자의 영문, 숫자 또는 특수문자'
      },
      pwdVal2: {
        bool: false,
        pwd: '',
        text: ''
      },
      checkFind: 'findP',
      pwd: '',
      number: '',
      email: '',
      loginId: ''
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
      if (
        this.loginId === '' ||
        this.loginId === null ||
        this.loginId === undefined
      ) {
        this.loginId = ''
        this.emailVal.text = '아이디를 입력해주세요.'
        return false
      }
      const { data } = await this.$axios.get('/auth/sendFindIdPwdMail', {
        params: {
          userLoginId: this.loginId,
          memEmlNm: this.email
        }
      })
      if (data.result.memResult === '0') {
        this.numberVal.text = '입력하신 메일로 발송된 인증번호를 입력해 주세요.'
        this.$refs.inputId.setAttribute('disabled', 'disabled')
        this.$refs.inputEmail.setAttribute('disabled', 'disabled')
        this.$refs.btnNumber.setAttribute('disabled', 'disabled')
        this.$refs.inputNumber.removeAttribute('disabled')
        this.$refs.btnConfirm.removeAttribute('disabled')
      } else {
        this.loginId = ''
        this.email = ''
        this.emailVal.text = '가입되지 않은 아이디 혹은 이메일 입니다.'
      }
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
      if (this.loginId.length < 6) {
        alert('아이디는 6~12자의 영문 소문자, 숫자 입니다.')
        return false
      }
      const pNum = this.phone.p1 + this.phone.p2 + this.phone.p3
      const { data } = await this.$axios.get('/auth/sendAuthSms/pwd', {
        params: {
          userLoginId: this.loginId,
          memTelNum: pNum
        }
      })
      if (data.result) {
        const sel = document.querySelectorAll('.field.phone input')
        for (let i = 0; i < sel.length; i++) {
          sel[i].setAttribute('disabled', 'disabled')
        }
        this.$refs.btnPhone.setAttribute('disabled', 'disabled')
        this.$refs.phoneNumber.removeAttribute('disabled')
        this.$refs.btnPhConfirm.removeAttribute('disabled')
      } else {
        this.phoneVal.text = '아이디와 전화번호가 일치하지 않습니다.'
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
            this.findPw.bool = true
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
            this.findPw.bool = true
          }
        } catch (error) {
          this.numberVal.text = '인증번호가 일치하지 않습니다.'
        }
      } else {
        this.numberVal.text = '숫자만 입력해주세요.'
        this.number = ''
      }
    },
    selFind(txt) {
      this.$router.push({
        name: 'find-pwd'
      })
      this.phone.p1 = ''
      this.phone.p3 = ''
      this.phone.p2 = ''
      this.email = ''
      this.phoneVal.text = ''
      this.checkFind = txt
    },
    async savePwd() {
      try {
        const { data } = await this.$axios.post('/member/updChgFindPwd', {
          loginId: this.loginId,
          chgPwd: this.pwd
        })
        if (data.ok) {
          alert('비밀번호 변경이 완료되었습니다.')
          this.$router.push({
            name: 'login'
          })
        }
      } catch (error) {
        console.log('error', error)
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
    pwdValidate1() {
      if (this.pwdVal1.pwd.length > 8) {
        this.pwdVal1.text = '사용 가능한 비밀번호 입니다.'
        this.pwdVal1.bool = true
        this.$refs.pwdVal2.removeAttribute('disabled')
      } else {
        this.pwdVal1.text = '9~15자의 영문, 숫자 또는 특수문자'
        this.pwdVal2.text = ''
        this.pwdVal1.bool = false
        this.pwdVal2.bool = false
        this.$refs.pwdVal2.setAttribute('disabled', 'disabled')
      }
      this.pwdVal2.pwd = ''
      this.pwdVal2.text = ''
    },
    pwdValidate2() {
      if (this.pwdVal2.pwd === this.pwdVal1.pwd) {
        this.pwdVal2.text = '비밀번호가 일치합니다.'
        this.pwdVal2.bool = true
        this.pwd = this.pwdVal1.pwd
      } else {
        this.pwdVal2.text = '비밀번호가 일치하지 않습니다.'
        this.pwdVal2.bool = false
        this.pwd = ''
      }
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
    valOk() {
      this.emailVal.bool = true
      this.$refs.btnNumber.removeAttribute('disabled')
    },
    valFail() {
      this.emailVal.bool = false
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
input[type='password'],
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
      font-size: 1.1rem;
      background: #f6f6f6;
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
    .txt-pwd {
      margin: 2rem 0;
      font-size: 1.1rem;
      font-weight: 300;
      text-align: center;
      color: $fontColor6;
    }
    .tit-id {
      display: block;
      margin: 30px 255px 0px;
      font-size: 22px;
      color: $fontColor6;
    }
    .input-id {
      width: 570px;
      padding: 1.5rem 0 0.5rem;
      margin: 0 255px;
      border: 0 none;
      border-bottom: 1px solid $borderColor;
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
        margin-top: 1.4rem;
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
      input[type='password'] {
        width: 570px;
        margin: 0 auto;
        height: 3.8rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
      }
      .txt-pwd {
        font-size: 1.5rem;
        line-height: 44px;
        color: $fontColor6;
      }
      .txt-findid {
        margin-top: 10px;
      }
      .txt-val {
        font-size: 1.2rem;
        text-align: center;
        margin: 1.4rem 0;
        color: $errorColor;
      }
    }
    .btn-complate {
      display: block;
      width: 570px;
      height: 4rem;
      background: $blueColor;
      margin: 60px auto 3rem;
      border-radius: 0.6rem;
      font-size: 1.5rem;
      line-height: 4rem;
      color: #fff;
    }
  }
  &.mo {
    padding: 3rem 3rem 0;
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
    .txt-pwd {
      margin: 2rem 0;
      font-size: 1.3rem;
      color: $fontColor6;
    }
    .tit-id {
      display: block;
      margin: 3rem 0 1.4rem;
      font-size: 1.2rem;
      color: $fontColor9;
    }
    .input-id {
      width: 100%;
      border: 0 none;
      border-bottom: 0.1rem solid $borderColor;
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
      input[type='password'] {
        width: 100%;
        height: 3.8rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
      }
      .txt-pwd {
        font-size: 1.5rem;
        text-align: left;
        line-height: 2.2rem;
        color: $fontColor6;
      }
      .txt-findid {
        margin-top: 10px;
      }
      .txt-val {
        font-size: 1.2rem;
        text-align: center;
        margin: 1.4rem 0;
        color: $errorColor;
      }
    }
    .btn-complate {
      display: block;
      width: 100%;
      height: 4rem;
      background: $blueColor;
      margin: 3rem auto 3rem;
      border-radius: 0.6rem;
      font-size: 1.5rem;
      line-height: 4rem;
      color: #fff;
    }
  }
}
</style>
