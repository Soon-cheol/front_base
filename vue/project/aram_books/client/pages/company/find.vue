<template>
  <div class="page">
    <div class="search">
      <select ref="selArea">
        <option value="0">전체</option>
        <option value="1">강원도</option>
        <option value="2">경기도</option>
        <option value="3">경상남도</option>
        <option value="4">경상북도</option>
        <option value="5">광주광역시</option>
        <option value="6">대구광역시</option>
        <option value="7">대전광역시</option>
        <option value="8">부산광역시</option>
        <option value="9">서울특별시</option>
        <option value="10">세종특별자치시</option>
        <option value="11">울산광역시</option>
        <option value="12">인천광역시</option>
        <option value="13">전라남도</option>
        <option value="14">전라북도</option>
        <option value="15">제주특별자치도</option>
        <option value="16">충청남도</option>
        <option value="17">충청북도</option>
      </select>
      <input
        type="text"
        v-model="search"
        @keyup="enterKey($event)"
        placeholder="시/군/구"
      />
      <button @click="txtSearch" />
    </div>
    <div class="list">
      <p class="txt-online">
        온라인에서 판매하는 아람북스 도서는 정품 등록이 되지 않는 중고도서이므로
        주의하시기 바랍니다.
      </p>
      <p class="txt-all">
        전체 <span>{{ page.totalCnt }}</span
        >건
      </p>
      <ul>
        <li
          v-for="(l, index) in list"
          :key="index"
          @click="mapLink(l.ORG_ADDR_NM)"
        >
          <p class="name">
            <span class="txt">{{ l.ORG_NM }}</span>
            <span class="ico" />
          </p>
          <p class="addr">A. {{ l.ORG_ADDR_NM }}</p>
          <p class="phone">T. {{ l.CONT1_TEL_NO }}</p>
        </li>
      </ul>
    </div>
    <div class="paging">
      <span class="btn first" @click="pageMove(1)" />
      <span class="btn prev" @click="pageMove(page.nowPage - 1)" />
      <ol v-if="page.nowPage < 6 && page.totalPage >= 11">
        <li
          v-for="(n, index) in 11"
          :key="index"
          @click="pageMove(n)"
          class="btn num"
          :class="{ active: n === page.nowPage }"
        >
          {{ n }}
        </li>
      </ol>
      <ol v-else-if="page.nowPage < 6 && page.totalPage < 11">
        <li
          v-for="(n, index) in page.totalPage"
          :key="index"
          @click="pageMove(n)"
          class="btn num"
          :class="{ active: n === page.nowPage }"
        >
          {{ n }}
        </li>
      </ol>
      <ol v-else>
        <li @click="pageMove(page.nowPage - 5)" class="btn num">
          {{ page.nowPage - 5 }}
        </li>
        <li @click="pageMove(page.nowPage - 4)" class="btn num">
          {{ page.nowPage - 4 }}
        </li>
        <li @click="pageMove(page.nowPage - 3)" class="btn num">
          {{ page.nowPage - 3 }}
        </li>
        <li @click="pageMove(page.nowPage - 2)" class="btn num">
          {{ page.nowPage - 2 }}
        </li>
        <li @click="pageMove(page.nowPage - 1)" class="btn num">
          {{ page.nowPage - 1 }}
        </li>
        <li class="btn num active">
          {{ page.nowPage }}
        </li>
        <li
          v-if="page.nowPage + 1 <= page.totalPage"
          @click="pageMove(page.nowPage + 1)"
          class="btn num"
        >
          {{ page.nowPage + 1 }}
        </li>
        <li
          v-if="page.nowPage + 2 <= page.totalPage"
          @click="pageMove(page.nowPage + 2)"
          class="btn num"
        >
          {{ page.nowPage + 2 }}
        </li>
        <li
          v-if="page.nowPage + 3 <= page.totalPage"
          @click="pageMove(page.nowPage + 3)"
          class="btn num"
        >
          {{ page.nowPage + 3 }}
        </li>
        <li
          v-if="page.nowPage + 4 <= page.totalPage"
          @click="pageMove(page.nowPage + 4)"
          class="btn num"
        >
          {{ page.nowPage + 4 }}
        </li>
        <li
          v-if="page.nowPage + 5 <= page.totalPage"
          @click="pageMove(page.nowPage + 5)"
          class="btn num"
        >
          {{ page.nowPage + 5 }}
        </li>
      </ol>
      <span class="btn next" @click="pageMove(page.nowPage + 1)" />
      <span class="btn last" @click="pageMove(page.totalPage)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // mapUrl: 'https://map.naver.com/search2/search.nhn?query=',
      mapUrl: 'https://map.kakao.com/link/search/',
      search: '',
      page: {},
      list: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 통신
    async getList() {
      try {
        const { data } = await this.$axios.get('/homepage/agent', {
          params: {
            cntPerPage: 9,
          },
        })
        if (data.result) {
          this.page = data.page
          this.list = data.result
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async txtSearch() {
      const sel = this.$refs.selArea.selectedIndex
      try {
        const { data } = await this.$axios.get('/homepage/agent', {
          params: {
            cntPerPage: 9,
            region: sel,
            schWord: this.search,
          },
        })
        if (data.result) {
          this.page = data.page
          this.list = data.result
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
      const sel = this.$refs.selArea.selectedIndex
      try {
        const { data } = await this.$axios.get('/homepage/agent', {
          params: {
            cntPerPage: 9,
            region: sel,
            schWord: this.search,
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
    enterKey(e) {
      if (event.keyCode === 13) {
        this.txtSearch()
      }
    },
    mapLink(txt) {
      const num = txt.indexOf('(')
      console.log('num', num)
      if (num >= 0) {
        window.open(`${this.mapUrl}${txt.substr(0, num)}`, '_blank')
      } else {
        window.open(`${this.mapUrl}${txt}`, '_blank')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  overflow: hidden;
  margin-top: 58px;
  margin-bottom: 160px;
  .search {
    position: relative;
    overflow: hidden;
    width: 480px;
    margin: 0 auto 50px;
    & > * {
      float: left;
    }
    select {
      width: 147px;
      height: 54px;
      padding: 8px 36px 8px 14px;
      border: 0 none;
      border-bottom: 2px solid #999;
      background: url('/common/icon_arrow_gray.png') no-repeat 88% center;
      font-size: 15px;
      color: #666;
      cursor: pointer;
    }
    input {
      width: calc(100% - 147px);
      // width: 100%;
      border: 0 none;
      padding: 14px 40px 14px 10px;
      border-bottom: 2px solid #999;
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 54px;
      background: url('/common/ico_zoom.svg') no-repeat center center;
      z-index: 2;
    }
  }
  .list {
    height: 600px;
    .txt-online {
      margin-bottom: 20px;
      font-size: 16px;
      color: #ff4548;
    }
    .txt-all {
      float: left;
      width: 100%;
      padding-bottom: 16px;
      // margin-bottom: 30px;
      border-bottom: 2px solid #333;
      font-size: 18px;
      text-align: left;
      color: #333;
      span {
        font-weight: 600;
        color: #72cbd2;
      }
    }
    ul {
      // overflow: hidden;
      margin-left: -24px;
      li {
        float: left;
        width: 384px;
        height: 157px;
        margin-left: 24px;
        padding: 34px 26px 37px 60px;
        background: url('/company/ico_map.svg') no-repeat 24px 28px;
        border-bottom: 1px solid #cfcfcf;
        font-size: 14px;
        font-weight: 200;
        text-align: left;
        color: #666;
        cursor: pointer;
        p {
          & + p {
            margin-top: 10px;
            line-height: 20px;
          }
          .ico {
            position: absolute;
            top: 2px;
            right: 4px;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('/company/ico_map_link.svg') no-repeat 0 0;
            background-size: 100%;
          }
          &.name {
            position: relative;
            .txt {
              display: block;
              overflow: hidden;
              width: 88%;
              font-size: 18px;
              font-weight: 400;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              color: #333;
            }
          }
        }
      }
    }
  }
  .paging {
    overflow: hidden;
    position: relative;
    height: 50px;
    margin-bottom: 120px;
    text-align: center;
    ol {
      overflow: hidden;
      width: 530px;
      margin: 0 auto;
      text-align: left;
      li {
        float: left;
      }
    }
    & > span {
      position: absolute;
      top: 0;
    }
    .btn {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin: 4px;
      border-radius: 100%;
      vertical-align: top;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
      &.first {
        left: 210px;
        background: url('/common/arrow_page02.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.prev {
        left: 258px;
        background: url('/common/arrow_page01.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.next {
        right: 258px;
        background: url('/common/arrow_page01.svg') no-repeat 0 0;
      }
      &.last {
        right: 210px;
        background: url('/common/arrow_page02.svg') no-repeat 0 0;
      }
      &.num {
        border: 1px solid #dfdfdf;
        color: #dfdfdf;
        &.active {
          border: 1px solid #333;
          color: #333;
        }
      }
    }
  }
  /*.tab {
    display: table;
    width: 100%;
    margin: 100px 0 50px;
    border-bottom: 2px solid #333;
    li {
      display: table-cell;
      vertical-align: middle;
      a {
        display: block;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        color: #333;
        &.nuxt-link-active {
          background: #333;
          color: #fff;
        }
      }
    }
  }*/
}
</style>
