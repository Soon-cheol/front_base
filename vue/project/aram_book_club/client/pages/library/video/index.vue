<template>
  <div
    v-if="viewMode"
    class="library-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div>
      <!-- option -->
      <div class="option">
        <ul class="tab-menu">
          <li
            class="all"
            :class="{ active: tab === 'all' }"
            @click="tabMove('all')"
          >
            <span>전체</span>
          </li>
          <li
            class="aram"
            :class="{ active: tab === 'aram' }"
            @click="tabMove('aram')"
          >
            <span>전집</span>
          </li>
          <li
            class="mini"
            :class="{ active: tab === 'mini' }"
            @click="tabMove('mini')"
          >
            <span>소전집</span>
          </li>
          <li
            class="smart"
            :class="{ active: tab === 'smart' }"
            @click="tabMove('smart')"
          >
            <span>스마트북</span>
          </li>
          <!-- <li class="etc"><span>기타</span></li> -->
        </ul>
        <div class="search">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            v-model="searchWord"
            ref="txtSearch"
            @keyup="enterKey($event)"
          />
          <button @click="getList" />
        </div>
      </div>
      <!-- // option -->
      <div v-if="tab === 'all'" class="swiper-wrap">
        <div v-if="recent.length > 0">
          <h3>최근 이용한 콘텐츠</h3>
          <libraryPcSwiper v-if="viewMode === 'pc'" :swiperList="recent" />
          <libraryMoSwiper v-else-if="viewMode === 'mo'" :swiperList="recent" />
        </div>
        <div v-else>
          <h3>최근 이용한 콘텐츠</h3>
          <p class="no-list">검색결과가 존재하지 않습니다.</p>
        </div>
        <div v-if="views.length > 0">
          <h3>조회수가 높은 콘텐츠</h3>
          <libraryPcSwiper v-if="viewMode === 'pc'" :swiperList="views" />
          <libraryMoSwiper v-else-if="viewMode === 'mo'" :swiperList="views" />
        </div>
        <div v-else>
          <h3>조회수가 높은 콘텐츠</h3>
          <p class="no-list">검색결과가 존재하지 않습니다.</p>
        </div>
        <div v-if="free.length > 0">
          <h3>무료 제공 콘텐츠</h3>
          <libraryPcSwiper v-if="viewMode === 'pc'" :swiperList="free" />
          <libraryMoSwiper v-else-if="viewMode === 'mo'" :swiperList="free" />
        </div>
        <div v-else>
          <h3>무료 제공 콘텐츠</h3>
          <p class="no-list">검색결과가 존재하지 않습니다.</p>
        </div>
      </div>
      <div v-else class="swiper-wrap">
        <div v-if="viewList.length > 0">
          <div v-for="(v, index) in viewList" :key="index">
            <h3>{{ v.prodName }}</h3>
            <libraryPcSwiper
              v-if="viewMode === 'pc'"
              :swiperList="v.contents"
            />
            <libraryMoSwiper
              v-else-if="viewMode === 'mo'"
              :swiperList="v.contents"
            />
          </div>
        </div>
        <div v-else>
          <p class="no-list">
            검색결과가 존재하지 않습니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
