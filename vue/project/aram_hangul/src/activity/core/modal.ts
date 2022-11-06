import * as PIXI from 'pixi.js'
import PIXISound from 'pixi-sound'
import gsap from 'gsap'
import { Dimmed } from '../widget/dimmed'
import config from '../gameUtil/config'
import { App } from './app'
import { ResourceManager } from './resourceManager'

export class HowTo extends PIXI.Container {
  private mText: PIXI.Text
  constructor() {
    super()
    this.mText = new PIXI.Text(``, {
      fontSize: 100,
      fill: 0xff0000
    })
    this.addChild(this.mText)
  }

  active() {
    this.mText.text = App.Handle.getSceneName() + `  How To`
  }

  disable(flag: boolean) {
    if (flag == false) {
      this.active()
    }
    this.visible = !flag
  }
}
export class MenuBtn extends PIXI.Container {
  private mNormal: PIXI.Texture
  private mClicked: PIXI.Texture

  private mClickFlag: boolean
  get clickFlag(): boolean {
    return this.mClickFlag
  }
  set clickFlag(v: boolean) {
    this.mClickFlag = v
  }

  private mMenuBtn: PIXI.Sprite
  get menuBtn(): PIXI.Sprite {
    return this.mMenuBtn
  }
  private mHowToBtn: PIXI.Sprite
  private mExitBtn: PIXI.Sprite
  constructor() {
    super()

    this.mClickFlag = false

    this.mNormal = ResourceManager.Handle.getCommonResource(
      `btn_menu.png`
    ).texture
    this.mClicked = ResourceManager.Handle.getCommonResource(
      `btn_menu_dim.png`
    ).texture

    this.mMenuBtn = new PIXI.Sprite(this.mNormal)

    this.mHowToBtn = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`btn_howto.png`).texture
    )
    this.mExitBtn = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`btn_exit.png`).texture
    )

    this.addChild(this.mMenuBtn, this.mHowToBtn, this.mExitBtn)

    this.sortableChildren = true

    this.mMenuBtn.zIndex = 3
    this.mHowToBtn.zIndex = 2
    this.mExitBtn.zIndex = 1

    this.mHowToBtn.visible = false
    this.mExitBtn.visible = false

    this.registerEvent()
  }

  private registerEvent() {
    this.mMenuBtn.interactive = true
    this.mMenuBtn.buttonMode = true
    this.mMenuBtn.on('pointertap', async () => {
      // ;(this.parent as Modal).howToFlag(false)
      // this.mMenuBtn.interactive = false

      // this.createBtn()
      // this.changeImg()
      await this.onClick()

      // this.mClickFlag = !this.mClickFlag
      // this.mMenuBtn.interactive = true
    })

    this.mHowToBtn.buttonMode = true
    this.mHowToBtn.on('pointertap', () => {
      ;(this.parent as Modal).howToFlag(true)
    })

    this.mExitBtn.buttonMode = true
    this.mExitBtn.on('pointertap', () => {
      ;(this.parent as Modal).howToFlag(false)
      console.log(`링크 수정 필요`)
      ResourceManager.Handle.exitLoad()
      location.href = config.reload
    })
  }
  // this.mClickFlag = false => 안누른 상태(팝업이 안뜬 상태)에서 클릭
  // this.mClickFlag = true => 누른 상태(팝업이 떠있는 상태)에서 클릭
  changeImg() {
    if (this.mClickFlag == false) {
      this.mMenuBtn.texture = this.mClicked
    } else {
      this.mMenuBtn.texture = this.mNormal
    }
  }

  createBtn() {
    const delay = 0.25

    if (this.mClickFlag == false) {
      this.mHowToBtn.visible = true
      this.mExitBtn.visible = true

      gsap.to(this.mHowToBtn, { y: 100, duraiton: delay })
      gsap
        .to(this.mExitBtn, { y: 200, duraiton: delay * 2 })
        .eventCallback('onComplete', () => {
          this.mHowToBtn.interactive = true
          this.mExitBtn.interactive = true
        })
    } else {
      this.mHowToBtn.interactive = false
      this.mExitBtn.interactive = false
      gsap.to(this.mHowToBtn, { y: 0, duraiton: delay })
      gsap
        .to(this.mExitBtn, { y: 0, duraiton: delay * 2 })
        .eventCallback('onComplete', () => {
          this.mHowToBtn.visible = false
          this.mExitBtn.visible = false
        })
    }
  }
  onClick() {
    //
  }
}
export class Modal extends PIXI.Container {
  private mHowTo: HowTo
  private mDimmed: Dimmed
  private mShowFlag: boolean
  constructor() {
    super()
  }

