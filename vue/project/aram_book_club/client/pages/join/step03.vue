<template>
  <div
    v-if="$route.params.trmsI"
    class="join-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <!-- <div
    class="join-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  > -->
    <div
      class="join-wrap"
      :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
    >
      <joinHeader :active="3" />
      <div class="info">
        <ul class="input">
          <li class="id">
            <p class="tit">
              <span class="txt-req">(필수)</span>
              <span>아이디</span
              ><span
                class="ment"
                :class="{
                  true: idVal.bool === true,
                  false: idVal.bool === false
                }"
                >{{ idVal.text }}</span
              >
            </p>
            <input
              type="text"
              ref="inputId"
              v-model="user.loginId"
              minlength="6"
              maxlength="12"
              @input="idValidate"
            />
            <!-- <p class="txt-validate">{{ idVal.text }}</p> -->
          </li>
          <li>
            <p class="tit">
              <span class="txt-req">(필수)</span>
              <span>비밀번호</span
              ><span
                class="ment"
                :class="{
                  true: pwdVal1.bool === true,
                  false: pwdVal1.bool === false
                }"
                >{{ pwdVal1.text }}</span
              >
            </p>
            <input
              v-model="pwdVal1.pwd"
              type="password"
              ref="pwdVal1"
              minlength="8"
              maxlength="15"
              @input="pwdValidate1"
            />
          </li>
          <li>
            <p class="tit">
              <span class="txt-req">(필수)</span>
              <span>비밀번호 재확인</span
              ><span
                class="ment"
                :class="{
                  true: pwdVal2.bool === true,
                  false: pwdVal2.bool === false
                }"
                >{{ pwdVal2.text }}</span
              >
            </p>
            <input
              ref="pwdVal2"
              v-model="pwdVal2.pwd"
              type="password"
              minlength="8"
              maxlength="15"
              :class="{ disabled: !pwdVal1.bool }"
              disabled="disabled"
              @input="pwdValidate2"
            />
          </li>
          <li>
            <p class="tit">
              <span class="txt-req">(필수)</span>
              <span>이름</span
              ><span
                class="ment"
                :class="{
                  true: nameVal.bool === true,
                  false: nameVal.bool === false
                }"
                >{{ nameVal.text }}</span
              >
            </p>
            <input
              ref="nameVal"
              v-model="user.memNm"
              type="text"
              maxlength="10"
              @input="nameValidate"
            />
          </li>
          <!-- 2020-10-22 대표님 요청으로 숨김 처리 : 최순철
          <li>
            <p class="tit"><span>추천인</span></p>
            <input
              type="text"
              v-model="user.rcmdNm"
              placeholder="최대 20자"
              maxlength="20"
            />
          </li>
          -->
        </ul>
      </div>
      <div class="dev-addr">
        <ul>
          <li>
            <p class="tit">
              <span class="txt-req">(필수)</span>
              <span>휴대폰 번호</span
              ><span
                class="ment"
                :class="{
                  true: phoneVal.bool === true,
                  false: phoneVal.bool === false
                }"
                >{{ phoneVal.text }}</span
              >
            </p>
            <div class="phone-input">
              <input
                v-model="user.mblTelRcgnNo"
                ref="phoneInput01"
                type="text"
                minlength="3"
                maxlength="3"
                @input="numberOnly('p1')"
              />
              <span>-</span>
              <input
                v-model="user.mblTelNatnNo"
                ref="phoneInput02"
                type="text"
                minlength="3"
                maxlength="4"
                @input="numberOnly('p2')"
              />
              <span>-</span>
              <input
                v-model="user.mblTelSeqno"
                ref="phoneInput03"
                type="text"
                minlength="4"
                maxlength="4"
                @input="numberOnly('p3')"
              />
            </div>
          </li>
          <li>
            <button
              class="btn-check"
              @click="phoneCheck"
              v-if="!phoneVal.bool"
              ref="btnPhoneCheck"
              disabled="disabled"
            >
              전화번호 중복체크
            </button>
          </li>
          <li v-if="emailVal.bool">
            <p class="tit">
              <span class="txt-req">(선택)</span>
              <span>이메일 주소</span
              ><span
                class="ment "
                :class="{
                  true: emailVal.bool === true,
                  false: emailVal.bool === false
                }"
                >{{ emailVal.text }}</span
              >
            </p>
            <input
              type="text"
              v-model="user.memEmlNm"
              ref="emailInput"
              readonly="readonly"
              disabled="disabled"
            />
          </li>
          <li v-else>
            <p class="tit">
              <span class="txt-req">(선택)</span>
              <span>이메일 주소</span
              ><span
                class="ment"
                :class="{
                  true: emailVal.bool === true,
                  false: emailVal.bool === false
                }"
                >{{ emailVal.text }}</span
              >
            </p>
            <input
              type="text"
              v-model="user.memEmlNm"
              ref="emailInput"
              @input="emailValidate"
            />
            <!-- <p class="txt-validate">{{ emailVal.text }}</p> -->
            <button
              class="btn-check"
              v-if="!emailVal.bool"
              @click="emailCheck"
              ref="btnEmailCheck"
              disabled="disabled"
            >
              이메일 중복체크
            </button>
          </li>
          <!-- 2020-10-22 대표님 요청으로 숨김 처리 : 최순철
            <li class="addr">
            <p class="tit"><span>주소</span></p>
            <button class="btn-find" @click="popupOpen">주소찾기</button>
            <input
              v-model="user.memZipNo"
              type="text"
              readonly="readonly"
              disabled="disabled"
            />
          </li>
          <li>
            <input
              type="text"
              ref="detailAddr"
              v-model="user.memBaseAddrNm"
              readonly="readonly"
              disabled="disabled"
            />
          </li>
          <li>
            <input
              type="text"
              ref="detailAddr"
              v-model="user.memDtlAddrNm"
              placeholder="상세주소를 입력해주세요."
            />
          </li> -->
        </ul>
        <popup v-if="addrPopup" @closeCall="popupClose" />
      </div>
    </div>
    <div class="btn-wrap">
      <button v-if="btnComplate" class="btn btn-complate" @click="memberJoin">
        가입 완료
      </button>
      <button v-else class="btn btn-complate" disabled="disabled">
        가입 완료
      </button>
      <button class="btn btn-cancel" @click="joinCancel">취소</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import joinHeader from '~/components/layouts/joinHeader'
