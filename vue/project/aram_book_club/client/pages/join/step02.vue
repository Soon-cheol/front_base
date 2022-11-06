<template>
  <div
    v-if="$route.params.trmsI"
    class="join-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <joinHeader :active="2" />
    <div class="confirm">
      아람 북클럽에서는 익명 사용자로 인한 피해를 방지하고자 &#91;정보통신망
      이용촉진 및 정보보호 등에 관한 법률 제23조의 2제 1항 &#93; &#60;
      주민등록번호의 사용 제한 &#62;에 의거하여 주민등록번호 사용 및 수집을
      중단하고 휴대전화 또는 이메일주소 인증을 통해 본인을 확인하고 있습니다.
    </div>
    <ul class="btn-confirm">
      <li @click="popupOpen('phone')"><span>휴대폰 인증</span></li>
      <!-- <li @click="popupOpen('email')"><span>이메일 본인 인증</span></li> -->
    </ul>
    <div class="btn-wrap">
      <button @click="joinCancel" class="btn btn-cancel">취소</button>
    </div>
    <!-- <emailComfirm
      v-if="popup === 'email'"
      :trmsI="trmsI"
      @closeCall="popupClose"
    /> -->
    <phoneComfirm
      v-if="popup === 'phone'"
      :trmsI="trmsI"
      @closeCall="popupClose"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import joinHeader from '~/components/layouts/joinHeader'
// import emailComfirm from '~/components/popup/emailComfirm'
import phoneComfirm from '~/components/popup/phoneComfirm'
export default {
  components: { joinHeader, phoneComfirm },
  layout: 'join',
  data() {
    return {
      popup: '',
      trmsI: []
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    if (
      this.$route.params.trmsI === undefined ||
      this.$route.params.trmsI === null ||
      this.$route.params.trmsI === []
    ) {
      this.$router.push({
        name: 'join-step01'
      })
    } else {
      this.trmsI = this.$route.params.trmsI
    }
  },
  methods: {
    popupOpen(txt) {
      this.popup = txt
      // if (txt === 'phone') {
      //   alert('통신사 본인인증으로 처리')
      // }
    },
    popupClose() {
      this.popup = false
    },
    joinCancel() {
      this.$router.push('/')
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
.join-wrap.pc {
  width: 1080px;
  padding: 70px 0 100px;
  margin: 0 auto;
  .confirm {
    margin-top: 20px;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5rem;
    color: $fontColor6;
  }
  .btn-confirm {
    overflow: hidden;
    margin-top: 2rem;
    li {
      width: 520px;
      height: 10rem;
      padding-top: 7rem;
      margin: 0 auto;
      border: 1px solid #ddd;
      background: url('~static/images/mobile/common/ico_phone.png') no-repeat
        center 2.3rem;
      background-size: 2.3rem auto;
      font-size: 1rem;
      text-align: center;
      color: $fontColor6;
      cursor: pointer;
      // &:first-child {
      //   float: left;
      //   background: url('~static/images/mobile/common/ico_phone.png') no-repeat
      //     center 2.3rem;
      //   background-size: 2.3rem auto;
      // }
      // &:last-child {
      //   float: right;
      //   background: url('~static/images/mobile/common/ico_mail.png') no-repeat
      //     center 2.9rem;
      //   background-size: 3.3rem auto;
      // }
    }
  }
  .btn-wrap {
    width: 100%;
    margin-top: 2rem;
    text-align: center;
    button {
      width: 9rem;
      height: 2.5rem;
      background: $fontColor6;
      border-radius: 3rem;
      line-height: 2.5rem;
      font-size: 1rem;
      color: #fff;
    }
  }
}
.join-wrap.mo {
  padding: 3rem 3rem 6rem;
  .confirm {
    margin-top: 20px;
    font-size: 1.3rem;
    line-height: 2rem;
    color: $fontColor9;
  }
  .btn-confirm {
    overflow: hidden;
    margin-top: 2.5rem;
    li {
      width: 100%;
      height: 12.4rem;
      padding-top: 8.5rem;
      border: 0.1rem solid #ddd;
      background: url('~static/images/mobile/common/ico_phone.png') no-repeat
        center 2.3rem;
      background-size: 3rem auto;
      font-size: 1.3rem;
      text-align: center;
      color: $fontColor6;
      // &:first-child {
      //   float: left;
      //   background: url('~static/images/mobile/common/ico_phone.png') no-repeat
      //     center 2.3rem;
      //   background-size: 3rem auto;
      // }
      // &:last-child {
      //   float: right;
      //   background: url('~static/images/mobile/common/ico_mail.png') no-repeat
      //     center 2.9rem;
      //   background-size: 4rem auto;
      // }
    }
  }
  .btn-wrap {
    width: 100%;
    margin-top: 3rem;
    button {
      width: 100%;
      height: 4rem;
      background: $fontColor6;
      border-radius: 0.6rem;
      line-height: 4rem;
      font-size: 1.5rem;
      color: #fff;
    }
  }
}
</style>
