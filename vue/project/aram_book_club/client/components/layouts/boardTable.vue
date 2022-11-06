<template>
  <div
    class="list-table-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <!-- 공지사항 -->
    <table v-if="type === 'notice'" class="list-table">
      <tbody>
        <tr
          v-for="(b, index) in boardListI"
          :key="index"
          @click="noticeView(b.brdSeqno)"
        >
          <td class="tit imp">[중요] {{ b.brdTiteNm }}</td>
        </tr>
      </tbody>
    </table>
    <table v-if="type === 'notice'" class="list-table">
      <tbody>
        <tr
          v-for="(b, index) in boardListN"
          :key="index"
          @click="noticeView(b.brdSeqno)"
        >
          <td class="tit">
            <p>{{ b.brdNo }}.{{ b.brdTiteNm }}</p>
            <div>{{ b.creDttm.substr(0, 10) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- // 공지사항 -->
    <!-- FAQ -->
    <table v-if="type === 'faq'" class="list-table">
      <tbody>
        <tr v-for="(b, index) in boardListF" :key="index">
          <td class="faq">
            <table>
              <tbody>
                <tr class="close" @click="faqView">
                  <td class="tit">{{ b.brdTiteNm }}</td>
                </tr>
                <tr>
                  <td class="txt">
                    <client-only>
                      <TuiEditorViewer :value="b.brdCtt" />
                    </client-only>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- // FAQ -->
    <div class="paging">
      <button class="first" @click="pageMove(1)" />
      <button class="prev" @click="pageMove(pageInfo.nowPage - 1)" />
      <ol>
        <li v-for="(p, index) in pageInfo.totalPage" :key="index">
          <button
            @click="pageMove(p)"
            :class="{ active: pageInfo.nowPage === p }"
          >
            {{ p }}
          </button>
        </li>
      </ol>
      <button class="next" @click="pageMove(pageInfo.nowPage + 1)" />
      <button class="last" @click="pageMove(pageInfo.totalPage)" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    type: {
      type: String,
      default: null
    },
    boardListN: {
      type: Array,
      default: null
    },
    boardListI: {
      type: Array,
      default: null
    },
    boardListF: {
      type: Array,
      default: null
    },
    pageInfo: {
      type: Object,
      default: null
    },
    crtPage: {
      type: Number,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    noticeView(n) {
      this.$router.push({
        name: `${this.$route.name}-id`,
        params: {
          id: n
        }
      })
    },
    pageMove(n) {
      if (n > this.pageInfo.totalPage) {
        alert('마지막 페이지 입니다.')
        return false
      }
      if (n < 1) {
        alert('처음 페이지 입니다.')
        return false
      }
      this.$emit('pPageMove', n)
    },
    faqView(e) {
      e.target.parentElement.classList.toggle('close')
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
.num,
.date,
.view {
  text-align: center;
}
.num {
  width: 10%;
}
.view {
  width: 10%;
}
.tit {
  padding: 1rem 2rem;
  border-bottom: 1px solid #cfcfcf;
  cursor: pointer;
  &.imp {
    color: $fontColor3;
    font-weight: 600;
    font-size: 1.1rem;
  }
}
.faq {
  width: 100%;
  tr {
    .tit {
      padding: 1.5rem 2.5rem 1.5rem 3rem;
      background: url('~static/svg2/icon_q.svg') no-repeat 1rem 1.5rem;
      background-size: 1.3rem auto;
      font-size: 20px;
      position: relative;
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 3.9rem;
        height: 100%;
        background: url('~static/svg2/icon_arrow_gray.svg') no-repeat center
          center;
        background-size: 0.7rem auto;
        transform: rotate(-90deg);
      }
    }
    .txt {
      padding: 1.5rem 2.5rem 1.1rem 3rem;
      border-bottom: 1px solid #cfcfcf;
      background: #f6f6f6 url('~static/svg2/icon_a.svg') no-repeat 1rem 1.5rem;
      background-size: 1.3rem auto;
      font-size: 1rem;
      line-height: 1.6rem;
      color: $fontColor6;
      font-weight: 300;
    }
    &.close {
      & + tr {
        display: none;
      }
      .tit {
        &::after {
          transform: rotate(90deg);
        }
      }
    }
  }
}
.list-table-wrap {
  background: #fff;
  .paging {
    display: table;
    width: 100%;
    text-align: center;
    & > * {
      display: table-cell;
      vertical-align: top;
    }
    ol {
      width: 16rem;
      li {
        display: inline-block;
      }
    }
    button {
      font-size: 1.1rem;
      &::before,
      &::after {
        font-size: 11px;
        font-weight: 600;
      }
      &.first {
        background: url('~static/svg2/icon_customer_a_ll.svg') no-repeat center
          center;
        background-size: 80% auto;
      }
      &.prev {
        background: url('~static/svg2/icon_customer_a_l.svg') no-repeat center
          center;
        background-size: 80% auto;
      }
      &.next {
        background: url('~static/svg2/icon_customer_a_r.svg') no-repeat center
          center;
        background-size: 80% auto;
      }
      &.last {
        background: url('~static/svg2/icon_customer_a_rr.svg') no-repeat center
          center;
        background-size: 80% auto;
      }
      &.active {
        background: #383838;
        color: #fff;
      }
    }
  }
  &.pc {
    width: 100%;
    padding-top: 30px;
    .tit {
      p {
        font-size: 20px;
        color: $fontColor3;
      }
      div {
        padding-left: 32px;
        margin-top: 14px;
        background: url('~static/svg2/icon_clock.svg') no-repeat left center;
        background-size: auto 100%;
        font-size: 18px;
        color: $fontColor6;
      }
    }
    .paging {
      max-width: 480px;
      margin: 40px auto 100px;
      button {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  &.mo {
    width: 32rem;
    margin-left: -1.6rem;
    padding: 2.6rem 1.5rem 4rem;
    .paging {
      margin: 2rem 0;
      button {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
  }
}
</style>
