<template>
  <div class="page">
    <div class="intro">
      <p class="tit">
        (주)아람북스는<br />춤추는 아이들을 위한 노래가 될 책,<br />
        아이들의 꿈과 행복이 될 책을<br />만들어 나갈 것입니다.
      </p>
      <img src="/company/img_ceo.png" class="img-ceo" />
      <p class="txt">
        (주)아람북스는 2008년 설립 이래 영·유아의 성장과 발달 단계를 고려한
        다수의 그림책을 출판해 온 ‘도서출판 아람’을 전신으로 하여 2019년 출범한
        유‧아동 그림책 전집 전문 출판 및 유통사입니다.<br /><br />‘아람’은
        밤이나 도토리가 잘 익어 벌어지는 상태를 뜻하는 말로, 이처럼 밝고 건강한
        아이들을 길러내는 것이 (주)아람북스의 제일 가치입니다. 이를 위해
        (주)아람북스는 세계적으로 주목받는 어린이책을 번역하여 소개하고, 또
        한편으로 국내 창작 그림책을 제작해 전 세계의 아이들과 함께 읽으며
        아이들이 아람처럼 튼실하게 자랄 수 있는 밑거름을 제공하고자 합니다.<br /><br />(주)아람북스는
        한 권 한 권의 그림책을 영·유아에게 꼭 필요한 내용으로 알차고 튼실하게
        개발하기 위해 힘써왔습니다. 이러한 노력의 결실로 교육부와 보건 복지부
        누리 과정 교사용 지도서에 도서출판 아람의 그림책이 다수 선정되어 그 질과
        가치를 인정받았습니다.<br /><br />(주)아람북스는 향후 감성과 인성,
        교육에 두루 기여할 수 있는 유‧아동 전집을 지속적으로 기획 및 출판함은
        물론, 스마트북을 통해 아이들이 재미있는 독서활동을 할 수 있도록 할
        것입니다. 또한, 양질의 유치원 교재와 교구를 제작하여 유치원 교육에도
        힘을 쏟고자 합니다. 이와 더불어 해외에도 더 많은 전집을 수출해 아람의
        그림책을 더 많은 세계의 아이들에게 전파할 것입니다.<br /><br />감사합니다.<br />(주)아람북스
        대표이사 이병수 <img src="/company/img_sign.png" />
      </p>
    </div>
    <div class="list">
      <h4>아람북스 대표 전집</h4>
      <ul>
        <li>
          <img src="/company/img_represent01.png" />
          <p class="name">
            2019<br />
            학부모가 뽑은 교육브랜드 대상
          </p>
        </li>
        <li>
          <img src="/company/img_represent02.png" />
          <p class="name">
            2020<br />
            학부모가 뽑은 교육브랜드 대상
          </p>
        </li>
        <li>
          <img src="/company/img_represent03.png" />
          <p class="name">
            놀이 중심<br />
            자연관찰 그림책
          </p>
        </li>
      </ul>
    </div>
    <div class="list">
      <h4>TV 속 아람북스</h4>
      <ul>
        <li>
          <img src="/company/img_tv01.png" />
          <p class="name">MBC 문화사색<br />(2009.09.29.방영)</p>
        </li>
        <li>
          <img src="/company/img_tv02.png" />
          <p class="name">
            SBS 아빠가 들려주는 이야기 톡톡<br />(2016.09.20/26. 방영)
          </p>
        </li>
      </ul>
    </div>
    <div class="list">
      <h4>아람북스 활동</h4>
      <ul>
        <li>
          <img src="/company/img_play01.png" />
          <p class="name">
            아람북스 - 코로나19 예방 수칙 담은 그림책 지원
          </p>
        </li>
        <li>
          <img src="/company/img_play02.png" />
          <p class="name">
            아람북스 - 롯데자이언츠<br />사랑의 아동 도서 나눔 기부
          </p>
        </li>
        <li>
          <img src="/company/img_play03.png" />
          <p class="name">아람북스 – 경남하동군<br />수해복구지원</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding-bottom: 133px;
  .intro {
    overflow: hidden;
    .tit {
      float: left;
      width: 660px;
      margin-top: 160px;
      font-size: 44px;
      font-weight: 600;
      text-align: left;
      line-height: 64px;
      color: #333;
    }
    .img-ceo {
      float: right;
      margin-top: 70px;
    }
    .txt {
      position: relative;
      float: left;
      margin: 40px 0 50px;
      font-size: 18px;
      line-height: 34px;
      text-align: left;
      color: #333;
      img {
        position: absolute;
        top: 510px;
        left: 234px;
      }
    }
  }
  .list {
    color: #333;
    & + .list {
      margin-top: 44px;
    }
    h4 {
      margin-bottom: 20px;
      font-size: 22px;
      font-weight: 600;
      text-align: left;
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 213px;
        & + li {
          margin-left: 35px;
        }
        .name {
          margin-top: 8px;
          font-size: 15px;
          text-align: left;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
