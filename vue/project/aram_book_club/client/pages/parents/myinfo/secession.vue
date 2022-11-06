<template>
  <div
    class="secession"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <p class="tit tit01">서비스 탈퇴 전에 아래 내용을 확인해 주세요.</p>
    <ol>
      <li>
        <span class="num">01</span>
        <h3>회원정보 및 결제 이력 전체 삭제</h3>
        <p class="txt">
          회원탈퇴 즉시 회원정보는 모두 삭제되며, 재가입시에도 복원되지
          않습니다.
        </p>
        <ul class="info txt">
          <li>- 이름: {{ info.memNm }}</li>
          <li>
            - 학습내역 : {{ info.memStuCnt }}건<nuxt-link
              to="/study/learn"
              class="txt-link"
              target="_blank"
              >내역확인</nuxt-link
            >
          </li>
          <li>
            - 주문 결제건 : {{ info.memPayCnt }}건<nuxt-link
              to="/buy/smart"
              class="txt-link"
              target="_blank"
              >내역확인</nuxt-link
            >
          </li>
        </ul>
        <p class="txt">
          게시판형 서비스에 등록한 게시물은 삭제되지 않고 유지됩니다.
        </p>
      </li>
      <li>
        <span class="num">02</span>
        <h3>동일아이디로 재가입 제한</h3>
        <p class="txt">
          회원탈퇴 후, 사용하시던 아이디로의 회원 재가입이 불가능합니다.
        </p>
      </li>
      <li>
        <span class="num">03</span>
        <h3>탈퇴 후 정보 보관</h3>
        <p class="txt">
          전자상거래 등에서의 소비자보호에 관한 법률 제6조에 의거 성명, 주소 등
          거래의 주체를 식별할 수 있는 정보에 한하여 서비스 이용에 관한 동의를
          철회한 경우에도 이를 보존할 수 있으며, 동법 시행령 제6조에 의거 다음과
          같이 거래 기록을 보관합니다.
        </p>
        <ul class="txt">
          <li>표시, 광고에 관한 기록 : 6개월</li>
          <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
          <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년</li>
          <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
        </ul>
      </li>
    </ol>
    <div class="reason">
      <p class="tit tit02">어떤 점이 불편하셨나요?</p>
      <p class="txt">
        고객님의 의견을 반영하여 더 좋은 모습으로 찾아 뵙기 위해 노력하겠습니다.
      </p>
      <ul>
        <li v-for="(s, index) in secList" :key="index">
          <label :for="'sec' + index">
            <input
              type="radio"
              :value="s.secnRsnCd"
              :id="'sec' + index"
              @change="secCheck"
              name="secList"
            />
            <span>{{ s.secnRsnCdNm }}</span>
          </label>
        </li>
      </ul>
      <input
        type="text"
        ref="secEtc"
        v-model="user.secnRsn"
        maxlength="20"
        disabled="disabled"
        placeholder="20자 이하로 입력"
      />
    </div>
    <div class="password">
      <div>
        <p class="tit tit03">
          정확한 본인확인을 위해 비밀번호를 입력해 주세요.
        </p>
        <input
          type="text"
          readonly="readonly"
          disabled="disabled"
          :value="info.loginId"
        />
        <input
          type="password"
          ref="loginPwd"
          v-model="user.pwd"
          placeholder="비밀번호"
        />
      </div>
    </div>
    <div class="btn-wrap">
      <button class="btn btn-complate" @click="confirmSec">
        탈퇴하기
      </button>
      <button class="btn btn-cancel">취소</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  data() {
    return {
      info: {},
      user: {
        pwd: '',
        secnRsnCd: '',
        secnRsn: ''
      },
      secList: []
    }
  },
  components: {
    loginConfirm
  },
  beforeMount() {
    this.secListGet()
    this.infoGet()
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    // 통신
    async secListGet() {
      try {
        const { data } = await this.$axios.get('/member/secnRsnList')
        this.secList = data.result
      } catch (error) {
        console.error(error)
      }
    },
    async infoGet() {
      try {
        const { data } = await this.$axios.get('/member/selSignOutInfo')
        this.info = data.result
      } catch (error) {
        console.error(error)
      }
    },
    async confirmSec() {
      if (
        this.user.secnRsnCd === '' ||
        this.user.secnRsnCd === null ||
        this.user.secnRsnCd === undefined
      ) {
        alert('탈퇴사유를 선택해주세요.')
        return false
      }
      if (this.user.secnRsnCd === 'X07') {
        console.log('this.user.secnRsn', this.user.secnRsn)
        if (
          this.user.secnRsn === '' ||
          this.user.secnRsn === null ||
          this.user.secnRsn === undefined
        ) {
          alert('기타사유를 입력해주세요.')
          return false
        }
      }
      if (
        this.user.pwd === '' ||
        this.user.pwd === null ||
        this.user.pwd === undefined
      ) {
        alert('비밀번호를 입력해주세요.')
        return false
      }
      try {
        const { data } = await this.$axios.post('/member/signOut', this.user)
        if (data.result) {
          this.$store.dispatch('user/logout')
          alert('탈퇴가 완료되었습니다.')
          this.$router.push({ name: 'index' })
        } else {
          this.user.pwd = ''
          this.$ref.loginPwd.focus()
          alert('비밀번호가 올바르지 않습니다.')
        }
      } catch (error) {
        alert('오류가 발생했습니다.')
        this.$router.push({ name: 'index' })
        console.error(error)
      }
    },
    // 기능
    secCheck(e) {
      if (e.target.value === 'X07') {
        this.$refs.secEtc.removeAttribute('disabled')
      } else {
        this.$refs.secEtc.setAttribute('disabled', 'disabled')
      }
      this.user.secnRsnCd = e.target.value
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
$purpleColor: #7348ae;
.secession {
  &.pc {
    .tit {
      position: relative;
      font-size: 1.2rem;
      font-weight: 400;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 3.2rem;
        left: 0;
        width: 0.6rem;
        height: 0.6rem;
        background: $purpleColor;
        border-radius: 100%;
      }
      &.tit01 {
        width: 1080px;
        padding: 3rem 1.4rem 2rem 1rem;
        margin: 0 auto;
      }
      &.tit02 {
        padding: 2.5rem 0 1.5rem;
        &::before {
          top: 2.8rem;
          left: -1rem;
        }
      }
      &.tit03 {
        padding: 3rem 0 2.1rem 1rem;
        &::before {
          left: 0;
        }
      }
    }
    ol {
      background: #f6f6f6;
      padding: 0;
      text-align: center;
      & > li {
        width: 1080px;
        margin: 0 auto;
        padding: 1.5rem 0 1.5rem;
        border-bottom: 1px solid #c9c9c9;
        font-size: 0.9rem;
        text-align: left;
        color: $fontColor6;
        font-weight: 300;
        &:last-child {
          border-bottom: 0 none;
        }
        .num {
          display: block;
          margin-bottom: 0.8rem;
          font-size: 2rem;
          font-weight: 600;
          color: $purpleColor;
        }
        h3 {
          margin-bottom: 1.4rem;
          font-size: 1.1rem;
          font-weight: 400;
          color: $fontColor3;
        }
        .txt {
          line-height: 1.3rem;
          .txt-link {
            display: inline-block;
            padding-left: 0.9rem;
            text-decoration: underline;
            color: $blueColor;
          }
        }
        ul {
          margin-top: 1rem;
          & + .txt {
            margin-top: 1rem;
          }
        }
      }
    }
    .reason {
      width: 1080px;
      margin: 0 auto;
      ul {
        margin: 0.5rem 0 1rem;
        font-size: 0.9rem;
        color: $fontColor6;
        line-height: 0.1rem;
        font-weight: 300;
        li {
          display: inline-block;
          width: 33.3%;
          label {
            display: table;

            & > * {
              display: table-cell;
              vertical-align: middle;
            }
            input[type='radio'] {
              margin: 0 0.5rem 0 0;
            }
          }
          & + li {
            margin-top: 1rem;
          }
        }
      }
      .txt {
        font-size: 1rem;
      }
      input[type='text'] {
        width: 100%;
        height: 2.5rem;
        margin: 0 0 2.5rem;
        padding: 1rem;
        border: 1px solid $borderColor;
        border-radius: 0.4rem;
        font-size: 0.9rem;
      }
    }
    .password {
      background: #f6f6f6;
      & > div {
        overflow: hidden;
        width: 1080px;
        margin: 0 auto;
        input {
          float: left;
          width: 520px;
          height: 2.5rem;
          padding: 0 0.9rem;
          border: 1px solid $borderColor;
          border-radius: 0.4rem;
          font-size: 1rem;
          font-weight: 300;
          line-height: 2.5rem;
          color: $fontColor3;
        }
        input[type='password'] {
          float: right;
        }
      }
    }
    .btn-wrap {
      padding: 0 2.5rem 5rem;
      background: #f6f6f6;
      text-align: center;
      button {
        width: 168px;
        height: 2.5rem;
        border-radius: 2rem;
        margin: 2rem 0.4rem 0;
        font-size: 1rem;
        line-height: 2.5rem;
        color: #fff;
        &.btn-complate {
          background: $blueColor;
        }
        &.btn-cancel {
          background: $fontColor6;
        }
      }
    }
  }
  &.mo {
    .tit {
      position: relative;
      font-size: 1.5rem;
      font-weight: 400;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 3.4rem;
        left: 1.5rem;
        width: 0.6rem;
        height: 0.6rem;
        background: $purpleColor;
        border-radius: 100%;
      }
      &.tit01 {
        padding: 3rem 2.4rem 2.1rem 2.4rem;
      }
      &.tit02 {
        padding: 3.3rem 0 1.9rem;
        &::before {
          top: 3.6rem;
          left: -1rem;
        }
      }
      &.tit03 {
        padding: 3rem 0 2.1rem;
        &::before {
          left: -1rem;
        }
      }
    }
    ol {
      background: #f6f6f6;
      padding: 0 1.5rem;
      & > li {
        padding: 1.8rem 1rem 2.5rem;
        border-bottom: 1px solid #c9c9c9;
        font-size: 1.2rem;
        color: $fontColor6;
        font-weight: 300;
        &:last-child {
          border-bottom: 0 none;
        }
        .num {
          display: block;
          margin-bottom: 0.8rem;
          font-size: 2rem;
          font-weight: 600;
          color: $purpleColor;
        }
        h3 {
          margin-bottom: 1.8rem;
          font-size: 1.4rem;
          font-weight: 400;
          color: $fontColor3;
        }
        .txt {
          line-height: 1.8rem;
          .txt-link {
            display: inline-block;
            padding-left: 0.9rem;
            text-decoration: underline;
            color: $blueColor;
          }
        }
        ul {
          margin-top: 1.5rem;
          & + .txt {
            margin-top: 1.5rem;
          }
        }
      }
    }
    .reason {
      padding: 0 2.5rem;
      ul {
        margin: 2rem 0 1.5rem;
        font-size: 1.2rem;
        color: $fontColor3;
        font-weight: 300;
        li {
          width: 100%;
          label {
            display: table;
            color: $fontColor6;
            & > * {
              display: table-cell;
              vertical-align: middle;
            }
            input[type='radio'] {
              margin: 0 0.5rem 0 0;
            }
          }
          & + li {
            margin-top: 1rem;
          }
        }
      }
      input[type='text'] {
        width: 27rem;
        height: 3.8rem;
        margin: 0 0 3rem;
        border: 1px solid $borderColor;
        border-radius: 0.4rem;
      }
    }
    .password {
      padding: 0 2.5rem;
      background: #f6f6f6;
      input {
        display: block;
        width: 100%;
        height: 3.8rem;
        padding: 0 0.9rem;
        border: 1px solid $borderColor;
        border-radius: 0.4rem;
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 3.8rem;
        color: $fontColor3;
      }
      input[type='password'] {
        margin-top: 1rem;
      }
    }
    .btn-wrap {
      padding: 0 2.5rem 5rem;
      background: #f6f6f6;
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
}
</style>
