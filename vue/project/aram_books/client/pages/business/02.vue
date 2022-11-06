<template>
  <div class="page">
    <div class="page-header">
      <p class="tit">㈜아람북스가 만든 디지털학습 플랫폼</p>
      <p class="tit-exp">
        아람 책들이 북클럽을 통해 아이들에게 스마트한 독서 경험을 제공합니다.
      </p>
      <a class="btn-link" href="https://arambookclub.com/" target="_blank"
        >북클럽 바로가기</a
      >
    </div>
    <ol>
      <li><img src="/business/view02_01.png" /></li>
      <li><img src="/business/view02_02.png" /></li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
#wrap {
  .page {
    position: relative;
    padding: 0 0 40px;
    text-align: left;
    .page-header {
      p {
        color: #333;
        &.tit {
          margin-top: 70px;
          font-size: 44px;
          font-weight: 600;
        }
        &.tit-exp {
          margin: 22px 0 75px;
          font-size: 18px;
          font-weight: 400;
          line-height: 30px;
        }
      }
      .btn-link {
        position: absolute;
        display: block;
        top: 4px;
        right: 0;
        width: 200px;
        height: 50px;
        background: #72cbd2;
        border-radius: 28px;
        font-size: 20px;
        font-weight: 200;
        text-align: center;
        line-height: 50px;
        color: #fff;
      }
    }
    ol {
      li {
        overflow: hidden;
        margin-bottom: 80px;
        &:nth-child(1) {
          width: 1920px;
          height: 900px;
          margin-left: -360px;
          background: #f6f6f6;
          text-align: center;
        }
        &:nth-child(2) {
          margin: 120px 0;
        }
      }
    }
  }
}
</style>
