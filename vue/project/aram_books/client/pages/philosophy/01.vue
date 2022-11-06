<template>
  <div class="page">
    <h3>씨앗독서란?</h3>
    <p class="txt-seed">
      씨앗독서는 ‘인지, 관찰, 융합’ 역량의 올바른 발달을 위해,<br /><span
        >"다중지능에 기초하여 제안하는 아람의 독서 방법"</span
      >입니다.<br />아람 씨앗독서로 소중한 우리 아이 독서 습관 기본기를
      다져주세요.
    </p>
    <ul>
      <li>
        <i class="img cognition" />
        <p class="txt-han">인지</p>
        <p class="txt-eng">Cognition</p>
      </li>
      <li class="plus"><img src="/philosophy/ico_plus.png" /></li>
      <li>
        <i class="img observation" />
        <p class="txt-han">관찰</p>
        <p class="txt-eng">Observation</p>
      </li>
      <li class="plus"><img src="/philosophy/ico_plus.png" /></li>
      <li>
        <i class="img confluence" />
        <p class="txt-han">융합</p>
        <p class="txt-eng">Confluence</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.page {
  overflow: hidden;
  position: relative;
  padding: 71px 0 120px;
  text-align: left;
  h3 {
    display: block;
    padding-top: 22px;
    background: url('/philosophy/ico_seed.svg') no-repeat center 0;
    margin-bottom: 20px;
    font-size: 44px;
    font-weight: 600;
    text-align: center;
  }
  .txt-seed {
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    color: #333;
    span {
      display: inline-block;
      background: url('/philosophy/bg_highlight.png') repeat-x 0 16px;
    }
  }
  ul {
    display: table;
    width: 792px;
    margin: 50px auto 0;
    li {
      display: table-cell;
      text-align: center;
      width: 180px;
      &.plus {
        width: 124px;
        padding-top: 73px;
        vertical-align: top;
      }
      i {
        display: block;
        width: 180px;
        height: 180px;
        border-radius: 100%;
        &.cognition {
          background: #f4f4f4 url('/philosophy/img_cognition.png') no-repeat
            center center;
        }
        &.observation {
          background: #f4f4f4 url('/philosophy/img_observation.png') no-repeat
            center center;
        }
        &.confluence {
          background: #f4f4f4 url('/philosophy/img_confluence.png') no-repeat
            center center;
        }
      }
      p {
        color: #333;
        &.txt-han {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 600;
        }
        &.txt-eng {
          margin-top: 6px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
