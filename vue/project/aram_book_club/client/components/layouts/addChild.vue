<template>
  <div class="add-child-wrap">
    <h3>자녀등록</h3>
    <div>
      <label class="file-label" for="file1">사진 등록</label>
      <div id="imgFileView"><img ref="imgView" /></div>
      <input
        id="file1"
        ref="fileUpload1"
        type="file"
        accept="image/*"
        @change="onFileChange()"
      />
      <ul>
        <li>
          <h4>자녀 이름</h4>
          <input
            type="text"
            v-model="child.chldMemNm"
            maxlength="6"
            placeholder="자녀 이름"
            @input="nameValidate"
          />
          <P>{{ name.text }}</P>
        </li>
        <li>
          <h4>생년월일</h4>
          <div class="birthday">
            <select ref="birthYY" @change="birthSel('yy')" />
            <span>.</span>
            <select ref="birthMM" @change="birthSel('mm')" />
            <span>.</span>
            <select ref="birthDD" @change="birthSel('dd')">
              <option v-for="(d, index) in dayList" :key="index" :value="d">{{
                d
              }}</option>
            </select>
          </div>
          <!-- <div class="birthday">
            <input
              v-model="birth.yy"
              type="text"
              minlength="4"
              maxlength="4"
              placeholder="YYYY"
              @input="numberOnly('b1')"
            />
            <span>.</span>
            <input
              v-model="birth.mm"
              type="text"
              minlength="2"
              maxlength="2"
              placeholder="MM"
              @input="numberOnly('b2')"
            />
            <span>.</span>
            <input
              v-model="birth.dd"
              type="text"
              minlength="2"
              maxlength="2"
              placeholder="DD"
              @input="numberOnly('b3')"
            />
          </div> -->
        </li>
        <li>
          <h4>성별</h4>
          <div class="gender">
            <ul>
              <li>
                <input
                  type="radio"
                  id="genderM"
                  ref="genderM"
                  name="gender"
                  value="m"
                  checked="checked"
                />
                <label for="genderM">남</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="genderF"
                  ref="genderF"
                  name="gender"
                  value="f"
                />
                <label for="genderF">여</label>
              </li>
            </ul>
            <p>{{ gender.text }}</p>
          </div>
        </li>
      </ul>
      <p class="txt-defulat-img">
        학습페이지에 노출되는 정보입니다.<br />
        사진 미 설정 시 기본 이미지가 노출됩니다.
      </p>
    </div>
    <button v-if="!add" @click="childListGet" class="btn-add">자녀등록</button>
    <button v-else class="btn-add">자녀등록</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      name: {
        bool: false,
        text: ''
      },
      birth: {
        bool: false,
        text: '',
        yy: '',
        mm: '',
        dd: ''
      },
      gender: {
        bool: false,
        text: ''
      },
      child: {
        chldMemNm: '',
        chldBthYmd: '',
        chldSexCd: ''
      },
      add: false,
      dayList: [],
      file: {},
      imgView: '',
      childList: false
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  mounted() {
    this.setDay()
  },
  methods: {
    async childListGet() {
      if (
        this.child.chldMemNm === '' ||
        this.child.chldMemNm === undefined ||
        this.child.chldMemNm === null
      ) {
        alert('자녀 이름을 입력해주세요.')
        this.child.chldMemNm = ''
        return false
      }
      this.child.chldBthYmd = this.birth.yy + this.birth.mm + this.birth.dd
      if (this.child.chldBthYmd.length !== 8) {
        alert('자녀의 생년월일을 확인해주세요.')
        this.child.chldBthYmd = ''
        return false
      }
      if (!this.$refs.genderM.checked && !this.$refs.genderF.checked) {
        alert('자녀의 성별을 선택해주세요.')
        return false
      } else if (this.$refs.genderM.checked) {
        this.child.chldSexCd = 'M'
      } else if (this.$refs.genderF.checked) {
        this.child.chldSexCd = 'F'
      }
      try {
        const { data } = await this.$axios.get('/child/list')
        this.childList = data.result
        if (this.childList.length >= 5) {
          alert(
            '5자녀까지만 등록이 가능합니다.\n더 이상의 자녀는 등록할 수 없습니다.'
          )
        } else {
          this.add = true
          this.addChild()
        }
      } catch (error) {
        console.error(error)
      }
    },
    async addChild() {
      try {
        const formData = new FormData()

        formData.append('chldMemNm', this.child.chldMemNm)
        formData.append('chldBthYmd', this.child.chldBthYmd)
        formData.append('chldSexCd', this.child.chldSexCd)
        formData.append('file', this.file)

        const { data } = await this.$axios.post('/child/insOne', formData, {
          headers: {
            'Content-Type': 'multiparnt/form-data'
          }
        })
        if (data.ok) {
          alert('자녀 추가가 완료되었습니다.')
          this.$router.push({
            name: 'parents-children-info'
          })
          this.$emit('pChildListGet')
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    setDay() {
      //
      var start_year = '2000' // 시작할 년도
      var today = new Date()
      var today_year = today.getFullYear()
      var index = 1
      this.$refs.birthYY.options[0] = new Option('선택', 0)
      this.$refs.birthMM.options[0] = new Option('선택', 0)
      this.$refs.birthDD.options[0] = new Option('선택', 0)
      for (var y = start_year; y <= today_year; y++) {
        //start_year ~ 현재 년도
        this.$refs.birthYY.options[index] = new Option(y, y)
        index++
      }
      index = 1
      for (var m = 1; m <= 12; m++) {
        if (m < 10) {
          m = `0${m}`
        }
        this.$refs.birthMM.options[index] = new Option(m, m)
        index++
      }
      this.lastday('01')
    },
    birthSel(txt) {
      if (txt === 'yy') {
        this.birth.yy = this.$refs.birthYY.value
      } else if (txt === 'mm') {
        this.birth.mm = this.$refs.birthMM.value
        this.lastday(this.birth.mm)
      } else if (txt === 'dd') {
        this.birth.dd = this.$refs.birthDD.value
      }
    },
    lastday(mm) {
      this.dayList = []
      let day = 31
      if (mm === '02') {
        day = 29
      } else if (mm === '04' || mm === '06' || mm === '09' || mm === '11') {
        day = 30
      }
      for (var i = 1; i <= day; i++) {
        i < 10 ? this.dayList.push(`0${i}`) : this.dayList.push(i)
      }
    },
    onFileChange(e) {
      // 미리보기
      var reader = new FileReader()
      reader.onload = function() {
        // var img = document.createElement('img')
        document
          .querySelector('div#imgFileView img')
          .setAttribute('src', event.target.result)
        // document.querySelector('div#imgFileView').appendChild(img)
        // this.imgView = event.target.result
        // console.log('this.imgView', this.imgView)
      }
      var file = event.target.files[0]
      if (file) {
        reader.readAsDataURL(file)
      }
      // 데이터에 파일 추가
      const files = event.target.files || event.dataTransfer.files
      this.file = files[0]
    },
    nameValidate() {
      // eslint-disable-next-line no-useless-escape
      const v = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/
      if (this.child.chldMemNm.length > 0) {
        if (v.test(this.child.chldMemNm)) {
          this.name.text = ''
        } else {
          this.name.text = ': 한글과 영문만 가능'
          this.child.chldMemNm = ''
        }
      } else {
        this.name.text = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$fontColor3: #191919;
$fontColor6: #767676;
$fontColor9: #999;
$height: 35px;

// pc
.pc {
  input[type='text'] {
    width: 100%;
    height: 3rem;
    padding: 0 1.3rem;
    border: 1px solid #cfcfcf;
    border-radius: 0.4rem;
    font-size: 1rem;
  }
  .add-child-wrap {
    width: 1920px;
    margin-left: -420px;
    padding: 0 420px;
    border-top: 16px solid #f6f6f6;
    h3 {
      position: relative;
      padding-left: 0.9rem;
      margin: 60px 0 30px;
      font-size: 1.3rem;
      font-weight: 400;
      color: $fontColor3;
      &::before {
        position: absolute;
        content: '';
        display: inline-block;
        top: 6px;
        left: 0;
        width: 0.6rem;
        height: 0.6rem;
        background: #a3c15d;
        border-radius: 100%;
      }
    }
    & > div {
      position: relative;
      overflow: hidden;
      height: 24rem;
      h4 {
        margin-bottom: 0.6rem;
        font-size: 1.1rem;
        font-weight: 400;
      }
      label.file-label {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 500px;
        height: 22rem;
        padding-top: 13rem;
        margin-bottom: 1rem;
        background: transparent url('~static/svg2/icon_plus_gray.svg') no-repeat
          center 9rem;
        background-size: 3rem;
        border: 1px solid #cfcfcf;
        border-radius: 0.4rem;
        text-align: center;
        color: $fontColor9;
        font-size: 0.9rem;
        z-index: 2;
      }
      input[type='file'] {
        display: none;
      }
      & > ul {
        position: absolute;
        top: 0;
        right: 0;
        width: 520px;
        li {
          & + li {
            margin-top: 1rem;
          }
          .birthday {
            overflow: hidden;
            & > * {
              float: left;
            }
            select {
              width: 30%;
              border: 1px solid #cfcfcf;
              border-radius: 0.4rem;
              text-align: center;
              color: $fontColor6;
            }
            span {
              display: block;
              width: 5%;
              height: 62px;
              line-height: 62px;
              text-align: center;
            }
          }
          .gender {
            ul {
              overflow: hidden;
              width: 100%;
              li {
                width: 12.7rem;
                margin-top: 0;
                border-radius: 1.6rem;
                border: 1px solid #dfdfdf;
                font-size: 1rem;
                text-align: center;
                &:nth-child(1) {
                  float: left;
                }
                &:nth-child(2) {
                  float: right;
                }
                label {
                  display: block;
                  width: 100%;
                  padding: 16px 0;
                  border-radius: 2rem;
                }
                input[type='radio'] {
                  display: none;
                  &:checked + label {
                    background: $fontColor6;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
      .txt-defulat-img {
        position: absolute;
        top: 17rem;
        right: 0;
        width: 520px;
        padding-left: 1.7rem;
        margin: 2rem 0 2.2rem;
        background: url('~static/svg2/icon_exclamation.svg') no-repeat 0 0.3rem;
        background-size: 1.2rem;
        line-height: 1.5rem;
        color: $fontColor9;
        font-size: 0.9rem;
        font-weight: 300;
      }
    }
    .btn-add {
      width: 9rem;
      height: 2.5rem;
      margin: 0 22.5rem;
      background: #a3c15d;
      border-radius: 3rem;
      font-size: 1rem;
      line-height: 2.5rem;
      color: #fff;
    }
  }
}
// mo
.mo {
  input[type='text'] {
    width: 100%;
    height: 3.8rem;
    padding: 0 1.3rem;
    border: 1px solid #cfcfcf;
    border-radius: 0.4rem;
    font-size: 1.3rem;
  }
  .add-child-wrap {
    position: relative;
    h3 {
      position: relative;
      padding-left: 0.9rem;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      font-weight: 400;
      color: $fontColor3;
      &::before {
        position: absolute;
        content: '';
        display: inline-block;
        top: 0.3rem;
        left: 0;
        width: 0.6rem;
        height: 0.6rem;
        background: #a3c15d;
        border-radius: 100%;
      }
    }
    h4 {
      margin-bottom: 0.6rem;
      font-size: 1.2rem;
      font-weight: 400;
    }
    label.file-label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 26rem;
      padding-top: 15rem;
      margin-bottom: 2rem;
      background: transparent url('~static/svg2/icon_plus_gray.svg') no-repeat
        center 11.1rem;
      background-size: 3rem;
      border-radius: 0.4rem;
      text-align: center;
      color: $fontColor9;
      z-index: 2;
    }
    input[type='file'] {
      display: none;
    }
    input[type='file'] + ul {
      margin-top: 26rem;
      li {
        & + li {
          margin-top: 1rem;
        }
        .birthday {
          overflow: hidden;
          & > * {
            float: left;
          }
          select {
            width: 30%;
            border: 1px solid #cfcfcf;
            border-radius: 0.4rem;
            text-align: center;
            color: $fontColor6;
          }
          span {
            display: block;
            width: 5%;
            height: $height;
            line-height: $height;
            text-align: center;
          }
        }
        .gender {
          ul {
            overflow: hidden;
            width: 100%;
            li {
              width: 12.7rem;
              margin-top: 0;
              border-radius: 3rem;
              border: 1px solid #dfdfdf;
              font-size: 1.3rem;
              text-align: center;
              &:nth-child(1) {
                float: left;
              }
              &:nth-child(2) {
                float: right;
              }
              label {
                display: block;
                width: 100%;
                padding: 16px 0;
                border-radius: 2rem;
              }
              input[type='radio'] {
                display: none;
                &:checked + label {
                  background: $fontColor6;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .txt-defulat-img {
      padding-left: 1.7rem;
      margin: 2rem 0 0;
      background: url('~static/svg2/icon_exclamation.svg') no-repeat 0 0.4rem;
      background-size: 1.2rem;
      line-height: 2rem;
      color: $fontColor9;
    }
    .btn-add {
      width: 100%;
      height: 4rem;
      margin-top: 2.2rem;
      background: #a3c15d;
      border-radius: 0.6rem;
      font-size: 1.5rem;
      line-height: 4rem;
      color: #fff;
    }
  }
}
</style>