import popup from '~/components/popup/addrFind'
export default {
  components: { joinHeader, popup },
  layout: 'join',
  data() {
    return {
      addrPopup: false,
      idVal: {
        bool: false,
        text: '(6~12자의 영문 소문자, 숫자)'
      },
      pwdVal1: {
        bool: false,
        pwd: '',
        text: '(9~15자의 영문, 숫자 또는 특수문자)'
      },
      pwdVal2: {
        bool: false,
        pwd: '',
        text: '(비밀번호가 통과되면 활성화됩니다.)'
      },
      nameVal: {
        bool: false,
        text: '(한글 / 영문을 띄어쓰기 없이 입력해주세요.)'
      },
      emailVal: {
        bool: false,
        text: '(계정 정보 찾기를 위해 입력해 주세요.)'
      },
      phoneVal: {
        bool: false,
        text: '(전화번호 입력 후 중복체크를 해주세요.)'
      },
      // birth: {
      //   yy: '',
      //   mm: '',
      //   dd: ''
      // },
      btnComplate: true,
      user: {
        loginId: '', // 로그인ID(String)
        pwd: '', // 비밀번호(String)
        memNm: '', // 회원명(String)
        memEmlNm: '', // 이메일명(String)
        memBthYmd: '', // 생년월일(String)
        termsI: [],
        memId: '',
        // sexCd: '', // 성별 남:M 여:F(String)
        mblTelRcgnNo: '', // 휴대전화식별번호 010 (String)
        mblTelNatnNo: '', // 휴대전화국번호(String)
        mblTelSeqno: '', // 휴대전화일련번호(String)
        genTelAreaNo: '', // 일반전화지역번호(String) —optional
        genTelNatnNo: '', // 일반전화국번호(String) —optional
        genTelSeqno: '', // 일반전화일련번호(String) —optional
        memZipNo: '', // 회원우편번호 (String) —optional
        memBaseAddrNm: '', // 회원기본주소명(String) —optional
        memDtlAddrNm: '', // 회원상세주소명(String) —optional
        rcmdNm: '' // 추천명(String) —optional
      }
    }
  },
  computed: {
    ...mapState({
      // phoneAgencyList: (state) => state.user.phoneAgency
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
    }
  },
  mounted() {
    // 이메일 인증
    if (this.$route.params.email) {
      this.user.memEmlNm = this.$route.params.email
      this.$refs.emailInput.setAttribute('disabled', 'disabled')
      this.emailVal.bool = true
      this.emailVal.text = ''
      this.user.termsI = this.$route.params.trmsI
    }
    // 휴대폰 인증
    if (
      this.$route.params.mblTelRcgnNo &&
      this.$route.params.mblTelNatnNo &&
      this.$route.params.mblTelSeqno
    ) {
      this.user.mblTelRcgnNo = this.$route.params.mblTelRcgnNo
      this.user.mblTelNatnNo = this.$route.params.mblTelNatnNo
      this.user.mblTelSeqno = this.$route.params.mblTelSeqno

      this.$refs.phoneInput01.setAttribute('disabled', 'disabled')
      this.$refs.phoneInput02.setAttribute('disabled', 'disabled')
      this.$refs.phoneInput03.setAttribute('disabled', 'disabled')

      this.phoneVal.bool = true
      this.phoneVal.text = ''
      this.user.termsI = this.$route.params.trmsI

      this.nameVal.bool = true
      this.user.memNm = this.$route.params.memNm
      this.user.memId = this.$route.params.memInfo.memId
    }
  },
  methods: {
    // 통신
    async idValidate() {
      const v = /^[a-z0-9_]{0,12}$/
      if (v.test(this.user.loginId)) {
        if (this.user.loginId.length <= 5) {
          if (this.user.loginId.length === 0) {
            this.idVal.text = '(6~12자의 영문 소문자, 숫자)'
          } else {
            this.idVal.text = '(아이디는 최소 6자 이상입니다.)'
          }
          this.idVal.bool = false
        } else {
          if (
            this.user.loginId === '' ||
            this.user.loginId === undefined ||
            this.user.loginId === null
          ) {
            this.user.loginId = ''
            this.idVal.text = '(6~12자의 영문 소문자, 숫자)'
            this.idVal.bool = false
            return false
          }
          try {
            const { data } = await this.$axios.get('/member/join/checkIdUse', {
              params: {
                loginId: this.user.loginId
              }
            })
            if (data.result.memResult === '0') {
              this.idVal.text = '(사용 가능한 아이디 입니다.)'
              this.idVal.bool = true
            } else {
              this.idVal.text = '(사용중인 아이디 입니다.)'
              this.idVal.bool = false
            }
          } catch (error) {
            console.error(error)
          }
        }
      } else {
        this.idVal.bool = false
        this.user.loginId = ''
        this.idVal.text = '(6~12자의 영문 소문자, 숫자)'
      }
    },
    async phoneCheck() {
      const pNum =
        this.user.mblTelRcgnNo + this.user.mblTelNatnNo + this.user.mblTelSeqno
      try {
        const { data } = await this.$axios.get('/member/join/checkPhoneUse', {
          params: {
            memTelNum: pNum
          }
        })
        if (data.result.memResult === '0') {
          const sel = document.querySelectorAll('.phone input')
          for (let i = 0; i < sel.length; i++) {
            sel[i].setAttribute('disabled', 'disabled')
          }
          this.phoneVal.bool = true
          this.$refs.phoneInput01.setAttribute('disabled', 'disabled')
          this.$refs.phoneInput02.setAttribute('disabled', 'disabled')
          this.$refs.phoneInput03.setAttribute('disabled', 'disabled')
          this.$refs.btnPhoneCheck.setAttribute('disabled', 'disabled')
          this.phoneVal.text = '(가입 가능한 전화번호 입니다.)'
        } else {
          this.phoneVal.bool = false
          this.phoneVal.text =
            '(가입된 전화번호 입니다. 다른 번호를 사용해주세요.)'
        }
      } catch (error) {
        this.phoneVal.bool = false
        console.error(error)
      }
    },
    async memberJoin() {
      // eslint-disable-next-line no-useless-escape
      const v = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{0,3}$/i
      if (this.user.memEmlNm !== '') {
        if (!v.test(this.user.memEmlNm)) {
          alert('이메일 주소를 양식에 맞게 또는 삭제 부탁드립니다.')
          this.user.memEmlNm = ''
          return false
        }
      }
      if (!this.idVal.bool) {
        this.$refs.inputId.focus()
        alert('사용할 아이디 가입 양식을 확인해주세요.')
        return false
      }
      if (!this.pwdVal1.bool) {
        this.$refs.pwdVal1.focus()
        alert('비밀번호 가입 양식을 확인해주세요.')
        return false
      }
      if (!this.pwdVal2.bool) {
        this.$refs.pwdVal2.focus()
        alert('비밀번호 재확인 가입 양식을 확인해주세요.')
        return false
      }
      if (!this.nameVal.bool) {
        this.$refs.nameVal.focus()
        alert('사용할 이름의 가입 양식을 확인해주세요.')
        return false
      }
      if (!this.phoneVal.bool) {
        this.$refs.phoneInput01.focus()
        alert('전화번호 중복 체크를 해주세요.')
        return false
      }
      this.btnComplate = false
      //   this.user.loginId !== '' &&
      //   this.user.loginId !== undefined &&
      //   this.user.loginId !== null &&
      //   this.user.pwd !== '' &&
      //   this.user.pwd !== undefined &&
      //   this.user.pwd !== null &&
      //   this.user.memNm !== '' &&
      //   this.user.memNm !== undefined &&
      //   this.user.memNm !== null
      // ) {
      //   alert('회원정보를 입력해주세요.')
      // }
      try {
        const { data } = await this.$axios.post('/member/join', {
          loginId: this.user.loginId,
          pwd: this.user.pwd,
          memNm: this.user.memNm,
          mblTelRcgnNo: this.user.mblTelRcgnNo,
          mblTelNatnNo: this.user.mblTelNatnNo,
          mblTelSeqno: this.user.mblTelSeqno,
          termsI: this.user.termsI,
          // optional
          memId: this.user.memId,
          memEmlNm: this.user.memEmlNm,
          memBthYmd: this.user.memBthYmd,
          genTelAreaNo: this.user.genTelAreaNo,
          genTelNatnNo: this.user.genTelNatnNo,
          genTelSeqno: this.user.genTelSeqno,
          memZipNo: this.user.memZipNo,
          memBaseAddrNm: this.user.memBaseAddrNm,
          memDtlAddrNm: this.user.memDtlAddrNm,
          rcmdNm: this.user.rcmdNm
        })
        if (data.ok) {
          this.$router.push({
            name: 'join-step04',
            params: {
              loginId: this.user.loginId
            }
          })
        }
      } catch (error) {
        console.error(error)
        this.btnComplate = false
      }
    },
    async emailCheck() {
      try {
        // 이메일 중복체크
        const { data } = await this.$axios.get('/member/join/checkEmailUse', {
          params: {
            memEmlNm: this.user.memEmlNm
          }
        })
        this.$refs.btnEmailCheck.setAttribute('disabled', 'disabled')
        if (data.result.memResult === '0') {
          // 중복 아닌 경우
          this.emailVal.bool = true
          this.$refs.emailInput.setAttribute('disabled', 'disabled')
          this.$refs.emailInput.setAttribute('readonly', 'readonly')
          this.emailVal.text = '(사용 가능한 이메일입니다.)'
        } else {
          this.emailVal.bool = false
          this.user.memEmlNm = ''
          this.emailVal.text = '(이미 사용중인 이메일입니다.)'
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능,
    joinCancel() {
      this.$router.push('/')
    },
    popupOpen() {
      this.addrPopup = true
    },
    popupClose(data) {
      // console.log('주소', data)
      this.addrPopup = false
      this.user.memBaseAddrNm = data.address
      this.user.memZipNo = data.zonecode
      this.$refs.detailAddr.removeAttribute('disabled')
    },
    pwdValidate1() {
      if (this.pwdVal1.pwd.length > 8) {
        this.pwdVal1.text = '(사용 가능한 비밀번호 입니다.)'
        this.pwdVal2.text = '(비밀번호 재확인을 해주세요.)'
        this.pwdVal1.bool = true
        this.$refs.pwdVal2.removeAttribute('disabled')
      } else {
        this.pwdVal1.text = '(9~15자의 영문, 숫자 또는 특수문자)'
        this.pwdVal2.text = ''
        this.pwdVal2.text = '(비밀번호가 통과되면 활성화됩니다.)'
        this.pwdVal1.bool = false
        this.pwdVal2.bool = false
        this.$refs.pwdVal2.setAttribute('disabled', 'disabled')
      }
      this.pwdVal2.pwd = ''
    },
    pwdValidate2() {
      if (this.pwdVal2.pwd === this.pwdVal1.pwd) {
        this.pwdVal2.text = '(비밀번호가 일치합니다.)'
        this.pwdVal2.bool = true
        this.user.pwd = this.pwdVal1.pwd
      } else {
        this.pwdVal2.text = '(비밀번호가 일치하지 않습니다.)'
        this.pwdVal2.bool = false
        this.user.pwd = ''
      }
    },
    nameValidate() {
      // eslint-disable-next-line no-useless-escape
      const v = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/
      if (this.user.memNm.length > 0) {
        if (v.test(this.user.memNm)) {
          // 맞는경우
          this.nameVal.bool = true
          this.nameVal.text = '(가입이 가능한 이름입니다.)'
        } else {
          // 틀린경우
          this.nameVal.bool = false
          this.nameVal.text = '(한글 / 영문을 띄어쓰기 없이 입력해주세요.)'
          this.user.memNm = ''
        }
      } else {
        // 입력을 안한 경우
        this.nameVal.bool = false
        this.nameVal.text = '(한글 / 영문을 띄어쓰기 없이 입력해주세요.)'
      }
    },
    emailValidate() {
      // eslint-disable-next-line no-useless-escape
      const v = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{1,3}$/i
      if (v.test(this.user.memEmlNm)) {
        this.$refs.btnEmailCheck.removeAttribute('disabled')
        this.emailVal.text = '(e-mail 중복 체크를 진행해주세요.)'
      } else if (
        this.user.memEmlNm === '' ||
        this.user.memEmlNm === null ||
        this.user.memEmlNm === undefined
      ) {
        this.emailVal.text = '(e-mail 을 입력해주세요.)'
        this.$refs.btnEmailCheck.setAttribute('disabled', 'disabled')
      } else {
        this.emailVal.text = '(e-mail 형식이 올바르지 않습니다.)'
        this.$refs.btnEmailCheck.setAttribute('disabled', 'disabled')
      }
    },
    numberOnly(n) {
      const v = /^[0-9]+$/
      switch (n) {
        case 'p1':
          if (!v.test(this.user.mblTelRcgnNo)) {
            this.user.mblTelRcgnNo = ''
          } else {
            this.phoneValidate()
          }
          break
        case 'p2':
          if (!v.test(this.user.mblTelNatnNo)) {
            this.user.mblTelNatnNo = ''
          } else {
            this.phoneValidate()
          }
          break
        case 'p3':
          if (!v.test(this.user.mblTelSeqno)) {
            this.user.mblTelSeqno = ''
          } else {
            this.phoneValidate()
          }
          break
        case 'b1':
          if (!v.test(this.birth.yy)) {
            this.birth.yy = ''
          }
          break
        case 'b2':
          if (!v.test(this.birth.mm)) {
            this.birth.mm = ''
          }
          break
        case 'b3':
          if (!v.test(this.birth.dd)) {
            this.birth.dd = ''
          }
          break
      }
    },
    phoneValidate() {
      if (
        this.user.mblTelRcgnNo.length === 3 &&
        this.user.mblTelSeqno.length === 4 &&
        this.user.mblTelNatnNo.length >= 3
      ) {
        // 전번 10개 이상일 경우
        const pNum =
          this.user.mblTelRcgnNo +
          this.user.mblTelNatnNo +
          this.user.mblTelSeqno
        this.$refs.btnPhoneCheck.removeAttribute('disabled')
        this.phoneVal.text = '(중복체크 버튼을 눌러주세요.)'
      } else {
        // 전번 10개 미만일 경우
        this.$refs.btnPhoneCheck.setAttribute('disabled', 'disabled')
        this.phoneVal.text = '(전화번호 입력을 확인해주세요.)'
      }
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
$errorColor: #ff6666;
.ment {
  &.true {
    color: $blueColor;
  }
  &.false {
    color: $errorColor;
  }
}
// .tit {
//   position: relative;
//   padding-left: 1rem;
//   &::before {
//     position: absolute;
//     top: 0.1rem;
//     left: 0;
//     content: '';
//     display: block;
//     width: 0.4rem;
//     height: 0.4rem;
//     background: $blueColor;
//     border-radius: 100%;
//   }
// }
.pc {
  overflow: hidden;
  width: 1080px;
  margin: 0 auto;
  padding: 70px 0;
  .txt-req {
    font-size: 1.1rem;
    color: $fontColor9;
    span {
      color: #ff3131;
    }
  }
  h2 {
    position: relative;
    padding-left: 1rem;
    font-size: 1.3rem;
    font-weight: 400;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0.2rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $blueColor;
      border-radius: 100%;
    }
  }
  li {
    .tit {
      width: 100%;
      margin: 2rem 0 0.3rem;
      font-size: 0.9rem;
      font-weight: 300;
      color: $fontColor9;
      span {
        &.txt-req {
          font-size: 0.8rem;
          color: $fontColor3;
        }
        &.ment {
          display: inline-block;
          margin-left: 0.2rem;
          font-size: 0.8rem;
          // color: $fontColor6;
        }
      }
    }
    input[type='text'],
    input[type='password'] {
      width: 100%;
      height: 3rem;
      padding: 0;
      background: #fff;
      border: 0 none;
      border-bottom: 1px solid $borderColor;
      font-size: 1rem;
      font-weight: 300;
      line-height: 3rem;
      color: $fontColor3;
      input[type='text']:disabled {
        border-bottom: 0 none;
      }
    }
    .btn-check {
      width: 100%;
      height: 2.5rem;
      border: 1px solid $fontColor9;
      border-radius: 0.2rem;
      margin-top: 1rem;
      font-size: 0.9rem;
      line-height: 2.5rem;
      color: $fontColor6;
    }
  }
  .addr {
    overflow: hidden;
    & + .addr {
      margin-top: 0.5rem;
    }
    input {
      height: 3.5rem;
      padding: 0 0.5rem;
      border: 1px solid $borderColor;
      font-size: 1.1rem;
    }
    .btn-find {
      float: left;
      margin-top: 0.7rem;
      width: 8rem;
      height: 2.5rem;
      background: $fontColor6;
      border-radius: 0.2rem;
      font-size: 1rem;
      line-height: 2.5rem;
      color: #fff;
      & + input[type='text'] {
        float: right;
        width: 13rem;
      }
    }
  }
  .txt-phone-change {
    background: url('~static/images/common/ico_dot.png') no-repeat 0.2rem 0.4rem;
    margin-top: 0.6rem;
    padding-left: 0.8rem;
    font-size: 1rem;
  }
  .info {
    float: left;
    width: 520px;
    padding: 0 1.5rem;
  }
  .dev-addr {
    float: right;
    width: 520px;
    position: relative;
    padding: 0 1.5rem;
    .same-info {
      display: inline-block;
      position: absolute;
      top: 3.5rem;
      right: 1.5rem;
      height: 2rem;
      font-size: 1.1rem;
      color: $fontColor9;
      input[type='checkbox'] {
        width: 1.4rem;
        height: 1.4rem;
        border: 1px solid $fontColor9;
        border-radius: 0.4rem;
      }
    }
    .phone-input {
      display: table;
      & > * {
        display: table-cell;
        text-align: center;
      }
      span {
        padding: 0 1rem;
      }
    }
  }
  .btn-wrap {
    text-align: center;
    button {
      width: 8rem;
      height: 2.5rem;
      border-radius: 3rem;
      font-size: 1rem;
      color: #fff;
      & + button {
        margin-left: 1rem;
      }
      &.btn-complate {
        background: $blueColor;
      }
      &.btn-cancel {
        background: $fontColor6;
      }
    }
    &.confirm {
      float: left;
      width: 520px;
      margin-top: 176px;
    }
    &.option {
      float: left;
      width: 1920px;
      height: 332px;
      padding: 0 420px;
      margin-left: -420px;
      background: #f6f6f6;
      & > div {
        position: relative;
        & > * {
          position: absolute;
          width: 520px;
        }
        .txt-pwd {
          top: 158px;
          padding: 0 0 0 1.7rem;
          background: url('~static/svg2/icon_warning.svg') no-repeat 0 0.2rem;
          background-size: 1.2rem 1.2rem;
          font-size: 1.1rem;
          font-weight: 200;
          line-height: 1.6rem;
          color: $fontColor9;
        }
        a {
          display: block;
          height: 4rem;
          background: $fontColor6;
          border-radius: 0.4rem;
          font-size: 1.5rem;
          text-align: center;
          line-height: 4rem;
          color: #fff;
          &:first-child {
            top: 60px;
            left: 0;
          }
          &:last-child {
            top: 60px;
            right: 0;
          }
        }
      }
    }
  }
}
.mo {
  padding: 3rem;
  .txt-req {
    font-size: 1.1rem;
    color: $fontColor9;
    span {
      color: #ff3131;
    }
  }
  h2 {
    position: relative;
    padding-left: 1rem;
    font-size: 1.5rem;
    font-weight: 400;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0.2rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $blueColor;
      border-radius: 100%;
    }
  }
  li {
    .tit {
      display: block;
      margin: 3rem 0 1.2rem;
      font-size: 1.2rem;
      font-weight: 200;
      color: $fontColor9;
    }
    input[type='text'],
    input[type='password'] {
      width: 100%;
      height: 3.5rem;
      padding: 0;
      background: #fff;
      border: 0 none;
      border-bottom: 1px solid $borderColor;
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 3rem;
      color: $fontColor6;
    }
    .btn-check {
      width: 100%;
      height: 3rem;
      border: 2px solid $fontColor9;
      border-radius: 0.2rem;
      margin-top: 1.2rem;
      font-size: 1.2rem;
      line-height: 2.6rem;
      color: $fontColor6;
    }
  }
  .addr {
    overflow: hidden;
    & + .addr {
      margin-top: 0.5rem;
    }
    input {
      height: 3.5rem;
      padding: 0 0.5rem;
      border: 1px solid $borderColor;
      font-size: 1.2rem;
    }
    button {
      float: left;
      width: 11rem;
      height: 3.5rem;
      background: $fontColor6;
      border-radius: 0.2rem;
      font-size: 1.3rem;
      line-height: 3.3rem;
      color: #fff;
      & + input[type='text'] {
        float: right;
        width: 13.4rem;
      }
    }
  }
  .txt-phone-change {
    background: url('~static/images/common/ico_dot.png') no-repeat 0.2rem 0.4rem;
    margin-top: 0.6rem;
    padding-left: 0.8rem;
    font-size: 1rem;
  }
  .dev-addr {
    position: relative;
    .same-info {
      display: inline-block;
      position: absolute;
      top: 3.5rem;
      right: 1.5rem;
      height: 2rem;
      font-size: 1.1rem;
      color: $fontColor9;
      input[type='checkbox'] {
        width: 1.4rem;
        height: 1.4rem;
        border: 1px solid $fontColor9;
        border-radius: 0.4rem;
      }
    }
    .phone-input {
      display: table;
      & > * {
        display: table-cell;
        text-align: center;
      }
      span {
        padding: 0 1rem;
      }
    }
  }
  .btn-wrap {
    padding: 3rem 0;
    button {
      display: block;
      width: 100%;
      height: 4rem;
      border-radius: 0.4rem;
      font-size: 1.5rem;
      color: #fff;
      & + button {
        margin-top: 0.7rem;
      }
      &.btn-complate {
        background: $blueColor;
      }
      &.btn-cancel {
        background: $fontColor6;
      }
    }
    &.option {
      background: #f6f6f6;
      .txt-pwd {
        padding: 1rem 0 2.5rem 1.7rem;
        background: url('~static/svg2/icon_warning.svg') no-repeat 0 1.2rem;
        background-size: 1.2rem 1.2rem;
        font-size: 1.1rem;
        font-weight: 200;
        line-height: 1.6rem;
        color: $fontColor9;
      }
      a {
        display: block;
        width: 100%;
        height: 4rem;
        background: $fontColor6;
        border-radius: 0.4rem;
        font-size: 1.5rem;
        text-align: center;
        line-height: 4rem;
        color: #fff;
      }
    }
  }
}
</style>
