<template>
  <div v-if="viewMode">
    <loginConfirm />
    <div :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }">
      <div class="info">
        <h2>가입정보</h2>
        <ul class="input">
          <li>
            <span class="tit">성명</span>
            <input
              :value="user.memNm"
              type="text"
              class="disabled"
              readonly="readonly"
              disabled="disabled"
            />
          </li>
          <li>
            <span class="tit">아이디</span>
            <input
              type="text"
              :value="user.loginId"
              class="disabled"
              readonly="readonly"
              disabled="disabled"
            />
          </li>
          <li>
            <span class="tit">휴대전화번호</span>
            <input
              :value="user.phoneNumber"
              placeholder="휴대전화번호"
              type="text"
              class="disabled"
              readonly="readonly"
              disabled="disabled"
            />
            <p class="txt-phone-change">
              휴대폰 번호변경을 원하실 때에는 고객센터 (T:1577-4521)로 연락
              주세요.
            </p>
          </li>
          <li>
            <span class="tit">이메일</span>
            <input type="text" v-model="user.memEmlNm" ref="emailInput" />
          </li>
          <!-- <li>
            <span class="tit">주소</span>
            <div class="addr">
              <button @click="popupOpen(1)">우편번호</button>
              <input
                v-model="user.memZipNo"
                type="text"
                readonly="readonly"
                disabled="disabled"
              />
            </div>
            <div class="addr">
              <input
                type="text"
                ref="detailAddr"
                v-model="user.memBaseAddrNm"
                disabled="disabled"
              />
            </div>
            <div class="addr">
              <input
                type="text"
                ref="detailAddr"
                v-model="user.memDtlAddrNm"
                disabled="disabled"
              />
            </div>
          </li>
          <li>
            <span class="tit">추천 매장(추천인)</span>
            <input
              type="text"
              class="disabled"
              readonly="readonly"
              disabled="disabled"
              v-model="user.rcmdNm"
            />
          </li> -->
        </ul>
      </div>
      <!-- <div class="dev-addr">
        <h2>배송지 정보</h2>
        <label class="same-info" for="sameInfo" @click="infoCheck">
          <input type="checkbox" id="sameInfo" />
          주문 고객 정보와 동일
        </label>
        <ul>
          <li>
            <span class="tit">받는 사람</span>
            <input
              type="text"
              v-model="user.sphpRecrNm"
              placeholder="받는 사람"
            />
          </li>
          <li>
            <span class="tit">받는 사람 휴대폰 번호 </span>
            <div class="phone-input">
              <input
                v-model="user.sphpMblTelRcgnNo"
                ref="sphpMblTelRcgnNo"
                type="text"
                minlength="3"
                maxlength="3"
                @input="numberOnly('p1')"
              />
              <span>-</span>
              <input
                v-model="user.sphpMblTelNatnNo"
                ref="sphpMblTelNatnNo"
                type="text"
                minlength="3"
                maxlength="4"
                @input="numberOnly('p2')"
              />
              <span>-</span>
              <input
                v-model="user.sphpMblTelSeqno"
                ref="sphpMblTelSeqno"
                type="text"
                minlength="4"
                maxlength="4"
                @input="numberOnly('p3')"
              />
            </div>
          </li>
          <li>
            <span class="tit">받는 사람 일반전화번호</span>
            <div class="phone-input">
              <input
                v-model="user.sphpGenTelAreaNo"
                ref="sphpGenTelAreaNo"
                type="text"
                minlength="2"
                maxlength="3"
                @input="numberOnly('p4')"
              />
              <span>-</span>
              <input
                v-model="user.sphpGenTelNatnNo"
                ref="sphpGenTelNatnNo"
                type="text"
                minlength="3"
                maxlength="4"
                @input="numberOnly('p5')"
              />
              <span>-</span>
              <input
                v-model="user.sphpGenTelSeqno"
                ref="sphpGenTelSeqno"
                type="text"
                minlength="4"
                maxlength="4"
                @input="numberOnly('p6')"
              />
            </div>
          </li>
          <li>
            <span class="tit">주소</span>
            <div class="addr">
              <button @click="popupOpen(2)">주소찾기</button>
              <input
                v-model="user.sphpZipNo"
                type="text"
                readonly="readonly"
                disabled="disabled"
              />
            </div>
            <div class="addr">
              <input
                v-model="user.sphpBaseAddrNm"
                type="text"
                readonly="readonly"
                disabled="disabled"
              />
            </div>
            <div class="addr">
              <input
                type="text"
                ref="deliveryAddr"
                v-model="user.sphpDtlAddrNm"
                placeholder="상세주소를 입력해주세요."
              />
            </div>
          </li>
        </ul>
        <table>
          <tbody>
            <tr>
              <th>받는 사람</th>
              <td class="id">
                <input
                  type="text"
                  v-model="user.sphpRecrNm"
                  placeholder="받는 사람"
                />
              </td>
            </tr>
            <tr>
              <th>받는 사람<br />휴대폰번호</th>
              <td class="phone">
                <input
                  v-model="user.sphpMblTelRcgnNo"
                  ref="sphpMblTelRcgnNo"
                  type="text"
                  disabled="disabled"
                  minlength="3"
                  maxlength="3"
                  @input="numberOnly('p1')"
                />
                <span>-</span>
                <input
                  v-model="user.sphpMblTelNatnNo"
                  ref="sphpMblTelNatnNo"
                  type="text"
                  disabled="disabled"
                  minlength="3"
                  maxlength="4"
                  @input="numberOnly('p2')"
                />
                <span>-</span>
                <input
                  v-model="user.sphpMblTelSeqno"
                  ref="sphpMblTelSeqno"
                  type="text"
                  disabled="disabled"
                  minlength="4"
                  maxlength="4"
                  @input="numberOnly('p3')"
                />
              </td>
            </tr>
            <tr>
              <th />
              <td>
                <button
                  @click="phoneChg(1)"
                  ref="btnPhoneChg1"
                  v-if="!dPhoneNumber1.bool"
                >
                  수정하기
                </button>
                <button @click="phoneCnf(1)" ref="btnPhoneChg2" v-else>
                  확인
                </button>
              </td>
            </tr>
            <tr>
              <th>받는 사람<br />일반전화번호</th>
              <td class="phone">
                <input
                  v-model="user.sphpGenTelAreaNo"
                  ref="sphpGenTelAreaNo"
                  type="text"
                  disabled="disabled"
                  minlength="2"
                  maxlength="3"
                  @input="numberOnly('p4')"
                />
                <span>-</span>
                <input
                  v-model="user.sphpGenTelNatnNo"
                  ref="sphpGenTelNatnNo"
                  type="text"
                  disabled="disabled"
                  minlength="3"
                  maxlength="4"
                  @input="numberOnly('p5')"
                />
                <span>-</span>
                <input
                  v-model="user.sphpGenTelSeqno"
                  ref="sphpGenTelSeqno"
                  type="text"
                  disabled="disabled"
                  minlength="4"
                  maxlength="4"
                  @input="numberOnly('p6')"
                />
              </td>
            </tr>
            <tr>
              <th />
              <td>
                <button
                  @click="phoneChg(2)"
                  ref="btnPhoneChg2"
                  v-if="!dPhoneNumber2.bool"
                >
                  수정하기
                </button>
                <button @click="phoneCnf(2)" ref="btnPhoneChg2" v-else>
                  확인
                </button>
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td class="addr">
                <input
                  v-model="user.sphpBaseAddrNm"
                  type="text"
                  readonly="readonly"
                  disabled="disabled"
                /><button @click="popupOpen(2)">주소찾기</button>
              </td>
            </tr>
            <tr>
              <th />
              <td>
                <input
                  type="text"
                  ref="deliveryAddr"
                  v-model="user.sphpDtlAddrNm"
                  placeholder="상세주소를 입력해주세요."
                  disabled="disabled"
                />
              </td>
            </tr>
            <tr>
              <th />
              <td>
                <button @click="addrRe">
                  확인
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <div class="btn-wrap confirm">
        <button class="btn btn-complate" @click="complate">수정</button>
        <button class="btn btn-cancel" @click="cancel">취소</button>
      </div>
      <div class="btn-wrap option">
        <div>
          <nuxt-link to="/parents/myinfo/password" class="button"
            >비밀번호 변경하기</nuxt-link
          >
          <p class="txt-pwd">
            비밀번호 변경은 [비밀번호 변경] 페이지로 이동 후 변경해주세요.
          </p>
          <nuxt-link to="/parents/myinfo/secession" class="button"
            >회원탈퇴 바로가기</nuxt-link
          >
        </div>
      </div>
      <popup v-if="addrPopup1" @closeCall="popupClose1" />
      <popup v-if="addrPopup2" @closeCall="popupClose2" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
