<template>
  <div
    class="list-table-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <div class="search">
      <input type="text" v-model="search" @keyup="enterKey($event)" />
      <button class="btn-reset" v-if="search !== ''" @click="txtReset" />
      <button class="btn-search" @click="txtSearch" />
    </div>
    <div v-if="boardList.length > 0" class="list-table">
      <table>
        <tbody>
          <tr v-for="(b, index) in boardList" :key="index">
            <td class="tit">
              <p>{{ b.BRD_TITE_NM }}</p>
              <button @click="fileDown(b.URL)">다운로드</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-list">
      <i />
      <p class="txt">검색 결과가 없습니다.</p>
      <button @click="txtReset">세이펜 리스트 보기</button>
    </div>
    <div class="paging">
      <span class="btn-first" @click="pageMove(1)" />
      <span class="btn-prev" @click="pageMove(page.nowPage - 1)" />
      <ol>
        <li
          v-for="(n, index) in pagingNumber"
          :key="index"
          @click="pageMove(n)"
          :class="{ active: n === page.nowPage, num: n <= page.totalPage }"
        >
          {{ n }}
        </li>
      </ol>
      <span class="btn-next" @click="pageMove(page.nowPage + 1)" />
      <span class="btn-last" @click="pageMove(page.totalPage)" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      page: {},
      pagingNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      boardList: []
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    this.listGet()
  },

  methods: {
    fileDown(a) {
      window.open(a, '_blank')
    },
    async listGet() {
      try {
        const { data } = await this.$axios.get('/board/cs-center/saypan', {
          params: {
            nowPage: this.crtPage
          }
        })
        if (data.ok) {
          this.boardList = data.result
          this.page = data.page
        }
      } catch (error) {
        console.error(error)
      }
    },
    async txtSearch() {
      try {
        const { data } = await this.$axios.get('/board/cs-center/saypan', {
          params: {
            schWord: this.search
          }
        })
        if (data.result) {
          this.boardList = data.result
          this.page = data.page
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 페이지 이동
    async pageMove(n) {
      if (n < 1) {
        alert('현재 첫 페이지 입니다.')
        return false
      } else if (n > this.page.totalPage) {
        alert('현재 마지막 페이지 입니다.')
        return false
      }
      if (n === this.pagingNumber[9] + 1) {
        for (let i = 0; i < 10; i++) {
          this.pagingNumber[i] += 10
        }
      }
      if (n === this.pagingNumber[0] - 1) {
        for (let i = 0; i < 10; i++) {
          this.pagingNumber[i] -= 10
        }
      }
      try {
        const { data } = await this.$axios.get('/board/cs-center/saypan', {
          params: {
            nowPage: n
          }
        })
        if (data.result) {
          this.boardList = data.result
          this.page = data.page
          if (this.viewMode === 'mo') {
            $('html, body').animate({ scrollTop: '0' }, 300)
          }
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async pageDirMove(n) {
      this.pagingNumber = []
      if (n === 1) {
        for (let i = 0; i < 10; i++) {
          this.pagingNumber.push(i + 1)
        }
      } else {
        let arr = String(this.page.totalPage).split('')
        const range = Math.floor(this.page.totalPage / 10) * 10
        if (arr[arr.length - 1] === '0') {
          for (let i = range - 9; i < range + 11; i++) {
            this.pagingNumber.push(i)
          }
        } else {
          for (let i = range + 1; i < range + 11; i++) {
            this.pagingNumber.push(i)
          }
        }
      }
      const arr = this.cateArr
      try {
        const { data } = await this.$axios.get('/board/cs-center/saypan', {
          params: {
            nowPage: n,
            cntPerPage: 8,
            schCateg: arr.join(',')
          }
        })
        if (data.result) {
          this.boardList = data.result
          this.page = data.page
          this.pageNum = data.page.nowPage
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    txtReset() {
      this.search = ''
      this.txtSearch()
    },
    enterKey(e) {
      if (event.keyCode === 13) {
        this.txtSearch()
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
  overflow: hidden;
  padding: 0 1rem;
  border-bottom: 1px solid #cfcfcf;
  cursor: default;
  & > * {
    padding: 0.4rem 0;
    margin: 0.6rem 0;
  }
  p {
    float: left;
  }
  button {
    float: right;
    padding: 0.4rem 2rem;
    border: 1px solid #cfcfcf;
    border-radius: 1rem;
    font-size: 16px;
    color: $fontColor6;
    cursor: pointer;
  }
}
.search {
  position: relative;
  overflow: hidden;
  width: 440px;
  margin: 0 auto 50px;
  & > * {
    float: left;
  }
  select {
    height: 54px;
    border: 0 none;
    border-bottom: 2px solid #999;
    font-size: 15px;
    color: $fontColor6;
  }
  input {
    // width: calc(100% - 116px);
    width: 100%;
    border: 0 none;
    padding: 14px 80px 14px 14px;
    border-bottom: 2px solid #999;
  }
  .btn-reset {
    position: absolute;
    top: 0;
    right: 40px;
    width: 40px;
    height: 54px;
    background: url('~static/svg2/icon_x.svg') no-repeat center center;
    background-size: 16px;
    z-index: 2;
  }
  .btn-search {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 54px;
    background: url('~static/svg2/icon_zoom.svg') no-repeat center center;
    z-index: 2;
  }
}
.list-table-wrap {
  background: #fff;
  .list-table {
    min-height: 672px;
    border-top: 2px solid #333;
  }
  .no-list {
    padding: 10rem 0;
    text-align: center;
    i {
      display: block;
      width: 4.1rem;
      height: 4.1rem;
      background: url('/images/common/ico_exc.svg');
      background-size: 100%;
      margin: 0 auto 1.5rem;
    }
    .txt {
      padding: 0 5rem;
      font-size: 1.6rem;
      font-weight: 600;
    }
    .sub {
      margin-top: 0.7rem;
      font-size: 1rem;
      color: $fontColor9;
    }
    button {
      width: 9rem;
      height: 2.5rem;
      margin-top: 2rem;
      border: 1px solid #cfcfcf;
      border-radius: 1.3rem;
      font-size: 0.9rem;
      color: $fontColor3;
      &:hover {
        background: $fontColor6;
        color: #fff;
      }
    }
  }
  .paging {
    margin: 44px auto 120px;
    text-align: center;
    ol {
      display: inline-block;
      min-width: 600px;
      li {
        display: none;
        &.num {
          display: inline-block;
          width: 40px;
          height: 40px;
          margin: 0 5px;
          text-align: center;
          line-height: 40px;
          color: #dfdfdf;
          cursor: pointer;
          &.active {
            background: #383838;
            color: #fff;
          }
        }
      }
    }
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: top;
      line-height: 38px;
      cursor: pointer;
      &.btn-first {
        background: url('~static/svg2/icon_customer_a_ll.svg') no-repeat center;
        background-size: 80% auto;
      }
      &.btn-prev {
        background: url('~static/svg2/icon_customer_a_l.svg') no-repeat center;
        background-size: 80% auto;
      }
      &.btn-next {
        background: url('~static/svg2/icon_customer_a_r.svg') no-repeat center;
        background-size: 80% auto;
      }
      &.btn-last {
        background: url('~static/svg2/icon_customer_a_rr.svg') no-repeat center;
        background-size: 80% auto;
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
