<template>
  <div>
    <viewSizeCheck />
    <!-- pc -->
    <div v-if="viewMode !== 'mo'" ref="pcTop" id="pc">
      <div class="top-menu">
        <h1>
          <nuxt-link to="/" />
        </h1>
        <ul>
          <li v-if="isLoggedIn" class="login-name">
            <nuxt-link to="/study/learn"
              >안녕하세요!! &nbsp; {{ loginName }}님</nuxt-link
            >
          </li>
          <li>
            <a href="https://www.arambooks.com/" target="_self">아람북스</a>
          </li>
          <li><nuxt-link to="/cs">고객센터</nuxt-link></li>
          <li v-if="!isLoggedIn">
            <nuxt-link to="/join/step01">회원가입</nuxt-link>
          </li>
          <li v-if="isLoggedIn"><span @click="logout()">로그아웃</span></li>
          <li v-else><span @click="pcLogin = !pcLogin">로그인</span></li>
        </ul>
      </div>
      <div class="gnb-menu">
        <ul class="main">
          <li>
            <span
              @click="gnbSub('menuSub01')"
              :class="{ sub: menuSub01, active: pcMenuActive === 'menuSub01' }"
              >아람 북스</span
            >
          </li>
          <li>
            <span
              :class="{ sub: menuSub02, active: pcMenuActive === 'menuSub02' }"
              ><nuxt-link to="/smart/book">스마트북</nuxt-link></span
            >
          </li>
          <li>
            <span
              @click="gnbSub('menuSub03')"
              :class="{ sub: menuSub03, active: pcMenuActive === 'menuSub03' }"
              >아람 라이브러리</span
            >
          </li>
          <li v-if="isLoggedIn">
            <span
              @click="gnbSub('menuSub04')"
              :class="{ sub: menuSub04, active: pcMenuActive === 'menuSub04' }"
              >부모 페이지</span
            >
          </li>
          <li v-else>
            <span @click="openLink">부모 페이지</span>
          </li>
          <li v-if="isLoggedIn">
            <nuxt-link to="/study/learn" class="btn-study"
              ><span class="line" />학습하기</nuxt-link
            >
          </li>
          <li v-else>
            <span class="btn-study" @click="openLink"
              ><span class="line" />학습하기</span
            >
          </li>
        </ul>
        <ul class="sub-list menuSub01" :class="{ active: menuSub01 }">
          <li><nuxt-link to="/aram/book">전집</nuxt-link></li>
          <li><nuxt-link to="/aram/minibook">소전집/교구</nuxt-link></li>
        </ul>
        <ul class="sub-list menuSub02" :class="{ active: menuSub02 }">
          <li><nuxt-link to="/smart/book">스마트북</nuxt-link></li>
        </ul>
        <ul class="sub-list menuSub03" :class="{ active: menuSub03 }">
          <!-- <li><nuxt-link to="/shop/smart">스마트샵</nuxt-link></li>
          <li><nuxt-link to="/shop/point">포인트샵</nuxt-link></li> -->
          <li><nuxt-link to="/library/video">영상 라이브러리</nuxt-link></li>
          <li><nuxt-link to="/library/music">음원 라이브러리</nuxt-link></li>
          <li><nuxt-link to="/library/my/video">나의 라이브러리</nuxt-link></li>
        </ul>
        <ul class="sub-list menuSub04" :class="{ active: menuSub04 }">
          <li><nuxt-link to="/study/learn">학습관리</nuxt-link></li>
          <li><nuxt-link to="/parents/children/info">자녀관리</nuxt-link></li>
          <li><nuxt-link to="/buy/aram">구매내역</nuxt-link></li>
          <li><nuxt-link to="/parents/myinfo/confirm">나의정보</nuxt-link></li>
          <li>
            <nuxt-link to="/parents/myinfo/password">비밀번호변경</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- // pc -->
    <!-- mo -->
    <div v-if="viewMode === 'mo'" id="mo">
      <div class="top-menu box-shadow160" :class="{ back: !option }">
        <h1>
          <nuxt-link to="/"><img src="~/static/svg2/logo_aram.svg"/></nuxt-link>
        </h1>
        <button class="btn-gnb" @click="gnbOpen" />
        <h2 v-if="!option" class="btn-back" @click="goBack">
          {{ pageTitle }}
        </h2>
      </div>
      <div ref="gnbWrap" class="gnb-wrap">
        <div ref="gnbCont" class="gnb-cont ">
          <button class="btn-close" @click="gnbClose()" />
          <!-- profile -->
          <div v-if="isLoggedIn" class="gnb-top">
            <div class="profile">
              <div class="thume"><span /></div>
              <p class="txt-member">
                <span>{{ loginName }}님</span> 안녕하세요! 즐거운 하루 되세요!
              </p>
            </div>
            <ul class="member-menu">
              <li @click="logout()">로그아웃</li>
              <li @click="pageMove('/cs')">고객센터</li>
              <li @click="pageMove('/parents/myinfo/confirm')">마이페이지</li>
            </ul>
          </div>
          <div v-else class="gnb-top">
            <div class="profile">
              <div class="thume"><span /></div>
              <nuxt-link to="/login" class="txt-login">
                로그인 해주세요<img src="~/static/svg2/icon_arrow_gray.svg" />
              </nuxt-link>
            </div>
            <ul class="member-menu">
              <li @click="pageMove('/login')">로그인</li>
              <li @click="pageMove('/join/step01')">회원가입</li>
              <li @click="pageMove('/cs')">고객센터</li>
            </ul>
          </div>
          <!-- // profile -->
          <div ref="gnbMenuList" class="gnb-menu">
            <span class="border" />
            <ul class="gnb-menu-list">
              <li :class="{ active: isLoggedIn }">
                <span
                  v-if="isLoggedIn"
                  @click="pageMove('/study/learn')"
                  class="btn-learn"
                  >학습하기</span
                >
                <span v-else @click="openLink()" class="btn-learn"
                  >학습하기</span
                >
              </li>
              <li v-for="(m, index) in menuList" :key="index">
                <div v-if="m.sub" @click="openSub">
                  <span :class="{ arw: m.sub }">{{ m.name }}</span>
                </div>
                <ul v-if="m.sub" class="gnb-sub-menu">
                  <li v-for="(ms, index) in m.sub" :key="index">
                    <span @click="pageMove(ms.link)">{{ ms.name }}</span>
                  </li>
                </ul>
                <div v-if="!m.sub">
                  <span @click="pageMove(m.link)">{{ m.name }}</span>
                </div>
              </li>
            </ul>
            <div class="cs">
              <p class="txt"><span>고객센터</span>1577-4521</p>
              <a class="box-shadow0" href="tel:1577-4521">문의</a>
            </div>
          </div>
        </div>
        <div ref="gnbBg" class="gnb-bg" />
      </div>
    </div>
    <!-- // mo -->
    <!-- 팝업 컴포넌트 -->
    <loginPopup v-if="pcLogin" @closeCall="popupClose" />
    <!-- // 팝업 컴포넌트 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import viewSizeCheck from '~/components/viewSizeCheck'
