<template>
  <div
    v-if="viewMode"
    class="error-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <h1><img src="~/static/svg2/logo_aram.svg" /></h1>
    <div class="center">
      <i />
      <p>페이지를 찾을 수 없습니다.</p>
      <button @click="goBack">이전 페이지</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'login',
  beforeMount() {
    this.router()
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    router() {
      const url = window.location.pathname
      if (url.indexOf('/hangul/') === 0) {
        location.href = '/hangul'
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
$fontColor3: #191919;
.error-wrap {
  position: relative;
  display: table;
  width: 100%;
  height: 100%;
  text-align: center;
  h1 {
    position: absolute;
    top: 2rem;
    width: 100%;
    img {
      width: 7rem;
    }
  }
  .center {
    display: table-cell;
    vertical-align: middle;
    i {
      display: block;
      width: 4.1rem;
      height: 4.1rem;
      background: url('/images/common/ico_exc.svg');
      background-size: 100%;
      margin: 0 auto 1.5rem;
    }
    p {
      font-size: 1.4rem;
    }
    button {
      width: 9rem;
      height: 2.5rem;
      margin-top: 2rem;
      border: 1px solid #cfcfcf;
      border-radius: 1.3rem;
      font-size: 0.9rem;
      color: $fontColor3;
    }
  }
}
</style>
