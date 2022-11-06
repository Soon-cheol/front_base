<template>
  <div class="page">
    <div class="addr">
      <p class="aram-name">아람북스 본사</p>
      <dl>
        <dt>ADDRESS</dt>
        <dd>
          경기 광주시 오포읍 오포로171번길 17-73<br />(구) 경기 광주시 오포읍
          능평리 161-43번지
        </dd>
      </dl>
      <dl>
        <dt>TEL</dt>
        <dd>
          1577-4521 (평일 오전 9시 ~ 오후 6시)
        </dd>
      </dl>
      <dl>
        <dt>TRAFFIC</dt>
        <dd>
          <span>버스</span>
          <span
            >경기고속 : 1150, 1500-2 / 경기버스 : 14-3, 17, 17-1, 17-1A, 60,
            660<br />
            인성가스충전소 하차, 도보 약 7분(약 532m)</span
          >
        </dd>
        <dd>
          <span>자동차</span>
          <span>능평교차로에서 ‘광주, 수지’방면으로 우회전 후 약 2km 전방</span>
        </dd>
      </dl>
    </div>
    <div id="map">
      <kaMap />
    </div>
  </div>
</template>

<script>
import kaMap from '~/components/layouts/kaMap'
export default {
  components: {
    kaMap,
  },
}
</script>
<style lang="scss" scoped>
.page {
  overflow: hidden;
  margin-bottom: 160px;
  .addr {
    float: left;
    width: 600px;
    margin: 70px 0 5px;
    text-align: left;
    .aram-name {
      margin-bottom: 40px;
      font-size: 44px;
      font-weight: 600;
      color: #333;
    }
    dl {
      margin-top: 35px;
      dt {
        font-size: 12px;
        font-weight: 200;
        letter-spacing: 2px;
        color: #999;
      }
      dd {
        overflow: hidden;
        margin-top: 10px;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        color: #333;
        span {
          float: left;
          &:first-child {
            width: 84px;
          }
          &:last-child {
            width: 510px;
          }
        }
      }
    }
  }
  #map {
    float: right;
    width: 588px;
    height: 330px;
    margin-top: 140px;
  }
}
</style>
