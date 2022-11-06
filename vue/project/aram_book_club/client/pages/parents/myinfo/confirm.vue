<template>
  <div v-if="viewMode">
    <loginConfirm />
    <div
      class="myinfo"
      :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
    >
      <h2>비밀번호 입력</h2>
      <div class="input">
        <input
          v-model="pwd"
          ref="pw"
          type="password"
          placeholder="패스워드"
          minlength="8"
          maxlength="15"
        />
      </div>
      <button class="btn-confirm" @click="pwdValidate">확인</button>
      <button class="btn-cancel" @click="cancel">취소</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  data() {
    return {
      pwd: ''
    }
  },
  components: {
    loginConfirm
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    // 통신
    async pwdValidate() {
      try {
        const { data } = await this.$axios.post('/member/checkPwd', {
          pwd: this.pwd
        })
        if (data.result) {
          this.$router.push({
            name: 'parents-myinfo-info',
            params: {
              pass: true
            }
          })
        } else {
          alert('비밀번호를 확인해주세요.')
          this.pwd = ''
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    cancel() {
      this.$router.go(-1)
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
.myinfo.pc {
  width: 1080px;
  margin: 70px auto 240px;
  text-align: center;
  h2 {
    position: relative;
    margin-bottom: 80px;
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
    margin: 0 auto;
    input {
      width: 100%;
      height: 70px;
      padding: 16px;
      border: 1px solid #cfcfcf;
      border-radius: 6px;
      font-size: 1rem;
    }
  }
  button {
    width: 170px;
    height: 2.5rem;
    margin: 0 0.2rem;
    border-radius: 30px;
    line-height: 2.5rem;
    font-size: 1rem;
    color: #fff;
  }
  .btn-confirm {
    margin-top: 2rem;
    background: $blueColor;
  }
  .btn-cancel {
    margin-top: 0.7rem;
    background: $fontColor6;
  }
}
.myinfo.mo {
  padding: 6rem 1.5rem;
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
    width: 100%;
    padding: 2.1rem 1rem 0;
    input {
      width: 100%;
      height: 3.8rem;
      padding: 0.9rem 1.3rem;
      border: 2px solid #cfcfcf;
      border-radius: 0.4rem;
    }
  }
  button {
    display: block;
    width: 27rem;
    height: 4rem;
    margin: 0 1rem;
    border-radius: 0.4rem;
    line-height: 4rem;
    font-size: 1.5rem;
    color: #fff;
  }
  .btn-confirm {
    margin-top: 1.5rem;
    background: $blueColor;
  }
  .btn-cancel {
    margin-top: 0.7rem;
    background: $fontColor6;
  }
}
</style>
