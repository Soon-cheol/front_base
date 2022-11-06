<template>
  <div id="contants">
    <div class="top-img">
      <h2>아람 소식</h2>
    </div>
    <ul class="tab">
      <li><nuxt-link to="/news/notice">공지사항</nuxt-link></li>
      <li><nuxt-link to="/news/release">언론보도</nuxt-link></li>
      <li><nuxt-link to="/news/column">매거진</nuxt-link></li>
    </ul>
    <nuxt-child />
  </div>
</template>

<script>
import '~/assets/css/plugin/tui-grid.css'
import '~/assets/css/plugin/tui-pagination.css'
export default {
  data() {
    return {}
  },
  layout: 'sub',
  watch: {
    $route(to, from) {
      if (to.path === '/news') {
        this.$router.push('/news/notice')
      }
    },
  },
  mounted() {
    const path = window.location.pathname
    console.log('path', path)
    if (
      !path.startsWith('/news/notice') &&
      !path.startsWith('/news/release') &&
      !path.startsWith('/news/column')
    ) {
      this.$router.push('/news/notice')
    }
  },
}
</script>
<style lang="scss" scoped>
.top-img {
  display: table;
  width: 100%;
  height: 229px;
  background: url('/news/top_img.png') no-repeat center;
  background-size: 100%;
  font-size: 46px;
  text-align: center;
  color: #fff;
  h2 {
    display: table-cell;
    width: 100%;
    height: 100%;
    background: url('/news/txt_tit.png') no-repeat center;
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
