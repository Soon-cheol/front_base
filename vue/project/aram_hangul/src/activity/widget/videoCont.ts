import gsap from 'gsap'
import Config from '@/activity/gameUtil/config'
import { isMobilePlatform } from '@/activity/gameUtil/platform'
import { ResourceManager } from '@/activity/core/resourceManager'

export class Cursor extends PIXI.Sprite {
  private mUnLock: PIXI.Texture
  private mLock: PIXI.Texture

  constructor(texture: string, lockTexture?: string) {
    super()
    this.mUnLock = ResourceManager.Handle.getCommonResource(texture).texture
    if (lockTexture) {
      this.mLock = ResourceManager.Handle.getCommonResource(lockTexture).texture
    }

    this.texture = this.mUnLock
    this.anchor.set(0.5)

    this.interactive = true
    this.buttonMode = true
  }

  lock() {
    this.texture = this.mLock
    gsap.to(this, { angle: 0, duration: 0.5 })
  }

  unLock() {
    if (this.mUnLock) {
      this.texture = this.mUnLock
    }
  }
}

// export class ToggleBtn extends PIXI.Sprite {
//   private mNormalTexture: PIXI.Texture
//   private mToggleTexture: PIXI.Texture
//   private mNormalDownTexture: PIXI.Texture
//   private mToggleDownTexture: PIXI.Texture

//   private mToggle: boolean

//   private minButton: boolean

//   constructor(
//     texture: string,
//     downTexture: string,
//     toggleTexture?: string,
//     downToggleTexture?: string
//   ) {
//     super()

//     this.mToggle = false
//     this.minButton = false

//     this.mNormalTexture = ResourceManager.Handle.getCommonResource(
//       texture
//     ).texture
//     this.mNormalDownTexture = ResourceManager.Handle.getCommonResource(
//       downTexture
//     ).texture

//     this.texture = this.mNormalTexture

//     this.interactive = true
//     this.buttonMode = true

//     if (toggleTexture) {
//       // 이미지가 바뀔 때
//       this.mToggleTexture = ResourceManager.Handle.getCommonResource(
//         toggleTexture
//       ).texture
//       this.mToggleDownTexture = ResourceManager.Handle.getCommonResource(
//         downToggleTexture
//       ).texture
//       this.on('pointerdown', () => {
//         this.toggleImg()
//       })
//       this.on('pointerup', () => {
//         this.toggleEvent()
//       })
//       this.on('pointerout', () => {
//         this.minButton = false
//       })
//     } else {
//       // 이미지가 안 바뀔 때
//       this.on('pointerdown', () => {
//         this.texture = this.mNormalDownTexture
//       })
//       this.on('pointerup', () => {
//         this.texture = this.mNormalTexture
//       })
//       this.on('pointertap', () => {
//         this.onEvent()
//       })
//     }

//     this.anchor.set(0.5)
//   }

//   toggleImg() {
//     this.minButton = true
//     if (this.texture == this.mNormalTexture) {
//       // 일반 일때
//       this.texture = this.mNormalDownTexture
//     } else if (this.texture == this.mToggleTexture) {
//       // 토글 일때
//       this.texture = this.mToggleDownTexture
//     }
//   }

//   toggleEvent() {
//     if (this.minButton == false) {
//       return
//     }
//     if (!this.mToggle) {
//       // 일반에서 토글로 바뀔때
//       this.texture = this.mToggleTexture
//       this.onEvent()
//     } else {
//       // 토글에서 일반으로 바뀔때
//       this.texture = this.mNormalTexture
//       this.offEvent()
//     }
//     this.mToggle = !this.mToggle
//   }

//   changeTexture(flag) {
//     this.mToggle = flag
//     // this.texture = this.mToggleTexture;
//     this.texture = this.mNormalTexture
//   }

//   onEvent() {
//     /** */
//   }
//   offEvent() {
//     /** */
//   }
// }