import popup from '~/components/popup/addrFind'
export default {
  components: { popup, loginConfirm },
  props: {
    pass: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      addrPopup1: false,
      addrPopup2: false,
      // rendering: false,
      phoneNumber: '',
      // dPhoneNumber1: {
      //   bool: false,
      //   text: ''
      // },
      // dPhoneNumber2: {
      //   bool: false,
      //   text: ''
      // },
      user: {},
      getUser: {}
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  beforeMount() {
    if (!this.$route.params.pass) {
      alert('비밀번호 재확인 후 접근이 가능합니다.')
      this.$router.push({
        name: 'parents-myinfo-confirm'
      })
    }
    this.infoGet()
  },
  methods: {
    // 통신
    async infoGet() {
      const { data } = await this.$axios.get('/member/selMemInfo')
      this.user = data.result
      this.user.phoneNumber =
        this.user.mblTelRcgnNo +
        '-' +
        this.user.mblTelNatnNo +
        '-' +
        this.user.mblTelSeqno
      this.user.sphpChgYn = 'N'
      if (this.user.memEmlNm === undefined) {
        this.user.memEmlNm = ''
      }
      if (this.user.memZipNo === undefined) {
        this.user.memZipNo = ''
      }
      if (this.user.memBaseAddrNm === undefined) {
        this.user.memBaseAddrNm = ''
      }
      if (this.user.memDtlAddrNm === undefined) {
        this.user.memDtlAddrNm = ''
      }
      if (this.user.sphpRecrNm === undefined) {
        this.user.sphpRecrNm = ''
      }
      if (this.user.sphpZipNo === undefined) {
        this.user.sphpZipNo = ''
      }
      if (this.user.sphpBaseAddrNm === undefined) {
        this.user.sphpBaseAddrNm = ''
      }
      if (this.user.sphpDtlAddrNm === undefined) {
        this.user.sphpDtlAddrNm = ''
      }
      if (this.user.sphpGenTelAreaNo === undefined) {
        this.user.sphpGenTelAreaNo = ''
      }
      if (this.user.sphpGenTelNatnNo === undefined) {
        this.user.sphpGenTelNatnNo = ''
      }
      if (this.user.sphpGenTelSeqno === undefined) {
        this.user.sphpGenTelSeqno = ''
      }
      if (this.user.sphpMblTelRcgnNo === undefined) {
        this.user.sphpMblTelRcgnNo = ''
      }
      if (this.user.sphpMblTelNatnNo === undefined) {
        this.user.sphpMblTelNatnNo = ''
      }
      if (this.user.sphpMblTelSeqno === undefined) {
        this.user.sphpMblTelSeqno = ''
      }

      this.getUser.sphpChgYn = this.user.sphpChgYn
      this.getUser.sphpRecrNm = this.user.sphpRecrNm
      this.getUser.sphpZipNo = this.user.sphpZipNo
      this.getUser.sphpBaseAddrNm = this.user.sphpBaseAddrNm
      this.getUser.sphpDtlAddrNm = this.user.sphpDtlAddrNm
      this.getUser.sphpGenTelAreaNo = this.user.sphpGenTelAreaNo
      this.getUser.sphpGenTelNatnNo = this.user.sphpGenTelNatnNo
      this.getUser.sphpGenTelSeqno = this.user.sphpGenTelSeqno
      this.getUser.sphpMblTelRcgnNo = this.user.sphpMblTelRcgnNo
      this.getUser.sphpMblTelNatnNo = this.user.sphpMblTelNatnNo
      this.getUser.sphpMblTelSeqno = this.user.sphpMblTelSeqno
    },
    async infoCheck(e) {
      if (e.target.checked) {
        try {
          const { data } = await this.$axios.get('/member/selMemAddrInfo')
          // this.user.sphpChgYn = 'Y'
          this.user.sphpRecrNm = data.result.memNm
          this.user.sphpMblTelRcgnNo = data.result.mblTelRcgnNo
          this.user.sphpMblTelNatnNo = data.result.mblTelNatnNo
          this.user.sphpMblTelSeqno = data.result.mblTelSeqno
          this.user.sphpBaseAddrNm = data.result.memBaseAddrNm
          this.user.sphpDtlAddrNm = data.result.memDtlAddrNm
          this.user.sphpZipNo = data.result.memZipNo
        } catch (error) {
          console.error(error)
        }
      } else {
        this.user.sphpRecrNm = ''
        this.user.sphpMblTelRcgnNo = ''
        this.user.sphpMblTelNatnNo = ''
        this.user.sphpMblTelSeqno = ''
        this.user.sphpBaseAddrNm = ''
        this.user.sphpDtlAddrNm = ''
        this.user.sphpZipNo = ''
      }
      this.$forceUpdate()
    },
    async complate() {
      // if (this.dPhoneNumber1.bool) {
      //   alert('핸드폰 번호 수정이 완료되지 않았습니다.')
      //   return false
      // }
      // if (this.dPhoneNumber2.bool) {
      //   alert('전화 번호 수정이 완료되지 않았습니다.')
      //   return false
      // }
      // if()
      if (
        this.getUser.sphpChgYn !== this.user.sphpChgYn ||
        this.getUser.sphpRecrNm !== this.user.sphpRecrNm ||
        this.getUser.sphpZipNo !== this.user.sphpZipNo ||
        this.getUser.sphpBaseAddrNm !== this.user.sphpBaseAddrNm ||
        this.getUser.sphpDtlAddrNm !== this.user.sphpDtlAddrNm ||
        this.getUser.sphpGenTelAreaNo !== this.user.sphpGenTelAreaNo ||
        this.getUser.sphpGenTelNatnNo !== this.user.sphpGenTelNatnNo ||
        this.getUser.sphpGenTelSeqno !== this.user.sphpGenTelSeqno ||
        this.getUser.sphpMblTelRcgnNo !== this.user.sphpMblTelRcgnNo ||
        this.getUser.sphpMblTelNatnNo !== this.user.sphpMblTelNatnNo ||
        this.getUser.sphpMblTelSeqno !== this.user.sphpMblTelSeqno
      ) {
        this.user.sphpChgYn = 'Y'
      }

      if (confirm('정보를 수정하시겠습니까?')) {
        try {
          const { data } = await this.$axios.post('/member/updMemInfo', {
            memEmlNm: this.user.memEmlNm,
            memZipNo: this.user.memZipNo,
            memBaseAddrNm: this.user.memBaseAddrNm,
            memDtlAddrNm: this.user.memDtlAddrNm,
            sphpRecrNm: this.user.sphpRecrNm,
            sphpZipNo: this.user.sphpZipNo,
            sphpBaseAddrNm: this.user.sphpBaseAddrNm,
            sphpDtlAddrNm: this.user.sphpDtlAddrNm,
            sphpGenTelAreaNo: this.user.sphpGenTelAreaNo,
            sphpGenTelNatnNo: this.user.sphpGenTelNatnNo,
            sphpGenTelSeqno: this.user.sphpGenTelSeqno,
            sphpMblTelRcgnNo: this.user.sphpMblTelRcgnNo,
            sphpMblTelNatnNo: this.user.sphpMblTelNatnNo,
            sphpMblTelSeqno: this.user.sphpMblTelSeqno,
            sphpChgYn: this.user.sphpChgYn // 배송지 정보 변경 여부
          })
          if (data.result) {
            alert('정보 수정이 완료되었습니다.')
            this.$router.push('/')
          } else {
            alert('다시 시도를 부탁드립니다.')
            this.$router.push({
              name: 'parents-myinfo-confirm'
            })
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        //
      }
    },
    // 기능
    addrRe() {
      this.user.sphpBaseAddrNm = ''
      this.user.sphpDtlAddrNm = ''
      this.user.sphpZipNo = ''
    },
    cancel() {
      this.$router.push({
        name: 'parents-children-info'
      })
    },
    phoneChg(n) {
      // if (n === 1) {
      //   this.dPhoneNumber1.bool = true
      //   this.$refs.sphpMblTelRcgnNo.removeAttribute('disabled')
      //   this.$refs.sphpMblTelNatnNo.removeAttribute('disabled')
      //   this.$refs.sphpMblTelSeqno.removeAttribute('disabled')
      // } else if (n === 2) {
      //   this.dPhoneNumber2.bool = true
      //   this.$refs.sphpGenTelAreaNo.removeAttribute('disabled')
      //   this.$refs.sphpGenTelNatnNo.removeAttribute('disabled')
      //   this.$refs.sphpGenTelSeqno.removeAttribute('disabled')
      // }
    },
    phoneCnf(n) {
      // if (n === 1) {
      //   if (
      //     this.user.sphpMblTelRcgnNo.length !== 3 ||
      //     this.user.sphpMblTelNatnNo.length < 3 ||
      //     this.user.sphpMblTelSeqno.length < 4
      //   ) {
      //     this.user.sphpMblTelRcgnNo = ''
      //     this.user.sphpMblTelNatnNo = ''
      //     this.user.sphpMblTelSeqno = ''
      //     alert('휴대폰 번호를 다시 확인해주세요.')
      //     this.$forceUpdate()
      //   }
      //   this.dPhoneNumber1.bool = false
      //   this.$refs.sphpMblTelRcgnNo.setAttribute('disabled', 'disabled')
      //   this.$refs.sphpMblTelNatnNo.setAttribute('disabled', 'disabled')
      //   this.$refs.sphpMblTelSeqno.setAttribute('disabled', 'disabled')
      // } else if (n === 2) {
      //   if (
      //     this.user.sphpGenTelAreaNo.length < 2 ||
      //     this.user.sphpGenTelNatnNo.length < 3 ||
      //     this.user.sphpGenTelSeqno.length < 4
      //   ) {
      //     this.user.sphpGenTelAreaNo = ''
      //     this.user.sphpGenTelNatnNo = ''
      //     this.user.sphpGenTelSeqno = ''
      //     alert('전화 번호를 다시 확인해주세요.')
      //     this.$forceUpdate()
      //   }
      //   this.dPhoneNumber2.bool = false
      //   this.$refs.sphpGenTelAreaNo.setAttribute('disabled', 'disabled')
      //   this.$refs.sphpGenTelNatnNo.setAttribute('disabled', 'disabled')
      //   this.$refs.sphpGenTelSeqno.setAttribute('disabled', 'disabled')
      // }
    },
    numberOnly(n) {
      const v = /^[0-9]+$/
      switch (n) {
        case 'p1':
          if (!v.test(this.$refs.sphpMblTelRcgnNo.value)) {
            this.user.sphpMblTelRcgnNo = ''
          }
          break
        case 'p2':
          if (!v.test(this.$refs.sphpMblTelNatnNo.value)) {
            this.user.sphpMblTelNatnNo = ''
          }
          break
        case 'p3':
          if (!v.test(this.$refs.sphpMblTelSeqno.value)) {
            this.user.sphpMblTelSeqno = ''
          }
          break
        case 'p4':
          if (!v.test(this.$refs.sphpGenTelAreaNo.value)) {
            this.user.sphpGenTelAreaNo = ''
          }
          break
        case 'p5':
          if (!v.test(this.$refs.sphpGenTelNatnNo.value)) {
            this.user.sphpGenTelNatnNo = ''
          }
          break
        case 'p6':
          if (!v.test(this.$refs.sphpGenTelSeqno.value)) {
            this.user.sphpGenTelSeqno = ''
          }
          break
      }
      this.$forceUpdate()
    },
    popupOpen(n) {
      document.querySelector('#topMenu').style.display = 'none'
      if (n === 1) {
        this.addrPopup1 = true
        this.addrPopup2 = false
      } else if (n === 2) {
        this.addrPopup1 = false
        this.addrPopup2 = true
      }
    },
    popupClose1(data) {
      document.querySelector('#topMenu').style.display = ''
      console.log('주소1', data)
      this.addrPopup1 = false
      this.user.memBaseAddrNm = data.address
      this.user.memZipNo = data.zonecode
      this.$refs.detailAddr.removeAttribute('disabled')
    },
    popupClose2(data) {
      document.querySelector('#topMenu').style.display = ''
      console.log('주소2', data)
      this.addrPopup2 = false
      this.user.sphpBaseAddrNm = data.address
      this.user.sphpZipNo = data.zonecode
      this.$refs.deliveryAddr.removeAttribute('disabled')
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
.pc {
  width: 1080px;
  margin: 0 auto;
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
    padding: 0 1rem;
    .tit {
      display: block;
      margin: 2rem 0 0.3rem;
      font-size: 0.9rem;
      font-weight: 300;
      color: $fontColor9;
    }
    input[type='text'] {
      width: 100%;
      height: 3rem;
      padding: 0;
      background: #fff;
      border: 0 none;
      border-bottom: 1px solid $borderColor;
      font-size: 1.1rem;
      font-weight: 300;
      line-height: 3rem;
      color: $fontColor3;
      &.disabled {
        border-bottom: 0 none;
      }
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
    button {
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
        width: 12rem;
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
    width: 740px;
    padding: 3rem 1.5rem;
    margin: 0 auto;
  }
  .dev-addr {
    float: right;
    width: 520px;
    position: relative;
    padding: 3.5rem 1.5rem;
    .same-info {
      display: inline-block;
      position: absolute;
      top: 3.8rem;
      right: 1.5rem;
      height: 1rem;
      font-size: 0.8rem;
      color: $fontColor9;
      input[type='checkbox'] {
        width: 1rem;
        height: 1rem;
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
    button {
      float: left;
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
      width: 100%;
      padding: 0 18.5rem 5rem;
    }
    &.option {
      float: left;
      width: 1920px;
      height: 290px;
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
          top: 130px;
          padding: 0 0 0 1.7rem;
          background: url('~static/svg2/icon_warning.svg') no-repeat 0 0.2rem;
          background-size: 1.2rem 1.2rem;
          font-size: 0.9rem;
          font-weight: 200;
          line-height: 1.6rem;
          color: $fontColor9;
        }
        a {
          display: block;
          height: 2.5rem;
          background: $fontColor6;
          border-radius: 3rem;
          font-size: 1rem;
          text-align: center;
          line-height: 2.5rem;
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
    padding: 0 1rem;
    .tit {
      display: block;
      margin: 3rem 0 1.2rem;
      font-size: 1.2rem;
      font-weight: 200;
      color: $fontColor9;
    }
    input[type='text'] {
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
      &.disabled {
        border-bottom: 0 none;
      }
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
        width: 15.4rem;
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
    padding: 3rem 1.5rem;
  }
  .dev-addr {
    position: relative;
    padding: 3.5rem 1.5rem 0;
    border-top: 0.8rem solid #f6f6f6;
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
    padding: 3rem 2.5rem 3rem;
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
      margin-bottom: 6rem;
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
