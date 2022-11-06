<template>
  <div
    v-swiper:aramSwiper="swiperOption"
    @slideChangeTransitionStart="callback"
    @slideChangeTransitionEnd="callback"
    class="wrap"
  >
    <div class="swiper-wrapper">
      <div v-for="(s, index) in swiperList" :key="index" class="swiper-slide">
        <!-- 리스트 있는 경우 -->
        <div class="thume" @click="detailView(s)">
          <span v-if="s.isWatched" class="ico-watch">시청함</span>
          <img :src="s.thumbnail" />
        </div>
        <div class="name">
          <p @click="detailView(s)">{{ s.title }}</p>
          <button v-show="!s.isFavorite" class="star" @click="addFavor(s)" />
          <button v-show="s.isFavorite" class="star-on" @click="addFavor(s)" />
        </div>
        <ul class="views">
          <li class="cate">{{ s.category }}</li>
          <li class="num">{{ s.views }}회</li>
        </ul>
        <!-- // 리스트 있는 경우 -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Swiper',
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        // centeredSlides: true,
        spaceBetween: 22,
        grabCursor: true,
        speed: 700,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  props: {
    swiperList: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    }),
    swiper() {
      return this.$refs.aramSwiper.swiper
    }
  },
  methods: {
    // 통신
    async addFavor(obj) {
      console.log('obj', obj)
      const video = this.swiperList.find((m) => m === obj)
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
      const star = this.swiperList.findIndex((m) => m.no === obj.no)
      this.swiperList[star].isFavorite = !this.swiperList[star].isFavorite
    },
    // 기능
    callback() {
      this.currentSwiper = this.aramSwiper.activeIndex
    },
    detailView(obj) {
      const path = obj.infoSeqno + '-' + obj.seqno
      this.$router.push({
        name: `${this.$route.name}-id`,
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
.wrap {
  padding: 1rem 3rem 1rem 0;
  .swiper-wrapper {
    .swiper-slide {
      .thume {
        position: relative;
        overflow: hidden;
        width: 100%;
        background: #efefef;
        border-radius: 12px;
        cursor: pointer;
        .ico-watch {
          position: absolute;
          top: 0;
          left: 0;
          padding: 0.4rem 0.9rem;
          background: #0087bd;
          font-size: 1rem;
          font-weight: 200;
          border-radius: 0 0 0.6rem 0;
          color: #fff;
          z-index: 1;
        }
        img {
          width: 100%;
        }
      }
      .name {
        position: relative;
        margin-top: 0.4rem;
        p {
          overflow: hidden;
          display: -webkit-box;
          width: 16.9rem;
          height: 3.6rem;
          font-size: 1.2rem;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2; /* ellipsis line */
          -webkit-box-orient: vertical;
          line-height: 1.8rem;
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
    //
  }
}
</style>
