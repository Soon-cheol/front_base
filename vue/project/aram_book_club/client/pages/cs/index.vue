<template>
  <div
    v-if="viewMode"
    class="cs-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <div class="cs-header">
      <h2>고객센터 운영안내</h2>
      <div class="info">
        <p class="phone-number">
          <span class="ico" /><span class="num">1577-4521</span>
        </p>
        <ul class="time" v-if="viewMode === 'mo'">
          <li>월~금 : 오전 9시 ~ 오후 6시</li>
          <li>점심시간 : 12시~ 1시</li>
          <li>토·일요일 및 공휴일 휴무</li>
        </ul>
        <ul class="time" v-if="viewMode !== 'mo'">
          <li>월~금 : 오전 9시 ~ 오후 6시 (점심시간 : 12시~ 1시)</li>
          <li>토·일요일 및 공휴일 휴무</li>
        </ul>
        <ul class="link">
          <li
            class="store"
            @click="openLink('https://arambooks.com/company/find')"
          >
            <button>대리점 안내<span>전집구입처 안내</span></button>
          </li>
          <li class="saypen" @click="moveLink('saypen')">
            <button>
              세이펜 자료실
            </button>
          </li>
        </ul>
      </div>
    </div>
    <ul class="tab">
      <li ref="noticeTab" class="active" @click="boardTab(1)">공지사항</li>
      <li ref="faqTab" @click="boardTab(2)">FAQ</li>
    </ul>
    <boardTable
      :boardListI="boardListI"
      :boardListN="boardListN"
      :boardListF="boardListF"
      :type="type"
      :crtPage="crtPage"
      :pageInfo="pageInfo"
      @pPageMove="pageMove"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import boardTable from '~/components/layouts/boardTable'
