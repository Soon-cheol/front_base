<template>
  <div
    v-if="viewMode"
    class="setting-child-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <h3>등록 자녀 <span>(자녀는 최대 5명까지 등록 가능합니다.)</span></h3>
    <!-- <h3>등록 자녀 <span>(자녀는 한명만 등록 가능합니다.)</span></h3> -->
    <ul>
      <li v-for="(c, index) in childList" :key="index">
        <button class="btn-del" @click="removeChild(c.chldMemId)" />
        <p class="tit-child">
          <span class="num">{{ index + 1 }}</span
          ><span class="txt">등록 자녀</span>
        </p>
        <div class="img-child">
          <span
            class="img"
            v-if="c.filePathNm === ''"
            :class="{ female: c.chldSexCd === 'F' }"
          />
          <span v-else class="img"><img :src="c.filePathNm"/></span>
        </div>
        <div class="info-child">
          <ul>
            <li>자녀 이름 : {{ c.chldMemNm }}</li>
            <li>
              생년월일 : {{ c.chldBthYmd.substr(0, 4) }}.{{
                c.chldBthYmd.substr(4, 2)
              }}.{{ c.chldBthYmd.substr(6, 2) }} (<span
                v-if="c.chldSexCd === 'F'"
                >여</span
              ><span v-else>남</span>)
            </li>
          </ul>
          <button
            v-if="!modify && !add"
            @click="modifyChild(c)"
            class="btn-modify"
          >
            수정
          </button>
        </div>
      </li>
    </ul>
    <button v-if="!add && !modify" class="btn-add-child" @click="addChild">
      자녀 추가
    </button>
    <div class="child-option" v-if="add">
      <addChild @pChildListGet="childListGet" />
    </div>
    <div class="child-option" v-if="modify">
      <modChild @pChildListGet="childListGet" :info="modChild" />
    </div>
    <div id="childModify" />
    <button v-if="add || modify" @click="cancel" class="btn-add-cancel">
      취소
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
import addChild from '~/components/layouts/addChild'
import modChild from '~/components/layouts/modChild'
export default {
  data() {
    return {
      modChild: {},
      childList: false,
      add: false,
      modify: false
    }
  },
  components: {
    addChild,
    modChild,
    loginConfirm
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.loggedIn,
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    if (this.isLoggedIn) {
      this.childListGet()
    }
  },
  methods: {
    // 통신
    async childListGet() {
      this.add = this.modify = false
      try {
        const { data } = await this.$axios.get('/child/list')
        this.childList = data.result
        if (this.childList.length === 0) {
          alert('현재 등록된 자녀가 없습니다.\n자녀 등록이 필요합니다.')
          this.$router.push({
            name: 'parents-children'
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    async removeChild(id) {
      if (confirm('등록된 자녀를 삭제하시겠습니까?')) {
        try {
          const { data } = await this.$axios.delete('/child/delOne', {
            data: {
              chldMemId: id
            }
          })
          if (data.ok) {
            alert('완료되었습니다.')
            this.childListGet()
          }
        } catch (error) {
          console.error(error)
          if (error.error.code === 2011) {
            alert(
              '해당 자녀는 현재 학습 중인 상품이 있으므로,\n자녀 삭제가 불가능합니다.'
            )
          }
        }
      }
    },
    async deleteImg(obj) {
      try {
        const { data } = await this.$axios.delete('/child/delImg', {
          data: {
            fileId: obj.fileId,
            chldMemId: obj.chldMemId
          }
        })
        if (data.ok) {
          alert('완료되었습니다.')
          this.childListGet()
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    modifyChild(obj) {
      this.modify = true
      this.modChild = obj

      const location = document.querySelector('#childModify').offsetTop
      window.scrollTo({ top: location, behavior: 'smooth' })
    },
    addChild() {
      if (this.childList.length >= 5) {
        alert('자녀등록은 최대 5명까지 가능합니다.')
        return false
      }
      // if (this.childList.length >= 1) {
      //   alert('자녀등록은 한명만 가능합니다.')
      //   return false
      // }
      this.add = true
      const location = document.querySelector('#childModify').offsetTop
      window.scrollTo({ top: location, behavior: 'smooth' })
    },
    cancel() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.add = false
      this.modify = false
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
$errorolor: #ff794a;
// pc
.pc {
  width: 1080px;
  margin: 0 auto;
  h3 {
    position: relative;
    padding-left: 19px;
    margin: 70px 0 10px;
    font-size: 1.3rem;
    font-weight: 400;
    text-align: left;
    color: $fontColor3;
    &::before {
      position: absolute;
      content: '';
      display: inline-block;
      top: 6px;
      left: 0;
      width: 12px;
      height: 12px;
      background: #a3c15d;
      border-radius: 100%;
    }
    span {
      display: inline-block;
      padding-left: 4px;
      font-size: 20px;
      color: $fontColor6;
      font-weight: 300;
    }
  }
  .btn-add-child {
    width: 12rem;
    height: 2.5rem;
    background: #fff;
    border: 1px solid #cfcfcf;
    margin: 2rem 21rem 5rem;
    border-radius: 1.8rem;
    font-size: 1.2rem;
    text-align: center;
    line-height: 1.2rem;
    color: $fontColor3;
  }
  .btn-add-child:hover {
    background: #666;
    color: #fff;
  }
  .child-option {
    margin-top: 60px;
  }
  & > ul {
    overflow: hidden;
    & > li {
      position: relative;
      overflow: hidden;
      float: left;
      width: 500px;
      margin-top: 20px;
      border: 1px solid #d6d6d6;
      border-radius: 20px;
      text-align: center;
      &:nth-child(even) {
        float: right;
      }
      .btn-del {
        position: absolute;
        top: 4.7rem;
        right: 0.2rem;
        width: 3rem;
        height: 3rem;
        background: url('~static/svg2/icon_xbox.svg') no-repeat center center;
        background-size: 1.5rem;
      }
      .tit-child {
        padding: 1.1rem 0;
        background: $fontColor9;
        font-size: 1.2rem;
        text-align: center;
        color: #fff;
        .num {
          display: inline-block;
          width: 1.8rem;
          height: 1.8rem;
          background: #fff;
          margin-right: 0.6rem;
          border-radius: 100%;
          line-height: 1.7rem;
          color: $fontColor9;
        }
      }
      .img-child {
        .img {
          overflow: hidden;
          display: inline-block;
          width: 10rem;
          height: 10rem;
          margin: 1.4rem auto 1.4rem;
          border-radius: 1rem;
          background: #f6f6f6
            url('~static/images/mobile/contents/children/img_child_1.png')
            no-repeat center center;
          background-size: 100%;
          &.female {
            background: #f6f6f6
              url('~static/images/mobile/contents/children/img_child_2.png')
              no-repeat center center;
            background-size: 100%;
          }
        }
        img {
          width: 10rem;
          height: 10rem;
        }
      }
      .info-child {
        background: #f6f6f6;
        border-top: 1px dashed #d6d6d6;
        ul {
          padding: 2.4rem 2rem;
          text-align: left;
          li + li {
            margin-top: 1rem;
          }
        }
        .btn-modify {
          width: 13.2rem;
          height: 3.5rem;
          background: #a3c15d;
          margin: 0 auto 1.9rem;
          border-radius: 1.8rem;
          font-size: 1.5rem;
          text-align: center;
          line-height: 3.3rem;
          color: #fff;
        }
      }
    }
  }
  & > ul {
    & > li {
      position: relative;
      overflow: hidden;
      border: 1px solid #d6d6d6;
      border-radius: 1rem;
      text-align: center;
      & + li {
        margin-top: 1rem;
      }
      .btn-del {
        position: absolute;
        top: 3.7rem;
        right: 0.2rem;
        width: 3rem;
        height: 2.5rem;
        background: url('~static/svg2/icon_xbox.svg') no-repeat center center;
        background-size: 1.3rem;
      }
      .tit-child {
        padding: 0.8rem 0;
        background: $fontColor9;
        font-size: 1rem;
        text-align: center;
        color: #fff;
        .num {
          display: inline-block;
          width: 1.3rem;
          height: 1.3rem;
          background: #fff;
          margin-right: 0.6rem;
          border-radius: 100%;
          line-height: 1.3rem;
          color: $fontColor9;
        }
      }
      .img-child {
        .img {
          overflow: hidden;
          display: inline-block;
          width: 10rem;
          height: 10rem;
          margin: 1.4rem auto 1.4rem;
          border-radius: 1rem;
          background: #f6f6f6
            url('~static/images/mobile/contents/children/img_child_1.png')
            no-repeat center center;
          background-size: 100%;
          &.female {
            background: #f6f6f6
              url('~static/images/mobile/contents/children/img_child_2.png')
              no-repeat center center;
            background-size: 100%;
          }
        }
        img {
          width: 10rem;
          height: 10rem;
        }
      }
      .info-child {
        background: #f6f6f6;
        border-top: 1px dashed #d6d6d6;
        ul {
          padding: 1.3rem 3rem;
          font-size: 1.1rem;
          text-align: left;
          li + li {
            margin-top: 0.6rem;
          }
        }
        .btn-modify {
          width: 7rem;
          height: 2rem;
          background: #a3c15d;
          margin: 0 auto 1.9rem;
          border-radius: 1.8rem;
          font-size: 1.1rem;
          text-align: center;
          line-height: 1.1rem;
          color: #fff;
        }
      }
    }
  }
  .btn-add-cancel {
    width: 9rem;
    height: 2.5rem;
    margin: 0.8rem 22.5rem 4rem;
    background: $fontColor6;
    border-radius: 3rem;
    font-size: 1rem;
    line-height: 2.5rem;
    color: #fff;
  }
}
// mo
.mo {
  padding: 3rem 3rem 6rem;
  h3 {
    position: relative;
    padding-left: 0.9rem;
    margin-bottom: 3rem;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: left;
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
    span {
      display: inline-block;
      padding-left: 0.2rem;
      font-size: 1.1rem;
      color: $fontColor6;
    }
  }
  .btn-add-child {
    width: 100%;
    height: 3.5rem;
    background: #a3c15d;
    margin: 2.3rem 0 0;
    border-radius: 0.6rem;
    font-size: 1.5rem;
    text-align: center;
    line-height: 3.3rem;
    color: #fff;
  }
  .child-option {
    position: relative;
    margin-top: 3rem;
    padding-top: 3rem;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: -3rem;
      width: 32rem;
      height: 0.8rem;
      background: #f6f6f6;
    }
  }
  & > ul {
    & > li {
      position: relative;
      overflow: hidden;
      border: 1px solid #d6d6d6;
      border-radius: 1rem;
      text-align: center;
      & + li {
        margin-top: 2.2rem;
      }
      .btn-del {
        position: absolute;
        top: 4.7rem;
        right: 0.2rem;
        width: 3rem;
        height: 3rem;
        background: url('~static/svg2/icon_xbox.svg') no-repeat center center;
        background-size: 1.5rem;
      }
      .tit-child {
        padding: 1.1rem 0;
        background: $fontColor9;
        font-size: 1.5rem;
        text-align: center;
        color: #fff;
        .num {
          display: inline-block;
          width: 1.8rem;
          height: 1.8rem;
          background: #fff;
          margin-right: 0.6rem;
          border-radius: 100%;
          line-height: 1.7rem;
          color: $fontColor9;
        }
      }
      .img-child {
        .img {
          overflow: hidden;
          display: inline-block;
          width: 14rem;
          height: 14rem;
          margin: 2.2rem auto 1.9rem;
          border-radius: 1rem;
          background: #f6f6f6
            url('~static/images/mobile/contents/children/img_child_1.png')
            no-repeat center center;
          background-size: 100%;
          &.female {
            background: #f6f6f6
              url('~static/images/mobile/contents/children/img_child_2.png')
              no-repeat center center;
            background-size: 100%;
          }
        }
        img {
          width: 14rem;
          height: 14rem;
        }
      }
      .info-child {
        background: #f6f6f6;
        border-top: 1px dashed #d6d6d6;
        ul {
          padding: 2.4rem 2rem;
          text-align: left;
          li + li {
            margin-top: 1rem;
          }
        }
        .btn-modify {
          width: 13.2rem;
          height: 3.5rem;
          background: #a3c15d;
          margin: 0 auto 1.9rem;
          border-radius: 1.8rem;
          font-size: 1.5rem;
          text-align: center;
          line-height: 3.3rem;
          color: #fff;
        }
      }
    }
  }
  & > ul {
    & > li {
      position: relative;
      overflow: hidden;
      border: 1px solid #d6d6d6;
      border-radius: 1rem;
      text-align: center;
      & + li {
        margin-top: 2.2rem;
      }
      .btn-del {
        position: absolute;
        top: 4.7rem;
        right: 0.2rem;
        width: 3rem;
        height: 3rem;
        background: url('~static/svg2/icon_xbox.svg') no-repeat center center;
        background-size: 1.5rem;
      }
      .tit-child {
        padding: 1.1rem 0;
        background: $fontColor9;
        font-size: 1.5rem;
        text-align: center;
        color: #fff;
        .num {
          display: inline-block;
          width: 1.8rem;
          height: 1.8rem;
          background: #fff;
          margin-right: 0.6rem;
          border-radius: 100%;
          line-height: 1.7rem;
          color: $fontColor9;
        }
      }
      .img-child {
        .img {
          overflow: hidden;
          display: inline-block;
          width: 14rem;
          height: 14rem;
          margin: 2.2rem auto 1.9rem;
          border-radius: 1rem;
          background: #f6f6f6
            url('~static/images/mobile/contents/children/img_child_1.png')
            no-repeat center center;
          background-size: 100%;
          &.female {
            background: #f6f6f6
              url('~static/images/mobile/contents/children/img_child_2.png')
              no-repeat center center;
            background-size: 100%;
          }
        }
        img {
          width: 14rem;
          height: 14rem;
        }
      }
      .info-child {
        background: #f6f6f6;
        border-top: 1px dashed #d6d6d6;
        ul {
          padding: 2.4rem 2rem;
          text-align: left;
          li + li {
            margin-top: 1rem;
          }
        }
        .btn-modify {
          width: 13.2rem;
          height: 3.5rem;
          background: #a3c15d;
          margin: 0 auto 1.9rem;
          border-radius: 1.8rem;
          font-size: 1.5rem;
          text-align: center;
          line-height: 3.3rem;
          color: #fff;
        }
      }
    }
  }
  .btn-add-cancel {
    width: 100%;
    height: 4rem;
    background: $fontColor9;
    border-radius: 0.6rem;
    margin-top: 0.8rem;
    font-size: 1.5rem;
    line-height: 4rem;
    color: #fff;
  }
}
</style>
