<template>
  <div id="map" />
</template>

<script>
import { data } from '~/static/mapData.js'
export default {
  props: {
    type: {
      type: String,
      default: 'single', // single or cluster
    },
  },
  data() {
    return {
      appKey: '30ee230f5f25a396d9a530cbd555229e', // 테스트용 appkey
      tabValue: 'closed',
      nowUserAddr: '',
      map: '',
    }
  },
  mounted() {
    kakao.maps.load(() => {
      // 1개만 표시
      if (this.type === 'single') {
        this.singleMap(37.3470956240794, 127.177867564667)
      }
      // 클러스터로 표시
      if (this.type === 'cluster') {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const rs = new kakao.maps.LatLng(coords.latitude, coords.longitude)
          this.clusterMaps(coords.latitude, coords.longitude)
          const geocoder = new kakao.maps.services.Geocoder()
          geocoder.coord2RegionCode(rs.getLng(), rs.getLat(), (item) => {
            this.$emit('now-user-addr', item[0].address_name)
          })
        })
      }
    })
  },
  methods: {
    singleMap(lat, lng) {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(lat, lng), // 37.3470956240794 127.177867564667
        level: 4,
      }
      // 지도 생성
      const map = new kakao.maps.Map(container, options)
      map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)
      const markerPosition = new kakao.maps.LatLng(lat, lng)
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      })
      marker.setMap(map)
    },
    clusterMaps(lat, lng) {
      // 지도 생성
      this.map = new kakao.maps.Map(document.getElementById('map'), {
        // const map = new kakao.maps.Map(document.getElementById('map'), {
        // 지도를 표시할 div
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 8, // 지도의 확대 레벨
      })
      const clusterer = new kakao.maps.MarkerClusterer({
        map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 10, // 클러스터 할 최소 지도 레벨
      })
      const markers = data.map(function(position, i) {
        return new kakao.maps.Marker({
          position: new kakao.maps.LatLng(position.lat, position.lng),
        })
      })
      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(markers)
      // 마커에 클릭 이벤트 추가
      // for (const item of markers) {
      //   kakao.maps.event.addListener(item, 'click', () => {
      //     this.map.panTo(item.k)
      //   })
      // }
    },
    addrCheck(addr) {
      if (addr === '') {
        alert('주소 검색어를 입력해 주십시오.')
        return
      }
      // const container = document.getElementById('map')
      // const options = {
      //   center: new kakao.maps.LatLng(33.450701, 126.570667),
      //   level: 4,
      // }
      // // 지도 생성
      // const map = new kakao.maps.Map(container, options)
      // 주소-좌표 변환 객체를 생성
      const geocoder = new kakao.maps.services.Geocoder()
      // 주소로 좌표를 검색
      geocoder.addressSearch(addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { x, y } = result[0]
          const coords = new kakao.maps.LatLng(y, x)
          // eslint-disable-next-line no-unused-vars
          // const marker = new kakao.maps.Marker({
          //   map: this.map,
          //   position: coords,
          // })
          // const infowindow = new kakao.maps.InfoWindow({
          //   content:
          //     '<div style="width:150px;text-align:center;padding:6px 0;">대리점</div>',
          // })
          // infowindow.open(map, marker)
          // 지도 중심을 이동
          // map.setCenter(coords)
          this.map.panTo(coords)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  font-weight: 400;
  text-align: left;
  .txt-total {
    margin-bottom: 16px;
    font-size: 18px;
    color: #333;
    span {
      font-weight: 600;
      color: #72cbd2;
    }
  }
  .board {
    height: 600px;
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
        }
        &.date {
          padding-right: 50px;
          text-align: right;
          color: #999;
        }
      }
    }
  }

  .paging {
    margin-bottom: 120px;
    text-align: center;
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      vertical-align: top;
      line-height: 38px;
      cursor: pointer;
      &.btn-first {
        background: url('/common/arrow_page02.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.btn-prev {
        background: url('/common/arrow_page01.svg') no-repeat 0 0;
        transform: rotate(180deg);
      }
      &.btn-next {
        background: url('/common/arrow_page01.svg') no-repeat 0 0;
      }
      &.btn-last {
        background: url('/common/arrow_page02.svg') no-repeat 0 0;
      }
      &.num {
        border: 1px solid #dfdfdf;
        color: #dfdfdf;
        &.active {
          border: 1px solid #333;
          color: #333;
        }
      }
    }
  }
}
</style>
