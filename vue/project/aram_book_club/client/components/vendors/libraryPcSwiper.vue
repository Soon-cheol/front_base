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
    <div class="swiper-button-next swiper-button" />
    <div class="swiper-button-prev swiper-button" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Swiper',
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        // centeredSlides: true,
        spaceBetween: 22,
        grabCursor: true,
        speed: 700,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
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
  padding: 20px 30px;
  .swiper-wrapper {
    .swiper-slide {
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
    //
  }
  .swiper-button {
    position: absolute;
    top: 60px;
    width: 68px;
    height: 68px;
    z-index: 1;
    &.swiper-button-next {
      right: -5px;
      background: url('/images/pc/contents/library/btn_arw_right.svg') no-repeat
        0 0;
    }
    &.swiper-button-prev {
      left: -5px;
      background: url('/images/pc/contents/library/btn_arw_left.svg') no-repeat
        0 0;
    }
  }
}
</style>
