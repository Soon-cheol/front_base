<template>
  <div class="page" :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }">
    <div class="page-header">
      <p class="tit">소전집 시리즈/교구</p>
      <p class="tit-exp">
        독서활동을 더욱 알차고 재미있게 도와주는 특별한 놀이 교구, 소단위 전집
      </p>
    </div>
    <div class="search">
      <input type="text" v-model="search" @keyup="enterKey($event)" />
      <button class="btn-reset" v-if="search !== ''" @click="txtReset" />
      <button class="btn-search" @click="txtSearch" />
    </div>
    <div v-if="prodList.length > 0" class="prod-list">
      <ul>
        <li
          v-for="(p, index) in prodList"
          :key="index"
          class="prod box-shadow160"
          @click="viewLink(p.prodId)"
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
    </div>
    <div v-else class="no-list">
      <p>검색결과가 존재하지 않습니다.</p>
      <button @click="txtReset">상품 리스트 보기</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      prodList: []
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    this.getList()
  },
  methods: {
    // 통신
    async getList() {
      try {
        const { data } = await this.$axios.get('/prod/mini')
        if (data.result) {
          // console.log('data', data.result)
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
            prodNm: this.search
          }
        })
        if (data.result) {
          this.prodList = data.result
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 기능
    viewLink(id) {
      console.log('id', id)
      this.$router.push({
        name: `${this.$route.name}-id`,
        params: { id: id }
      })
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
.page.pc {
  overflow: hidden;
  padding: 0 0 40px;
  text-align: center;
  & > * {
    margin: 0 auto;
    width: 1080px;
  }
  .page-header {
    p {
      color: $fontColor3;
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
  .no-list {
    padding-bottom: 2rem;
    p {
      padding: 2rem 0 4rem;
      font-size: 1.6rem;
    }
    button {
      width: 9rem;
      height: 2.5rem;
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
  .prod-list {
    & > ul {
      // overflow: hidden;
      margin: 0 0 56px -30px;
      text-align: left;
      & > li {
        float: left;
        width: 340px;
        margin: 0 0 30px 30px;
        cursor: pointer;
        .thume {
          height: 251px;
          text-align: center;
          img {
            width: 340px;
            height: 251px;
            vertical-align: middle;
          }
        }
        .info {
          height: 86px;
          padding: 28px 23px;
          // border: 1px solid #ececec;
          border-top: 0 none;
          .prod-tit {
            font-size: 18px;
            font-weight: 600;
            color: $fontColor3;
          }
          ul {
            overflow: hidden;
            margin-top: 20px;
            font-size: 16px;
            line-height: 23px;
            color: $fontColor6;
            li {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
.page.mo {
  overflow: hidden;
  text-align: center;
  .page-header {
    overflow: hidden;
    p {
      color: $fontColor3;
      &.tit {
        margin-top: 4rem;
        font-size: 2.1rem;
        font-weight: 600;
      }
      &.tit-exp {
        &.pc {
          display: none;
        }
        margin: 1.1rem 0 3.2rem;
        font-size: 1.5rem;
        line-height: 2.2rem;
        font-weight: 400;
      }
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
      color: $fontColor6;
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
      background: url('~static/svg2/icon_x.svg') no-repeat center center;
      background-size: 0.8rem;
      z-index: 2;
    }
    .btn-search {
      position: absolute;
      top: 0;
      right: 0;
      width: 2rem;
      height: 2.7rem;
      background: url('~static/svg2/icon_zoom.svg') no-repeat center center;
      background-size: 1.4rem;
      z-index: 2;
    }
  }
  .no-list {
    padding-bottom: 4rem;
    p {
      padding: 2rem 0 4rem;
      font-size: 1.6rem;
    }
    button {
      width: 12rem;
      height: 3rem;
      border: 1px solid #cfcfcf;
      border-radius: 1.3rem;
      background: $fontColor9;
      font-size: 1.2rem;
      line-height: 2.8rem;
      color: #fff;
    }
  }
  .prod-list {
    padding: 0 1.5rem 6rem;
    .prod {
      & + li {
        margin-top: 3rem;
      }
      .thume {
        width: 29rem;
        height: 21.7rem;
        line-height: 21.7rem;
        img {
          width: 100%;
          vertical-align: top;
        }
      }
      .info {
        padding: 2.3rem 1.7rem 2.7rem;
        text-align: left;
        .prod-tit {
          // margin: 0 0 4.2rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: $fontColor3;
        }
        ul {
          li {
            font-size: 1.3rem;
            line-height: 2rem;
            color: $fontColor6;
          }
        }
      }
    }
  }
}
</style>
