<template>
  <div class="page">
    <div class="img">
      <p class="txt-main">
        논밭의 곡식들은<br />농부의 발자국 소리를 듣고 자란다.
      </p>
      <p class="txt-sub">
        (주)아람북스는 농부가 땅을 돌보는 마음으로 아이들을 위한 책을<br />
        만들겠습니다. 아이들은 '미래의 대지'이기 때문입니다.<br /><br />'미래의
        대지'인 우리 아이들에게, 한톨 잠재력의 씨앗을 심어주는<br />마음으로
        '씨앗독서'를 만들어 가겠습니다.
      </p>
    </div>
    <div class="txt">
      <img src="/philosophy/logo_aram.png" />
      <p class="txt-main">
        어린이와 함께 미래를 꿈꾸며 동행하는<br />아람북스가 되겠습니다.
      </p>
      <p class="txt-sub">
        세상이 아무리 변해도 책은 상상력과 창의력의 보물창고입니다.<br />도서출판
        아람은 보물창고를 지키는 창고지기의 마음으로 책을 만들겠습니다.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  .img {
    position: relative;
    width: 1920px;
    height: 810px;
    margin-left: -360px;
    background: url('/philosophy/img_philosophy.png') no-repeat 0 0;
    p {
      position: absolute;
      left: 360px;
      text-align: left;
      color: #333;
      &.txt-main {
        top: 70px;
        font-size: 44px;
        font-weight: 600;
        line-height: 60px;
        color: #333;
      }
      &.txt-sub {
        top: 230px;
        font-size: 18px;
        line-height: 31px;
      }
    }
  }
  .txt {
    width: 1920px;
    height: 422px;
    margin-left: -360px;
    background: #72cbd2;
    color: #fff;
    img {
      margin-top: 80px;
    }
    p {
      color: #fff;
      &.txt-main {
        margin-top: 40px;
        font-size: 26px;
        line-height: 40px;
      }
      &.txt-sub {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 200;
        line-height: 32px;
      }
    }
  }
}
</style>
