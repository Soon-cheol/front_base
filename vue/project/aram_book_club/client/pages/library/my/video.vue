<template>
  <div
    v-if="viewMode"
    class="library-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <h2>나의 라이브러리</h2>
    <div class="menu">
      <ul class="tab">
        <li class="active">영상</li>
        <li @click="tabMove('/library/my/music')">음원</li>
      </ul>
      <div class="search">
        <input
          type="text"
          v-model="searchWord"
          ref="txtSearch"
          @keyup="enterKey($event)"
          placeholder="검색어를 입력하세요"
        />
        <button @click="getList" />
      </div>
    </div>
    <p v-if="!videoList" class="no-list">
      목록이 없습니다.
    </p>
    <ul v-else class="list">
      <li v-for="(v, index) in videoList" :key="index">
        <div class="thume" @click="detailView(v)">
          <span v-if="v.isWatched" class="ico-watch">시청함</span>
          <img :src="v.thumbnail" />
        </div>
        <div class="name">
          <p @click="detailView(v)">{{ v.title }}</p>
          <button v-show="!v.isFavorite" class="star" @click="addFavor(v)" />
          <button v-show="v.isFavorite" class="star-on" @click="addFavor(v)" />
        </div>
        <ul class="views">
          <li class="cate">{{ v.category }}</li>
          <li class="num">{{ v.views }}회</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  data() {
    return {
      searchWord: '',
      videoList: true
    }
  },
  components: {
    loginConfirm
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
  mounted() {},
  methods: {
    async getList() {
      try {
        if (
          this.searchWord === undefined ||
          this.searchWord === null ||
          !this.searchWord
        ) {
          this.searchWord = ''
        }
        const { data } = await this.$axios.get('/library/favorites/video', {
          params: {
            searchWord: this.searchWord,
            cntPerPage: 100
          }
        })
        data.result.length <= 0
          ? (this.videoList = false)
          : (this.videoList = data.result)
      } catch (error) {
        console.error(error)
      }
    },
    // 통신
    async addFavor(obj) {
      const video = this.videoList.find((m) => m === obj)
      if (video.isFavorite) {
        // 즐찾 삭제
        try {
          const { data } = await this.$axios.delete(
            `/library/favorites/contents/${video.infoSeqno}/${video.seqno}`
          )
        } catch (error) {
          console.error(error)
        }
      } else {
        // 즐찾 추가
        try {
          const { data } = await this.$axios.post(
            `/library/favorites/contents/${video.infoSeqno}/${video.seqno}`
          )
        } catch (error) {
          console.error(error)
        }
      }
      const star = this.videoList.findIndex((m) => m.no === obj.no)
      this.videoList[star].isFavorite = !this.videoList[star].isFavorite
    },
    // 기능
    tabMove(link) {
      this.$router.push(link)
    },
    enterKey(e) {
      if (e.keyCode === 13) {
        this.getList()
      }
    },
    detailView(obj) {
      const path = obj.infoSeqno + '-' + obj.seqno
      this.$router.push({
        name: 'library-video-id',
        params: { id: path }
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
@keyframes like-gif {
  0% {
    background-position: 0 0;
  }
  99% {
    background-position: -3800px 0;
  }
  100% {
    background-position: 0 0;
  }
}
.library-wrap {
  &.pc {
    overflow: hidden;
    width: 1080px;
    min-height: 800px;
    margin: 0 auto;
    h2 {
      padding: 69.5px 0 40px;
      font-size: 28px;
      text-align: center;
      font-weight: 500;
    }
    .menu {
      overflow: hidden;
      height: 100px;
      .tab {
        float: left;
        height: 100%;
        li {
          float: left;
          width: 50px;
          height: 100%;
          padding-top: 58px;
          font-size: 14px;
          font-weight: 200;
          text-align: center;
          color: $fontColor6;
          cursor: pointer;
          &:first-child {
            background: url('~static/svg2/ico_movie.svg') no-repeat -62px 0;
            background-size: auto 50px;
          }
          &:last-child {
            margin-left: 60px;
            background: url('~static/svg2/ico_music.svg') no-repeat -62px 0;
            background-size: auto 50px;
          }
          &.active {
            position: relative;
            background-position: 0 0;
            font-size: 18px;
            font-weight: 600;
            color: $fontColor3;
            &::after {
              position: absolute;
              content: '';
              left: 0;
              bottom: 0;
              display: block;
              width: 100%;
              border-radius: 2px;
              border-bottom: 4px solid #0087bd;
            }
          }
        }
      }
      .search {
        float: right;
        width: 380px;
        height: 50px;
        & > * {
          float: left;
          height: 50px;
          font-size: 16px;
          vertical-align: top;
        }
        input[type='text'] {
          width: 330px;
          padding: 10px 26px;
          background-color: #f8f8fa;
          border: 0 none;
          border-radius: 24px 0 0 24px;
        }
        button {
          width: 50px;
          background: #0087bd
            url('~static/images/pc/contents/library/ico_zoom.svg') no-repeat
            center center;
          border-radius: 0 24px 24px 0;
        }
      }
    }
    .option {
      overflow: hidden;
      margin-bottom: 19px;
      select {
        min-width: 313px;
        height: 50px;
        padding: 0 62px 0 24px;
        border: 1px solid #dbdbdb;
        background: url('~static/images/pc/contents/library/ico_sel_arrow.svg')
          no-repeat 92% 50%;
        font-size: 16px;
        color: $fontColor3;
      }
      .btn-wrap {
        overflow: hidden;
        margin-top: 30px;
        font-size: 14px;
        color: $fontColor3;
        li {
          float: left;
          button {
            width: 134px;
            height: 40px;
            padding-left: 36px;
            border: 1px solid #dbdbdb;
            border-radius: 20px;
            background: #fff
              url('~static/images/pc/contents/library/ico_option_play.svg')
              no-repeat 14px center;
            background-size: 32px auto;
            font-size: 16px;
            font-weight: 400;
          }
          & + li {
            margin-left: 12px;
            button {
              width: 124px;
              background-image: url('~static/images/pc/contents/library/ico_option_star.svg');
            }
          }
        }
      }
    }
    input[type='checkbox'] {
      position: absolute;
      top: 10px;
      left: 37px;
      width: 26px;
      height: 26px;
      opacity: 0;
    }
    input[type='checkbox'] + label {
      display: inline-block;
      width: 26px;
      height: 26px;
      border: 1px solid #dbdbdb;
      border-radius: 5px;
      background: #fff;
    }
    input[type='checkbox']:checked + label {
      border: 1px solid #0087bd;
      background: #0087bd
        url('~static/images/pc/contents/library/ico_check.svg') no-repeat center
        center;
    }
    .list {
      overflow: hidden;
      width: 1100px;
      margin: 30px 0 60px -10px;
      & > li {
        float: left;
        width: 255px;
        margin: 0 10px 30px;
        .thume {
          position: relative;
          overflow: hidden;
          width: 255px;
          height: 143px;
          background: #efefef;
          border-radius: 12px;
          cursor: pointer;
          .ico-watch {
            position: absolute;
            top: 0;
            left: 0;
            padding: 7px;
            background: #0087bd;
            font-size: 12px;
            font-weight: 200;
            border-radius: 0 0 12px 0;
            color: #fff;
            z-index: 1;
          }
          img {
            width: 255px;
            height: 143px;
          }
        }
        .name {
          position: relative;
          margin-top: 8px;
          p {
            overflow: hidden;
            display: -webkit-box;
            width: 192px;
            height: 36px;
            font-size: 13px;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2; /* ellipsis line */
            -webkit-box-orient: vertical;
            line-height: 18px;
            cursor: pointer;
          }
          // p {
          //   width: 192px;
          //   height: 38px;
          //   font-size: 15px;
          //   line-height: 38px;
          // }
          .star {
            position: absolute;
            top: 2px;
            right: 0;
            width: 54px;
            height: 36px;
            padding: 0;
            background: url('/images/pc/contents/library/ico_star_off.svg')
              no-repeat right center;
            z-index: 2;
          }

          .star-on {
            position: absolute;
            top: -91px;
            right: -33px;
            width: 100px;
            height: 160px;
            background: url('/images/pc/contents/library/star_sprite.png')
              no-repeat 0 0;
            animation: like-gif steps(38) 1.8s;
            z-index: 3;
          }
          @keyframes like-gif {
            0% {
              background-position: 0 0;
            }
            99% {
              background-position: -3800px 0;
            }
            100% {
              background-position: 0 0;
            }
          }
        }
        .views {
          overflow: hidden;
          width: 100%;
          margin-top: 4px;
          font-size: 12px;
          color: $fontColor9;
          li {
            float: left;
            padding-left: 18px;
            &.cate {
              background: url('~static/images/pc/contents/library/ico_folder.svg')
                no-repeat left center;
              margin-right: 10px;
            }
            &.num {
              background: url('~static/images/pc/contents/library/ico_play.svg')
                no-repeat left center;
            }
          }
        }
      }
    }
    .no-list {
      padding: 180px 0;
      margin-top: 40px;
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
      font-size: 30px;
      text-align: center;
    }
  }
  &.mo {
    padding: 1.5rem;
    h2 {
      display: none;
    }
    .menu {
      .tab {
        width: 100%;
        text-align: center;
        li {
          display: inline-block;
          width: 4rem;
          height: 7.4rem;
          padding-top: 4.5rem;
          text-align: center;
          &:first-child {
            background: url('~static/svg2/ico_movie.svg') no-repeat -5rem 0;
            background-size: auto 4rem;
          }
          &:last-child {
            margin-left: 3.5rem;
            background: url('~static/svg2/ico_music.svg') no-repeat -5rem 0;
            background-size: auto 4rem;
          }
          &.active {
            position: relative;
            // padding-top: 4.5rem;
            background-position: 0 0;
            font-size: 1.3rem;
            font-weight: 600;
            color: $fontColor3;
            &::after {
              position: absolute;
              content: '';
              left: 0;
              bottom: 0;
              display: block;
              width: 100%;
              border-radius: 2px;
              border-bottom: 4px solid #0087bd;
            }
          }
        }
      }
    }
    .search {
      overflow: hidden;
      width: 29rem;
      margin: 1.2rem 0 3rem;
      border-radius: 1.9rem;
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
    .btn-wrap {
      overflow: hidden;
      padding-bottom: 1rem;
      border-bottom: 2px solid $fontColor3;
      li:first-child {
        position: relative;
        float: left;
        input[type='checkbox'] {
          top: 0;
        }
      }
      li:last-child {
        float: right;
        button {
          width: 7.8rem;
          height: 2.5rem;
          padding: 0 0.6rem 0 2.2rem;
          border: 1px solid #dbdbdb;
          border-radius: 2.5rem;
          background: #fff
            url('~static/images/pc/contents/library/ico_option_play.svg')
            no-repeat 0.6rem center;
          background-size: 1.6rem;
          font-size: 1.1rem;
          color: $fontColor3;
        }
      }
    }
    .list {
      overflow: hidden;
      & > li {
        float: left;
        width: 14.1rem;
        margin-bottom: 1.5rem;
        &:nth-child(even) {
          margin-left: 0.8rem;
        }
        .thume {
          position: relative;
          .ico-watch {
            position: absolute;
            top: 0;
            left: 0;
            padding: 0.4rem 0.9rem;
            background: #0087bd;
            font-size: 1rem;
            font-weight: 200;
            border-radius: 0.6rem 0 0.6rem 0;
            color: #fff;
            z-index: 1;
          }
          img {
            width: 100%;
            border-radius: 0.5rem;
          }
        }
        .name {
          position: relative;
          margin-top: 0.8rem;
          p {
            overflow: hidden;
            display: -webkit-box;
            width: 14.1rem;
            height: 3.6rem;
            font-size: 1.2rem;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2; /* ellipsis line */
            -webkit-box-orient: vertical;
            line-height: 1.8rem;
            cursor: pointer;
          }
          button {
            display: none;
          }
        }
        .views {
          overflow: hidden;
          width: 100%;
          margin-top: 0.4rem;
          font-size: 12px;
          color: $fontColor9;
          li {
            float: left;
            padding-left: 18px;
            &.cate {
              background: url('~static/images/pc/contents/library/ico_folder.svg')
                no-repeat left center;
              margin-right: 10px;
            }
            &.num {
              background: url('~static/images/pc/contents/library/ico_play.svg')
                no-repeat left center;
            }
          }
        }
      }
    }
    .no-list {
      padding: 5rem 0;
      border-top: 1px solid #dfdfdf;
      font-size: 1.5rem;
      text-align: center;
    }
  }
}
</style>
