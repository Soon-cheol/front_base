import { SceneBase } from '@/activity/core/sceneBase'
import { VideoControl } from '@/activity/widget/videoCont'
import Config from '@/activity/gameUtil/config'
import { HangulCard } from '@/activity/widget/hangulCard'
import { Eop } from '@/activity/scene/eop'
import { Intro } from '@/activity/scene/intro'
import { App } from '@/activity/core/app'
import config from '@/activity/gameUtil/config'
import { getSymbol } from '@/activity/gameUtil/game'
import { ResourceManager } from '@/activity/core/resourceManager'

export class Today extends SceneBase {
  private mVideoSprite: PIXI.Sprite
  private mVideoElement: HTMLVideoElement
  private mController: VideoControl

  constructor() {
    super('today')
  }
  async onInit() {
    await App.Handle.showLoadingScreen()
    console.log(
      `Selected =>  %c  ${this.gamename}`,
      ' color: red; font-weight:bold; letter-spacing: -0.1rem;'
    )
    await App.Handle.closeLoadingScreen()
  }

  async onStart() {
    const intro = new Intro()
    this.addChild(intro)
    await intro.playIntro()

    this.removeChildren()

    App.Handle.modalRoot.visible = false

    await this.settingVideo()
    this.mController = new VideoControl(this.mVideoElement)
    this.addChild(this.mController)

    this.setCard()
  }

  settingVideo(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mVideoSprite = new PIXI.Sprite()
      this.addChild(this.mVideoSprite)

      this.mVideoElement = document.createElement('video')
      this.mVideoElement.setAttribute('playsinline', '')
      // this.mVideoElement.setAttribute('autoplay', '')
      const url = `${Config.restAPI}product/today/video/${config.studyDay}_th.mp4`
      this.mVideoElement.src = url
      this.mVideoElement.crossOrigin = ''
      this.mVideoElement.autoplay = false

      const cb = async () => {
        if (document.hidden == false) {
          //화면 안 보일 때
          // if (window['videoState'] == true) {
          /**비디오 재생 */
          await App.Handle.modalRoot.resetModal()
          this.mController.controllerState(true)
          // } else {
          /**비디오 정지 */
          // this.mController.controllerState(true)
          // }
        } else {
          this.mController.controllerState(false)
          // window['videoState'] = this.mVideoElement.paused
          // if (this.mVideoElement) this.mVideoElement.pause()
        }
      }

      this.mVideoSprite.texture = PIXI.Texture.from(this.mVideoElement)
      this.mVideoSprite.width = config.w
      this.mVideoSprite.height = config.h

      this.mVideoElement.onended = () => {
        this.onEnded()
      }

      document.removeEventListener('visibilitychange', cb)
      document.addEventListener('visibilitychange', cb)

      this.mVideoElement.oncanplay = () => {
        this.mVideoElement.oncanplay = null
        this.mVideoElement.currentTime = 0
        this.mVideoElement.pause()
        resolve()
      }
    })
  }

  setCard() {
    const sound = ResourceManager.Handle.getCommonResource(`ac1_playpop.mp3`)
      .sound
    sound.play()

    const card = new HangulCard(getSymbol(), 0x000000, {
      fontSize: 180,
      fontWeight: 'bold',
      fontFamily: 'TmoneyRoundWindExtraBold'
    })
    card.changeTint(true)
    this.addChild(card)

    card.interactive = true
    card.on('pointertap', () => {
      this.mVideoElement.play()
    })
    card.onClick = () => {
      card.onClick = () => null
      this.mVideoElement.currentTime = 0
      this.mController.playControl()
      this.removeChild(card)
      App.Handle.modalRoot.visible = true
    }
  }

  async onEnded() {
    console.log(`오늘한글 끝`)
    this.mVideoElement.currentTime = 0
    const EOP = new Eop()
    this.addChild(EOP)
    await EOP.eopPlay()
    this.mController.destroy()
    App.Handle.nextGame()
  }
}
