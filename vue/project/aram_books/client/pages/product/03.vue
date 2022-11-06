<template>
  <div class="page">
    <div class="page-header">
      <p class="tit">소전집 시리즈/교구</p>
      <p class="tit-exp">
        독서활동을 더욱 알차고 재미있게 도와주는 특별한 놀이 교구, 소단위 전집
      </p>
      <a class="btn-link" href="https://www.arambookclub.com/"
        >북클럽 바로가기</a
      >
    </div>
    <div class="search">
      <input type="text" v-model="search" @keyup="enterKey($event)" />
      <button class="btn-reset" v-if="search !== ''" @click="txtReset" />
      <button class="btn-search" @click="txtSearch" />
    </div>
    <ul v-if="prodList.length > 0">
      <li
        v-for="(p, index) in prodList"
        :key="index"
        class="box-shadow160"
        @click="goDetail(p.prodId)"
      >
        <div class="thume">
          <img :src="p.thnlUrl" />
        </div>
        <div class="info">
          <p class="prod-tit">{{ p.prodNm }}</p>
          <!-- <ul>
            <li>대상연령 : {{ p.trgtAgerNm }}</li>
          </ul> -->
        </div>
      </li>
    </ul>
    <div v-else class="no-list">
      <p>검색결과가 존재하지 않습니다.</p>
      <button @click="txtReset">상품 리스트 보기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      prodList: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const { data } = await this.$axios.get('/prod/mini')
        if (data.result) {
          this.prodList = data.result
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async txtSearch() {
      try {
        const { data } = await this.$axios.get('/prod/mini', {
          params: {
            prodNm: this.search,
          },
        })
        if (data.result) {
          this.prodList = data.result
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    goDetail(prodId) {
      window.location.href = 'https://arambookclub.com/aram/minibook/' + prodId
    },
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
.page {
  position: relative;
  text-align: left;
  .page-header {
    p {
      color: #333;
      &.tit {
        margin-top: 70px;
        font-size: 44px;
        font-weight: 600;
      }
      &.tit-exp {
        margin: 22px 0 60px;
        font-size: 18px;
        font-weight: 400;
        line-height: 30px;
      }
    }
    .btn-link {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      width: 200px;
      height: 50px;
      background: #72cbd2;
      border-radius: 28px;
      font-size: 20px;
      font-weight: 200;
      text-align: center;
      line-height: 50px;
      color: #fff;
    }
  }
  .search {
    position: relative;
    overflow: hidden;
    width: 22rem;
    margin: 0 auto 2.5rem;
    & > * {
      float: left;
    }
    select {
      height: 2.7rem;
      border: 0 none;
      border-bottom: 0.1rem solid #999;
      font-size: 7.5rem;
      color: #666;
    }
    input {
      // width: calc(100% - 116px);
      width: 100%;
      border: 0 none;
      padding: 0.7rem 4rem 0.7rem 0.7rem;
      border-bottom: 0.1rem solid #999;
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
  & > ul {
    margin: 0 0 56px -24px;
    & > li {
      overflow: hidden;
      float: left;
      width: 384px;
      margin: 0 0 24px 24px;
      cursor: pointer;
      &:last-child {
        margin-bottom: 64px;
      }
      .thume {
        height: 284px;
        text-align: center;
        line-height: 284px;
        img {
          width: 387px;
          vertical-align: middle;
        }
      }
      .info {
        height: 80px;
        padding: 28px 23px;
        border-top: 0 none;
        .prod-tit {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        ul {
          overflow: hidden;
          margin-top: 20px;
          font-size: 16px;
          line-height: 23px;
          color: #666;
          li {
            width: 100%;
          }
        }
      }
    }
  }
  .no-list {
    padding: 4rem 0 10rem;
    text-align: center;
    p {
      padding: 2rem 0;
      font-size: 1.6rem;
    }
    button {
      width: 9rem;
      height: 2.5rem;
      border: 1px solid #cfcfcf;
      border-radius: 1.3rem;
      font-size: 0.9rem;
      color: #333;
      &:hover {
        background: #666;
        color: #fff;
      }
    }
  }
}
</style>
