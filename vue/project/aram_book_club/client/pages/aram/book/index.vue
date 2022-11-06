<template>
  <div class="page" :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }">
    <div class="page-header">
      <p class="tit">전집 시리즈</p>
      <p class="tit-exp pc">
        우리 책을 읽자, 춤추자. 이 두 가지 놀이는 세상에 아무런 해를 끼치지 않을
        것이므로…&nbsp;&nbsp;&nbsp;&nbsp;- 볼테르 -
      </p>
      <p class="tit-exp mo">
        우리 책을 읽자, 춤추자.<br />이 두 가지 놀이는 세상에<br />아무런 해를
        끼치지 않을 것이므로…<br />- 볼테르 -
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
            <span class="ico-best" v-if="p.rcmdProdYn === 'Y'" />
          </div>
          <div class="info">
            <ul class="ico">
              <li
                v-if="
                  p.seriesCdList[0] === 'SZ01' || p.seriesCdList[1] === 'SZ01'
                "
                class="babyall"
              >
                베이비올
              </li>
              <li
                v-if="
                  p.seriesCdList[0] === 'SZ02' || p.seriesCdList[1] === 'SZ02'
                "
                class="kidsall"
              >
                키즈올
              </li>
              <li
                v-if="
                  p.seriesCdList[0] === 'SZ03' || p.seriesCdList[1] === 'SZ03'
                "
                class="school"
              >
                스쿨
              </li>
              <li
                v-if="
                  p.seriesCdList[0] === 'SZ99' || p.seriesCdList[1] === 'SZ99'
                "
                class="etc"
              >
                기타
              </li>
            </ul>
            <p class="prod-tit">{{ p.prodNm }}</p>
            <ul class="detail">
              <li>한줄소개 : {{ p.prodDstnCtt }}</li>
              <li>대상연령 : {{ p.trgtAgerNm }}</li>
              <li>
                상품구성 :
                {{ p.prodCmpstn }}
              </li>
              <li>
                상품가격 :
                {{
                  p.prodAplyPric
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}
                원
              </li>
            </ul>
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
        const { data } = await this.$axios.get('/prod/regular')
        if (data.result) {
          this.prodList = data.result.prodList
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    async txtSearch() {
      try {
        const { data } = await this.$axios.get('/prod/regular', {
          params: {
            prodNm: this.search
          }
        })
        if (data.result) {
          this.prodList = data.result.prodList
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
      if (e.keyCode === 13) {
        this.txtSearch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$blueColor: #269bd7;
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
        &.mo {
          display: none;
        }
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
          position: relative;
          height: 251px;
          text-align: center;
          img {
            width: 340px;
            height: 251px;
            vertical-align: middle;
          }
          .ico-best {
            position: absolute;
            top: 224px;
            right: 23px;
            display: block;
            width: 74px;
            height: 103px;
            background: url('/images/common/img_best.png') no-repeat 0 0;
          }
        }
        .info {
          height: 222px;
          padding: 21px 23px;
          // border: 1px solid #ececec;
          border-top: 0 none;
          .ico {
            overflow: hidden;
            height: 20px;
            margin-bottom: 6px;
            li {
              float: left;
              display: block;
              height: 20px;
              padding: 0 10px;
              border-radius: 10px;
              font-size: 12px;
              line-height: 20px;
              color: #fff;
              & + li {
                margin-left: 4px;
              }
              &.babyall {
                background-color: #94bd41;
              }
              &.kidsall {
                background-color: #00a0ea;
              }
              &.school {
                background-color: #ff4548;
              }
              &.etc {
                background-color: #00a0ea;
              }
            }
          }
          .prod-tit {
            font-size: 18px;
            font-weight: 600;
            color: $fontColor3;
          }
          .detail {
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
        position: relative;
        width: 29rem;
        height: 21.7rem;
        line-height: 21.7rem;
        img {
          width: 100%;
          vertical-align: top;
        }
        .ico-best {
          position: absolute;
          top: 19.2rem;
          right: 1.1rem;
          display: block;
          width: 5.7rem;
          height: 8.1rem;
          background: url('/images/common/img_best.png') no-repeat 0 0;
          background-size: 100% auto;
        }
      }
      .info {
        padding: 1.8rem 1.7rem 2.7rem;
        text-align: left;
        .ico {
          overflow: hidden;
          margin-bottom: 0.8rem;
          li {
            float: left;
            display: block;
            padding: 0.4rem 1rem;
            border-radius: 1rem;
            font-size: 1.2rem;
            color: #fff;
            & + li {
              margin-left: 0.8rem;
            }
            &.babyall {
              background-color: #94bd41;
            }
            &.kidsall {
              background-color: #00a0ea;
            }
            &.school {
              background-color: #ff4548;
            }
            &.etc {
              background-color: #00a0ea;
            }
          }
        }
        .prod-tit {
          margin: 0 0 1.2rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: $fontColor3;
        }
        .detail {
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