import libraryPcSwiper from '~/components/vendors/libraryPcSwiper'
import libraryMoSwiper from '~/components/vendors/libraryMoSwiper'
export default {
  data() {
    return {
      tab: 'all',
      recent: [''],
      views: [''],
      free: [''],
      viewList: [''],
      searchWord: ''
    }
  },
  components: {
    loginConfirm,
    libraryPcSwiper,
    libraryMoSwiper
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode,
      // userToken: (state) => state.user.userToken,
      isLoggedIn: (state) => state.auth.loggedIn
    })
  },
  created() {
    this.getList()
  },
  methods: {
    // 통신
    async getList() {
      try {
        if (
          this.searchWord === undefined ||
          this.searchWord === null ||
          !this.searchWord
        ) {
          this.searchWord = ''
        }
        let cate
        switch (this.tab) {
          case 'aram':
            cate = 'regular-series'
            break
          case 'mini':
            cate = 'mini-series'
            break
          case 'smart':
            cate = 'smartbook'
            break
          default:
            break
        }
        if (this.tab !== 'all') {
          // 카테고리별 리스트
          const { data } = await this.$axios.get(`/library/video/${cate}`, {
            params: {
              searchWord: this.searchWord
            }
          })
          this.viewList = data.result
        } else {
          // 전체 리스트
          const { data } = await this.$axios.get('/library/video', {
            params: {
              searchWord: this.searchWord
            }
          })
          this.recent = data.result.recent
          this.views = data.result.views
          this.free = data.result.free
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    enterKey(e) {
      if (e.keyCode === 13) {
        this.getList()
      }
    },
    tabMove(v) {
      if (this.tab !== v) {
        this.tab = v
        this.searchWord = ''
      }
      this.getList()
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
.library-wrap {
  &.pc {
    width: 1140px;
    margin: 70px auto;
    .option {
      overflow: hidden;
      padding: 0 38px;
      .tab-menu {
        float: left;
        margin-left: -35px;
        li {
          float: left;
          width: 110px;
          padding-top: 60px;
          font-size: 14px;
          text-align: center;
          color: $fontColor9;
          cursor: pointer;
          &.all {
            background: url('~static/images/pc/contents/library/ico_tab_all.svg')
              no-repeat center top;
            background-size: 50px;
          }
          &.aram {
            background: url('~static/images/pc/contents/library/ico_tab_aram.svg')
              no-repeat center top;
            background-size: 50px;
          }
          &.mini {
            background: url('~static/images/pc/contents/library/ico_tab_mini.svg')
              no-repeat center top;
            background-size: 50px;
          }
          &.smart {
            background: url('~static/images/pc/contents/library/ico_tab_smart.svg')
              no-repeat center top;
            background-size: 50px;
          }
          &.etc {
            background: url('~static/images/pc/contents/library/ico_tab_etc.svg')
              no-repeat center top;
            background-size: 50px;
          }
          span {
            position: relative;
            display: inline-block;
            padding: 0 4px 15px;
            &::after {
              position: absolute;
              left: 0;
              bottom: 0;
              content: '';
              display: block;
              width: 100%;
              height: 4px;
              border-radius: 8px;
            }
          }
          &.active {
            font-size: 18px;
            font-weight: 600;
            color: $fontColor3;
            span {
              &::after {
                background: #0087bd;
              }
            }
          }
        }
      }
      .search {
        overflow: hidden;
        float: right;
        width: 380px;
        height: 50px;
        border-radius: 24px;
        margin-top: 7px;
        & > * {
          float: left;
          height: 50px;
          font-size: 14px;
        }
        input[type='text'] {
          width: 330px;
          padding: 10px 26px;
          background-color: #f1f4f7;
          border: 0 none;
        }
        button {
          width: 50px;
          background: #0087bd
            url('~static/images/pc/contents/library/ico_zoom.svg') no-repeat
            center center;
        }
      }
    }
    .swiper-wrap {
      h3 {
        margin: 30px 38px 0;
        font-size: 20px;
        font-weight: 400;
      }
      .no-list {
        padding: 60px 0;
        font-size: 28px;
        text-align: center;
      }
    }
  }
  &.mo {
    .option {
      padding-top: 1.5rem;
      .tab-menu {
        display: table;
        width: 100%;
        margin-bottom: 1.2rem;
        li {
          position: relative;
          display: table-cell;
          width: 6.4rem;
          height: 7.7rem;
          font-size: 1rem;
          text-align: center;
          color: $fontColor6;
          &.all {
            background: url('~static/images/pc/contents/library/ico_tab_all.svg')
              no-repeat center top;
            background-size: 4rem;
          }
          &.aram {
            background: url('~static/images/pc/contents/library/ico_tab_aram.svg')
              no-repeat center top;
            background-size: 4rem;
          }
          &.mini {
            background: url('~static/images/pc/contents/library/ico_tab_mini.svg')
              no-repeat center top;
            background-size: 4rem;
          }
          &.smart {
            background: url('~static/images/pc/contents/library/ico_tab_smart.svg')
              no-repeat center top;
            background-size: 4rem;
          }
          &.etc {
            background: url('~static/images/pc/contents/library/ico_tab_etc.svg')
              no-repeat center top;
            background-size: 4rem;
          }
          &.active {
            font-size: 1.3rem;
            font-weight: 600;
            color: $fontColor3;
            &::after {
              content: '';
              display: block;
              position: absolute;
              bottom: 0;
              left: 2rem;
              width: 4rem;
              height: 0.3rem;
              background: #0087bd;
              border-radius: 0.5rem;
            }
          }
          span {
            position: absolute;
            top: 4.7rem;
            display: block;
            width: 100%;
            text-align: center;
          }
        }
      }
      .search {
        overflow: hidden;
        border-radius: 1.9rem;
        margin: 0 1.5rem 3rem;
        input[type='text'] {
          float: left;
          width: 25.1rem;
          height: 3.8rem;
          padding: 0.8rem 1.2rem;
          background: #f8f8fa;
          border: 0 none;
          font-size: 1.3rem;
          font-weight: 300;
        }
        button {
          float: right;
          width: 3.9rem;
          height: 3.8rem;
          background: #0087bd
            url('~static/images/mobile/contents/library/btn_zoom.svg') no-repeat
            center center;
          background-size: 2.3rem;
        }
      }
    }
    .swiper-wrap {
      & > div {
        margin: 0 1.5rem;
        &:last-child {
          margin-bottom: 2rem;
        }
      }
    }
  }
}
</style>