// export class VolumeBar extends PIXI.Container {
//   private mBG: PIXI.Sprite
//   private mUnLockBG: PIXI.Texture
//   private mLockBG: PIXI.Texture

//   private mSpeaker: PIXI.Sprite
//   private mSpeakerUnLockBG: PIXI.Texture
//   private mSpeakerLockBG: PIXI.Texture

//   private mVolCursor: Cursor
//   private mVolFlag: boolean

//   constructor(texture: string, lockTexture: string) {
//     super()

//     this.mSpeakerUnLockBG = ResourceManager.Handle.getCommonResource(
//       `speaker_normal.png`
//     ).texture
//     this.mSpeakerLockBG = ResourceManager.Handle.getCommonResource(
//       `speaker_lock.png`
//     ).texture
//     this.mSpeaker = new PIXI.Sprite()
//     this.mSpeaker.texture = this.mSpeakerUnLockBG
//     this.mSpeaker.anchor.set(0.5)
//     this.mSpeaker.interactive = true
//     this.mSpeaker.buttonMode = true
//     this.mSpeaker.on('pointertap', () => {
//       if (window[`currentVideo`].volume == 0) {
//         this.notMute()
//       } else {
//         this.mute()
//       }
//     })
//     //  , `speaker_normal.png`,`speaker_lock.png`,`speaker_lock.png` )

//     this.mVolCursor = new Cursor(`vol_cursor_normal.png`, `vol_cursor_lock.png`)
//     this.mVolFlag = false

//     // 음소거 했을 때 바탕배경 그림
//     this.mLockBG = ResourceManager.Handle.getCommonResource(lockTexture).texture
//     this.mUnLockBG = ResourceManager.Handle.getCommonResource(texture).texture
//     this.mBG = new PIXI.Sprite(this.mUnLockBG)

//     this.addChild(this.mBG, this.mSpeaker)
//     this.mBG.addChild(this.mVolCursor)

//     this.mVolCursor.x = this.mBG.width / 2
//     this.mBG.x = this.mSpeaker.width / 2
//     this.mBG.interactive = true
//     this.mBG.buttonMode = true

//     // this.mSpeaker.onEvent=()=>{   this.mute();  }
//     // this.mSpeaker.offEvent=()=>{  this.notMute(); }

//     this.registerCusor()
//   }
//   registerCusor() {
//     this.mBG.on('pointerdown', () => {
//       this.mVolFlag = true
//     })
//     this.mBG.on('pointermove', (evt: PIXI.InteractionEvent) => {
//       this.setVolume(evt)
//     })
//     this.mBG.on('pointerup', (evt: PIXI.InteractionEvent) => {
//       this.volumeUp(evt)
//     })
//     this.mBG.on('pointerout', () => {
//       this.mVolFlag = false
//     })
//   }

//   setVolume(evt: PIXI.InteractionEvent) {
//     if (!this.mVolFlag) {
//       return
//     }
//     let localX = this.mBG.toLocal(evt.data.global).x

//     if (localX >= this.mBG.width) {
//       localX = this.mBG.width
//     }

//     if (localX <= 10) {
//       localX = 0
//       this.mute()
//     } else {
//       this.notMute()
//     }

//     this.mVolCursor.x = localX
//     let volume = (localX / this.mBG.width).toString().slice(0, 3)
//     if (+volume <= 0) {
//       volume = `0`
//     }

//     ;(this.parent.parent as VideoControl).currentVol = +volume
//     window[`currentVideo`].volume = +volume
//   }
//   volumeUp(evt: PIXI.InteractionEvent) {
//     this.setVolume(evt)
//     this.mVolFlag = false
//     //
//   }

//   mute() {
//     this.mSpeaker.texture = this.mSpeakerLockBG
//     gsap.to(this.mSpeaker.scale, { x: 0.8, y: 0.8, duration: 0.5 })
//     window[`currentVideo`].volume = 0
//     this.mBG.texture = this.mLockBG
//     this.mVolCursor.x = 0
//   }

