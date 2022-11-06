import * as PIXI from 'pixi.js'
window.PIXI = PIXI
import PIXISound from 'pixi-sound'
require('pixi-spine')

import { SceneBase } from './sceneBase'
import Config from '@/activity/gameUtil/config'
import { Modal } from './modal'
import gsap from 'gsap'
import { LoadingScreen } from '@/activity/scene/loading'
import { ResourceManager } from './resourceManager'
import config from '@/activity/gameUtil/config'

// import { LoadingScreen } from './Popup/LoadingScreen';
// import { Video } from '../GameObject/Common/Video';

const gameList = [
  'home',
  'today',
  'rhythm',
  'paint',
  'partner',
  'myhangul',
  'nodak',
  'total'
]

export class App extends PIXI.Application {
  //-----------------------------------
  // singleton
  private static _handle: App
  static get Handle(): App {
    return App._handle
  }
  //-----------------------------------
  // private mLoading: LoadingScreen
  //-----------------------------------
  private mCurrentSceneIDX: number

  private mSceneArray: Array<SceneBase>
  // get loadingScreen(): LoadingScreen{ return this.mLoadingScreen }
  // set loadingScreen(v: LoadingScreen){ this.mLoadingScreen = v }

  /**클릭하면 터지는 effect 스파인 */
  private mEffect: PIXI.spine.Spine
  private mEffectDelay: any

  /**로딩 화면 */
  private mLoadingScreen: LoadingScreen
  private mLoadingRoot: PIXI.Container

  /**게임 화면 */
  private mSceneRoot: PIXI.Container
  get sceneRoot(): PIXI.Container {
    return this.mSceneRoot
  }

  /**게임 메뉴버튼  */
  private mModalRoot: Modal
  get modalRoot(): Modal {
    return this.mModalRoot
  }

  private mVideoStopper: Array<HTMLVideoElement>

  get videoStop(): Array<HTMLVideoElement> {
    return this.mVideoStopper
  }
  set videoStop(v: Array<HTMLVideoElement>) {
    this.mVideoStopper = v
  }

  constructor(canvas: HTMLCanvasElement) {
    console.log('App Created')
    super({
      width: Config.w,
      height: Config.h,
      backgroundColor: 0x000000,
      // transparent: true,
      // resolution: window.devicePixelRatio || 1,
      view: canvas
    })

    // PIXI.settings.ROUND_PIXELS = true

    if (window['currentBGM']) {
      window['currentBGM'].pause()
      window['currentBGM'] = null
    }
    if (window['gameMotion']) {
      window['gameMotion'] = []
    }

    this.mSceneRoot = new PIXI.Container()
    this.mLoadingRoot = new PIXI.Container()
    this.mModalRoot = new Modal()

    this.stage.addChild(this.mSceneRoot, this.mModalRoot, this.mLoadingRoot)

    this.mCurrentSceneIDX = 0
    this.mSceneArray = []
    this._initAppSetup()

    App._handle = this
    // hack for browser
    ;(window as any)['app'] = this

    document.addEventListener('visibilitychange', () => {
      if (
        App.Handle.getSceneName() == 'today' ||
        App.Handle.getSceneName() == 'myhangul'
      ) {
        return
      }
      console.error(`app.ts`)
      if (document.hidden == false) {
        if (window['currentVideo']) {
          window['currentVideo'].pause()
          window['currentVideo'] = null
        }
        if (window['currentBGM']) {
          window['currentBGM'].play()
        }
        // if (window['soundManager']) {
        //   window['soundManager'].play()
        // }
        gsap.globalTimeline.resume()
        PIXISound.resumeAll()
      } else {
        // if (window['soundManager']) {
        //   window['soundManager'].pause()
        // }
        if (window['currentBGM']) {
          window['currentBGM'].pause()
        }
        gsap.globalTimeline.pause()
        PIXISound.pauseAll()
      }
    })

    this.registerEffect()
  }
  //--------------------------------------

