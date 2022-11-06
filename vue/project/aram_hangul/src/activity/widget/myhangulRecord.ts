import config from '../gameUtil/config'
import { Dimmed } from './dimmed'
import RecordRTC from 'recordrtc'
import gsap, { Power0 } from 'gsap'
import { ResourceManager } from '../core/resourceManager'
import { EventSprite } from './eventSprite'
import { getSymbol } from '../gameUtil/game'

export class MyhangulRecord extends PIXI.Container {
  /**
   * https://www.npmjs.com/package/recordrtc
   * https://stackoverflow.com/questions/34934862/how-to-replay-an-audio-blob-in-javascript
   * https://recordrtc.org/global.html
   */
  private mQuizStep: number
  private mQuizText: string

  private mRecPlace: EventSprite
  private mRecImg: EventSprite
  private mRecWave: EventSprite
  private mRecWaveMask: PIXI.Graphics
  private mRecordMotion: any

  constructor(quizStep: number, text: string) {
    super()

    this.mQuizStep = quizStep
    this.mQuizText = text

    const dimmed = new Dimmed(config.w, config.h)
    dimmed.alpha = 0
    this.addChild(dimmed)
    gsap.to(dimmed, { alpha: 1, duration: 0.5 })
  }

  startRec() {
    this.mRecImg.texture = ResourceManager.Handle.getViewerResource(
      'rec_on.png'
    ).texture
    this.mRecordMotion.play()
  }

  readyRecord(): Promise<void> {
    return new Promise((resolve) => {
      window['recMotion'] = new PIXI.spine.Spine(
        ResourceManager.Handle.getCommonResource('timer_3sec.json').spineData
      )

      this.mRecPlace = new EventSprite(
        ResourceManager.Handle.getViewerResource('popup_rec_box.png').texture
      )
      this.addChild(this.mRecPlace)
      this.mRecPlace.position.set(config.w / 2, config.h / 2)

      this.setText()

      this.mRecImg = new EventSprite(
        ResourceManager.Handle.getViewerResource('rec_dim.png').texture
      )
      window['recMotion'].position.set(0, 120)
      this.mRecImg.position.set(0, 120)

      this.mRecPlace.addChild(this.mRecImg, window['recMotion'])
      this.mRecPlace.sortableChildren = true
      this.mRecImg.zIndex = 1
      window['recMotion'].zIndex = 2
      window['recMotion'].alpha = 0
      window['recMotion'].startWave = () => {
        this.mRecWave.tint = 0xf92121
      }
      window['recMotion'].stopWave = () => {
        this.mRecWave.tint = 0xbcbcbc
      }

      this.setRecWave()
      resolve()
    })
  }

  async setRecord(): Promise<void> {
    return new Promise((resolve) => {
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: { echoCancellation: true }
        })
        .then(async function(stream) {
          const recorder = RecordRTC(stream, {
            type: 'audio/webm',
            mimeType: 'audio/webm'
          })
          window['recorder'] = recorder
          recorder.startRecording()

          window['recMotion'].alpha = 1
          window['recMotion'].state.setAnimation(0, 'animation', false)
          window['recMotion'].startWave()

          const sleep = (m) => new Promise((r) => setTimeout(r, m))
          await sleep(3000)

          recorder.stopRecording(function() {
            const blob = recorder.getBlob()
            const audioSrc = window.URL.createObjectURL(blob)
            const audio = new Audio(audioSrc)
            audio.volume = 1
            window['record'] = audio
            window['recMotion'].alpha = 0
            window['recMotion'].stopWave()
            resolve()
          })
        })
    })
  }

  setRecWave() {
    if (this.mRecordMotion) {
      this.mRecordMotion.kill()
      this.mRecordMotion = null
    }

    if (this.mRecWaveMask) {
      this.mRecPlace.removeChild(this.mRecWaveMask, this.mRecWave)
      this.mRecWaveMask = null
      this.mRecWave = null
    }

    this.mRecWaveMask = new PIXI.Graphics()
    this.mRecWaveMask.beginFill(0xff0000, 1)
    this.mRecWaveMask.drawRect(0, 0, 545, 65)
    this.mRecWaveMask.endFill()
    this.mRecWaveMask.pivot.set(
      this.mRecWaveMask.width / 2,
      this.mRecWaveMask.height / 2
    )
    this.mRecWaveMask.position.set(0, 120)

    this.mRecWave = new EventSprite(
      ResourceManager.Handle.getViewerResource('sound_wave.png').texture
    )
    this.mRecWave.position.set(this.mRecWave.width / 2 - 565 / 2, 120)
    this.mRecWave.mask = this.mRecWaveMask
    this.mRecWave.tint = 0xbcbcbc

    this.mRecPlace.addChild(this.mRecWaveMask, this.mRecWave)

    // 파동 모션
    this.mRecordMotion = gsap.timeline({ repeat: -1 })
    this.mRecordMotion.to(this.mRecWave, {
      x: -this.mRecWave.width / 2 + 565,
      duration: 20,
      ease: Power0.easeNone
    })
    this.mRecordMotion.pause()
  }

  setText() {
    const text = new PIXI.Text(this.mQuizText, {
      fontSize: 120,
      fill: 0x000000,
      fontFamily: 'TmoneyRoundWindExtraBold'
    })
    text.pivot.set(text.width / 2, text.height / 2)
    text.position.set(0, -66)
    this.mRecPlace.addChild(text)
  }

  playRecord(): Promise<void> {
    return new Promise((resolve) => {
      if (this.mRecordMotion) {
        this.mRecordMotion.kill()
        this.mRecordMotion = null
      }
      // this.mRecPlace.removeChildren()
      // this.setText()

      // 재생버튼
      this.mRecImg.texture = ResourceManager.Handle.getViewerResource(
        'btn_rec_play.png'
      ).texture
      this.mRecImg.position.set(0, 120)
      this.mRecImg.zIndex = 1
      this.mRecImg.scale.set(0.1)
      gsap.to(this.mRecImg.scale, { x: 1, y: 1, duration: 0.5, ease: 'back' })

      // const btn = new EventSprite(
      //   ResourceManager.Handle.getViewerResource('btn_rec_play.png').texture
      // )
      // btn.position.set(0, 120)
      // btn.zIndex = 1
      // this.mRecPlace.addChild(btn)
      // btn.scale.set(0.1)
      // gsap.to(btn.scale, { x: 1, y: 1, duration: 0.5, ease: 'back' })

      // 클릭시 재생 후 팝업 사라짐
      this.mRecImg.onClick = () => {
        this.mRecImg.onClick = () => null
        if (window['record']) {
          this.mRecImg.texture = ResourceManager.Handle.getCommonResource(
            'play.png'
          ).texture

          window['recMotion'].alpha = 1
          window['recMotion'].state.setAnimation(0, 'animation', false)

          this.setRecWave()
          this.mRecordMotion.play()
          window['recMotion'].startWave()

          window['record'].volume = 1
          window['record'].play()

          gsap.delayedCall(3.5, () => {
            window['recMotion'].stopWave()
            this.mRecPlace.removeChildren()
            window['record'] = null
            window['recMotion'] = null
            resolve()
          })
        } else {
          resolve()
        }
      }
    })
  }
}