//   notMute() {
//     this.mSpeaker.texture = this.mSpeakerUnLockBG
//     gsap.to(this.mSpeaker.scale, { x: 1, y: 1, duration: 0.5 })
//     if (window[`currentVideo`].volume == 0) {
//       window[`currentVideo`].volume = 0.5
//     }
//     this.mBG.texture = this.mUnLockBG
//     this.mVolCursor.x = window[`currentVideo`].volume * this.mBG.width
//   }
// }

export class VideoDuration extends PIXI.Container {
  private mTotal: PIXI.Text
  private mCurrent: PIXI.Text
  private mMinute: string
  private mSecond: string

  get minute(): string {
    return this.mMinute
  }
  set minute(v: string) {
    this.mMinute = v
    this.updateCurrentTime()
  }

  get second(): string {
    return this.mSecond
  }
  set second(v: string) {
    this.mSecond = v
    this.updateCurrentTime()
  }

  constructor() {
    super()

    let totalMinute = Math.floor(
      window['currentVideo'].duration / 60
    ).toString()
    let totalSecond = Math.floor(
      window['currentVideo'].duration % 60
    ).toString()
    if (totalMinute.length == 1) {
      totalMinute = `0` + totalMinute
    }
    if (totalSecond.length == 1) {
      totalSecond = `0` + totalSecond
    }
    this.mTotal = new PIXI.Text(totalMinute + `:` + totalSecond, {
      fill: 0x979192,
      fontSize: 24
    })
    this.mTotal.x = 100

    const wall = new PIXI.Text(`|`, {
      fill: 0xffffff,
      fontSize: 24
    })

    this.mCurrent = new PIXI.Text(`00:00`, {
      fill: 0xffffff,
      fontSize: 24
    })

    this.addChild(this.mCurrent, wall, this.mTotal)
    wall.x = this.width / 2 - wall.width / 2
  }

  updateCurrentTime() {
    if (this.mSecond === undefined) {
      return
    }
    if (this.mMinute.length == 1) {
      this.mMinute = `0` + this.mMinute
    }
    if (this.mSecond.length == 1) {
      this.mSecond = `0` + this.mSecond
    }
    this.mCurrent.text = this.mMinute + `:` + this.mSecond
  }
}

export class VideoControl extends PIXI.Container {
  private mDimmed: PIXI.Graphics

  private mPlayerRedBG: PIXI.Sprite
  private mPlayerWhiteBG: PIXI.Sprite
  private mPlayerBgMask: PIXI.Graphics

  private mVideo: HTMLVideoElement
  private mPlayer: PIXI.Sprite

  private mPlayBtn: PIXI.Sprite
  private mPlay: PIXI.Texture
  private mStop: PIXI.Texture

  // private mStopBtn: ToggleBtn

  private mPlayerBarContainer: PIXI.Container

  private mCursor: Cursor

  private mCursorFlag: boolean
  private mPlayerFlag: boolean

  private mBackUpX: number
  private mCursorX: number
  get cursorX(): number {
    return this.mCursorX
  }
  set cursorX(v: number) {
    this.mCursorX = v

    if (this.mCursor) {
      this.mPlayerBgMask.clear()
      this.mPlayerBgMask.beginFill(0xff0000, 1)

      if (this.mCursorFlag) {
        this.mCursor.x = this.mCursorX
        // 동영상 재생시 커서 위치
        this.mPlayerBgMask.drawRect(
          0,
          -10,
          this.mCursor.x,
          this.mPlayerWhiteBG.height + 20
        )
      } else {
        // 커서 클릭으로 인한 위치 변경 및 동영상 재생위치 변경
        this.mVideo.currentTime =
          (this.mCursorX / this.mPlayerWhiteBG.width) * this.mVideo.duration
        this.mPlayerBgMask.drawRect(
          0,
          -10,
          this.mCursor.x,
          this.mPlayerWhiteBG.height + 20
        )
      }

      this.mPlayerBgMask.endFill()
    }
  }

