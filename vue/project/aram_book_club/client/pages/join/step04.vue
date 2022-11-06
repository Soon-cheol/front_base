<template>
  <div
    class="join-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <joinHeader :active="4" />
    <div class="ico-check"><span /></div>
    <h3>회원가입을 환영합니다.</h3>
    <p>
      <!-- {{ loginId }} 님, 아람 북클럽 회원이 되신 것을 축하 드립니다.<br />
      로그인 하신 후 아람북클럽 서비스를 이용해 주세요 -->
      아람 북클럽 회원이 되신 것을 축하 드립니다.<br />로그인 하신 후 아람북클럽
      서비스를 이용해 주세요.
    </p>
    <div class="btn-wrap">
      <button @click="login" class="btn btn-complate">로그인</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import joinHeader from '~/components/layouts/joinHeader'
export default {
  components: { joinHeader },
  layout: 'join',
  data() {
    return {
      emailPopup: false,
      loginId: ''
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    if (
      this.$route.params.loginId === undefined ||
      this.$route.params.loginId === null ||
      this.$route.params.loginId === ''
    ) {
      this.$router.push({
        name: 'join-step01'
      })
    } else {
      this.loginId = this.$route.params.loginId
    }
  },
  methods: {
    login() {
      this.$router.push({
        name: 'login'
      })
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
  &.pc {
    max-width: 1080px;
    margin: 0 auto;
    padding: 70px 0 100px;
  }
  &.mo {
    padding: 3rem 3rem 6rem;
  }
  .ico-check {
    text-align: center;
    span {
      display: inline-block;
      width: 4.3rem;
      height: 4.3rem;
      background: #7348ae url('~static/images/mobile/common/img_check.png')
        no-repeat center center;
      background-size: 100%;
      border-radius: 100%;
    }
  }
  p {
    font-weight: 200;
    text-align: center;
    line-height: 1.8rem;
    color: $fontColor9;
  }
  h3 {
    margin: 2rem 0 2.4rem;
    font-size: 1.8rem;
    font-weight: 400;
    text-align: center;
  }
  .btn-wrap {
    max-width: 520px;
    margin: 3.7rem auto 0;
    button {
      width: 100%;
      height: 4rem;
      background: $blueColor;
      border-radius: 2rem;
      line-height: 4rem;
      font-size: 1.5rem;
      color: #fff;
    }
  }
}
</style>
