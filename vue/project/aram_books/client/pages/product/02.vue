<template>
  <div class="page">
    <div class="page-header">
      <p class="tit">스마트북 시리즈</p>
      <p class="tit-exp">아이들을 위한 노래가 될 디지털 전집</p>
      <a class="btn-link" href="https://www.arambookclub.com/"
        >북클럽 바로가기</a
      >
    </div>
    <ul v-if="prodList">
      <li
        v-for="(p, index) in prodList"
        :key="index"
        class="box-shadow160"
        @click="goDetail(p.dgtlProdId)"
      >
        <div class="thume">
          <img :src="p.thnlUrl" />
        </div>
        <div class="info">
          <p class="prod-tit">{{ p.prodNm }}</p>
          <ul>
            <li>대상연령 : {{ p.trgtAgerNm }}</li>
            <li>
              연계전집 유무 : <span v-if="p.existRelatedProd === 'Y'">있음</span
              ><span v-else>없음</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prodList: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const { data } = await this.$axios.get('/prod/digital')
        if (data.result) {
          console.log('data', data.result)
          this.prodList = data.result
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    goDetail(prodId) {
      window.location.href = 'https://arambookclub.com/smart/book/' + prodId
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
        height: 160px;
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
}
</style>
