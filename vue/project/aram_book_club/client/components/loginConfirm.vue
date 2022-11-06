<template>
  <div v-if="view" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      view: false
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.loggedIn
    })
  },
  created() {
    console.log('this.isLoggedIn', this.isLoggedIn)
    if (!this.isLoggedIn) {
      alert('로그인 후 이용 가능합니다.')
      // this.$router.go(-1)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
