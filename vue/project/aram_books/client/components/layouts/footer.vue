<template>
  <div id="footer">
    <div class="award-list">
      <ul>
        <li><img src="/common/bot_award01.png" /></li>
        <li><img src="/common/bot_award02.png" /></li>
        <li><img src="/common/bot_award03.png" /></li>
        <li><img src="/common/bot_award04.png" /></li>
        <li><img src="/common/bot_award05.png" /></li>
        <li><img src="/common/bot_award06.png" /></li>
        <li><img src="/common/bot_award07.png" /></li>
        <li><img src="/common/bot_award08.png" /></li>
        <li><img src="/common/bot_award09.png" /></li>
      </ul>
    </div>
    <div class="info">
      <div>
        <div class="link">
          <img src="/common/logo_w.svg" />
          <select ref="selSite" @change="goURL()">
            <option selected>Family Site</option>
            <option>아람북클럽</option>
            <option>아람 교육</option>
            <option>아람북스</option>
            <option>아람 ERP</option>
          </select>
          <!-- <nuxt-link to="/">Contact us</nuxt-link> -->
        </div>
        <div class="addr">
          <p class="txt">
            주소: (12773) 경기 광주시 오포읍 오포로171번길 17-73 | TEL: 1577 –
            4521<br />대표이사: 이병수 | 사업자등록번호: 215-86-94216
          </p>
          <p class="copy">ⓒ (주)아람북스 2008. All Rights Reserved.</p>
          <ul class="sns">
            <li>
              <a href="https://blog.naver.com/arambooki" target="_blank"
                ><img src="/common/sns04.svg"
              /></a>
            </li>
            <li>
              <a href="https://story.kakao.com/ch/arambooks" target="_blank"
                ><img src="/common/sns01.svg"
              /></a>
            </li>
            <li>
              <a href="https://cafe.naver.com/aramii" target="_blank"
                ><img src="/common/sns02.svg"
              /></a>
            </li>
            <li>
              <a href="https://www.youtube.com/c/ARAMBOOKi" target="_blank"
                ><img src="/common/sns03.svg"
              /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goURL() {
      const sel = this.$refs.selSite.selectedIndex
      switch (sel) {
        case 1:
          window.open('https://www.arambookclub.com')
          break
        case 2:
          window.open('http://aramedu.com/')
          break
        case 3:
          window.open('https://www.arambooks.com')
          break
        case 4:
          window.open('http://aramerp.aramedu.net:8081')
          break
      }
      this.$refs.selSite[0].selected = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
