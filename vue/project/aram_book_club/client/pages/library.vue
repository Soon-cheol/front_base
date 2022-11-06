<template>
  <div>
    <!-- <div
      v-if="viewMode && tabMenu"
      class="tab"
      :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
    >
      <h2>라이브러리</h2>
      <ul :class="{ smart: tabMenu === 2 }">
        <li :class="{ active: tabMenu === 1 }" class="aram">
          <nuxt-link to="/library/video">영상</nuxt-link>
        </li>
        <li :class="{ active: tabMenu === 2 }" class="smart">
          <nuxt-link to="/library/music">음원</nuxt-link>
        </li>
      </ul>
    </div> -->
    <nuxt-child />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tabMenu: 1
    }
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  mounted() {
    this.tabVisible()
    this.pageReset()
  },
  updated() {
    this.tabVisible()
    this.pageReset()
  },
  methods: {
    tabVisible() {
      console.log('this.$route.name', this.$route.name)
      if (this.$route.name === 'library-video') {
        this.tabMenu = 1
      } else if (this.$route.name === 'library-music') {
        this.tabMenu = 2
      } else {
        this.tabMenu = 0
      }
    },
    pageReset() {
      const path = window.location.pathname
      if (path === '/library/video') {
        this.tabMenu = 1
      } else if (path === '/library/music') {
        this.tabMenu = 2
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$shadow: 160;
$fontColor3: #191919;
$fontColor6: #767676;
$fontColor9: #999;
$blueColor: #269bd7;
$borderColor: #cfcfcf;
$errorColor: #ff794a;
.tab {
  ul {
    position: relative;
    transition: all 0.6s ease 0s;
    -webkit-transition: all 0.6s ease 0s;
    li {
      position: absolute;
      top: 0;
      // display: table;
      width: 50%;
      border-radius: 50px;
      text-align: center;
      transition: all 0.6s ease 0s;
      -webkit-transition: all 0.6s ease 0s;
      &.active {
        -webkit-box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
        -moz-box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
        box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
      }
      &:first-child {
        left: 0;
        &.active {
          background: #bfd46e;
        }
      }
      &:last-child {
        right: 0;
        &.active {
          background: #fdc140;
        }
      }
      a {
        display: block;
        font-size: 26px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
}
.tab.pc {
  margin-top: 70px;
  text-align: center;
  h2 {
    position: relative;
    width: 1080px;
    margin: 0 auto 40px;
    padding-left: 1rem;
    font-size: 1.3rem;
    font-weight: 400;
    text-align: left;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0.2rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $blueColor;
      border-radius: 100%;
    }
  }
  ul {
    width: 1080px;
    height: 60px;
    margin: 0 auto;
    background: url('~static/images/pc/contents/library/bg_tab01.png') no-repeat
      center top;
    background-size: 100% auto;
    li {
      height: 60px;
      line-height: 60px;
    }
    &.smart {
      background-image: url('~static/images/pc/contents/library/bg_tab02.png');
    }
  }
}
.tab.mo {
  margin-top: 11rem;
  h2 {
    position: relative;
    padding-left: 1rem;
    margin-bottom: 2.1rem;
    font-size: 1.5rem;
    font-weight: 400;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0.2rem;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: $blueColor;
      border-radius: 100%;
    }
  }
  ul {
    width: 29rem;
    height: 3.5rem;
    margin: 0 1.5rem;
    padding-bottom: 1rem;
    background: url('~static/images/mobile/contents/buy/bg_tab02.png') no-repeat
      center top;
    background-size: 100% auto;

    li {
      a {
        height: 3.5rem;
        font-size: 1.5rem;
        border-radius: 3rem;
        line-height: 3.5rem;
      }
    }
    &.smart {
      background-image: url('~static/images/mobile/contents/buy/bg_tab01.png');
    }
  }
}
</style>
