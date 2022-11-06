<template>
  <div>
    <div
      v-if="viewMode"
      class="tab"
      :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
    >
      <h2>학습관리</h2>
      <ul :class="{ point: tabMenu === 2 }">
        <li
          @click="tabLink(1)"
          :class="{ active: tabMenu === 1 }"
          class="smart"
        >
          <nuxt-link to="/study/learn">학습관리</nuxt-link>
        </li>
        <li
          @click="tabLink(2)"
          :class="{ active: tabMenu === 2 }"
          class="point"
        >
          <nuxt-link to="/study/end">학습종료</nuxt-link>
        </li>
      </ul>
    </div>
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
  mounted() {
    this.pageReset()
  },
  updated() {
    this.pageReset()
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode
    })
  },
  methods: {
    tabLink(n) {
      this.tabMenu = n
    },
    pageReset() {
      const path = window.location.pathname
      if (path === '/study/learn') {
        this.tabMenu = 1
      } else if (path === '/study/end') {
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
    &.point {
      li.active {
        background: $fontColor9;
      }
    }
    li {
      position: absolute;
      top: 0;
      // display: table;
      width: 50%;
      border-radius: 50px;
      text-align: center;
      transition: all 0.6s ease 0s;
      -webkit-transition: all 0.6s ease 0s;
      &:first-child {
        left: 0;
      }
      &:last-child {
        right: 0;
      }
      &.active {
        background: #28b6ff;
        -webkit-box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
        -moz-box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
        box-shadow: 0px 3px 7px 1px rgba($shadow, $shadow, $shadow, 0.4);
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
    background: url('~static/images/pc/contents/study/bg_tab01.png') no-repeat
      center top;
    background-size: 100% auto;
    li {
      height: 60px;
      line-height: 60px;
    }
    &.point {
      background-image: url('~static/images/pc/contents/study/bg_tab02.png');
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
    background: url('~static/images/mobile/contents/study/bg_tab01.png')
      no-repeat center top;
    background-size: 100% auto;

    li {
      a {
        height: 3.5rem;
        font-size: 1.5rem;
        border-radius: 3rem;
        line-height: 3.5rem;
      }
    }
    &.point {
      background-image: url('~static/images/mobile/contents/study/bg_tab02.png');
    }
  }
}
</style>
