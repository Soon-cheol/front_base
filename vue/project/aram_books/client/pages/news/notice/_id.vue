<template>
  <div class="viewer">
    <div class="view-header">
      <p class="tit">{{ notice.BRD_TITE_NM }}</p>
      <p v-if="notice.CRE_DTTM" class="date">
        {{ notice.CRE_DTTM.substr(0, 10) }}
      </p>
    </div>
    <div class="view-content">
      <client-only>
        <TuiEditorViewer ref="editorView" :value="notice.BRD_CTT" />
      </client-only>
      <ul v-if="notice.brdAtchFileList" class="file-list">
        <li v-for="(f, index) in notice.brdAtchFileList" :key="index">
          <a :href="f[0].FILE_PATH_NM" target="_blank">첨부파일</a>
        </li>
      </ul>
    </div>
    <button class="btn-list" @click="goList()">목록보기</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      notice: {},
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    // 통신
    async getDetail() {
      try {
        const { data } = await this.$axios.get('/homepage/notice/detail', {
          params: {
            seqNo: this.$route.params.id,
          },
        })
        if (data.result.BRD_CTT) {
          this.notice = data.result
        } else {
          this.$router.push('/news/notice')
        }
      } catch (error) {
        console.log('API 오류', error)
      }
    },
    // 기능
    goList() {
      // this.$router.go(-1)
      this.$router.push({
        name: 'news-notice',
        params: { pageNum: this.$route.params.page },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.viewer {
  width: 1200px;
  margin: 70px auto 0;
  .view-header {
    padding: 21.5px 30px 20.5px;
    border-top: 3px solid #333;
    border-bottom: 1px solid #cfcfcf;
    text-align: left;
    .tit {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
    .date {
      margin-top: 12px;
      font-size: 12px;
      font-weight: 200;
      color: #999;
    }
  }
  .view-content {
    padding: 70px 30px;
    border-bottom: 1px solid #cfcfcf;
    .file-list {
      margin-top: 60px;
      li {
        a {
          display: block;
          width: 126px;
          height: 40px;
          background: #333 url('/news/ico_download.png') no-repeat 18px center;
          padding-left: 30px;
          font-weight: 200;
          line-height: 40px;
          color: #fff;
        }
      }
    }
  }
  .btn-list {
    width: 170px;
    height: 50px;
    border-radius: 35px;
    border: solid 1px #cfcfcf;
    margin: 40px 0 120px;
    font-size: 18px;
    color: #666;
  }
}
</style>
