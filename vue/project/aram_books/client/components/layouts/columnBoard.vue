<template>
  <div class="page">
    <div class="board">
      <ul>
        <li v-for="(b, index) in boardList" :key="index" class="column">
          <img :src="b.brdAtchFileList[0].FILE_PATH_NM" />
          <p class="name">{{ b.brdCtt }}</p>
          <a
            :href="b.brdAtchFileList[1].FILE_PATH_NM"
            class="btn-download"
            target="_blank"
            >다운로드
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    pageInfo: {
      type: Object,
      default: null,
    },
    boardList: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  margin: 0 auto;
  margin-top: 16px;
  font-weight: 400;
  text-align: left;
  .board {
    overflow: hidden;
    margin: 0 0 42px -24px;
    .column {
      float: left;
      width: 282px;
      margin: 0 0 50px 24px;
      text-align: center;
      img {
        width: 100%;
        height: 393px;
      }
      .name {
        margin: 20px 0 18px;
        font-size: 20px;
        color: #333;
      }
      .btn-download {
        display: inline-block;
        width: 170px;
        height: 50px;
        border-radius: 35px;
        border: solid 1px #cfcfcf;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        color: #666;
      }
    }
  }
}
</style>