  registerEffect() {
    this.stage.interactive = true

    // this.mEffectSound = document.createElement('audio')
    // this.mEffectSound.src = `${config.restAPI}common/sounds/com_button_click.mp3`

    this.stage.on('pointertap', (evt: PIXI.InteractionEvent) => {
      if (this.mEffect) {
        this.mEffect.state.clearListeners()
        this.stage.removeChild(this.mEffect)
        this.mEffect = null
        this.mEffectDelay.kill()
        // this.mEffectSound.pause()
      }

      // this.mEffectSound.play()

      this.mEffect = new PIXI.spine.Spine(
        ResourceManager.Handle.getCommonResource(`star_effect.json`).spineData
      )
      this.stage.addChild(this.mEffect)
      this.mEffect.position.set(evt.data.global.x, evt.data.global.y)

      this.mEffect.state.setAnimation(0, `animation`, false)

      const delay = this.mEffect.stateData.skeletonData.findAnimation(
        `animation`
      ).duration

      this.mEffectDelay = gsap.delayedCall(delay, () => {
        this.stage.removeChild(this.mEffect)
        this.mEffect = null
      })
    })
  }
  private _initAppSetup() {
    this.stage.sortableChildren = true
  }

  get currentScene(): SceneBase {
    return this.mSceneArray[this.mCurrentSceneIDX]
  }
  get currentSceneIDX(): number {
    return this.mCurrentSceneIDX
  }

  addScene(scene: SceneBase) {
    this.mSceneArray.push(scene)
  }

  getScene(name: string): SceneBase {
    if (name == null) return null
    for (const scene of this.mSceneArray) {
      if (name == scene.gamename) {
        return scene
      }
    }
  }

  getSceneName() {
    return this.mSceneArray[this.mCurrentSceneIDX].gamename.toLowerCase()
  }

  resetRoot(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mSceneRoot.children.forEach((element) => {
        ;(element as SceneBase).removeChildren()
        element = null
      })
      this.mSceneRoot.removeChildren()
      if (window['recorder']) {
        window['recorder'] = null
      }

      if (window['record']) {
        window['record'] = null
      }
      if (window['currentVideo']) {
        window['currentVideo'].pause()
        window['currentVideo'] = null
      }
      if (window['currentBGM']) {
        window['currentBGM'].pause()
        window['currentBGM'] = null
      }
      // gsap.globalTimeline.kill()
      PIXI.Loader.shared.destroy()
      PIXI.Loader.shared.reset()

      this.videoAllStop()
      resolve()
    })
  }
  async goScene(name?: string) {
    await this.resetRoot()
    let flag = false
    let idx = 0

    if (!name) {
      name = `home`
    }

    for (const scene of this.mSceneArray) {
      if (name.toLowerCase() == scene.gamename.toLowerCase()) {
        this.mSceneRoot.addChild(scene)
        this.mModalRoot.onInit()

        this.mCurrentSceneIDX = idx

        console.warn(`현재 APP 스텝`, this.mCurrentSceneIDX, name)

        await scene.onInit()
        await scene.onStart()
        flag = true
      }
      idx += 1
    }

    if (!flag) {
      console.log(`"[${name}]"이 없습니다.`)
    }
  }
  //--------------------------------------

  async nextGame() {
    let index = 0
    for (let i = 0; i < gameList.length; i++) {
      if (gameList[i] == this.getSceneName()) {
        index = i + 1
        break
      }
    }
    this.goScene(gameList[index])
  }

  async startApp(appData: any, sceneName: string) {
    gsap.globalTimeline.clear()

    console.log('App start')
    console.log(appData)

    this.start()

    const list = {
      images: [
        'bi.png',
        'btn_exit.png',
        'btn_howto.png',
        'btn_menu.png',
        'btn_menu_dim.png'
      ],
      sounds: [],
      json: [],
      videos: [],
      spine: ['loading.json']
    }
    await ResourceManager.Handle.loadCommonResource(list)
    await this.onStartApp()
    PIXISound.resumeAll()

    await this.goScene(sceneName)
  }

  async showLoadingScreen() {
    if (this.mLoadingScreen) {
      return
    }
    this.mLoadingScreen = new LoadingScreen()
    this.mLoadingRoot.addChild(this.mLoadingScreen)
  }
  async closeLoadingScreen() {
    await this.mLoadingScreen.endLoading()
    this.mLoadingScreen = null
    this.mLoadingRoot.removeChildren()
  }

  videoAllStop(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (window['currentVideo']) {
        window['currentVideo'].pause()
        window['currentVideo'] = null
      }
      if (window['gameMotion'] && window['gameMotion'].length > 0) {
        for (const motion of window['gameMotion']) {
          motion.kill()
          window['gameMotion'] = []
        }
      }
      resolve()
    })
  }
  //--------------------------------
  onStartApp() {
    //
  }
  onCloseApp() {
    //
  }
}
