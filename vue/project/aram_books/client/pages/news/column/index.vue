<template>
  <div class="board-wrap">
    <a
      class="btn-viewer"
      target="_blank"
      href="https://get.adobe.com/kr/reader/download/?installer=Reader_DC_2019.008.20071_Korean_for_Windows&os=Windows%2010&browser_type=KHTML&browser_dist=Chrome&dualoffer=false&mdualoffer=true&cr=true&stype=7699&a=McAfee_Safe_Connect&a=McAfee_Security_Scan_Plus
"
      >pdf 뷰어 다운로드</a
    >
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
import boardTable from '~/components/layouts/columnBoard'

export default {
  data() {
    return {
      page: {},
      pageNum: 1,
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
        const { data } = await this.$axios.get('/homepage/column', {
          params: {
            cntPerPage: 8,
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
        const { data } = await this.$axios.get('/homepage/column', {
          params: {
            cntPerPage: 8,
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
    // 기능
  },
}
</script>
<style lang="scss" scoped>
.board-wrap {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  text-align: right;
  .btn-viewer {
    display: inline-block;
    width: 180px;
    height: 50px;
    border: 1px solid #333;
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    color: #333;
    &:hover {
      background: #333;
      color: #fff;
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
