<template>
  <div
    v-if="viewMode"
    class="cs-view-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <span class="txt-notice">NOTICE</span>
    <h3>{{ view.brdTiteNm }}</h3>
    <div class="view-option">
      <p class="txt-date">{{ view.creDttm }}</p>
      <ul class="file-list">
        <li
          v-for="(b, index) in view.brdAtchFileList"
          :key="index"
          class="file"
        >
          <a :href="b.fileUrlNm" target="_blank">{{ b.fileNm }}</a>
        </li>
      </ul>
    </div>
    <!-- <p class="view-cont">{{ view.brdCtt }}</p> -->
    <div class="view-cont">
      <client-only>
        <TuiEditorViewer ref="editorView" :value="view.brdCtt" />
      </client-only>
    </div>
    <button @click="btnList" class="btn-list">목록</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      id: this.$route.params.id,
      view: {}
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  created() {
    this.noticeListGet()
  },
  methods: {
    // 통신
    async noticeListGet() {
      try {
        const { data } = await this.$axios.get(
          '/board/cs-center/notice/' + this.$route.params.id,
          {
            params: {
              brdSeqno: this.num
            }
          }
        )
        if (data.ok) {
          console.log('data', data)
          this.view = data.result
          this.view.creDttm = data.result.creDttm.substr(0, 10)
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 기능
    btnList() {
      // this.$router.go(-1)
      this.$router.push('/cs')
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
.file {
  a {
    text-decoration: underline;
    color: blue;
  }
}
// pc
.cs-view-wrap.pc {
  width: 1080px;
  margin: 70px auto;
  .txt-notice {
    display: block;
    margin-bottom: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    color: $fontColor9;
  }
  h3 {
    margin-bottom: 42px;
    font-size: 1.9rem;
    font-weight: 400;
  }
  .view-option {
    overflow: hidden;
    & > * {
      float: left;
    }
    .txt-date {
      padding-right: 2.2rem;
      margin-right: 2rem;
      border-right: 2px solid #cdcdcd;
      font-size: 0.9rem;
      color: $fontColor9;
    }
    .file-list {
      overflow: hidden;
      margin-top: -0.4rem;
      font-size: 0.9rem;
      line-height: 0.9rem;
      li {
        float: left;
        padding: 0.4rem 0;
        & + li {
          margin-left: 1.4rem;
        }
        a {
          text-decoration: none;
          color: $fontColor9;
        }
      }
    }
  }
  .view-cont {
    padding: 5.5rem 0 5.8rem;
    margin-bottom: 48px;
    border-bottom: 1px solid #cfcfcf;
    white-space: pre-line;
    color: $fontColor6;
    font-weight: 300;
    line-height: 2;
  }
  .btn-list {
    width: 9rem;
    height: 2.5rem;
    margin: 0 23rem 3rem;
    border: 1px solid #d0d0d0;
    border-radius: 3rem;
    font-size: 1.2rem;
    text-align: center;
    line-height: 2.5rem;
    color: $fontColor6;
  }
}
// mo
.cs-view-wrap.mo {
  padding: 3.2rem 3rem 6rem;
  .txt-notice {
    display: block;
    margin-bottom: 1.4rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: $fontColor9;
  }
  h3 {
    margin-bottom: 2.2rem;
    font-size: 1.9rem;
    font-weight: 400;
  }
  .view-option {
    overflow: hidden;
    & > * {
      float: left;
    }
    .txt-date {
      padding-right: 2.2rem;
      margin-right: 2.2rem;
      border-right: 2px solid #cdcdcd;
      font-size: 1.3rem;
      color: $fontColor9;
    }
    .file-list {
      margin-top: -0.4rem;
      font-size: 1.3rem;
      line-height: 1.3rem;
      li {
        padding: 0.4rem 0;
        a {
          text-decoration: none;
          color: $fontColor9;
        }
      }
    }
  }
  .view-cont {
    padding: 5.5rem 0 5.8rem;
    margin-bottom: 2.4rem;
    border-bottom: 1px solid #cfcfcf;
    white-space: pre-line;
  }
  .btn-list {
    width: 100%;
    height: 3.8rem;
    border: 2px solid #d0d0d0;
    border-radius: 0.6rem;
    font-size: 1.5rem;
    text-align: center;
    line-height: 3.8rem;
    color: $fontColor6;
  }
}
</style>
