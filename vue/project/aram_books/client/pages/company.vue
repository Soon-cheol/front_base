<template>
  <div id="contants">
    <div class="top-img">
      <h2>회사 소개</h2>
    </div>
    <ul class="tab">
      <li><nuxt-link to="/company/intro">아람 소개</nuxt-link></li>
      <li><nuxt-link to="/company/history">아람 연혁</nuxt-link></li>
      <li><nuxt-link to="/company/map">오시는길</nuxt-link></li>
      <li><nuxt-link to="/company/find">공식 판매처</nuxt-link></li>
    </ul>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  layout: 'sub',
  watch: {
    $route(to, from) {
      if (to.path === '/company') {
        this.$router.push('/company/intro')
      }
    },
  },
  mounted() {
    const path = window.location.pathname
    console.log('path', path)
    if (
      path !== '/company/intro' &&
      path !== '/company/history' &&
      path !== '/company/map' &&
      path !== '/company/find'
    ) {
      this.$router.push('/company/intro')
    }
  },
}
</script>
<style lang="scss" scoped>
.top-img {
  display: table;
  width: 100%;
  height: 229px;
  background: url('/company/top_img.png') no-repeat center;
  background-size: 100%;
  font-size: 46px;
  text-align: center;
  color: #fff;
  h2 {
    display: table-cell;
    width: 100%;
    height: 100%;
    background: url('/company/txt_tit.png') no-repeat center;
    font-size: 0;
  }
}
.tab {
  border-bottom: 1px solid #cfcfcf;
  li {
    display: inline-block;
    & + li {
      margin-left: 80px;
    }
    a {
      display: block;
      padding: 20px 14px;
      font-size: 20px;
      color: #999;
      &.nuxt-link-active {
        border-bottom: 5px solid#72cbd2;
        color: #333;
      }
    }
  }
}
</style>
