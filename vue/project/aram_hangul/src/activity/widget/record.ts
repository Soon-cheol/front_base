import config from '../gameUtil/config'
import RecordRTC from 'recordrtc'
import * as Tone from 'tone'
import gsap from 'gsap'
import { ResourceManager } from '../core/resourceManager'
import { EventSprite } from './eventSprite'

export class Record extends PIXI.Container {
  /**
   * https://www.npmjs.com/package/recordrtc
   * https://stackoverflow.com/questions/34934862/how-to-replay-an-audio-blob-in-javascript
   * https://recordrtc.org/global.html
   */
  private mRecPlace: PIXI.Container
  private mTonePlayer: Tone.Player
  private mRecordMotion: any
  private mPlayBtn: EventSprite

  // 재생되고 있는 사운드
  private mCurrentRec: HTMLAudioElement
  constructor() {
    super()
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

          const sleep = (m) => new Promise((r) => setTimeout(r, m))

          window['recSpine'].state.setAnimation(0, 'animation', false)
          await sleep(3000)

          await recorder.stopRecording(function() {
            const blob = recorder.getBlob()
            const audioSrc = window.URL.createObjectURL(blob)
            if (window['record']) {
              window['record'].pause()
              window['record'] = null
            }
            window['record'] = new Audio(audioSrc)
            window['record'].volume = 1

            // var file = new File([blob], fileName, {
            //   type: 'video/webm'
            // })

            // xhr('/uploadFile', file, function(responseText) {
            //   console.log(responseText)
            // })

            resolve()
          })
        })
    })
  }

  readyRecord(): Promise<void> {
    return new Promise((resolve) => {
      this.mRecPlace = new PIXI.Container()
      this.addChild(this.mRecPlace)
      this.mRecPlace.position.set(config.w / 2, config.h / 2)

      // this.mRecPlace = new EventSprite(
      //   ResourceManager.Handle.getViewerResource('popup_rec_box.png').texture
      // )
      // this.addChild(this.mRecPlace)
      // this.mRecPlace.position.set(config.w / 2, config.h / 2)

      // this.setText()

      const rec = new EventSprite(
        ResourceManager.Handle.getCommonResource('rec_dim.png').texture
      )
      rec.position.set(0, 120)

      this.mRecPlace.addChild(rec)
      this.mRecPlace.sortableChildren = true
      rec.zIndex = 1

      rec.texture = ResourceManager.Handle.getCommonResource(
        'rec_on.png'
      ).texture
      // this.setRecWave()
      this.removeChild(this.mRecPlace)
      this.mRecPlace = null
      resolve()
    })
  }

  stop(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.mTonePlayer) {
        this.mTonePlayer.stop()
        this.mTonePlayer = null
      }
      if (this.mCurrentRec) {
        this.mCurrentRec.pause()
        this.mCurrentRec = null
      }
      if (this.mRecPlace) {
        this.removeChild(this.mRecPlace)
        this.mRecPlace = null
      }

      if (window['recorder']) {
        window['recorder'].stopRecording(function() {
          if (window['record']) {
            window['record'].pause()
            window['record'] = null
          }
          window['record'] = null
        })

        resolve()
      }
    })
  }

  playRecord(state: string): Promise<void> {
    return new Promise((resolve) => {
      if (this.mRecordMotion) {
        this.mRecordMotion.kill()
        this.mRecordMotion = null
      }
      this.mRecPlace.removeChildren()
      // this.setText()

      // 재생버튼
      this.mPlayBtn = new EventSprite(
        ResourceManager.Handle.getCommonResource('btn_rec_play.png').texture
      )
      this.mPlayBtn.position.set(0, 120)
      this.mPlayBtn.zIndex = 1
      this.mRecPlace.addChild(this.mPlayBtn)
      this.mPlayBtn.scale.set(0.1)
      gsap.to(this.mPlayBtn.scale, { x: 1, y: 1, duration: 0.5, ease: 'back' })

      // 클릭시 재생 후 팝업 사라짐
      this.mPlayBtn.onClick = async () => {
        if (window['record']) {
          await this.playSound(state)
          resolve()
        } else {
          resolve()
        }
      }
    })
  }

  playSound(state: string): Promise<void> {
    return new Promise<void>((resolve) => {
      console.log(state, this.mTonePlayer)

      if (this.mCurrentRec) {
        this.mCurrentRec.pause()
        this.mCurrentRec = null
      }
      if (this.mPlayBtn) {
        this.mPlayBtn.interactive = false
        this.mPlayBtn.texture = ResourceManager.Handle.getCommonResource(
          'play.png'
        ).texture
      }
      // this.setRecWave()

      let playRate = 1
      let duration = 3

      if (state == 'normal') {
        this.mCurrentRec = window['record']
        this.mCurrentRec.playbackRate = 1
        this.mCurrentRec.play()
      }

      if (state == 'fast') {
        duration = 2
        playRate = 1.5

        Tone.Transport.bpm.value = 1
        this.mTonePlayer = new Tone.Player(window['record'].src)
        const pitchShift = new Tone.PitchShift({ pitch: 6 }).toDestination()
        this.mTonePlayer.connect(pitchShift)
        Tone.Transport.start()
        Tone.loaded().then(() => {
          this.mTonePlayer.playbackRate = 1.5
          this.mTonePlayer.start()
        })
      }

      if (state == 'slow') {
        duration = 3.6
        playRate = 0.8

        Tone.Transport.bpm.value = 1
        this.mTonePlayer = new Tone.Player(window['record'].src)
        const pitchShift = new Tone.PitchShift({ pitch: -2 }).toDestination()
        this.mTonePlayer.connect(pitchShift)
        Tone.Transport.start()
        Tone.loaded().then(() => {
          this.mTonePlayer.playbackRate = 0.8
          this.mTonePlayer.start()
        })
      }

      if (state == 'robot') {
        Tone.Transport.bpm.value = 1

        this.mTonePlayer = new Tone.Player(window['record'].src)
        const chorus = new Tone.Chorus({
          wet: 1
        })
          .toDestination()
          .start()
        const chorusChannel = new Tone.Channel({ volume: 6 }).connect(chorus)
        chorusChannel.receive('chorus')

        const cheby = new Tone.Chebyshev(50).toDestination()
        const chebyChannel = new Tone.Channel({ volume: -60 }).connect(cheby)
        chebyChannel.receive('cheby')

        const reverb = new Tone.Reverb(3).toDestination()
        const reverbChannel = new Tone.Channel({ volume: 6 }).connect(reverb)
        reverbChannel.receive('reverb')

        // send the player to all of the channels
        const playerChannel = new Tone.Channel().toDestination()
        playerChannel.send('chorus')
        playerChannel.send('cheby')
        playerChannel.send('reverb')
        this.mTonePlayer.connect(playerChannel)

        const pitchShift = new Tone.PitchShift({ pitch: 2 }).toDestination()
        this.mTonePlayer.connect(pitchShift)

        Tone.Transport.start()
        Tone.loaded().then(() => {
          // player.playbackRate = 1
          this.mTonePlayer.playbackRate = 1.2
          this.mTonePlayer.start()
        })
      }

      console.log(`playbackRate => [${playRate}배속]`)

      // console.log(`음원의 재생길이 => [ ${duration}초 ]`)
      gsap.delayedCall(duration + 1, () => {
        if (this.mTonePlayer) {
          this.mTonePlayer.stop()
          this.mTonePlayer = null
        }
        if (this.mCurrentRec) {
          this.mCurrentRec.pause()
          this.mCurrentRec = null
        }
        window['record'] = null
        resolve()
      })
    })
  }
}
