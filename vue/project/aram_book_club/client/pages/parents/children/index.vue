<template>
  <div
    v-if="viewMode"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div class="txt-add-child">
      <p>자녀를 등록해주세요.<br />스마트북 학습 시 자녀설정이 필요합니다.</p>
    </div>
    <div class="add-child">
      <addChild />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
import addChild from '~/components/layouts/addChild'
export default {
  data() {
    return {
      add: false
    }
  },
  components: {
    addChild,
    loginConfirm
  },
  created() {
    this.childListGet()
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    // 통신
    async childListGet() {
      this.add = false
      try {
        const { data } = await this.$axios.get('/child/list')
        if (data.result.length > 0) {
          console.log('등록된 자녀가 있습니다.')
          this.$router.push({
            name: 'parents-children-info'
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    async removeChild(id) {
      if (confirm('등록된 자녀를 삭제하시겠습니까?')) {
        try {
          const { data } = await this.$axios.post('/member/delChild', {
            chldMemId: id
          })
          if (data.ok) {
            alert('완료되었습니다.')
            this.childListGet()
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$fontColor6: #767676;
// pc
.pc {
  width: 1080px;
  margin: 0 auto 4rem;
  // padding-top: 70px;
  .txt-add-child {
    p {
      width: 1920px;
      margin-left: -420px;
      padding: 0 420px;
      height: 12.5rem;
      padding-top: 6.2rem;
      background: #f6f6f6 url('~static/svg2/icon_exclamation.svg') no-repeat
        center 3.8rem;
      background-size: 1.8rem;
      font-size: 1.3rem;
      text-align: center;
      line-height: 1.8rem;
      color: $fontColor6;
    }
  }
  // .add-child {
  //   margin: 3rem;
  // }
}
// mo
.mo {
  margin-bottom: 3rem;
  .txt-add-child {
    p {
      height: 12.5rem;
      padding-top: 6.2rem;
      margin-bottom: 3rem;
      background: #f6f6f6 url('~static/svg2/icon_exclamation.svg') no-repeat
        center 3.8rem;
      background-size: 1.8rem;
      font-size: 1.3rem;
      text-align: center;
      line-height: 1.8rem;
      color: $fontColor6;
    }
  }
  // .add-child {
  //   margin: 3rem;
  // }
  .add-child {
    .add-child-wrap {
      padding: 0 3rem;
    }
  }
}
</style>
