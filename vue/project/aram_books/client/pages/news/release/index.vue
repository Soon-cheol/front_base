<template>
  <div class="board-wrap">
    <div class="search">
      <input
        type="text"
        v-model="search"
        placeholder="검색어를 입력해주세요."
        @keyup="enterKey($event)"
      />
      <button class="btn-reset" v-if="search !== ''" @click="txtReset" />
      <button class="btn-search" @click="txtSearch" />
    </div>
    <div class="txt-total">
      전체 <span>{{ page.totalCnt }}</span
      >건
    </div>
    <boardTable v-if="list.length" :boardList="list" :pageInfo="page" />
    <p class="no-list" v-else>등록된 글이 없습니다.</p>
    <div class="paging">
      <span class="btn-first" @click="pageMove(1)" />
      <span class="btn-prev" @click="pageMove(page.nowPage - 1)" />
      <span
        v-for="(n, index) in page.totalPage"
        :key="index"
        @click="pageMove(n)"
        class="num"
        :class="{ active: index === pageNum - 1 }"
        >{{ n }}</span
      >
      <span class="btn-next" @click="pageMove(page.nowPage + 1)" />
      <span class="btn-last" @click="pageMove(page.totalPage)" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import boardTable from '~/components/layouts/releseBoard'

export default {
  data() {
    return {
      page: {},
      pageNum: 1,
      search: '',
      list: [],
    }
  },
  components: {
    boardTable,
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
      try {
        const { data } = await this.$axios.get('/homepage/news', {
          params: {
            nowPage: this.pageNum,
          },
        })
        if (data.result) {
          this.list = data.result
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
      const sel = document.querySelectorAll('.paging .num')
      for (let i = 0; i < sel.length; i++) {
        sel[i].classList.remove('active')
      }
      sel[n - 1].classList.add('active')
      try {
        const { data } = await this.$axios.get('/homepage/news', {
          params: {
            nowPage: n,
          },
        })
        if (data.result) {
          this.list = data.result
          this.page = data.page
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 게시판 검색
    async txtSearch() {
      try {
        const { data } = await this.$axios.get('/homepage/news', {
          params: {
            schWord: this.search,
          },
        })
        if (data.result) {
          this.list = data.result
          this.page = data.page
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 기능
    txtReset() {
      this.search = ''
      this.txtSearch()
    },
    enterKey(e) {
      if (event.keyCode === 13) {
        this.txtSearch()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.board-wrap {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  .search {
    position: relative;
    width: 440px;
    margin: 73px auto 0;
    font-size: 16px;
    input[type='text'] {
      width: 100%;
      border: 0 none;
      padding: 0.7rem 4rem 0.7rem 0.7rem;
      border-bottom: 2px solid #999;
    }
    .btn-reset {
      position: absolute;
      top: 0;
      right: 2rem;
      width: 2rem;
      height: 2.7rem;
      background: url('/common/icon_x.svg') no-repeat center center;
      background-size: 0.8rem;
      z-index: 2;
    }
    .btn-search {
      position: absolute;
      top: 0;
      right: 0;
      width: 2rem;
      height: 2.7rem;
      background: url('/common/ico_zoom.svg') no-repeat center center;
      background-size: 1.4rem;
      z-index: 2;
    }
  }
  .txt-total {
    margin-top: 50px;
    font-size: 18px;
    text-align: left;
    color: #333;
    span {
      font-weight: 600;
      color: #72cbd2;
    }
  }
  .paging {
    margin-bottom: 120px;
    text-align: center;
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      vertical-align: top;
      line-height: 38px;
      cursor: pointer;
      &.btn-first {
        background: url('/common/arrow_page02.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.btn-prev {
        background: url('/common/arrow_page01.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.btn-next {
        background: url('/common/arrow_page01.svg') no-repeat 0 0;
      }
      &.btn-last {
        background: url('/common/arrow_page02.svg') no-repeat 0 0;
      }
      &.num {
        margin: 0 2px;
        border: 1px solid #dfdfdf;
        color: #dfdfdf;
        &.active {
          border: 1px solid #333;
          color: #333;
        }
      }
    }
  }
}
</style>
