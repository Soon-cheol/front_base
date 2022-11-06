<template>
  <div id="contants">
    <div class="top-img">
      <h2>사업 영역</h2>
    </div>
    <ul class="tab">
      <li><nuxt-link to="/product/01">아람 전집</nuxt-link></li>
      <li><nuxt-link to="/product/03">소전집 시리즈/교구</nuxt-link></li>
      <li><nuxt-link to="/product/02">아람 스마트북</nuxt-link></li>
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
      if (to.path === '/product') {
        this.$router.push('/product/01')
      }
    },
  },
  mounted() {
    const path = window.location.pathname
    console.log('path', path)
    if (
      path !== '/product/01' &&
      path !== '/product/02' &&
      path !== '/product/03'
    ) {
      this.$router.push('/product/01')
    }
  },
}
</script>
<style lang="scss" scoped>
.top-img {
  display: table;
  width: 100%;
  height: 229px;
  background: url('/product/top_img.png') no-repeat center;
  background-size: 100%;
  font-size: 46px;
  text-align: center;
  color: #fff;
  h2 {
    display: table-cell;
    width: 100%;
    height: 100%;
    background: url('/product/txt_tit.png') no-repeat center;
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
