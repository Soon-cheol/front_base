import { App } from '@/activity/core/app'
import { MyhangulResource } from '@/activity/core/resource/viewer/myhangulResource'
import { SceneBase } from '@/activity/core/sceneBase'
import config from '@/activity/gameUtil/config'
import { Eop } from '@/activity/scene/eop'
import { HangulCard } from '@/activity/widget/hangulCard'
import { Intro } from '@/activity/scene/intro'
import { MyhangulRecord } from '@/activity/widget/myhangulRecord'
import gsap from 'gsap'
import { getSymbol } from '@/activity/gameUtil/game'
import { AramApp } from '@/AramApp'
import { ResourceManager } from '@/activity/core/resourceManager'

export class MyHangul extends SceneBase {
  private mVideoSprite: PIXI.Sprite
  private mVideoElement: HTMLVideoElement
  private mQuizData: any
  private mQuizStep: number
  private mMyhangulRecord: MyhangulRecord
  private mMyhangulRecordFlag: boolean

  constructor() {
    super(`myhangul`)
  }
  async onInit() {
    await App.Handle.showLoadingScreen()

    // await this.selectDay()
    this.mQuizData = []
    await this.getData()

    await this.loadViewerResource(MyhangulResource)
    if (window['currentVideo']) {
      window['currentVideo'].pause()
      window['currentVideo'] = null
    }
    this.mQuizStep = 0

    await App.Handle.closeLoadingScreen()

    console.log('gamename =>', this.gamename)
  }

  getData(): Promise<void> {
    return new Promise<void>((resolve) => {
      const requestUrl = `${config.restAPI}data/myhangul_data.json`
      const request = new XMLHttpRequest()
      request.open('GET', requestUrl)
      request.responseType = 'json'
      request.send()
      request.onloadend = () => {
        this.mQuizData = request.response['data'][`${config.studyDay}`]
        resolve()
      }
    })
  }

  async onStart() {
    this.mMyhangulRecordFlag = false
    /**인트로 화면 */
    const intro = new Intro()
    this.addChild(intro)
    await intro.playIntro()
    /**인트로 화면 나타나거나 사라지는 모션 */

    this.removeChildren()

    App.Handle.modalRoot.visible = false

    /**video setting */
    await this.settingVideo()
    /**video event */
    this.mVideoElement.addEventListener('timeupdate', async () => {
      const current = Math.floor(this.mVideoElement.currentTime)
      if (current >= this.mQuizData['timer'][this.mQuizStep]) {
        if (this.mMyhangulRecordFlag == true) {
          return
        }
        this.mMyhangulRecordFlag = true
        await this.startMyhangulRecord()
        this.mMyhangulRecordFlag = false
        this.mQuizStep += 1
        if (this.mQuizStep > this.mQuizData['timer'].length) {
          console.log(`퀴즈 끝, 동영상 시청`)
        }
        //
      }
    })
    this.setCard()
  }
  settingVideo(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mVideoSprite = new PIXI.Sprite()
      this.addChild(this.mVideoSprite)

      this.mVideoElement = document.createElement('video')
      this.mVideoElement.setAttribute('playsinline', '')
      this.mVideoElement.setAttribute('autoplay', '')
      const url = `${config.restAPI}product/myhangul/video/${config.studyDay}_mh.mp4`
      this.mVideoElement.src = url
      this.mVideoElement.crossOrigin = ''
      this.mVideoElement.autoplay = true

      if (window['currentVideo']) {
        window['currentVideo'].pause()
        window['currentVideo'] = null
      }
      window['currentVideo'] = this.mVideoElement

      const cb = async () => {
        if (document.hidden == false) {
          /**화면 보일때 */
          await App.Handle.modalRoot.resetModal()
          window['currentVideo'].play()
        } else {
          window['currentVideo'].pause()
        }
      }
      document.removeEventListener('visibilitychange', cb)
      document.addEventListener('visibilitychange', cb)

      this.mVideoSprite.texture = PIXI.Texture.from(this.mVideoElement)
      this.mVideoSprite.width = config.w
      this.mVideoSprite.height = config.h

      window['currentVideo'].onended = () => {
        this.onEnded()
      }

      window['currentVideo'].oncanplay = () => {
        window['currentVideo'].pause()
        window['currentVideo'].currentTime = 0
        window['currentVideo'].oncanplay = null
        resolve()
      }
    })
  }
  setCard() {
    let sound = ResourceManager.Handle.getCommonResource(`ac1_playpop.mp3`)
      .sound
    sound.play()
    sound = null

    let card = new HangulCard(getSymbol(), 0x000000, {
      fontSize: 180,
      fontWeight: 'bold',
      fontFamily: 'TmoneyRoundWindExtraBold'
    })
    card.changeTint(true)
    this.addChild(card)

    // card.startMotion( 0 , config.h/2 ,2);
    card.onClick = () => {
      this.removeChild(card)
      card = null
      window['currentVideo'].play()
      window['currentVideo'].volume = 1
      App.Handle.modalRoot.visible = true
    }
  }

  async startMyhangulRecord() {
    App.Handle.modalRoot.visible = false
    this.mVideoElement.pause()

    await this.recordBefore()

    this.mMyhangulRecord = new MyhangulRecord(
      this.mQuizStep,
      this.mQuizData['text'][this.mQuizStep]
    )
    this.addChild(this.mMyhangulRecord)

    await this.mMyhangulRecord.readyRecord()
    const pop = ResourceManager.Handle.getViewerResource(`ac5_pop.mp3`).sound
    pop.play()
    gsap.delayedCall(pop.duration, async () => {
      this.mMyhangulRecord.startRec()
      await this.mMyhangulRecord.setRecord()
      await this.mMyhangulRecord.playRecord()

      const endSnd = ResourceManager.Handle.getViewerResource(`ac5_end.mp3`)
        .sound
      endSnd.play()

      gsap
        .to(this.mMyhangulRecord, { alpha: 0, duration: 0.25 })
        .eventCallback('onComplete', () => {
          this.mMyhangulRecord.removeChildren()
          this.mMyhangulRecord.destroy()
          this.mMyhangulRecord = null
          this.removeChild(this.mMyhangulRecord)

          this.mVideoElement.play()

          App.Handle.modalRoot.visible = true

          gsap.delayedCall(3, () => {
            if (this.mVideoElement.paused == true) {
              this.mVideoElement.play()
            }
          })
        })
    })
  }

  recordBefore(): Promise<void> {
    return new Promise<void>((resolve) => {
      let sound = ResourceManager.Handle.getViewerResource(`ac5_script_1-1.mp3`)
        .sound
      sound.play()
      gsap.delayedCall(sound.duration, () => {
        sound = null
        resolve()
      })
    })
  }

  async onEnded() {
    if (window['recorder']) {
      window['recorder'].destroy()
      window['recorder'] = null
    }
    if (window['record']) {
      window['record'] = null
    }
    this.mVideoElement.pause()
    this.mVideoElement = null
    if (window['currentVideo']) {
      if (window['currentVideo'].paused == false) {
        window['currentVideo'].pause()
      }
      window['currentVideo'] = null
    }
    // this.mMyhangulRecord.destroy()
    this.mMyhangulRecord = null

    const EOP = new Eop()
    this.addChild(EOP)
    await EOP.eopPlay()
    gsap
      .to(this, { y: config.h, duration: 0.5 })
      .eventCallback(`onComplete`, () => {
        this.children.forEach((element) => {
          element = null
        })
        location.href = config.reload
      })
  }
}
