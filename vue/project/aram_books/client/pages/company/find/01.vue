<template>
  <div>
    <p class="txt-all">
      전체 <span>{{ list.length }}</span
      >건
    </p>
    <div class="view">
      <p>{{ addr }}</p>
      <div id="map">
        <kaMap ref="kakaoMap" type="cluster" @now-user-addr="nowUserAddr" />
      </div>
    </div>
    <div class="list">
      <ul>
        <li v-for="(l, index) in list" :key="index" @click="changeMap(l.addr)">
          <p class="name">
            {{ l.name }}
            <a :href="`${mapUrl}${l.lat},${l.lng}`" target="_blank" />
          </p>
          <p class="addr">A. {{ l.addr }}</p>
          <p class="phone">T. {{ l.phone }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import kaMap from '~/components/layouts/kaMap'
export default {
  components: {
    kaMap,
  },
  data() {
    return {
      addr: '',
      mapUrl: 'https://map.kakao.com/link/map/',
      list: [
        {
          lat: 37.27943075229118,
          lng: 127.01763998406159,
          name: '롯데백화점 잠실점1',
          addr: '서울시 송파구',
          phone: '02-2143-1955',
        },
        {
          lat: 37.55915668706214,
          lng: 126.92536526611102,
          name: '롯데백화점 잠실점2',
          addr: '서울시 강북구',
          phone: '02-2143-1955',
        },
        {
          lat: 35.13854258261161,
          lng: 129.1014781294671,
          name: '롯데백화점 잠실점3',
          addr: '서울시 금천구',
          phone: '02-2143-1955',
        },
        {
          lat: 37.55518388656961,
          lng: 126.92926237742505,
          name: '롯데백화점 잠실점4',
          addr: '서울시 동작구',
          phone: '02-2143-1955',
        },
        {
          lat: 37.92536526611102,
          lng: 126.92926237742505,
          name: '롯데백화점 잠실점5',
          addr: '서울시 서초구',
          phone: '02-2143-1955',
        },
      ],
    }
  },
  methods: {
    nowUserAddr(addr) {
      this.addr = addr
    },
    changeMap(addr) {
      this.$refs.kakaoMap.addrCheck(addr)
    },
  },
}
</script>
<style lang="scss" scoped>
.txt-all {
  float: left;
  width: 100%;
  padding-bottom: 16px;
  margin-bottom: 40px;
  border-bottom: 2px solid #333;
  font-size: 18px;
  text-align: left;
  color: #333;
  span {
    font-weight: 600;
    color: #72cbd2;
  }
}
.view {
  float: left;
  width: 690px;
  p {
    height: 50px;
    padding: 0 20px;
    border: 1px solid #cfcfcf;
    font-size: 16px;
    text-align: left;
    line-height: 50px;
  }
  #map {
    width: 100%;
    height: 578px;
  }
}
.list {
  overflow-y: auto;
  overflow-x: hidden;
  float: right;
  width: 460px;
  height: 628px;
  li {
    height: 157px;
    padding: 34px 26px 37px 60px;
    background: url('/company/ico_map.svg') no-repeat 28px 28px;
    border-bottom: 1px solid #cfcfcf;
    font-size: 14px;
    font-weight: 200;
    text-align: left;
    color: #666;
    cursor: pointer;
    p {
      & + p {
        margin-top: 10px;
      }
      a {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('/company/ico_map_link.svg') no-repeat 0 0;
        background-size: 100%;
      }
      &.name {
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }
    }
  }
}
</style>
