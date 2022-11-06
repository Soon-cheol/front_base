<template>
  <div
    class="chg-password"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <h2>비밀번호 변경</h2>
    <ul class="input">
      <li>
        <input
          v-model="user.pwd"
          type="password"
          maxlength="15"
          placeholder="현재 비밀번호"
        />
      </li>
      <li>
        <input
          v-model="pwdVal1.pwd"
          type="password"
          minlength="8"
          maxlength="15"
          placeholder="새 비밀번호"
          @input="pwdValidate1"
        />
        <p class="txt-new-pwd">
          ( 9~15자의 영문 대/소문자,숫자,특수문자 )
        </p>
        <p class="txt-validate">{{ pwdVal1.text }}</p>
      </li>
      <li>
        <input
          ref="pwdVal2"
          v-model="pwdVal2.pwd"
          type="password"
          minlength="8"
          maxlength="15"
          :class="{ disabled: !pwdVal1.bool }"
          disabled="disabled"
          placeholder="새 비밀번호 확인"
          @input="pwdValidate2"
        />
        <p class="txt-validate">{{ pwdVal2.text }}</p>
      </li>
    </ul>
    <!-- <table>
      <tbody>
        <tr>
          <th>비밀번호</th>
          <td>
            <input v-model="user.pwd" type="password" maxlength="15" />
          </td>
        </tr>
        <tr>
          <th>새 비밀번호</th>
          <td>
            <input
              v-model="pwdVal1.pwd"
              type="password"
              minlength="8"
              maxlength="15"
              @input="pwdValidate1"
            />
            <p class="txt-validate">{{ pwdVal1.text }}</p>
          </td>
        </tr>
        <tr>
          <th>새 비밀번호 확인</th>
          <td>
            <input
              ref="pwdVal2"
              v-model="pwdVal2.pwd"
              type="password"
              minlength="8"
              maxlength="15"
              :class="{ disabled: !pwdVal1.bool }"
              disabled="disabled"
              @input="pwdValidate2"
            />
            <p class="txt-validate">{{ pwdVal2.text }}</p>
          </td>
        </tr>
      </tbody>
    </table> -->
    <div class="btn-wrap">
      <button class="btn btn-complate" @click="complate">확인</button>
      <button class="btn btn-cancel">취소</button>
    </div>
    <!-- {{ user }}
    {{ pwdVal1 }}
    {{ pwdVal2 }} -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  data() {
    return {
      user: {
        pwd: '',
        chgPwd: ''
      },
      pwdVal1: {
        bool: false,
        pwd: ''
      },
      pwdVal2: {
        bool: false,
        pwd: '',
        text: ''
      }
    }
  },
  components: { loginConfirm },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    // 통신
    async complate() {
      if (
        this.user.pwd === '' ||
        this.user.pwd === undefined ||
        this.user.pwd === null
      ) {
        alert('현재 비밀번호를 확인해주세요.')
        this.reset()
        return false
      }
      if (
        this.pwdVal1.pwd === '' ||
        this.pwdVal1.pwd === undefined ||
        this.pwdVal1.pwd === null
      ) {
        alert('새 비밀번호를 확인해주세요.')
        this.reset()
        return false
      }
      if (
        this.pwdVal2.pwd === '' ||
        this.pwdVal2.pwd === undefined ||
        this.pwdVal2.pwd === null
      ) {
        alert('새 비밀번호를 확인해주세요.')
        this.reset()
        return false
      }
      if (this.pwdVal1.pwd === this.user.pwd) {
        alert('현재 비밀번호와 새 비밀번호가 동일합니다.')
        this.reset()
        return false
      }
      if (this.pwdVal1.pwd !== this.pwdVal2.pwd) {
        alert('새 비밀번호가 동일하지 않습니다.')
        this.reset()
        return false
      }
      try {
        const { data } = await this.$axios.post('/member/updChgPwd', this.user)
        if (data.result) {
          alert('비밀번호가 변경되었습니다.\n재 로그인 후 이용해 주세요.')
          this.logout()
          this.$router.push({
            name: 'login'
          })
        } else {
          alert('현재 비밀번호가 일치하지 않습니다.')
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    reset() {
      this.user.pwd = this.pwdVal1.pwd = this.pwdVal2.pwd = ''
    },
    logout() {
      this.$store.dispatch('user/logout')
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
        this.user.chgPwd = this.pwdVal1.pwd
      } else {
        this.pwdVal2.text = '비밀번호가 일치하지 않습니다.'
        this.pwdVal2.bool = false
        this.user.chgPwd = ''
      }
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
.chg-password.pc {
  width: 1080px;
  margin: 70px auto 80px;
  text-align: center;
  h2 {
    position: relative;
    margin-bottom: 60px;
    padding-left: 1rem;
    font-size: 1.3rem;
    font-weight: 400;
    text-align: left;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0.2rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $blueColor;
      border-radius: 100%;
    }
  }
  .input {
    width: 520px;
    margin: 2.1rem auto 0;
    li {
      input[type='password'] {
        width: 520px;
        padding: 1rem 0.9rem;
        border: 1px solid #cfcfcf;
        border-radius: 0.4rem;
        font-size: 1rem;
      }
      & + li {
        margin-top: 1rem;
      }
      .txt-new-pwd {
        padding: 0.4rem;
        margin-top: 0.6rem;
        font-size: 0.9rem;
        color: $fontColor9;
      }
    }
  }
  .btn-wrap {
    padding: 0 0 5rem;
    button {
      width: 170px;
      height: 2.5rem;
      border-radius: 3rem;
      font-size: 1rem;
      line-height: 2.5rem;
      color: #fff;
      &.btn-complate {
        margin-top: 1.6rem;
        background: $blueColor;
      }
      &.btn-cancel {
        margin-left: 1rem;
        background: $fontColor6;
      }
    }
  }
}
.chg-password.mo {
  padding: 3rem 1.5rem;
  h2 {
    position: relative;
    padding-left: 1rem;
    font-size: 1.5rem;
    font-weight: 400;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0.2rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $blueColor;
      border-radius: 100%;
    }
  }
  .input {
    margin-top: 2.1rem;
    li {
      padding: 0 1rem;
      input[type='password'] {
        width: 100%;
        padding: 1.3rem 0.9rem;
        border: 2px solid #cfcfcf;
        border-radius: 0.4rem;
        font-size: 1.3rem;
      }
      & + li {
        margin-top: 1rem;
      }
      .txt-new-pwd {
        padding: 0.4rem;
        margin-top: 0.4rem;
        color: $fontColor9;
      }
    }
  }
  .btn-wrap {
    padding: 0 1rem 3rem;
    button {
      width: 100%;
      height: 4rem;
      border-radius: 0.4rem;
      font-size: 1.5rem;
      line-height: 4rem;
      color: #fff;
      &.btn-complate {
        margin-top: 1.6rem;
        background: $blueColor;
      }
      &.btn-cancel {
        margin-top: 0.7rem;
        background: $fontColor6;
      }
    }
  }
}
</style>
