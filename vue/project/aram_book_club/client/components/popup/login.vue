<template>
  <div class="popup">
    <div class="popup-center">
      <div>
        <!-- 팝업 컨텐츠 -->
        <div class="popup-contants">
          <button class="btn-close" @click="popupClose" />
          <div class="login-cont">
            <h1>로그인</h1>
            <ul class="input">
              <li>
                <input
                  type="text"
                  v-model="user.userLoginId"
                  placeholder="아이디"
                />
              </li>
              <li>
                <input
                  type="password"
                  v-model="user.userPassword"
                  placeholder="비밀번호"
                />
              </li>
            </ul>
            <p v-if="!loginState.state" class="txt-error">
              {{ loginState.msg }}
            </p>
            <div class="txt-login-state">
              <input type="checkbox" />
              <span>로그인 상태 유지</span>
            </div>
            <button class="btn-login" @click="login">로그인</button>
            <ul class="btn-link">
              <li><nuxt-link to="/find/id">아이디 찾기</nuxt-link></li>
              <li><nuxt-link to="/find/pwd">비밀번호 찾기</nuxt-link></li>
              <li><nuxt-link to="/join/step01">회원가입</nuxt-link></li>
            </ul>
          </div>
        </div>
        <!-- // 팝업 컨텐츠 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  created() {
    //
  },
  methods: {
    // 통신
    async login() {
      try {
        const { data } = await this.$store.dispatch('user/login', this.user)
        // document.cookie = `user=${data.result.userName}`
        localStorage.setItem('name', data.result.userName)
        this.popupClose()
        if (data.result.existPurchasedDgtlProd) {
          if (data.result.goLrngMngmntPage) {
            this.$router.push('/study/learn')
          } else {
            this.$router.push('/study/end')
          }
        } else {
          this.$router.push('/')
        }
      } catch (e) {
        this.loginState.state = false
        this.loginState.msg = e.error.message
        this.user.userLoginId = ''
        this.user.userPassword = ''
        return false
      }
      // this.$router.push('/')
    },
    // 기능
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
      width: 790px;
      height: 520px;
      margin: 0 auto;
      padding: 34px 42px;
      background: #fff url('~static/images/pc/login/bg_kid.png') no-repeat 459px
        100px;
      border-radius: 8px;
    }
  }
}
.login-cont {
  width: 364px;
  margin-left: 6px;
  h1 {
    margin: 35px 0 42px;
    font-size: 22px;
    font-weight: 400;
    text-align: center;
  }
  ul {
    li {
      & + li {
        margin-top: 11px;
      }
      input {
        width: 100%;
        height: 52px;
        border: 1px solid #cfcfcf;
        border-radius: 8px;
      }
    }
  }
  .txt-login-state {
    margin: 18px 0 47px;
    font-size: 16px;
  }
  .btn-login {
    width: 100%;
    height: 50px;
    background: $blueColor;
    border-radius: 28px;
    font-size: 21px;
    color: #fff;
  }
  .btn-link {
    text-align: center;
    li {
      position: relative;
      display: inline-block;
      a {
        font-size: 16px;
        color: $fontColor6;
      }
      & + li {
        margin-left: 22px;
        padding-left: 22px;
        &::before {
          position: absolute;
          content: '';
          display: block;
          width: 2px;
          height: 14px;
          top: 13px;
          left: 0;
          background: #cfcfcf;
        }
        // border-left: 1px solid #cfcfcf;
      }
    }
  }
}
.txt-error {
  width: 100%;
  margin-top: 14px;
  font-size: 18px;
  text-align: center;
  color: #ff794a;
}
.btn-close {
  position: absolute;
  top: 34px;
  right: 42px;
  width: 22px;
  height: 22px;
  background: url('~static/svg2/icon_x.svg') no-repeat center center;
  background-size: 100% auto;
}
</style>
