<template>
  <div id="contants">
    <div class="top-img">
      <h2>사업 영역</h2>
    </div>
    <ul class="tab">
      <li><nuxt-link to="/philosophy/01">씨앗독서란?</nuxt-link></li>
      <li><nuxt-link to="/philosophy/02">철학</nuxt-link></li>
      <li><nuxt-link to="/philosophy/03">연계표</nuxt-link></li>
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
      if (to.path === '/philosophy') {
        this.$router.push('/philosophy/01')
      }
    },
  },
  mounted() {
    const path = window.location.pathname
    console.log('path', path)
    if (
      path !== '/philosophy/01' &&
      path !== '/philosophy/02' &&
      path !== '/philosophy/03'
    ) {
      this.$router.push('/philosophy/01')
    }
  },
}
</script>
<style lang="scss" scoped>
.top-img {
  display: table;
  width: 100%;
  height: 229px;
  background: url('/philosophy/top_img.png') no-repeat center;
  background-size: 100%;
  font-size: 46px;
  text-align: center;
  color: #fff;
  h2 {
    display: table-cell;
    width: 100%;
    height: 100%;
    background: url('/philosophy/txt_tit.png') no-repeat center;
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
