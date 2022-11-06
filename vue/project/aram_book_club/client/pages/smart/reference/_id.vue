<template>
  <div
    v-if="viewMode"
    class="ref-view-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <div class="ref-search">
      <h2>아람자료실</h2>
      <p class="sub-tit">아람북스 100% 활용법을 영상으로 만나보세요.</p>
    </div>
    <div class="video" v-if="prod.BRD_TITE_NM">
      <iframe :src="prod.BRD_CTT" frameborder="0" />
      <div class="info">
        <p class="tit">
          {{ prod.BRD_TITE_NM }}
        </p>
        <p class="sub">
          조회수 {{ prod.INQ_CNT }} | {{ prod.CRE_DTTM.substr(0, 10) }}
        </p>
      </div>
    </div>
    <button @click="goList()">목록보기</button>
    <!-- <div class="recommend">
      <h3>
        <img src="/images/common/ico_video_play.svg" /> 함께 보면 좋은 영상
      </h3>
      <ul class="list">
        <li>
          <img
            src="https://contents.arambookclub.com/prod/admin/thumbnail/202009/1599180167664986.png"
          />
          <p class="tit">asdf</p>
          <p class="sub">asdf</p>
        </li>
        <li>
          <img
            src="https://contents.arambookclub.com/prod/admin/thumbnail/202009/1599180167664986.png"
          />
          <p class="tit">asdf</p>
          <p class="sub">asdf</p>
        </li>
        <li>
          <img
            src="https://contents.arambookclub.com/prod/admin/thumbnail/202009/1599180167664986.png"
          />
          <p class="tit">asdf</p>
          <p class="sub">asdf</p>
        </li>
        <li>
          <img
            src="https://contents.arambookclub.com/prod/admin/thumbnail/202009/1599180167664986.png"
          />
          <p class="tit">asdf</p>
          <p class="sub">asdf</p>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  data() {
    return {
      id: this.$route.params.id,
      prod: {}
    }
  },
  components: {
    loginConfirm
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    this.detailGet()
  },
  methods: {
    // 통신
    async detailGet() {
      try {
        const { data } = await this.$axios.get('/board/dataDetail', {
          params: {
            seqNo: this.$route.params.id
          }
        })
        if (data.ok) {
          console.log('data', data)
          this.prod = data.result
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    goList() {
      // this.$router.go(-1)
      this.$router.push({
        name: 'smart-reference',
        params: { pageNum: this.$route.params.page }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$fontColor3: #191919;
$fontColor6: #767676;
$fontColor9: #999;
$borderColor: #cfcfcf;
$errorColor: #ff794a;
.pc {
  width: 1080px;
  margin: 0 auto;
  text-align: center;
  .ref-search {
    padding: 70px 0;
    text-align: center;
    h2 {
      font-size: 36px;
      color: $fontColor3;
    }
    .sub-tit {
      margin-top: 14px;
      font-size: 18px;
      color: $fontColor6;
    }
  }
  .video {
    overflow: hidden;
    width: 1080px;
    text-align: center;
    iframe {
      width: 100%;
      height: 610px;
      margin: 0 auto;
    }
    .info {
      width: 100%;
      text-align: left;
      .tit {
        margin-top: 10px;
        font-size: 24px;
        line-height: 34px;
      }
      .sub {
        margin-top: 4px;
        font-size: 14px;
        color: $fontColor9;
      }
    }
  }
  button {
    width: 170px;
    height: 50px;
    border-radius: 35px;
    border: 1px solid #cfcfcf;
    margin: 40px auto 120px;
    font-size: 18px;
    color: $fontColor6;
  }
  .recommend {
    margin: 60px 0 123px;
    h3 {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 400;
    }
    .list {
      overflow: hidden;
      li {
        float: left;
        width: 256px;
        & + li {
          margin-left: 18px;
        }
        img {
          width: 256px;
          height: 190px;
        }
        .tit {
          margin-top: 14px;
          font-size: 18px;
        }
        .sub {
          margin-top: 10px;
          font-size: 14px;
          color: $fontColor9;
        }
      }
    }
  }
}
.mo {
  text-align: center;
  .ref-search {
    overflow: hidden;
    h2 {
      margin-top: 4rem;
      font-size: 2.1rem;
      font-weight: 600;
    }
    .sub-tit {
      margin-top: 1rem;
      font-size: 1.5rem;
    }
  }
  .video {
    padding: 2rem 1.5rem;
    iframe {
      width: 29rem;
      height: 18rem;
    }
    .info {
      text-align: left;
      .tit {
        margin-top: 0.6rem;
        font-size: 1.2rem;
      }
      .sub {
        margin-top: 0.4rem;
        font-size: 1rem;
        color: #999;
      }
    }
  }
  button {
    width: 8.5rem;
    height: 2.5rem;
    border-radius: 1.7rem;
    border: 1px solid #cfcfcf;
    margin: 0 auto 2rem;
    font-size: 0.9rem;
    color: $fontColor6;
  }
  .recommend {
    padding: 0 1.5rem;
    h3 {
      margin-bottom: 0.8rem;
    }
    .list {
      overflow: hidden;
      margin-bottom: 3rem;
      li {
        float: left;
        width: 12.5rem;
        &:nth-child(even) {
          margin-left: 1.5rem;
        }
        &:nth-child(n + 3) {
          margin-top: 1.5rem;
        }
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
