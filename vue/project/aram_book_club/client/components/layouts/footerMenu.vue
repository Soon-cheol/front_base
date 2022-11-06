<template>
  <div class="footer">
    <!-- pc -->
    <div v-if="viewMode !== 'mo'" id="pc">
      <div class="menu">
        <ul>
          <li>
            <a href="https://arambooks.com/company/intro" target="_self"
              >회사소개</a
            >
          </li>
          <li @click="popupOpen('useTerms')">이용약관</li>
          <li @click="popupOpen('priTerms')">개인정보 취급방침</li>
        </ul>
      </div>
      <div class="family-site">
        <select ref="selSite" @change="goURL()">
          <option selected>Family Site</option>
          <option>아람북클럽</option>
          <option>아람 교육</option>
          <option>아람북스</option>
        </select>
      </div>
      <div class="info">
        <dl>
          <dt>(주)아람북스</dt>
          <dd>
            고객센터: 1577 – 4521 (평일 9시~12시, 13시~18시 (토/일/공휴일
            휴무))<br />
            (12773) 경기 광주시 오포읍 오포로171번길 17-73 (주)아람북스<br />
            대표이사: 이병수 사업자등록번호: 215-86-94216<br />
            <!-- <nuxt-link class="link" to="/cs">FAQ</nuxt-link> -->
          </dd>
        </dl>
      </div>
      <div class="info">
        <dl>
          <dt>(주)미니게이트</dt>
          <dd>
            05610) 서울시 송파구 석촌호수로 220, 보정빌딩 3층<br />
            대표이사: 정 훈 사업자등록번호: 211-87-52128 <br />
            통신판매업신고: 2019-서울송파-0284호
            <a
              href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2118752128"
              target="_blank"
              >[사업자정보 확인]</a
            ><br />
            Copyright © 2020 minigate. All Right Reserved
          </dd>
        </dl>
      </div>
    </div>
    <!-- // pc -->
    <!-- mo -->
    <div v-if="viewMode === 'mo'" id="mo">
      <ul class="menu">
        <li>
          <a href="https://arambooks.com/company/intro" target="_self"
            >회사소개</a
          >
        </li>
        <li @click="popupOpen('useTerms')">이용약관</li>
        <li @click="popupOpen('priTerms')">개인정보<br />취급방침</li>
      </ul>
      <div class="family-site">
        <select ref="selSite" @change="goURL()">
          <option selected>Family Site</option>
          <option>아람북클럽</option>
          <option>아람 교육</option>
          <option>아람북스</option>
        </select>
      </div>
      <div class="info">
        <p class="name">(주)아람북스</p>
        <address>
          고객센터: 1577 – 4521 (평일 9시~12시, 13시~18시 (토/일/공휴일
          휴무))<br />
          (12773) 경기 광주시 오포읍 오포로171번길 17-73 (주)아람북스<br />
          대표이사: 이병수 사업자등록번호: 215-86-94216
        </address>
        <!-- <nuxt-link class="link" to="/cs">FAQ</nuxt-link> -->
      </div>
      <div class="info">
        <p class="name">(주)미니게이트</p>
        <address>
          05610) 서울시 송파구 석촌호수로 220, 보정빌딩 3층<br />
          대표이사: 정 훈 사업자등록번호: 211-87-52128 <br />
          통신판매업신고: 2019-서울송파-0284호
          <a
            href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2118752128"
            target="_blank"
            >사업자정보 확인</a
          >
        </address>
        <p class="txt-copyright">
          Copyright © 2020 minigate. All Right Reserved
        </p>
      </div>
    </div>
    <!-- // mo -->
    <!-- 팝업 컴포넌트 -->
    <termsDetail
      v-if="popup === 'useTerms'"
      termsSel="useTerms"
      @closeCall="popupClose"
    />
    <termsDetail
      v-if="popup === 'priTerms'"
      termsSel="priTerms"
      @closeCall="popupClose"
    />
    <!-- // 팝업 컴포넌트 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import termsDetail from '~/components/popup/termsDetail'
export default {
  data() {
    return {
      popup: '',
      termsSel: ''
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  components: {
    termsDetail
  },
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
      }
      this.$refs.selSite[0].selected = true
    },
    popupOpen(txt) {
      document.body.style.overflow = 'hidden'
      if (document.querySelector('#pc > .top-menu')) {
        document.querySelector('#pc > .top-menu').style.display = 'none'
      }
      this.popup = txt
    },
    popupClose() {
      document.body.style.overflow = 'auto'
      if (document.querySelector('#pc > .top-menu')) {
        document.querySelector('#pc > .top-menu').style.display = ''
      }
      this.popup = false
    }
  }
}
</script>
