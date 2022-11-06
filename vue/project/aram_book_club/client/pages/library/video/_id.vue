<template>
  <div
    v-if="viewMode"
    class="library-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div>
      <div class="section viewer">
        <!-- <video :src="$route.params.video.src" controls autoplay> -->
        <div v-if="vOption.src">
          <vplayer :playerOptions="vOption" @onplay="play" />
        </div>
        <dl>
          <dt class="tit">{{ view.title }}</dt>
          <dd class="txt">분류 {{ view.category }}</dd>
          <dd class="txt">조회수 {{ view.views }}회</dd>
          <dd class="txt">등록일 {{ view.createdDate }}</dd>
          <dd class="hash">{{ view.hashTag }}</dd>
        </dl>
        <button v-show="!isFavorite" class="star" @click="addFavor()" />
        <button v-show="isFavorite" class="star-on" @click="addFavor()" />
        <nuxt-link to="/library/video" class="btn-list">목록보기</nuxt-link>
      </div>
      <div class="section next">
        <p class="tit">다음 동영상</p>
        <ul class="list">
          <li v-for="(n, index) in nextList" :key="index">
            <img class="thume" :src="n.thumbnail" @click="detailView(n)" />
            <div class="views">
              <p class="name">{{ n.title }}</p>
              <ul>
                <li class="cate">{{ n.category }}</li>
                <li class="num">{{ n.views }}회</li>
              </ul>
              <button
                v-show="!n.isFavorite"
                class="star"
                @click="nextAddFavor(n)"
              />
              <button
                v-show="n.isFavorite"
                class="star-on"
                @click="nextAddFavor(n)"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  data() {
    return {
      infoSeqno: '',
      seqno: '',
      isFavorite: false,
      view: {},
      nextList: [],
      vOption: {
        type: 'application/x-mpegURL', //media type，m3u8 or application/x-mpegURL or application/vnd.apple.mpegURL，Others will default to normal audio and video，Note: WeChat does not support m3u8
        // src: 'https://contents.arambookclub.com/library/video/A1023001/A1023001_01/A1023001_01.m3u8', //Video address
        preload: true, //Whether to pre-download, the default is true
        autoplay: true, //Whether to play automatically (the compatibility is not very good), the default is false
        isLoop: false, //Whether to recycle, the default is not recycle
        playsinline: false, //Whether h5 is played in the line, the default is false, there are compatibility issues
        // poster: 'https://oimdztrab.qnssl.com/Frp4SyVe5PosdkUKRaE-krjK7B5z', //Cover, only video has
        controls: 'progress,current,durration', //The displayed controls, volume only have video, and all controls are displayed if no controls are configured.
        crossOrigin: false //Set the CORS settings of the video.
      }
    }
  },
  params: {
    id: {
      type: String,
      default: null
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
    // this.video = this.nextList[this.$route.params.id - 1]
    this.videoStart()
  },
  watch: {
    infoSeqno() {
      this.videoStart()
    },
    seqno() {
      this.videoStart()
    }
  },
  methods: {
    play(e) {
      console.log(e)
    },
    // 통신
    async getViewinfo() {
      try {
        const { data } = await this.$axios.get(
          `/library/video/contents/${this.infoSeqno}/${this.seqno}`
        )
        this.view = data.result.content
        this.vOption.src = data.result.content.videoUrl
        this.nextList = data.result.nextVideo
        this.isFavorite = data.result.content.isFavorite
      } catch (error) {
        console.error(error)
      }
    },
    async viewsUpdate() {
      console.log('viewsUpdate')
      try {
        const { data } = await this.$axios.post(
          `/library/played-contents/${this.infoSeqno}/${this.seqno}`
        )
      } catch (error) {
        console.error(error)
      }
    },
    async addFavor() {
      if (this.isFavorite) {
        // 즐찾 삭제
        try {
          const { data } = await this.$axios.delete(
            `/library/favorites/contents/${this.infoSeqno}/${this.seqno}`
          )
        } catch (error) {
          console.error(error)
        }
      } else {
        // 즐찾 추가
        try {
          const { data } = await this.$axios.post(
            `/library/favorites/contents/${this.infoSeqno}/${this.seqno}`
          )
        } catch (error) {
          console.error(error)
        }
      }
      this.isFavorite = !this.isFavorite
    },
    async nextAddFavor(obj) {
      console.log('obj', obj)
      const video = this.nextList.find((m) => m === obj)
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
      const star = this.nextList.findIndex((m) => m.no === obj.no)
      this.nextList[star].isFavorite = !this.nextList[star].isFavorite
    },
    // 기능
    videoStart() {
      const param = this.$route.params.id.split('-')
      this.infoSeqno = param[0]
      this.seqno = param[1]
      this.viewsUpdate()
      this.getViewinfo()
    },
    detailView(obj) {
      const path = obj.infoSeqno + '-' + obj.seqno
      this.$router.push({
        name: `library-video-id`,
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
.library-wrap {
  &.pc {
    width: 1080px;
    margin: 70px auto;
    & > div {
      display: table;
      .section {
        display: table-cell;
        vertical-align: top;
      }
      .viewer {
        position: relative;
        width: 690px;
        padding-top: 30px;
        text-align: center;
        video {
          width: 690px;
          height: 390px;
        }
        dl {
          padding-bottom: 20px;
          border-bottom: 2px solid #e4e8eb;
          text-align: left;
          .tit {
            margin: 12px 0 6px;
            font-size: 24px;
          }
          .txt {
            font-size: 12px;
            line-height: 18px;
            color: $fontColor9;
          }
          .hash {
            margin-top: 10px;
            font-size: 12px;
            color: #0087bd;
          }
        }
        .star {
          position: absolute;
          top: 432px;
          right: 9px;
          width: 36px;
          height: 36px;
          padding: 0;
          background: url('/images/pc/contents/library/ico_star_off.svg')
            no-repeat right center;
          z-index: 2;
        }

        .star-on {
          position: absolute;
          top: 339px;
          right: -24px;
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
        .btn-list {
          display: inline-block;
          width: 170px;
          height: 50px;
          margin-top: 20px;
          border: 1px solid #cfcfcf;
          border-radius: 30px;
          font-size: 18px;
          text-align: center;
          line-height: 50px;
          color: $fontColor3;
        }
      }
      .next {
        width: 390px;
        padding-left: 50px;
        .tit {
          margin-bottom: 10px;
          padding-left: 24px;
          background: url('~static/images/pc/contents/library/ico_play.png')
            no-repeat 0 1px;
          font-size: 16px;
          font-weight: 400;
        }
        .list {
          overflow-x: hidden;
          overflow-y: auto;
          height: 600px;
          & > li {
            display: table;
            & > * {
              display: table-cell;
              vertical-align: top;
            }
            & + li {
              margin-top: 18px;
            }
            .thume {
              overflow: hidden;
              width: 162px;
              height: 117px;
              border-radius: 10px;
              cursor: pointer;
            }
            .views {
              position: relative;
              width: 100%;
              padding-left: 16px;
              .name {
                overflow: hidden;
                display: -webkit-box;
                height: 38px;
                font-size: 13px;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 2; /* ellipsis line */
                -webkit-box-orient: vertical;
                line-height: 19px;
                color: $fontColor3;
              }
              ul {
                display: table;
                position: absolute;
                top: 50px;
                width: 100%;
                font-size: 12px;
                color: $fontColor9;
                li {
                  display: table-cell;
                  width: 50%;
                  &.cate {
                    padding-left: 18px;
                    background: url('~static/images/pc/contents/library/ico_folder.svg')
                      no-repeat left center;
                  }
                  &.num {
                    padding-left: 18px;
                    background: url('~static/images/pc/contents/library/ico_play.svg')
                      no-repeat left center;
                  }
                }
              }
              button {
                &.star {
                  position: absolute;
                  bottom: 0;
                  right: 20px;
                  width: 36px;
                  height: 36px;
                  padding: 0;
                  background: url('/images/pc/contents/library/ico_star_off.svg')
                    no-repeat right center;
                  z-index: 2;
                }
                &.star-on {
                  position: absolute;
                  top: -12px;
                  right: -13px;
                  width: 100px;
                  height: 160px;
                  background: url('/images/pc/contents/library/star_sprite.png')
                    no-repeat 0 0;
                  animation: like-gif steps(38) 1.8s;
                  z-index: 3;
                }
              }
            }
          }
        }
      }
    }
  }
  &.mo {
    .viewer {
      position: relative;
      padding: 1.5rem;
      video {
        width: 29rem;
        height: 16.3rem;
      }
      dl {
        .tit {
          width: 24rem;
          margin: 0.6rem 0;
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.8rem;
          color: $fontColor3;
        }
        .txt {
          font-size: 1rem;
          line-height: 1.5rem;
          color: $fontColor9;
        }
        .hash {
          padding: 0.7rem 0 1.5rem;
          border-bottom: 1px solid #e4e8eb;
          color: #0087bd;
        }
      }
      & > button {
        position: absolute;
        top: 18.7rem;
        right: 20px;
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 100%;
        background: url('/images/mobile/contents/library/ico_star.svg')
          no-repeat center 0.35rem;
        background-size: 1.9rem;
        &.star {
          background-color: #dbdbdb;
        }
        &.star-on {
          background-color: #ffbb00;
        }
      }
      .btn-list {
        display: block;
        width: 8rem;
        height: 3rem;
        margin: 1.5rem auto 1rem;
        border: 1px solid #cfcfcf;
        border-radius: 2rem;
        font-size: 1.1rem;
        text-align: center;
        line-height: 3rem;
        color: $fontColor6;
      }
    }
    .next {
      .tit {
        height: 2.4rem;
        padding-left: 2.6rem;
        margin-bottom: 0.6rem;
        background: url('/images/mobile/contents/library/ico_play.svg')
          no-repeat left center;
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 2.4rem;
      }
      .list {
        overflow: hidden;
        li {
          margin-bottom: 1.5rem;
          img {
            width: 12.7rem;
            height: 7.1rem;
            border-radius: 0.6rem;
          }
          .views {
            position: relative;
            float: right;
            width: 18rem;
            height: 7.1rem;
            .name {
              line-height: 1.8rem;
            }
            ul {
              position: absolute;
              bottom: 0;
              display: table;
              width: 12rem;
              font-size: 1rem;
              color: $fontColor9;
              li {
                display: table-cell;
                width: 50%;
                padding-left: 1.4rem;
                &.cate {
                  background: url('~static/images/pc/contents/library/ico_folder.svg')
                    no-repeat left center;
                }
                &.num {
                  background: url('~static/images/pc/contents/library/ico_play.svg')
                    no-repeat left center;
                }
              }
            }
            button {
              position: absolute;
              bottom: 0;
              right: 20px;
              width: 2.6rem;
              height: 2.6rem;
              border-radius: 100%;
              background: url('/images/mobile/contents/library/ico_star.svg')
                no-repeat center 0.35rem;
              background-size: 1.9rem;
              &.star {
                background-color: #dbdbdb;
              }
              &.star-on {
                background-color: #ffbb00;
              }
            }
          }
        }
      }
    }
  }
}
</style>
