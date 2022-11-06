<template>
  <div>
    <div class="addr">
      {{ addr }}
    </div>
    <div id="map">
      <kaMap type="cluster" @now-user-addr="nowUserAddr" />
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
      list: [
        {
          lat: 37.27943075229118,
          lng: 127.01763998406159,
        },
        {
          lat: 37.55915668706214,
          lng: 126.92536526611102,
        },
        {
          lat: 35.13854258261161,
          lng: 129.1014781294671,
        },
        {
          lat: 37.55518388656961,
          lng: 126.92926237742505,
        },
      ],
    }
  },
  methods: {
    nowUserAddr(addr) {
      this.addr = addr
    },
  },
}
</script>
<style lang="scss" scoped>
#map {
  float: left;
  width: 690px;
  height: 578px;
}
</style>
