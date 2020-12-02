# 1. HTML 브라우저 렌더링 과정

1. DOM(Document Object Model), CSSOM(CSS Object Model) 생성

- 웹페이지 진입 시 브라우저는 서버로 부터 HTML과 CSS 파일을 다운로드 받습니다.
- 다운로드 받은 HTML, CSS는 단순한 텍스트 파일이므로 브라우저가 연산과 관리가 유리하도록 Object Model로 만듭니다.

<img scr="./1/1_1.png">
<img scr="./1/1_2.png">

자세한 과정은 <a href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=ko" target="_blank">Google 개발자</a> 문서를 통해 확인할 수 있습니다.
