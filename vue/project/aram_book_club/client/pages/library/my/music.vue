<template>
  <div
    v-if="viewMode"
    class="library-wrap"
    :class="{ mo: viewMode === 'mo', pc: viewMode === 'pc' }"
  >
    <loginConfirm />
    <h2>나의 라이브러리</h2>
    <div class="menu">
      <ul class="tab">
        <li @click="tabMove('/library/my/video')">영상</li>
        <li class="active">음원</li>
      </ul>
      <div class="search">
        <input
          type="text"
          v-model="txtSearch"
          ref="txtSearch"
          @keyup="enterKey($event)"
          placeholder="검색어를 입력하세요"
        />
        <button @click="searchList" />
      </div>
      <ul class="btn-wrap" v-if="viewMode === 'mo'">
        <li>
          <input
            type="checkbox"
            id="allCheck"
            ref="allCheck"
            @click="allCheck"
          />
          <label for="allCheck" />
        </li>
        <li><button @click="playListAdd">선택 재생</button></li>
        <!-- <li><button>즐겨찾기 추가</button></li> -->
      </ul>
    </div>
    <!-- option -->
    <div class="option" v-if="viewMode === 'pc'">
      <ul class="btn-wrap">
        <li><button @click="playListAdd">선택 재생</button></li>
      </ul>
    </div>
    <!-- // option -->
    <table class="music-list">
      <colgroup v-if="viewMode === 'pc'">
        <col width="106px" />
        <col width="46px" />
        <col width="*" />
        <col width="200px" />
        <!-- <col width="140px" /> -->
        <col width="140px" />
      </colgroup>
      <thead v-if="viewMode === 'pc'">
        <tr>
          <th>
            <input
              type="checkbox"
              id="allCheck"
              ref="allCheck"
              @click="allCheck"
            />
            <label for="allCheck" />
          </th>
          <th>No</th>
          <th>제목</th>
          <th>조회수</th>
          <!-- <th>듣기</th> -->
          <th>즐겨찾기</th>
        </tr>
      </thead>
      <tbody v-if="musicList.length <= 0">
        <tr>
          <td colspan="5" class="no-list">
            <p>목록이 없습니다.</p>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(l, index) in musicList" :key="index">
          <td>
            <input
              type="checkbox"
              :id="`check${l.no}`"
              :value="l.soundUrl"
              @click="sleCheck"
            />
            <label :for="`check${l.no}`" />
          </td>
          <td v-if="viewMode === 'pc'" class="num">{{ l.no }}</td>
          <td class="tit">
            <p :class="{ highlight: l.highlight }">{{ l.title }}</p>
          </td>
          <td v-if="viewMode === 'pc'" class="views">{{ l.views }}</td>
          <!-- <td class="play"><button /></td> -->
          <td class="favor">
            <button v-show="!l.isFavorite" class="star" @click="addFavor(l)" />
            <button
              v-show="l.isFavorite"
              class="star-on"
              :class="{ animation: l.animation }"
              @click="addFavor(l)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 재생바 -->
    <div ref="remoteWrap" class="remote-wrap">
      <div class="remote-bar">
        <div class="play-bar">
          <span ref="playBar" class="bar" />
          <span class="bg">
            <span ref="bgMask" class="mask" />
          </span>
        </div>
        <button
          v-if="playPause || firstList || !playState"
          class="btn-prev disable"
        />
        <button v-else class="btn-prev" @click="musicPause('prev')" />
        <button
          v-if="playPause || lastList || !playState"
          class="btn-next disable"
        />
        <button v-else class="btn-next" @click="musicPause('next')" />
        <button v-if="!playState" class="btn-play disable" />
        <button
          v-if="playPause && playState"
          ref="btnPlay"
          class="btn-play"
          @click="musicPLay"
        />
        <button
          v-else-if="!playPause && playState"
          ref="btnPause"
          class="btn-pause"
          @click="musicPause"
        />
        <p v-if="playPause && playState && viewMode === 'pc'" class="txt-state">
          [일시정지]
        </p>
        <p
          v-else-if="!playPause && playState && viewMode === 'pc'"
          class="txt-state"
        >
          [재생중]
        </p>
        <p v-if="!playState && viewMode === 'pc'" class="txt-state">[정지]</p>
        <p v-if="playState" class="tit-play">{{ playTitle }}</p>
        <p v-else class="tit-sel-play">
          <span v-if="viewMode === 'pc'"
            >음원 선택 후 상단의 선택재생을 눌러주세요.</span
          >
          <span v-else>음원 선택 및 재생을 눌러주세요.</span>
        </p>
        <p v-if="playState && viewMode === 'pc'" class="txt-next">
          [다음 재생]
        </p>
        <p v-if="playState && viewMode === 'pc'" class="tit-next">
          {{ nextTitle }}
        </p>
        <!-- <button class="btn-transition" /> -->
      </div>
      <audio ref="audio">
        <source type="audio/mpeg" />
      </audio>
    </div>
  </div>
  <!-- <div v-else>
      모바일화면
    </div> -->