  async onInit() {
    this.removeChildren()
    // 메뉴버튼 생성
    const btn = new MenuBtn()
    btn.position.set(20, 10)
    this.addChild(btn)
    /**메뉴버튼 클릭 시 효과 */
    let flag = true
    btn.onClick = async () => {
      if (flag == false) {
        return
      }
      flag = false

      // 홈버튼 이미지 딤드되는 코드
      this.howToFlag(false)

      btn.createBtn()
      btn.changeImg()
      await this.showModal()
      btn.clickFlag = !btn.clickFlag

      flag = true
    }

    const bi = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`bi.png`).texture
    )
    bi.position.set(config.w - 100, 0)
    this.addChild(bi)

    /**메뉴버튼을 누르면 나오는 검은 딤드 */
    this.mDimmed = new Dimmed(config.w, config.h)
    this.mDimmed.alpha = 0
    this.sortableChildren = true
    this.mDimmed.zIndex = -1

    this.mHowTo = new HowTo()
    this.mHowTo.position.set(100, 0)
    this.addChild(this.mHowTo)
    this.mHowTo.zIndex = 2
    this.mHowTo.disable(true)

    /**메뉴버튼이 활성화됐는지에 대한 flag */
    this.mShowFlag = false
  }

  howToFlag(flag: boolean) {
    this.mHowTo.disable(!flag)
  }

  async showModal() {
    this.mShowFlag = !this.mShowFlag
    if (this.mShowFlag) {
      await this.dimmedMotion(true)
      await this.stopAll()
    } else {
      await this.dimmedMotion(false)
      await this.resumeAll()
    }
  }

  async resetModal() {
    this.mShowFlag = false
    await this.dimmedMotion(false)
    await this.resumeAll()
  }

  private stopAll(): Promise<void> {
    return new Promise((resolve) => {
      if (window['recorder']) {
        window['recorder'].pauseRecording()
      }

      PIXISound.pauseAll()

      if (window['gameMotion']) {
        if (window['gameMotion'].length > 0) {
          for (const motion of window['gameMotion']) {
            motion.pause()
          }
        }
      }

      if (window['currentVideo']) {
        if (window['currentVideo'].paused == true) {
          window['videoPause'] = 'pause'
        } else {
          window['videoPause'] = 'play'
        }
        window['currentVideo'].pause()
      }

      resolve()
    })
  }

  private resumeAll(): Promise<void> {
    return new Promise((resolve) => {
      if (window['recorder']) {
        window['recorder'].resumeRecording()
      }
      PIXISound.resumeAll()

      if (window['gameMotion']) {
        if (window['gameMotion'].length > 0) {
          for (const motion of window['gameMotion']) {
            motion.resume()
          }
        }
      }
      if (window['currentVideo']) {
        if (window['videoPause'] == 'pause') {
          return
        }
        window['currentVideo'].play()
      }
      resolve()
    })
  }

  private dimmedMotion(flag: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      if (flag) {
        this.addChild(this.mDimmed)
        gsap
          .to(this.mDimmed, { alpha: 1, duration: 0.25 })
          .eventCallback('onComplete', () => {
            resolve()
          })
      } else {
        gsap
          .to(this.mDimmed, { alpha: 0, duration: 0.5 })
          .eventCallback('onComplete', () => {
            this.removeChild(this.mDimmed)
            resolve()
          })
      }
    })
  }
}