import loginPopup from '~/components/popup/login'
export default {
  props: {
    option: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      pcLogin: false,
      pcMenuActive: '',
      loginName: '',
      pageTitle: '',
      menuSub01: false,
      menuSub02: false,
      menuSub03: false,
      menuSub04: false,
      menuList: [
        {
          name: '아람 북클럽 홈',
          link: '/',
          class: 'home'
        },
        {
          name: '아람 북스',
          sub: [
            { name: '전집 시리즈', link: '/aram/book' },
            { name: '소전집 시리즈', link: '/aram/minibook' }
            // { name: '아람 스마트북', link: '/smart/book' }
          ]
        },
        {
          name: '아람 스마트북',
          sub: [{ name: '아람 스마트북', link: '/smart/book' }]
        },
        {
          name: '아람 라이브러리',
          sub: [
            { name: '영상 라이브러리', link: '/library/video' },
            { name: '음원 라이브러리', link: '/library/music' },
            { name: '나의 라이브러리', link: '/library/my/video' }
          ]
        },
        {
          name: '부모페이지',
          sub: [
            { name: '학습관리', link: '/study/learn' },
            { name: '자녀관리', link: '/parents/children/info' },
            { name: '구매내역', link: '/buy/aram' },
            { name: '나의정보', link: '/parents/myinfo/confirm' },
            { name: '비밀번호 변경', link: '/parents/myinfo/password' }
          ]
        }
      ]
    }
  },
  components: {
    viewSizeCheck,
    loginPopup
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.loggedIn,
      memberInfo: (state) => state.user.memberInfo,
      userToken: (state) => state.user.userToken,
      viewMode: (state) => state.user.viewMode
    })
  },
  mounted() {
    this.router()
    if (this.isLoggedIn) {
      this.getCookie()
    }
    // document.domain = 'arambookclub.com'
    this.scrollTop()
    this.ga()
  },
  updated() {
    this.loginName = localStorage.getItem('name')
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.router()
        this.menuSub01 = this.menuSub02 = this.menuSub03 = this.menuSub04 = false
      }
    },
    viewMode: function() {
      this.pcLogin = false
    }
  },
  methods: {
    ga() {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'G-YK5119YT9C')
    },
    getCookie(key) {
      if (
        localStorage.getItem('name') === '' ||
        localStorage.getItem('name') === undefined ||
        localStorage.getItem('name') === null
      ) {
        this.$store.dispatch('user/logout')
      } else {
        this.loginName = localStorage.getItem('name')
      }
      // let cookieKey = key + '='
      // let cookieArr = document.cookie.split(';')
      // cookieArr = cookieArr.map((x) => x.replace(' ', ''))
      // cookieArr = cookieArr.map((x) => x.split('='))
      // 회원
      // const user = cookieArr.find((x) => x[0] === 'user')
      // user ? (this.loginName = user[1]) : (this.loginName = '')
      // if (this.loginName === '') this.$store.dispatch('user/logout')
      // 토큰
      // const tokenGet = cookieArr.find((x) => x[0] === 'auth._token.local')
      // const token = tokenGet[1].substr(9)
      // this.$store.dispatch('user/userToken', token)
    },
    gnbOpen() {
      let winHeight = window.screen.height
      document
        .querySelector('body')
        .setAttribute('style', `height:${winHeight}px; overflow:hidden`)
      this.$refs.gnbCont.setAttribute('style', `height:${winHeight}px`)
      this.$refs.gnbCont.classList.add('open')
      this.$refs.gnbBg.setAttribute('style', `height:${winHeight}px`)
      this.$refs.gnbBg.classList.add('open')
      this.$refs.gnbMenuList.setAttribute(
        'style',
        `height:${winHeight - 400}px`
      )
    },
    gnbClose() {
      document.querySelector('body').removeAttribute('style')
      if (this.$refs.gnbCont) this.$refs.gnbCont.classList.remove('open')
      if (this.$refs.gnbBg) this.$refs.gnbBg.classList.remove('open')
      setTimeout(() => {
        let winHeight = 0
        if (this.$refs.gnbCont)
          this.$refs.gnbCont.setAttribute('style', `height:${winHeight}px`)
        if (this.$refs.gnbBg)
          this.$refs.gnbBg.setAttribute('style', `height:${winHeight}px`)
      }, 800)
    },
    router() {
      window.scrollTo(0, 0)
      console.clear()
      const url = window.location.pathname
      if (url.indexOf('/library') === 0) {
        this.pageTitle = '아람 무비'
      } else if (url.indexOf('/aram/book') === 0) {
        this.pageTitle = '아람 전집 시리즈'
        this.pcMenuActive = 'menuSub01'
      } else if (url.indexOf('/aram/minibook') === 0) {
        this.pageTitle = '아람 소전집 시리즈'
        this.pcMenuActive = 'menuSub01'
      } else if (url.indexOf('/smart/book') === 0) {
        this.pageTitle = '아람 스마트북'
        this.pcMenuActive = 'menuSub02'
      } else if (url.indexOf('/smart/reference') === 0) {
        this.pageTitle = '아람 자료실'
        this.pcMenuActive = 'menuSub01'
      } else if (url.indexOf('/parents/children') === 0) {
        this.pageTitle = '자녀관리'
        this.pcMenuActive = 'menuSub04'
      } else if (url.indexOf('/study/learn') === 0) {
        this.pageTitle = '학습관리'
        this.pcMenuActive = 'menuSub04'
      } else if (url.indexOf('/buy/aram') === 0) {
        this.pageTitle = '구매내역'
        this.pcMenuActive = 'menuSub04'
      } else if (url.indexOf('/parents/myinfo') === 0) {
        this.pageTitle = '나의정보'
        this.pcMenuActive = 'menuSub04'
      } else if (url.indexOf('/basket') === 0) {
        this.pageTitle = '장바구니'
        this.pcMenuActive = 'menuSub03'
      } else if (url.indexOf('/payment') === 0) {
        this.pageTitle = '결제하기'
        this.pcMenuActive = 'menuSub03'
      } else if (url.indexOf('/study/learn') === 0) {
        this.pageTitle = '학습관리'
        this.pcMenuActive = 'menuSub04'
      } else if (url.indexOf('/buy/smart') === 0) {
        this.pageTitle = '구매내역'
        this.pcMenuActive = 'menuSub04'
        // 고객센터
      } else if (url.indexOf('/find/id') === 0) {
        this.pageTitle = '아이디 찾기'
      } else if (url.indexOf('/find/pwd') === 0) {
        this.pageTitle = '비밀번호 찾기'
      } else if (url.indexOf('/cs') === 0) {
        this.pageTitle = '고객센터'
      } else if (url.indexOf('/saypen') === 0) {
        this.pageTitle = '세이펜 자료실'
      } else if (url.indexOf('/parents/review') === 0) {
        this.pageTitle = '리뷰 쓰기'
        // 디지털몰
      } else if (url.indexOf('/shop/smart') === 0) {
        this.pageTitle = '아람 스마트샵'
        this.pcMenuActive = 'menuSub03'
        // } else if (url.indexOf('/detail/smart') === 0) {
        //   this.pageTitle = '아람 스마트샵'
        //   this.pcMenuActive = 'menuSub03'
      } else if (url.indexOf('/shop/point') === 0) {
        this.pageTitle = '아람 포인트샵'
        this.pcMenuActive = 'menuSub03'
        // } else if (url.indexOf('/detail/point') === 0) {
        //   this.pageTitle = '아람 포인트샵'
        //   this.pcMenuActive = 'menuSub03'
      }
      // 라이브러리
      if (this.$route.name === 'library-video') {
        this.pageTitle = '영상 라이브러리'
        this.pcMenuActive = 'menuSub03'
      } else if (this.$route.name === 'library-music') {
        this.pageTitle = '음원 라이브러리'
        this.pcMenuActive = 'menuSub03'
      } else if (
        this.$route.name === 'library-my-video' ||
        this.$route.name === 'library-my-music'
      ) {
        this.pageTitle = '나의 라이브러리'
        this.pcMenuActive = 'menuSub03'
      }
    },
    openSub(e) {
      const open = document.querySelectorAll('.gnb-menu-list .open')
      for (let i = 0; i < open.length; i++) {
        open[i].classList.remove('open')
      }
      const arw = e.target.closest('div')
      const sub = e.target.parentElement.nextElementSibling
      // console.log('arw', arw)
      arw.classList.toggle('open')
      sub.classList.toggle('open')
    },
    logout() {
      this.$store.dispatch('user/logout')
      localStorage.setItem('name', '')

      this.gnbClose()
      this.$router.push({
        name: 'index'
      })
      alert('로그아웃 되었습니다.')
    },
    gnbSub(p) {
      if (p === 'menuSub03') {
        this.menuSub03 = !this.menuSub03
        this.menuSub01 = this.menuSub02 = this.menuSub04 = false
      } else if (p === 'menuSub02') {
        this.menuSub02 = !this.menuSub02
        this.menuSub01 = this.menuSub03 = this.menuSub04 = false
      } else if (p === 'menuSub01') {
        this.menuSub01 = !this.menuSub01
        this.menuSub02 = this.menuSub03 = this.menuSub04 = false
      } else if (p === 'menuSub04') {
        this.menuSub04 = !this.menuSub04
        this.menuSub01 = this.menuSub02 = this.menuSub03 = false
      }
    },
    openLink(a) {
      if (this.isLoggedIn) {
        this.gnbClose()
        // window.open(a, 'contents')
        location.href = a
        localStorage.setItem('token', this.userToken)
      } else {
        alert('로그인 후 이용 가능합니다.')
        this.gnbClose()
        this.$router.push('/login')
      }
    },
    scrollTop() {
      const _this = this
      $(window).scroll(function() {
        let scrollValue = $(document).scrollTop()
        if (_this.$refs.pcTop) {
          if (scrollValue > 80) {
            _this.$refs.pcTop.classList.add('scroll')
          } else {
            _this.$refs.pcTop.classList.remove('scroll')
          }
        }
        if (
          _this.$route.name === 'library-music' ||
          _this.$route.name === 'library-music-my'
        ) {
          if (_this.viewMode === 'pc') {
            if ($('#content').height() - 900 < scrollValue) {
              $('#content').addClass('bottom')
            } else {
              $('#content').removeClass('bottom')
            }
          } else {
            $('.footer #mo').addClass('remote')
          }
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    pageMove(link) {
      this.gnbClose()
      this.$router.push(link)
    },
    popupClose() {
      this.pcLogin = false
    }
  }
}
</script>