  // private mVolBar: VolumeBar
  private mCurrentVol: number
  // get currentVol(): number {
  //   return this.mCurrentVol
  // }
  // set currentVol(v: number) {
  //   this.mCurrentVol = v
  //   this.mVideo.volume = this.mCurrentVol
  // }

  private mVideoDuration: VideoDuration
  private mDelayTimer: any

  private console: PIXI.Text

  constructor(video: HTMLVideoElement) {
    super()

    this.mDimmed = new PIXI.Graphics()
    this.mDimmed.beginFill(0x000000, 1)
    this.mDimmed.drawRect(0, 0, Config.w, Config.h)
    this.mDimmed.endFill()
    this.mDimmed.alpha = 0
    this.addChild(this.mDimmed)

    this.mDimmed.on('pointertap', () => {
      this.showORhide()
    })

    this.mCursorFlag = true
    this.mBackUpX = 0

    this.mVideo = video
    if (window['currentVideo']) {
      window['currentVideo'].pause()
      window['currentVideo'] = null
    }
    window['currentVideo'] = this.mVideo

    // this.mCurrentVol = 1
    // this.mVideo.volume = this.mCurrentVol

    this.mPlayerFlag = false

    this.createController()
  }

  /**
   * 컨트롤러 UI 생성 코드
   * 아래 바
   */
  createController() {
    // 플레이어바 생성
    this.mPlayer = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`video_bar.png`).texture
    )
    this.mPlayer.interactive = true
    this.mPlayer.buttonMode = true
    this.mPlayer.visible = false
    this.mPlayer.position.set(0, Config.h - this.mPlayer.height)
    this.addChild(this.mPlayer)

    this.mPlayer.on('pointerup', () => {
      this.delayHide()
    })

    // =================================================================================
    // 동영상바 생성
    this.mPlayerRedBG = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`video_current.png`).texture
    )
    this.mPlayerRedBG.position.set(
      10,
      this.mPlayer.height / 2 - this.mPlayerRedBG.height / 2
    )
    this.mPlayerWhiteBG = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`video_bg.png`).texture
    )
    this.mPlayerWhiteBG.position.set(this.mPlayerRedBG.x, this.mPlayerRedBG.y)

    this.mPlayerBgMask = new PIXI.Graphics()
    this.mPlayerBgMask.beginFill(0xff0000, 1)
    this.mPlayerBgMask.drawRect(0, -10, 0, this.mPlayerWhiteBG.height + 20)
    this.mPlayerBgMask.endFill()
    this.mPlayerBgMask.position.set(this.mPlayerRedBG.x, this.mPlayerRedBG.y)
    this.mPlayerRedBG.mask = this.mPlayerBgMask
    this.mCursor = new Cursor(`cursor.png`)
    this.mCursor.y = this.mPlayer.height / 2

    // =================================================================================
    // 재생 스탑 버튼
    const playNpause = new PIXI.Container()
    playNpause.position.set(40, this.mPlayer.height / 2)

    this.mPlay = ResourceManager.Handle.getCommonResource(
      'play_button.png'
    ).texture
    this.mStop = ResourceManager.Handle.getCommonResource(
      'stop_button.png'
    ).texture
    this.mPlayBtn = new PIXI.Sprite()
    this.mPlayBtn.visible = false
    this.mPlayBtn.texture = this.mStop

    this.mPlayBtn.anchor.set(0.5)
    this.mPlayBtn.position.set(Config.w / 2, Config.h / 2)
    this.addChild(this.mPlayBtn)
    this.mPlayBtn.interactive = true
    this.mPlayBtn.buttonMode = true

    // 클릭하면 컨트롤러 보이거나 사라지거나
    this.mPlayBtn.on('pointertap', () => {
      this.controllerState(window['currentVideo'].paused)
    })

    this.mPlayerBarContainer = new PIXI.Container()
    this.mPlayerBarContainer.addChild(
      this.mPlayerWhiteBG,
      this.mPlayerRedBG,
      this.mPlayerBgMask,
      this.mCursor
    )
    this.eventClickSlider()
    this.mPlayer.addChild(this.mPlayerBarContainer)

    // 동영상 길이 텍스트
    this.mVideoDuration = new VideoDuration()
    this.mPlayer.addChild(this.mVideoDuration)
    this.mVideoDuration.position.set(20, this.mPlayer.height / 2 + 40)

    this.mPlayerBarContainer.position.set(this.mVideoDuration.width + 50, 50)

    this.console = new PIXI.Text(`${this.mVideo.volume}`, {
      fill: 0xff0000,
      fontSize: 20
    })
    this.addChild(this.console)
  }

  controllerState(state: boolean) {
    if (state == true) {
      window['currentVideo'].play()
      this.mPlayBtn.texture = this.mStop
    } else {
      window['currentVideo'].pause()
      this.mPlayBtn.texture = this.mPlay
    }
  }

  destroyed() {
    console.log(`destroy`)
    if (window['currentVideo']) {
      window['currentVideo'].pause()
      window['currentVideo'] = null
    }
    this.interactive = false
    this.mDimmed.interactive = false
    this.mPlayer.interactive = false
    this.mPlayerBarContainer.interactive = false
  }
  //  컨트롤러 3초후 자동 들어가기
  delayHide() {
    //
    if (this.mDelayTimer) {
      this.mDelayTimer.kill()
      this.mDelayTimer = undefined
    }

    this.mDelayTimer = gsap.globalTimeline
    this.mDelayTimer = gsap.delayedCall(3, () => {
      this.hideControl()
    })

    for (let i = 1; i < 4; i++) {
      let delay = gsap.delayedCall(i, () => {
        if (this.mCursorFlag == false || this.mPlayerFlag == false) {
          if (this.mDelayTimer) {
            this.mDelayTimer.kill()
          }
          this.mDelayTimer = undefined
          delay.kill()
          delay = undefined
          console.log(`%c Delay Cancel`, 'color: green;font-weight: bold;')
        } else {
          console.log(4 - i)
        }
      })
    }
  }

  // 컨트롤러 보이거나 사라지는 코드
  private showORhide() {
    if (this.mCursorFlag == false) {
      return
    }

    this.mDimmed.interactive = false
    gsap.to(this.mDimmed, { alpha: 0.7, duration: 0.25 })
    this.mPlayerFlag = !this.mPlayerFlag

    if (this.mPlayerFlag) {
      this.mPlayBtn.visible = true
      gsap.to(this.mPlayBtn, { alpha: 1, duration: 0.25 })
      this.mPlayer.visible = true
      gsap.to(this.mPlayer, {
        alpha: 1,
        duration: 0.25
      })
    } else {
      this.hideControl()
    }
    gsap.delayedCall(0.5, () => {
      this.mDimmed.interactive = true
      this.delayHide()
    })
  }

  private hideControl() {
    this.mPlayerFlag = false

    gsap.to(this.mDimmed, { alpha: 0, duration: 0.25 })
    gsap.to(this.mPlayBtn, { alpha: 0, duration: 0.25 })
    gsap
      .to(this.mPlayer, { alpha: 0, duration: 0.25 })
      .eventCallback('onComplete', () => {
        this.mPlayBtn.visible = false
        this.mPlayer.visible = false
      })
  }

  // 동영상 시간업데이트 코드
  setCursorX() {
    this.mVideo.addEventListener('timeupdate', () => {
      this.console.text = `${this.mVideo.volume}`

      if (this.mCursorFlag == false) {
        return
      }
      this.cursorX =
        (this.mVideo.currentTime / this.mVideo.duration) *
          this.mPlayerWhiteBG.width +
        this.mCursor.width / 2
      // ( this.mVideo.currentTime / this.mVideo.duration ) = (this.cursorX / this.mPlayerWhiteBG.width);
      this.mVideoDuration.minute = Math.floor(
        this.mVideo.currentTime / 60
      ).toString()
      this.mVideoDuration.second = Math.floor(
        this.mVideo.currentTime % 60
      ).toString()
    })
  }

  // 슬라이더 클릭시 이벤트
  eventClickSlider() {
    this.mPlayerBarContainer.interactive = true
    this.mPlayerBarContainer.buttonMode = true
    console.log(` 모바일 입니까? %c ${isMobilePlatform()}`, 'color:green;')

    if (isMobilePlatform()) {
      // MOBILE일 때
      this.mPlayerBarContainer
        .on('touchstart', () => {
          this.guageDown()
        })
        .on('touchmove', (evt: PIXI.InteractionEvent) => {
          this.guageMove(evt)
        })
        .on('touchend', (evt: PIXI.InteractionEvent) => {
          this.guageUp(evt)
        })
        .on('touchendoutside', () => {
          this.guageUp()
        })
        .on('touchcancel', () => {
          this.guageUp()
        })
    } else {
      // PC일 때
      this.mPlayerBarContainer
        .on('pointerdown', () => {
          this.guageDown()
        })
        .on('pointermove', (evt: PIXI.InteractionEvent) => {
          this.guageMove(evt)
        })
        .on('pointerup', (evt: PIXI.InteractionEvent) => {
          this.guageUp(evt)
        })
        .on('pointerout', () => {
          this.guageUp()
        })
    }

    // const debug = new PIXI.Graphics();
    // debug.beginFill(0xFF0000,0.4)
    // debug.drawRect(0,0,this.mPlayerBarContainer.width,this.mPlayerBarContainer.width)
    // debug.endFill();
    // this.mPlayerBarContainer.addChild(debug)
  }

  guageDown() {
    this.mCursorFlag = false
    this.mVideo.pause()
  }

  guageMove(evt: PIXI.InteractionEvent) {
    if (this.mCursorFlag == true) {
      return
    }

    const localX = this.mPlayerWhiteBG.toLocal(evt.data.global).x

    this.moveCursor(`move`, localX)
  }

  guageUp(evt?: PIXI.InteractionEvent) {
    if (this.mCursorFlag == true) {
      return
    }
    if (evt === undefined) {
      this.moveCursor(`up`, this.mBackUpX)
    } else {
      const localX = this.mPlayerWhiteBG.toLocal(evt.data.global).x
      this.moveCursor(`up`, localX)
    }
    this.mCursorFlag = true
    this.mVideo.play()
  }

  // 커서 클릭시 커서위치 이동 코드
  moveCursor(mode: string, x: number): Promise<void> {
    return new Promise<void>((resolve) => {
      // 동영상 처음 부분
      if (x <= 10) {
        x = 10
        if (mode == `up`) {
          this.cursorX = x
        }
        if (mode == `move`) {
          this.mCursor.x = x
        }
      }
      // 동영상 끝 부분
      else if (x >= this.mPlayerWhiteBG.width) {
        x = this.mPlayerWhiteBG.width - 50
        if (mode == `up`) {
          this.cursorX = x
        }
        if (mode == `move`) {
          this.mCursor.x = x
        }
      }
      // 동영상 클릭한 부분
      else {
        if (mode == `up`) {
          this.cursorX = x
        }
        if (mode == `move`) {
          this.cursorX = x
          this.mCursor.x = x
        }
      }
      this.mBackUpX = x
      resolve()
    })
  }

  // 동영상 재생 코드
  playControl() {
    this.mDimmed.interactive = true
    this.mDimmed.buttonMode = true
    // this.mVideo.play()
    this.setCursorX()
  }
}
