<template>
  <div class="page">
    <div class="page-header">
      <p class="tit">우리아이 잠재 가능성을 활짝 피워주는 아람도서</p>
      <p class="tit-exp">
        ‘아람’은 잘 익은 밤이나 도토리 같은 열매를 뜻하는 우리말입니다.<br />우리
        아이들의 몸과 마음이 ‘아람’처럼 튼실하게 자라는데 보탬이 될 책을
        만듭니다.
      </p>
      <!-- <a class="btn-link" href="http://aramedu.com/" target="_blank"
        >아람교육 바로가기</a
      > -->
    </div>
    <ol>
      <li><img src="/business/view01_01.jpg" /></li>
      <li><img src="/business/view01_02.jpg" /></li>
      <li><img src="/business/view01_03.jpg" /></li>
      <li><img src="/business/view01_04.jpg" /></li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.page {
  overflow: hidden;
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
      top: 80px;
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
    }
  }
}
</style>
