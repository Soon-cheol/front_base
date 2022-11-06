<template>
  <div>
    <ul v-if="!logined">
      <li><nuxt-link to="/">메인</nuxt-link></li>
      <li><nuxt-link to="/join/step01">가입</nuxt-link></li>
      <li><nuxt-link to="/login">로그인</nuxt-link></li>
      <li><nuxt-link to="/find/id">아이디/비번찾기</nuxt-link></li>
    </ul>
    <div v-else>
      <button @click="logout">로그아웃</button>
    </div>
    <nuxt-link to="/">아람 북클럽 홈</nuxt-link><br />
    <nuxt-link to="/smart/book">아람 스마트북</nuxt-link><br />
    <!-- hyh 2020.10.19 
    <nuxt-link to="/smartmall">아람 스마트몰</nuxt-link><br /> 
    -->
    <nuxt-link to="/pointmall">아람 포인트몰</nuxt-link><br />
    <nuxt-link to="/library">아람 무비</nuxt-link><br />
    <nuxt-link to="/basket">장바구니</nuxt-link><br />
    <nuxt-link to="/parents/children/">부모페이지</nuxt-link><br />
    <nuxt-link to="/parents/myinfo/confirm">정보수정</nuxt-link><br />
    <nuxt-link to="/parents/myinfo/secession">회원탈퇴</nuxt-link><br />
    <nuxt-link to="/cs">고객센터</nuxt-link><br />
  </div>
</template>
<script>
export default {
  computed: {
    logined() {
      return this.$store.state.auth.loggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
