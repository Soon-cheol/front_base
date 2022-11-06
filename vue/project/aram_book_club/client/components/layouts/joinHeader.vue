<template>
  <div class="header-wrap">
    <h2 v-if="active !== 4">
      <span v-if="active === 1">약관동의</span>
      <span v-if="active === 2">본인인증</span>
      <span v-if="active === 3">개인정보입력</span>
    </h2>
    <ol class="step">
      <li :class="{ active: active === 1 }"><span>1</span></li>
      <li :class="{ active: active === 2 }"><span>2</span></li>
      <li :class="{ active: active === 3 }"><span>3</span></li>
      <li :class="{ active: active === 4 }"><span>4</span></li>
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
    font-size: 1.3rem;
    font-weight: 400;
    &::before {
      position: absolute;
      top: 0.3rem;
      left: 0;
      content: '';
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: #7348ae;
      border-radius: 100%;
    }
  }
  .step {
    float: right;
    display: table;
    width: 5.6rem;
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
          width: 1.5rem;
          height: 1.5rem;
          background: #7348ae;
          border-radius: 100%;
          font-size: 1rem;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
</style>
