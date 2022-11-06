<template>
  <div class="popup">
    <div class="popup-center">
      <div class="popup-contants">
        <client-only>
          <!-- <vue-daum-postcode @complete="handleAddress" :animation="true" /> -->
        </client-only>
        <button @click="popupClose" class="btn btn-cancel">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: ''
    }
  },
  methods: {
    handleAddress(data) {
      this.$emit('closeCall', data)
    },
    popupClose(data) {
      this.$emit('closeCall', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1001;
  .popup-center {
    display: table-cell;
    height: 100%;
    vertical-align: middle;
    .popup-contants {
      position: relative;
      overflow: auto;
      width: 80%;
      height: auto;
      /* min-height: 60%; */
      max-height: 80%;
      max-width: 1080px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid #dfdfdf;
        font-size: 16px;
        font-weight: 400;
      }
      .btn-close {
        position: absolute;
        top: 16px;
        right: 20px;
        padding: 6px 10px;
      }
      .btn-wrap {
        display: table;
        width: 50%;
        margin: 0 auto;
        & > * {
          display: table-cell;
          width: 100%;
        }
      }
    }
    .btn-cancel {
      width: 80%;
      margin: 0 10%;
    }
  }
}
.vue-daum-postcode {
  overflow: auto;
  height: 444px;
}
</style>
