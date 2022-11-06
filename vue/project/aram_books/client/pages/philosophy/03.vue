<template>
  <div class="page">
    <div class="table">
      <h3>인지발달에 따른 연계표</h3>
      <img src="/philosophy/img_table01.png" />
    </div>
    <div class="table">
      <h3>아람북스 연계표</h3>
      <nuxt-link to="/product/01" class="btn-detail">자세히 보기</nuxt-link>
      <img src="/philosophy/img_table02.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  .table {
    position: relative;
    overflow: hidden;
    &:first-child {
      width: 1920px;
      background: #f6f6f6;
      padding-bottom: 70px;
      margin-left: -360px;
      h3 {
        margin-bottom: 60px;
      }
    }
    &:last-child {
      padding-bottom: 117px;
      h3 {
        margin-bottom: 70px;
      }
    }
    h3 {
      width: 1200px;
      margin: 70px auto 0;
      font-size: 44px;
      text-align: left;
      font-weight: 600;
    }
    .btn-detail {
      position: absolute;
      top: 73px;
      right: 0;
      width: 180px;
      height: 50px;
      border: 1px solid #333;
      font-size: 18px;
      line-height: 50px;
      color: #333;
      &:hover {
        background-color: #333;
        color: #fff;
      }
    }
  }
}
</style>
