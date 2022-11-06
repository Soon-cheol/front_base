<template>
  <div id="activityPlayer" @click="_goFullScreen">
    <canvas id="stage" ref="stage" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { AramApp } from '@/AramApp'
import Util from '@/activity/gameUtil'
import PIXISound from 'pixi-sound'
import gsap from 'gsap'
import { isMobilePlatform } from './gameUtil/platform'

@Component({
  components: {}
})
export default class ActivityPlayer extends Vue {
  @Prop({ default: '' }) private name!: ''
  private screenFlag = true

  $refs: {
    stage: HTMLCanvasElement
  }
  created() {
    // console.error(this.name)
  }
  beforeDestroy() {
    console.log(`Destroy`)
    if (window['currentVideo']) {
      window['currentVideo'].pause()
      window['currentVideo'] = null
    }
    if (window['currentBGM']) {
      window[`currentBGM`].pause()
      window[`currentBGM`] = null
    }
    gsap.globalTimeline.clear()
    PIXISound.pauseAll()
  }

  // reclacScreen() {
  //   const w = window.innerWidth
  //   const h = window.innerHeight
  //   if (w > h * 1.777) {
  //     document.body
  //       .getElementsByTagName('canvas')[0]
  //       .setAttribute('style', `width: calc(1.6 * ${h}px ); height:100%;`)
  //   } else {
  //     document.body
  //       .getElementsByTagName('canvas')[0]
  //       .setAttribute('style', `width:100%;height:calc( ${w}px / 1.6 )`)
  //   }
  // }

  async _goFullScreen() {
    // alert(isMobilePlatform())
    if (isMobilePlatform() == false) {
      this._goFullScreen = () => null
      return
    }
    const isFull = document.fullscreen

    if (isFull == true) {
      return
    }

    const options = {
      navigationUI: 'hide' as FullscreenNavigationUI
    }

    document.documentElement.requestFullscreen(options).then(() => {
      console.log('HIDE')
    })
  }

  mounted() {
    const gameApp = new AramApp(this.$refs.stage, this.name)

    gameApp.onCloseApp = () => {
      gsap.globalTimeline.clear()
      if (window['currentVideo']) {
        window['currentVideo'].pause()
        window['currentVideo'] = null
      }
      this.$router.replace('/hangul')
    }
  }
}
</script>

<style lang="scss" scoped>
#activityPlayer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* border: 2px #000 solid; */
  background-color: rgba(0, 0, 0, 0.9);

  #stage {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 100%;

    z-index: 200;
    box-sizing: border-box;
  }
  #alert {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 400;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    > button {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 2rem;
      width: 200px;
      color: #fff;
      font-size: 1.6rem;
      background-color: green;
      border: 2px green solid;
      border-radius: 20px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
