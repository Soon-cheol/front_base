<template>
  <div id="login" :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }">
    <h1>
      <nuxt-link to="/"
        ><img src="~/static/images/mobile/common/logo_aram.png"
      /></nuxt-link>
    </h1>
    <ul class="input">
      <li>
        <input type="text" v-model="user.userLoginId" placeholder="아이디" />
      </li>
      <li>
        <input
          type="password"
          v-model="user.userPassword"
          placeholder="비밀번호"
        />
      </li>
    </ul>
    <p v-if="!loginState.state" class="txt-error">{{ loginState.msg }}</p>
    <div class="txt-login-state">
      <input type="checkbox" />
      <span>로그인 상태 유지</span>
    </div>
    <button class="btn-login" @click="login">로그인</button>
    <ul class="option">
      <li><nuxt-link to="/find/id">아이디 찾기</nuxt-link></li>
      <li><nuxt-link to="/find/pwd">비밀번호 찾기</nuxt-link></li>
      <li><nuxt-link to="/join/step01">회원가입</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'login',
  data() {
    return {
      loginState: {
        state: true,
        msg: ''
      },
      user: {
        // userLoginId: 'lasertank21',
        // userPassword: '123123123'
        userLoginId: '',
        userPassword: ''
      }
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    async login() {
      this.user.userLoginId = this.user.userLoginId.trim()
      try {
        const { data } = await this.$store.dispatch('user/login', this.user)
        // document.cookie = `user=${data.result.userName}`
        // this.$store.dispatch('user/memberInfo', data.result)
        console.log('로그인', data)
        localStorage.setItem('name', data.result.userName)
        console.log('data.result', data.result)
        this.$router.push({
          name: 'index'
        })
      } catch (e) {
        this.loginState.state = false
        this.loginState.msg = e.error.message
        this.user.userLoginId = ''
        this.user.userPassword = ''
        return false
      }
      // this.$router.push('/')
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
#login {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  & > * {
    width: 26rem;
    margin: 0 auto;
  }
  h1 {
    // margin: -16rem auto 1.9rem;
    margin: 0 auto 1.9rem;
    text-align: center;
    img {
      width: 9rem;
    }
  }
  .input {
    li + li {
      margin-top: 0.8rem;
    }
    input {
      width: 100%;
      height: 3.8rem;
      padding: 0 1rem;
      border: 1px solid $borderColor;
      border-radius: 0.6rem;
      font-size: 1.3rem;
    }
  }
  .txt-login-state {
    overflow: hidden;
    margin: 1.2rem auto 3.4rem;
    & > * {
      float: left;
      height: 2rem;
      line-height: 2rem;
      color: $fontColor6;
    }
    input[type='checkbox'] {
      margin: 0 0.7rem 0 0;
    }
  }
  .txt-error {
    padding: 0.4rem 0;
    margin: 1rem auto;
    text-align: center;
    color: $errorColor;
  }
  .btn-login {
    height: 3.9rem;
    margin: 0 auto 2.2rem;
    background: $blueColor;
    border-radius: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 3.9rem;
    color: #fff;
  }
  .option {
    text-align: center;
    li {
      display: inline-block;
      font-size: 1.1rem;
      text-align: center;
      color: $fontColor6;
      & + li {
        border-left: 1px solid $borderColor;
      }
      a {
        display: block;
        padding: 0 1.5rem;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
