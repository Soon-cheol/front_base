<template>
  <div class="page">
    <div class="board">
      <table>
        <colgroup>
          <col width="200px" />
          <col width="700px" />
          <col width="300px" />
        </colgroup>
        <thead>
          <tr>
            <th class="num">번호</th>
            <th class="tit">제목</th>
            <th class="date">날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(b, index) in boardList" :key="index">
            <td class="num">
              {{ pageInfo.totalCnt - (pageInfo.nowPage - 1) * 10 - index }}
            </td>
            <td class="tit" @click="detailView(b.BRD_SEQNO)">
              {{ b.BRD_TITE_NM }}
            </td>
            <td class="date">{{ b.CRE_DTTM.substr(0, 10) }}</td>
          </tr>
        </tbody>
      </table>
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
  methods: {
    detailView(id) {
      this.$router.push({
        name: `${this.$route.name}-id`,
        params: { id: id, page: this.pageInfo.nowPage },
      })
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
    height: 662px;
    margin-bottom: 42px;
    table {
      border-top: 2px solid #333;
      th {
        height: 60px;
        background: #f6f6f6;
        font-size: 18px;
        font-weight: 600;
        color: #333;
        &.num {
          padding-left: 50px;
          text-align: left;
        }
        &.tit {
          text-align: center;
        }
        &.date {
          padding-right: 71px;
          text-align: right;
        }
      }
      td {
        height: 60px;
        border-bottom: 1px solid #cfcfcf;
        font-size: 16px;
        font-weight: 200;
        &.num {
          padding-left: 50px;
          text-align: left;
          color: #72cbd2;
        }
        &.tit {
          text-align: left;
          cursor: pointer;
          a {
            display: block;
          }
        }
        &.date {
          padding-right: 50px;
          text-align: right;
          color: #999;
        }
      }
    }
  }
}
</style>