</template>

<script>
import { mapState } from 'vuex'
import loginConfirm from '~/components/loginConfirm'
export default {
  data() {
    return {
      category: [], // 상단 셀렉트박스
      selCateValue: '',
      musicList: [], // 전체리스트
      playState: false, // 음악 재생 상태
      playList: [], // 선택리스트
      playPause: false, // 일시정지 여부
      lastList: false,
      firstList: false,
      playListNum: 0, // 현재 재생 번호 (인덱스)
      browserHeight: '',
      playTitle: '',
      nextTitle: '',
      txtSearch: ''
    }
  },
  components: {
    loginConfirm
  },
  computed: {
    ...mapState({
      viewMode: (state) => state.user.viewMode,
      // userToken: (state) => state.user.userToken,
      isLoggedIn: (state) => state.auth.loggedIn
    })
  },
  mounted() {
    this.getFavorList()
  },
  watch: {
    viewMode(n, p) {
      if (p === '') return false
      // this.playState = false
      location.reload()
    }
  },
  methods: {
    // 통신
    async getFavorList() {
      try {
        const { data } = await this.$axios.get('/library/favorites/sounds', {
          params: {
            cntPerPage: 100
          }
        })
        this.musicList = data.result
      } catch (error) {
        console.error(error)
      }
    },
    async searchList() {
      if (
        !this.txtSearch ||
        this.txtSearch === undefined ||
        this.txtSearch === null
      ) {
        this.txtSearch === ''
      }
      try {
        const { data } = await this.$axios.get('/library/favorites/sounds', {
          params: {
            searchWord: this.txtSearch
          }
        })
        this.musicList = data.result
      } catch (error) {
        console.error(error)
      }
    },
    async viewsUpdate(infoSeqno, seqno) {
      try {
        const { data } = await this.$axios.post(
          `/library/played-contents/${infoSeqno}/${seqno}`
        )
      } catch (error) {
        console.error(error)
      }
    },
    async addFavor(obj) {
      const music = this.musicList.find((m) => m === obj)
      if (music.isFavorite) {
        // 즐찾 삭제
        try {
          const { data } = await this.$axios.delete(
            `/library/favorites/contents/${music.infoSeqno}/${music.seqno}`
          )
        } catch (error) {
          console.error(error)
        }
      } else {
        // 즐찾 추가
        try {
          const { data } = await this.$axios.post(
            `/library/favorites/contents/${music.infoSeqno}/${music.seqno}`
          )
          // this.$refs.favorite.classList.add('animate')
        } catch (error) {
          console.error(error)
        }
      }
      const star = this.musicList.findIndex((m) => m.no === obj.no)
      this.musicList[star].isFavorite = !this.musicList[star].isFavorite
    },
    // 기능
    playListAdd() {
      // 체크된 음원 객체 배열에 넣기
      const sel = document.querySelectorAll(
        '.music-list td input[type="checkbox"]:checked'
      )
      console.log('sel', sel)
      this.playList = []
      this.playListNum = 0
      for (const a of sel) {
        // this.playList.push(document.getElementById(a.id).value)
        this.playList.push(
          this.musicList.find(
            (m) => m.soundUrl === document.getElementById(a.id).value
          )
        )
      }
      console.log('this.playList', this.playList)
      // 체크리스트 유효성 체크
      if (this.playList.length <= 0) {
        alert('재생할 음악을 선택해주세요.')
        return false
      }
      this.playState = true
      this.musicStart()
    },
    musicStart() {
      this.playPause = false
      this.playTitle = this.playList[this.playListNum].title
      if (this.playList[this.playListNum + 1]) {
        this.nextTitle = this.playList[this.playListNum + 1].title
        this.lastList = false
      } else {
        this.nextTitle = '다음 곡이 없습니다.'
        this.lastList = true
      }
      if (this.playListNum <= 0) {
        this.firstList = true
      } else {
        this.firstList = false
      }
      // 오디오 플레이
      this.$refs.audio.setAttribute(
        'src',
        this.playList[this.playListNum].soundUrl
      )
      // this.$refs.audio.setAttribute(
      //   'src',
      //   'https://www.imestudy.co.kr/rsc/viewer/rhythm/sounds/ac2_correct.mp3'
      // )
      this.viewsUpdate(
        this.playList[this.playListNum].infoSeqno,
        this.playList[this.playListNum].seqno
      )
      for (const a of this.musicList) {
        a.highlight = false
      }
      const h = this.musicList.find(
        (m) => m.seqno === this.playList[this.playListNum].seqno
      )
      h.highlight = true

      this.$refs.audio.play()
      this.interval()
    },
    interval() {
      const _this = this
      let timer = setInterval(barMove, 500)
      function barMove() {
        // console.log('인터벌 실행')
        if (_this.$refs.audio) {
          let current =
            _this.$refs.audio.currentTime / _this.$refs.audio.duration + ''
          let per = current.substr(2, 2)
          _this.$refs.playBar.setAttribute('style', `left: ${per}%`)
          _this.$refs.bgMask.setAttribute('style', `width: ${per}%`)
          if (_this.$refs.audio.ended || !_this.playState) {
            console.log('인터벌 삭제')
            clearInterval(timer)
            _this.$refs.audio.pause()
            _this.playListNum++
            if (_this.playListNum >= _this.playList.length) {
              // console.log('playListNum', _this.playListNum)
              // console.log('playList.length', _this.playList.length)
              console.log('재생 리스트가 모두 완료된 경우 = 초기화')
              for (const a of _this.musicList) {
                a.highlight = false
              }
              _this.playState = false
              const sel = document.querySelectorAll(
                '.music-list input[type="checkbox"]:checked'
              )
              for (const a of sel) {
                document.getElementById(a.id).checked = false
              }
            } else {
              // console.log('playListNum', _this.playListNum)
              // console.log('playList.length', _this.playList.length)
              console.log('재생 리스트가 남은 경우')
              _this.musicStart()
            }
          }
        } else {
          // 페이지 벗어날 경우
          console.log('인터벌 삭제2')
          clearInterval(timer)
        }
      }
    },
    musicPLay() {
      this.playPause = false
      this.$refs.audio.play()
    },
    musicPause(state) {
      this.playPause = true
      this.$refs.audio.pause()
      if (state === 'next') {
        this.playListNum++
        this.playPause = false
        this.musicStart()
        return false
      } else if (state === 'prev') {
        this.playListNum--
        this.playPause = false
        this.musicStart()
        return false
      }
      // setTimeout(() => {
      //   this.playState = false
      // }, 3000)
    },
    enterKey(e) {
      if (e.keyCode === 13) {
        this.searchList()
      }
    },
    allCheck() {
      const sel = document.querySelectorAll(
        '.music-list input[type="checkbox"]'
      )
      if (this.$refs.allCheck.checked) {
        // console.log('현재 상태가 올체크가 아닌 경우')
        this.$refs.allCheck.checked = true
        for (const a of sel) {
          document.getElementById(a.id).checked = true
        }
      } else {
        // console.log('현재 상태가 올체크인 경우')
        this.$refs.allCheck.checked = false
        for (const a of sel) {
          document.getElementById(a.id).checked = false
        }
      }
    },
    sleCheck(e) {
      if (!e.target.checked) {
        this.$refs.allCheck.checked = false
      }
    },
    tabMove(link) {
      this.$router.push(link)
    }
  }
}
</script>
<style lang="scss" scoped>
$fontColor3: #191919;
$fontColor6: #767676;
$fontColor9: #999;
$blueColor: #269bd7;
$borderColor: #cfcfcf;
$errorColor: #ff794a;
@keyframes like-gif {
  0% {
    background-position: 0 0;
  }
  99% {
    background-position: -3800px 0;
  }
  100% {
    background-position: 0 0;
  }
}
.library-wrap {
  &.pc {
    overflow: hidden;
    width: 1080px;
    min-height: 800px;
    margin: 0 auto;
    h2 {
      padding: 69.5px 0 40px;
      font-size: 28px;
      text-align: center;
      font-weight: 500;
    }
    .menu {
      overflow: hidden;
      height: 100px;
      .tab {
        float: left;
        height: 100%;
        li {
          float: left;
          width: 50px;
          height: 100%;
          padding-top: 58px;
          font-size: 14px;
          font-weight: 200;
          text-align: center;
          color: $fontColor6;
          cursor: pointer;
          &:first-child {
            background: url('~static/svg2/ico_movie.svg') no-repeat -62px 0;
            background-size: auto 50px;
          }
          &:last-child {
            margin-left: 60px;
            background: url('~static/svg2/ico_music.svg') no-repeat -62px 0;
            background-size: auto 50px;
          }
          &.active {
            position: relative;
            background-position: 0 0;
            font-size: 18px;
            font-weight: 600;
            color: $fontColor3;
            &::after {
              position: absolute;
              content: '';
              left: 0;
              bottom: 0;
              display: block;
              width: 100%;
              border-radius: 2px;
              border-bottom: 4px solid #0087bd;
            }
          }
        }
      }
      .search {
        float: right;
        width: 380px;
        height: 50px;
        & > * {
          float: left;
          height: 50px;
          font-size: 16px;
          vertical-align: top;
        }
        input[type='text'] {
          width: 330px;
          padding: 10px 26px;
          background-color: #f8f8fa;
          border: 0 none;
          border-radius: 24px 0 0 24px;
        }
        button {
          width: 50px;
          background: #0087bd
            url('~static/images/pc/contents/library/ico_zoom.svg') no-repeat
            center center;
          border-radius: 0 24px 24px 0;
        }
      }
    }
    .option {
      overflow: hidden;
      margin-bottom: 19px;
      select {
        min-width: 313px;
        height: 50px;
        padding: 0 62px 0 24px;
        border: 1px solid #dbdbdb;
        background: url('~static/images/pc/contents/library/ico_sel_arrow.svg')
          no-repeat 92% 50%;
        font-size: 16px;
        color: $fontColor3;
      }
      .btn-wrap {
        overflow: hidden;
        margin-top: 30px;
        font-size: 14px;
        color: $fontColor3;
        li {
          float: left;
          button {
            width: 134px;
            height: 40px;
            padding-left: 36px;
            border: 1px solid #dbdbdb;
            border-radius: 20px;
            background: #fff
              url('~static/images/pc/contents/library/ico_option_play.svg')
              no-repeat 14px center;
            background-size: 32px auto;
            font-size: 16px;
            font-weight: 400;
          }
          & + li {
            margin-left: 12px;
            button {
              width: 124px;
              background-image: url('~static/images/pc/contents/library/ico_option_star.svg');
            }
          }
        }
      }
    }
    input[type='checkbox'] {
      position: absolute;
      top: 10px;
      left: 37px;
      width: 26px;
      height: 26px;
      opacity: 0;
    }
    input[type='checkbox'] + label {
      display: inline-block;
      width: 26px;
      height: 26px;
      border: 1px solid #dbdbdb;
      border-radius: 5px;
      background: #fff;
    }
    input[type='checkbox']:checked + label {
      border: 1px solid #0087bd;
      background: #0087bd
        url('~static/images/pc/contents/library/ico_check.svg') no-repeat center
        center;
    }
    .music-list {
      margin-bottom: 150px;
      border-top: 2px solid $fontColor3;
      text-align: center;
      th {
        position: relative;
        height: 50px;
        background: #f1f1f5;
        font-size: 16px;
        font-weight: 500;
        color: $fontColor3;
        &:nth-child(4) {
          padding-right: 40px;
          text-align: right;
        }
      }
      td {
        position: relative;
        border-bottom: 2px solid #e4e8eb;
        background: #fff;
        font-size: 16px;
        &.num,
        &.views {
          color: $fontColor6;
        }
        &.views {
          padding-right: 40px;
          text-align: right;
        }
        &.tit {
          padding: 0 20px 0 40px;
          text-align: left;
          color: $fontColor3;
          p {
            overflow: hidden;
            width: 558px;
            height: 60px;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 60px;
            &.highlight {
              color: #0087bd;
            }
          }
        }
        &.play {
          button {
            width: 35px;
            height: 34px;
            border: 1px solid #dbdbdb;
            border-radius: 100%;
            background: url('~static/images/pc/contents/library/ico_option_play.svg')
              no-repeat center center;
            background-size: 30px auto;
          }
        }
        &.favor {
          overflow: hidden;
          position: relative;
          .star {
            position: absolute;
            top: 10px;
            right: 50px;
            width: 36px;
            height: 36px;
            padding: 0;
            background: url('/images/pc/contents/library/ico_star_off.svg')
              no-repeat right center;
            z-index: 2;
          }
          .star-on {
            position: absolute;
            top: -83px;
            right: 17px;
            width: 100px;
            height: 160px;
            background: url('/images/pc/contents/library/star_sprite.png')
              no-repeat 0 0;
            z-index: 3;
            animation: like-gif steps(38) 1.8s;
          }
        }
        &.no-list {
          padding: 100px 0;
          font-size: 30px;
        }
      }
    }
    .remote-wrap {
      position: fixed;
      left: 0;
      bottom: 60px;
      width: 100%;
      z-index: 100;
      transition: all 0.3s ease 0s;
      -webkit-transition: all 0.3s ease 0s;
      audio {
        display: none;
      }
      .remote-bar {
        // overflow: hidden;
        position: relative;
        width: 1080px;
        height: 70px;
        margin: 0 auto;
        background: #0087bd;
        border-radius: 36px;
        -webkit-box-shadow: 3px 0px 7px 1px rgba(160, 160, 160, 1);
        -moz-box-shadow: 3px 0px 7px 1px rgba(160, 160, 160, 1);
        box-shadow: 3px 0px 7px 1px rgba(160, 160, 160, 1);
        & > * {
          position: absolute;
          top: 0;
          height: 100%;
          font-weight: 200;
          line-height: 70px;
          color: #fff;
          &.btn-prev {
            left: 50px;
            width: 30px;
            background: url('~static/images/pc/contents/library/btn_remote_prev.svg')
              no-repeat center center;
          }
          &.btn-play {
            left: 100px;
            width: 40px;
            background: url('~static/images/pc/contents/library/btn_remote_play.svg')
              no-repeat center center;
          }
          &.btn-pause {
            left: 100px;
            width: 40px;
            background: url('~static/images/pc/contents/library/btn_remote_pause.svg')
              no-repeat center center;
          }
          &.btn-next {
            left: 160px;
            width: 30px;
            background: url('~static/images/pc/contents/library/btn_remote_next.svg')
              no-repeat center center;
          }
          &.txt-state {
            left: 240px;
            width: 70px;
            font-size: 16px;
            text-align: center;
          }
          &.tit-play {
            left: 327px;
            overflow: hidden;
            width: 356px;
            font-size: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &.tit-sel-play {
            left: 327px;
            font-size: 20px;
          }
          &.txt-next {
            left: 725px;
            font-size: 12px;
          }
          &.tit-next {
            left: 795px;
            overflow: hidden;
            width: 170px;
            font-size: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 70px;
          }
          &.disable {
            opacity: 0.3;
            cursor: default;
          }
          &.play-bar {
            top: -6px;
            left: 40px;
            .bar {
              position: absolute;
              top: -5px;
              display: block;
              width: 16px;
              height: 16px;
              background: #ff4747;
              border-radius: 100%;
              margin-left: -8px;
              cursor: pointer;
              z-index: 2;
            }
            .bg {
              overflow: hidden;
              position: relative;
              display: block;
              width: 1000px;
              height: 6px;
              border-radius: 20px;
              background: #fff;
              border-top: 1px solid rgba(160, 160, 160, 0.4);
              -webkit-box-shadow: 10px 0px 10px 1px rgba(200, 200, 200, 0.6);
              -moz-box-shadow: 10px 0px 10px 1px rgba(200, 200, 200, 0.6);
              box-shadow: 10px 0px 10px 1px rgba(200, 200, 200, 0.6);
              z-index: 1;
              .mask {
                display: block;
                position: absolute;
                width: 0;
                height: 6px;
                background: #ff4747;
              }
            }
          }
          // &.btn-transition {
          //   top: 10px;
          //   right: 10px;
          //   width: 50px;
          //   height: 50px;
          //   background: url('~static/images/pc/contents/library/btn_transition.svg')
          //     no-repeat -9px -6px;
          // }
        }
      }
    }
  }
  &.mo {
    padding: 1.5rem;
    input[type='checkbox'] {
      position: absolute;
      top: 1.6rem;
      opacity: 0;
      & + label {
        margin-top: 0.3rem;
      }
    }
    h2 {
      display: none;
    }
    input[type='checkbox'] {
      width: 2rem;
      height: 2rem;
      margin: 0;
      border: 1px solid #dbdbdb;
      border-radius: 0.25rem;
      & + label {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: #fff;
        border: 1px solid #dbdbdb;
        border-radius: 0.25rem;
      }
    }
    input[type='checkbox']:checked + label {
      border: 1px solid #0087bd;
      background: #0087bd
        url('~static/images/pc/contents/library/ico_check.svg') no-repeat center
        center;
    }
    .menu {
      .tab {
        width: 100%;
        text-align: center;
        li {
          display: inline-block;
          width: 4rem;
          height: 7.4rem;
          padding-top: 4.5rem;
          text-align: center;
          &:first-child {
            background: url('~static/svg2/ico_movie.svg') no-repeat -5rem 0;
            background-size: auto 4rem;
          }
          &:last-child {
            margin-left: 3.5rem;
            background: url('~static/svg2/ico_music.svg') no-repeat -5rem 0;
            background-size: auto 4rem;
          }
          &.active {
            position: relative;
            // padding-top: 4.5rem;
            background-position: 0 0;
            font-size: 1.3rem;
            font-weight: 600;
            color: $fontColor3;
            &::after {
              position: absolute;
              content: '';
              left: 0;
              bottom: 0;
              display: block;
              width: 100%;
              border-radius: 2px;
              border-bottom: 4px solid #0087bd;
            }
          }
        }
      }
    }
    .option {
      select {
        width: 100%;
        height: 4.5rem;
        padding: 0 4.6rem 0 1.2rem;
        border: 1px solid #dbdbdb;
        background: url('~static/images/mobile/contents/library/ico_sel_arrow.svg')
          no-repeat 96% 50%;
        background-size: 2.4rem;
        font-size: 1.3rem;
        color: $fontColor3;
      }
    }
    .search {
      overflow: hidden;
      width: 29rem;
      margin: 1.2rem 0 3rem;
      border-radius: 1.9rem;
      input[type='text'] {
        float: left;
        width: 25.1rem;
        height: 3.8rem;
        padding: 0.8rem 1.2rem;
        background: #f8f8fa;
        border: 0 none;
        font-size: 1.3rem;
        font-weight: 300;
      }
      button {
        float: right;
        width: 3.9rem;
        height: 3.8rem;
        background: #0087bd
          url('~static/images/mobile/contents/library/btn_zoom.svg') no-repeat
          center center;
        background-size: 2.3rem;
      }
    }
    .btn-wrap {
      overflow: hidden;
      padding-bottom: 1rem;
      border-bottom: 2px solid $fontColor3;
      li:first-child {
        position: relative;
        float: left;
        input[type='checkbox'] {
          top: 0;
        }
      }
      li:last-child {
        float: right;
        button {
          width: 7.8rem;
          height: 2.5rem;
          padding: 0 0.6rem 0 2.2rem;
          border: 1px solid #dbdbdb;
          border-radius: 2.5rem;
          background: #fff
            url('~static/images/pc/contents/library/ico_option_play.svg')
            no-repeat 0.6rem center;
          background-size: 1.6rem;
          font-size: 1.1rem;
          color: $fontColor3;
        }
      }
    }
    .music-list {
      tr {
        td {
          overflow: hidden;
          position: relative;
          height: 5rem;
          &:nth-child(1) {
            width: 3.6rem;
          }
          &:nth-child(2) {
            width: 24.5rem;
            p {
              overflow: hidden;
              width: 20.5rem;
              height: 5rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 5rem;
              &.highlight {
                color: #0087bd;
              }
            }
          }
          &:nth-child(3) {
            width: 2.6rem;
            button {
              width: 2.6rem;
              height: 2.6rem;
              background: url('~static/images/mobile/contents/library/ico_star.svg')
                no-repeat center center;
              background-size: 1.8rem;
              border-radius: 100%;
            }
            .star {
              background-color: #dbdbdb;
            }
            .star-on {
              background-color: #ffbb00;
            }
          }
        }
      }
    }
    .no-list {
      padding: 5rem 0;
      font-size: 1.5rem;
      text-align: center;
    }
    .remote-wrap {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      z-index: 998;
      transition: all 0.3s ease 0s;
      -webkit-transition: all 0.3s ease 0s;
      .remote-bar {
        position: relative;
        width: 32rem;
        height: 5.5rem;
        margin: 0 auto;
        background: #0087bd;
        & > * {
          position: absolute;
          &.btn-prev {
            top: 1.6rem;
            left: 1.5rem;
            width: 2.3rem;
            height: 2.3rem;
            background: url('~static/images/pc/contents/library/btn_remote_prev.svg')
              no-repeat center center;
          }
          &.btn-play {
            top: 1.25rem;
            left: 5rem;
            width: 3rem;
            height: 3rem;
            background: url('~static/images/pc/contents/library/btn_remote_play.svg')
              no-repeat center center;
          }
          &.btn-pause {
            top: 1.25rem;
            left: 5rem;
            width: 3rem;
            height: 3rem;
            background: url('~static/images/pc/contents/library/btn_remote_pause.svg')
              no-repeat center center;
          }
          &.btn-next {
            top: 1.6rem;
            left: 9.2rem;
            width: 2.3rem;
            height: 2.3rem;
            background: url('~static/images/pc/contents/library/btn_remote_next.svg')
              no-repeat center center;
          }
          &.tit-play {
            overflow: hidden;
            top: 2rem;
            left: 12.4rem;
            width: 18.1rem;
            font-size: 1.3rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #fff;
          }
          &.tit-sel-play {
            top: 2rem;
            left: 12.4rem;
            font-size: 1.3rem;
            color: #fff;
          }
          &.disable {
            opacity: 0.3;
            cursor: default;
          }
          &.play-bar {
            top: -0.4rem;
            left: 0;
            .bar {
              position: absolute;
              top: -0.3rem;
              display: block;
              width: 1.2rem;
              height: 1.2rem;
              background: #ff4747;
              border-radius: 100%;
              margin-left: -0.4rem;
              cursor: pointer;
              z-index: 2;
            }
            .bg {
              overflow: hidden;
              position: relative;
              display: block;
              width: 32rem;
              height: 0.5rem;
              border-radius: 1rem;
              background: #fff;
              border-top: 1px solid rgba(160, 160, 160, 0.4);
              -webkit-box-shadow: 10px 0px 10px 1px rgba(200, 200, 200, 0.6);
              -moz-box-shadow: 10px 0px 10px 1px rgba(200, 200, 200, 0.6);
              box-shadow: 10px 0px 10px 1px rgba(200, 200, 200, 0.6);
              z-index: 1;
              .mask {
                display: block;
                position: absolute;
                width: 0;
                height: 0.5rem;
                background: #ff4747;
              }
            }
          }
        }
      }
    }
  }
}
.bottom {
  .pc {
    .remote-wrap {
      bottom: 20rem;
    }
  }
  // .mo {
  //   .music-list {
  //     margin-bottom: 6rem;
  //   }
  //   .remote-wrap {
  //     bottom: 33.4rem;
  //   }
  // }
}
</style>
