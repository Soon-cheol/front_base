<template>
  <div class="header-wrap">
    <h2 v-if="active !== 4">
      <span v-if="active === 1">장바구니</span>
      <span v-if="active === 2">주문하기</span>
      <span v-if="active === 3">결제완료</span>
    </h2>
    <ol class="step">
      <li :class="{ active: active === 1 }"><span>1</span></li>
      <li :class="{ active: active === 2 }"><span>2</span></li>
      <li :class="{ active: active === 3 }"><span>3</span></li>
    </ol>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: Number,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrap {
  overflow: hidden;
  h2 {
    float: left;
    position: relative;
    padding-left: 1rem;
    font-size: 1.5rem;
    font-weight: 400;
    &::before {
      position: absolute;
      top: 0.3rem;
      left: 0;
      content: '';
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: #ff4747;
      border-radius: 100%;
    }
  }
  .step {
    float: right;
    display: table;
    width: 4.4rem;
    height: 1.7rem;
    li {
      display: table-cell;
      padding-top: 0.1rem;
      vertical-align: middle;
      span {
        display: block;
        width: 0.7rem;
        height: 0.7rem;
        margin: 0 auto;
        background: #cfcfcf;
        border-radius: 100%;
        font-size: 0;
      }
      &.active {
        padding-top: 0;
        span {
          width: 1.7rem;
          height: 1.7rem;
          background: #ff4747;
          border-radius: 100%;
          font-size: 1.2rem;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
</style>
