<template>
  <div id="header">
    <div>
      <h1>
        <nuxt-link to="/"
          ><img src="/common/logo.png" alt="아람 로고"
        /></nuxt-link>
      </h1>
      <ul>
        <li><nuxt-link to="/company">회사 소개</nuxt-link></li>
        <li><nuxt-link to="/philosophy">아람 철학</nuxt-link></li>
        <li><nuxt-link to="/product">아람 제품</nuxt-link></li>
        <li><nuxt-link to="/business">사업 영역</nuxt-link></li>
        <li><nuxt-link to="/news">아람 소식</nuxt-link></li>
      </ul>
    </div>
    <!-- <button id="btnKaTalk" class="btn-fixed box-shadow160" /> -->
    <button
      id="btnMoveTop"
      @click="moveTop()"
      class="btn-fixed box-shadow160"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0)
    this.moveScroll()
  },
  methods: {
    moveScroll() {
      let lastScrollTop = 0,
        delta = 15
      $(window).scroll(function(event) {
        let st = $(this).scrollTop()
        if (Math.abs(lastScrollTop - st) <= delta) return
        if (st > lastScrollTop && lastScrollTop > 0) {
          $('#header').addClass('hide')
        } else {
          $('#header').removeClass('hide')
        }
        lastScrollTop = st
      })
    },
    moveTop() {
      $('html, body').animate({ scrollTop: '0' }, 300)
    },
  },
}
</script>
