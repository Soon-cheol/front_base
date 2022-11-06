<template>
  <div
    v-if="viewMode"
    class="ref-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div class="ref-search">
      <h2>아람자료실</h2>
      <p class="sub-tit">아람북스 100% 활용법을 영상으로 만나보세요.</p>
      <div class="search-category">
        <p class="tit">분류</p>
        <ul class="check-list">
          <li>
            <input
              type="checkbox"
              id="aramBook"
              checked="checked"
              value="002003001"
            /><label for="aramBook">전집</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="miniBook"
              checked="checked"
              value="002003002"
            /><label for="miniBook">소전집</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="smartBook"
              checked="checked"
              value="002003003"
            /><label for="smartBook">스마트북</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="etc"
              checked="checked"
              value="002003004"
            /><label for="etc">기타</label>
          </li>
        </ul>
      </div>
      <div class="search-category">
        <p class="tit">검색어</p>
        <input type="text" v-model="search" @keyup="enterKey($event)" />
      </div>
      <button class="btn-search" @click="checkSearch()">검색</button>
    </div>
    <div class="list">
      <ul v-if="prodList.length > 0">
        <li
          v-for="(p, index) in prodList"
          :key="index"
          :class="{ 'box-shadow160': viewMode === 'mo' }"
          @click="detailView(p.BRD_SEQNO)"
        >
          <img :src="p.THUMBNAIL" />
          <div class="info">
            <p class="tit">
              {{ p.BRD_TITE_NM }}
            </p>
            <p class="sub">
              조회수 {{ p.INQ_CNT }} | {{ p.CRE_DTTM.substr(0, 10) }}
            </p>
          </div>
        </li>
      </ul>
      <p v-else class="txt-no-list">
        검색 결과 또는 등록된 자료가 없습니다.
      </p>
    </div>
    <div class="paging" v-if="viewMode === 'pc'">
      <span class="btn-first" @click="pageDirMove(1)" />
      <span class="btn-prev" @click="pageMove(page.nowPage - 1)" />
      <!-- <span
        v-for="(n, index) in page.totalPage"
        :key="index"
        @click="pageMove(n)"
        class="num"
        :class="{ active: index === pageNum - 1 }"
        >{{ n }}</span
      > -->
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
      <span class="btn-last" @click="pageDirMove(page.totalPage)" />
    </div>
    <div class="paging" v-else-if="viewMode === 'mo'">
      <button class="btn-prev" @click="pageMove(page.nowPage - 1)" />
      <div class="num">
        <span class="now">{{ page.nowPage }}</span
        >/<span class="total">{{ page.totalPage }}</span>
      </div>
      <button class="btn-next" @click="pageMove(page.nowPage + 1)" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  components: {
    loginConfirm
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  data() {
    return {
      prodList: [],
      page: {},
      pagingNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      cateArr: ['002003001', '002003002', '002003003', '002003004'],
      search: '',
      pageNum: 1
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 통신
    async getList() {
      if (this.$route.params.pageNum) {
        this.pageNum = this.$route.params.pageNum
      }
      const arr = this.cateArr
      try {
        const { data } = await this.$axios.get('/board/datalist', {
          params: {
            nowPage: this.pageNum,
            cntPerPage: 8,
            schCateg: arr.join(',')
          }
        })
        if (data.result) {
          this.prodList = data.result
          this.page = data.page
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async checkSearch() {
      try {
        const sel = document.querySelectorAll('.check-list input')
        this.cateArr = []
        for (let i = 0; i < sel.length; i++) {
          if (sel[i].checked) {
            this.cateArr.push(sel[i].value)
          }
        }
        const arr = this.cateArr
        const { data } = await this.$axios.get('/board/datalist', {
          params: {
            nowPage: 1,
            cntPerPage: 8,
            schWord: this.search,
            schCateg: arr.join(',')
          }
        })
        if (data.result) {
          this.prodList = data.result
          this.page = data.page
          this.page.nowPage = this.pageNum = 1
          const num = document.querySelectorAll('.paging .num')
          console.log('num', num)
          for (let j = 0; j < num.length; j++) {
            num[j].classList.remove('active')
          }
          num[0].classList.add('active')
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
      const arr = this.cateArr
      try {
        const { data } = await this.$axios.get('/board/datalist', {
          params: {
            nowPage: n,
            cntPerPage: 8,
            schWord: this.search,
            schCateg: arr.join(',')
          }
        })
        if (data.result) {
          this.prodList = data.result
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
        const { data } = await this.$axios.get('/board/datalist', {
          params: {
            nowPage: n,
            cntPerPage: 8,
            schWord: this.search,
            schCateg: arr.join(',')
          }
        })
        if (data.result) {
          this.prodList = data.result
          this.page = data.page
          this.pageNum = data.page.nowPage
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 기능
    enterKey(e) {
      if (event.keyCode === 13) {
        this.checkSearch()
      }
    },
    detailView(id) {
      this.$router.push({
        name: `${this.$route.name}-id`,
        params: { id: id, page: this.page.nowPage }
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
.txt-no-list {
  margin: 2rem 1.5rem;
  padding: 6rem 0;
  font-size: 1.6rem;
  text-align: center;
}
.pc {
  .ref-search {
    padding: 70px 0;
    margin-bottom: 50px;
    background: #f6f6f6;
    text-align: center;
    h2 {
      font-size: 36px;
      color: $fontColor3;
    }
    .sub-tit {
      margin: 14px 0 70px;
      font-size: 18px;
      color: $fontColor6;
    }
    .search-category {
      overflow: hidden;
      width: 1080px;
      height: 59px;
      margin: 0 auto;
      background: #fff;
      border-top: 2px solid #333;
      & + .search-category {
        border-top: 0 none;
        border-bottom: 2px solid #333;
      }
      .tit {
        float: left;
        width: 132px;
        margin-top: 17px;
        padding-left: 30px;
        font-size: 16px;
        font-weight: 400;
        text-align: left;
        color: $fontColor3;
      }
      ul {
        float: left;
        width: calc(100% - 132px);
        height: 55px;
        li {
          float: left;
          width: 163px;
          margin-top: 17px;
          font-size: 14px;
          vertical-align: middle;
          text-align: left;
          color: $fontColor6;
          input[type='checkbox'] {
            float: left;
            width: 20px;
            height: 20px;
            margin: 0 9px 0 0;
          }
          label {
            float: left;
            padding-top: 1px;
          }
        }
      }
      input {
        float: left;
        width: 300px;
      }
    }
    button {
      width: 150px;
      height: 45px;
      margin: 30px auto 0;
      background: #333;
      font-size: 20px;
      font-weight: 400;
      color: #fff;
    }
  }
  .list {
    width: 1080px;
    min-height: 564px;
    margin: 0 auto;
    ul {
      overflow: hidden;
      width: 1100px;
      margin-left: -19px;
      padding-bottom: 20px;
      li {
        float: left;
        width: 256px;
        margin: 20px 0 0 19px;
        cursor: pointer;
        img {
          width: 100%;
          height: 190px;
        }
        .tit {
          overflow: hidden;
          width: 100%;
          margin-top: 15px;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          font-size: 18px;
          color: $fontColor3;
        }
        .sub {
          margin-top: 8px;
          font-size: 14px;
          color: #999;
        }
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
        cursor: pointer;
        &.num {
          display: inline-block;
          width: 40px;
          height: 40px;
          margin: 0 5px;
          text-align: center;
          line-height: 40px;
          color: #dfdfdf;
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
}
.mo {
  .ref-search {
    overflow: hidden;
    background: #f6f6f6;
    text-align: center;
    h2 {
      margin-top: 4rem;
      font-size: 2.1rem;
      font-weight: 600;
    }
    .sub-tit {
      margin-top: 1rem;
      font-size: 1.5rem;
    }
    .search-category {
      display: table;
      width: 29rem;
      background: #fff;
      margin: 2rem 1.5rem 0;
      padding: 0.4rem 0;
      border-top: 2px solid #333;
      & + .search-category {
        border-top: 0 none;
        margin-top: 0;
        border-bottom: 2px solid #333;
      }
      font-size: 1rem;
      & > * {
        display: table-cell;
        vertical-align: middle;
      }
      .tit {
        width: 9rem;
        text-align: center;
      }
      ul {
        overflow: hidden;
        width: 20rem;
        text-align: left;
        li {
          float: left;
          width: 50%;
          line-height: 2rem;
          input[type='checkbox'] {
            margin: -0.2rem 0.4rem 0 0;
          }
        }
      }
    }
    .btn-search {
      width: 10rem;
      height: 3rem;
      background: $fontColor3;
      border-radius: 0.8rem;
      margin: 1.4rem auto;
      font-size: 1.2rem;
      line-height: 2.8rem;
      color: #fff;
    }
  }
  .list {
    padding: 2rem 1.5rem;
    img {
      width: 100%;
    }
    .info {
      padding: 2.3rem 1.7rem;
      .tit {
        margin-top: 0.6rem;
        font-size: 1.2rem;
      }
      .sub {
        margin-top: 0.4rem;
        font-size: 1rem;
        color: #999;
      }
    }
  }
  .paging {
    display: table;
    width: 32rem;
    height: 3rem;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #cfcfcf;
    margin-bottom: 2rem;
    & > * {
      display: table-cell;
      height: 100%;
      vertical-align: middle;
    }
    button {
      width: 4.3rem;
      padding: 0;
      background: url('/images/common/arrow_page03.svg') no-repeat center center;
      background-size: 2.5rem;
      &.btn-prev {
        transform: rotate(180deg);
        border-left: 1px solid #cfcfcf;
      }
      &.btn-next {
        border-left: 1px solid #cfcfcf;
      }
    }
    .num {
      width: 23.4rem;
      text-align: center;
      font-size: 1rem;
      color: $fontColor9;
      span {
        display: inline-block;
        padding: 0 0.5rem;
        &.now {
          color: $fontColor3;
        }
      }
    }
  }
}
</style>