export default {
  data() {
    return {
      type: 'notice',
      crtPage: 1,
      pageInfo: {},
      boardListI: [],
      boardListN: [],
      boardListF: []
    }
  },
  components: {
    boardTable
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    this.noticeListGet()
    this.noticeImpListGet()
    console.log('pageInfo', this.pageInfo)
  },
  methods: {
    // 통신
    // 일반 공지
    async noticeListGet() {
      const url = window.location.href
      const urlPaging = url.split('#')
      if (urlPaging[1]) {
        this.crtPage = urlPaging[1] * 1
      } else {
        this.crtPage = 1
      }
      try {
        const { data } = await this.$axios.get('/board/cs-center/notice', {
          params: {
            nowPage: this.crtPage
          }
        })
        if (data.ok) {
          this.boardListN = data.result
          this.pageInfo = data.page
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 중요 공지
    async noticeImpListGet() {
      try {
        const { data } = await this.$axios.get(
          '/board/cs-center/notice/important'
        )
        if (data.ok) {
          this.boardListI = data.result
        }
      } catch (error) {
        console.error(error)
      }
    },
    // FAQ
    async faqListGet() {
      try {
        const { data } = await this.$axios.get('/board/cs-center/faq')
        if (data.ok) {
          this.boardListF = data.result
          this.pageInfo = data.page
        }
      } catch (error) {
        console.error(error)
      }
    },
    async pageMove(n) {
      try {
        if (this.type === 'notice') {
          const { data } = await this.$axios.get('/board/cs-center/notice', {
            params: {
              nowPage: n
            }
          })
          if (data.ok) {
            this.boardListN = data.result
            this.pageInfo = data.page
            this.$router.push(`cs#${n}`)
          }
        } else if (this.type === 'faq') {
          const { data } = await this.$axios.get('/board/cs-center/faq', {
            params: {
              nowPage: n
            }
          })
          if (data.ok) {
            this.boardListF = data.result
            this.pageInfo = data.page
            this.$router.push(`cs#${n}`)
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    boardTab(n) {
      const sel = document.querySelectorAll('.tab li')
      for (let i = 0; i < sel.length; i++) {
        sel[i].classList.remove('active')
      }
      if (n === 1) {
        this.$refs.noticeTab.classList.add('active')
        this.type = 'notice'
        this.noticeListGet()
      } else if (n === 2) {
        this.$refs.faqTab.classList.add('active')
        this.type = 'faq'
        this.faqListGet()
      }
      this.$router.push('cs')
    },
    openLink(a) {
      window.open(a, '_blank')
    },
    moveLink(a) {
      this.$router.push({
        name: a
      })
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
// pc
.cs-wrap.pc {
  width: 1080px;
  margin: 0 auto;
  .cs-header {
    width: 1920px;
    padding: 70px 420px 160px;
    margin-left: -420px;
    background: #f6f6f6;
    h2 {
      position: relative;
      padding-left: 0.9rem;
      margin-bottom: 2.2rem;
      font-size: 1.3rem;
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
        background: #7348ae;
        border-radius: 100%;
      }
    }
    .info {
      overflow: hidden;
      p {
        & > * {
          display: inline-block;
          height: 3.3rem;
          vertical-align: middle;
          line-height: 3rem;
        }
        .ico {
          width: 3.3rem;
          background: #7348ae url('~static/svg2/icon_main_call.svg') no-repeat
            center center;
          background-size: 2.1rem auto;
          border-radius: 100%;
        }
        .num {
          padding-left: 0.6rem;
          font-size: 2.3rem;
          font-weight: 600;
        }
      }
      .phone-number {
        margin-bottom: 1rem;
        text-align: center;
      }
      .time {
        margin-bottom: 2rem;
        font-size: 0.9rem;
        text-align: center;
        line-height: 26px;
        color: $fontColor6;
        li {
          & + li {
            margin-top: 0.2rem;
          }
        }
      }
      .link {
        text-align: center;
        li {
          display: inline-block;
          width: 300px;
          height: 230px;
          padding-top: 6.5rem;
          border: 1px solid #cfcfcf;
          cursor: pointer;
          & + li {
            margin-left: 40px;
          }
          &:first-child {
            background: #fff url('~static/svg2/icon_customer_bildding.svg')
              no-repeat center 2rem;
            background-size: 4.2rem auto;
          }
          &:last-child {
            background: #fff url('~static/svg2/icon_saypen.svg') no-repeat
              center 2rem;
            background-size: 4rem auto;
          }
          button {
            font-size: 1.2rem;
            color: $fontColor3;
            span {
              display: block;
              margin-top: 0.1rem;
              font-size: 0.9rem;
              color: $fontColor6;
            }
          }
        }
      }
    }
  }
  .tab {
    display: table;
    width: 100%;
    margin-top: -62px;
    font-size: 1.1rem;
    & > * {
      display: table-cell;
      width: 50%;
      height: 60px;
      background: #f6f6f6;
      text-align: center;
      line-height: 60px;
      border: 1px solid #dfdfdf;
      cursor: pointer;
    }
    .active {
      border: 1px solid #383838;
      border-bottom: 0 none;
      background: #fff;
    }
  }
}
// mo
.cs-wrap.mo {
  background: #f6f6f6;
  padding: 3rem 1.6rem 0;
  h2 {
    position: relative;
    padding-left: 0.9rem;
    margin-bottom: 2.2rem;
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
      background: #7348ae;
      border-radius: 100%;
    }
  }
  .info {
    p {
      & > * {
        display: inline-block;
        height: 3.3rem;
        vertical-align: middle;
        line-height: 3rem;
      }
      .ico {
        width: 3.3rem;
        background: #7348ae url('~static/svg2/icon_main_call.svg') no-repeat
          center center;
        background-size: 2.1rem auto;
        border-radius: 100%;
      }
      .num {
        padding-left: 0.6rem;
        font-size: 2.5rem;
        font-weight: 600;
      }
    }
    .phone-number {
      margin-bottom: 1rem;
      text-align: center;
    }
    .time {
      margin-bottom: 2.9rem;
      font-size: 1.3rem;
      text-align: center;
      li {
        & + li {
          margin-top: 0.2rem;
        }
      }
    }
    .link {
      margin-bottom: 4rem;
      text-align: center;
      li {
        display: inline-block;
        width: 12.7rem;
        height: 12.2rem;
        padding-top: 7rem;
        border: 1px solid #cfcfcf;
        & + li {
          margin-left: 1.2rem;
        }
        &:first-child {
          background: #fff url('~static/svg2/icon_customer_bildding.svg')
            no-repeat center 1.9rem;
          background-size: 4.2rem auto;
        }
        &:last-child {
          background: #fff url('~static/svg2/icon_saypen.svg') no-repeat center
            1.9rem;
          background-size: 4rem auto;
        }
        button {
          font-size: 1.5rem;
          color: $fontColor3;
          span {
            display: block;
            margin-top: 0.2rem;
            font-size: 1.3rem;
            color: $fontColor6;
          }
        }
      }
    }
  }
  .tab {
    display: table;
    width: 100%;
    font-size: 1.5rem;
    & > * {
      display: table-cell;
      width: 50%;
      height: 4rem;
      background: #f6f6f6;
      text-align: center;
      line-height: 4rem;
      border: 1px solid #dfdfdf;
    }
    .active {
      border: 1px solid #000;
      border-bottom: 0 none;
      background: #fff;
    }
  }
}
</style>
