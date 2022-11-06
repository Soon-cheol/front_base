import { ResourceManager } from '@/activity/core/resourceManager'
import config from '@/activity/gameUtil/config'
import { debugLine, getSound, shuffleArray } from '@/activity/gameUtil/game'
import gsap from 'gsap/all'
import { QuizType } from './QuizType'
import { Total } from './total'

export class SoundBtn extends PIXI.Container {
  private mSoundBtn: PIXI.Sprite
  private mOn: PIXI.Texture
  private mOff: PIXI.Texture

  private mSoundName: string
  private mSound: PIXI.sound.Sound
  constructor(soundName: string) {
    super()
    const num = getSound(soundName)
    this.mSoundName = `word_${num}`

    this.mOn = ResourceManager.Handle.getCommonResource(
      `btn_sound_on.png`
    ).texture
    this.mOff = ResourceManager.Handle.getCommonResource(
      `btn_sound_normal.png`
    ).texture
    this.mSoundBtn = new PIXI.Sprite(this.mOn)
    this.mSoundBtn.anchor.set(0.5)
    this.addChild(this.mSoundBtn)

    this.on('pointertap', async () => {
      console.log(`소리재생`)
      await this.onSound()
    })
  }

  onSound(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.interactive = false
      this.buttonMode = false
      this.mSoundBtn.texture = this.mOn

      this.mSound = ResourceManager.Handle.getCommonResource(
        `${this.mSoundName}.mp3`
      ).sound
      this.mSound.play()

      gsap.delayedCall(1.2, () => {
        this.interactive = true
        this.buttonMode = true
        this.mSoundBtn.texture = this.mOff
        resolve()
      })
    })
  }
}

export class Battery extends PIXI.Container {
  private mBattery: PIXI.Sprite
  private mText: PIXI.Text
  private mImg: PIXI.Sprite

  private mQuiz: string
  private mQuizCorrect: string
  constructor(type: number, quiz: string, correct: string) {
    super()

    this.mQuiz = quiz
    this.mQuizCorrect = correct

    this.mBattery = new PIXI.Sprite()
    this.addChild(this.mBattery)

    if (type == 3) {
      this.mBattery.texture = ResourceManager.Handle.getViewerResource(
        `t3_battery02.png`
      ).texture
      this.createImg(quiz)
    } else {
      this.mBattery.texture = ResourceManager.Handle.getViewerResource(
        `t3_battery01.png`
      ).texture

      this.createText(quiz)
    }

    this.sortableChildren = true
    this.mBattery.zIndex = 3
    if (this.mText) this.mText.zIndex = 4
    if (this.mImg) this.mImg.zIndex = 4

    this.mBattery.on('pointertap', async () => {
      this.mBattery.interactive = false
      if (quiz == correct) {
        await this.correct()
        ;(this.parent as BatteryGroup).deleteWrong()
      } else {
        await this.wrong()
      }
    })

    this.mBattery.tint = 0xbcbcbc
    this.mBattery.anchor.set(0.5)
  }
  active() {
    if (this.mText) {
      this.mText.alpha = 1
    }
    if (this.mImg) {
      this.mImg.alpha = 1
    }
    this.mBattery.interactive = true
    this.mBattery.buttonMode = true
    this.mBattery.tint = 0xffffff
  }
  createText(text: string) {
    this.mText = new PIXI.Text(text, {
      fontSize: 58,
      fontFamily: 'TmoneyRoundWindExtraBold',
      padding: 20
    })
    this.mText.pivot.set(this.mText.width / 2, this.mText.height / 2)
    this.addChild(this.mText)

    this.mText.alpha = 0.5
  }
  createImg(imgName: string) {
    const num = getSound(imgName)
    this.mImg = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`word_${num}.png`).texture
    )
    this.mImg.scale.set(0.35)
    this.mImg.anchor.set(0.5)
    this.addChild(this.mImg)

    this.mImg.alpha = 0.5
  }

  cableMotion(correct: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      const cableAry = []
      let offsetX = 0
      for (let i = 1; i <= 2; i++) {
        const cable = new PIXI.Sprite(
          ResourceManager.Handle.getViewerResource(`t3_cable0${i}.png`).texture
        )
        cable.zIndex = -1
        cable.anchor.set(0.5)
        cable.x = offsetX
        offsetX -= 600
        this.addChild(cable)
        cable.zIndex = 2 - i
        cableAry.push(cable)
      }

      let sound = ResourceManager.Handle.getViewerResource(`ac7_plugin.mp3`)
        .sound
      sound.play()

      const delay = sound.duration - 0.5
      if (correct) {
        // *******************정답 모션*******************
        gsap.to(cableAry[0], { x: -210, duration: delay })
        gsap
          .to(cableAry[1], { x: -380, duration: delay })
          .eventCallback('onComplete', () => {
            gsap.delayedCall(0.5, () => {
              sound = ResourceManager.Handle.getViewerResource(
                'ac7_correct.mp3'
              ).sound
              sound.play()
              ;(this.parent as BatteryGroup).correct()
              sound = null
              resolve()
            })
          })
      } else {
        // *******************오답 모션*******************
        const yValue = [-20, +20]
        const random = shuffleArray([0, 1])
        gsap.to(cableAry[0], {
          x: -210,
          y: yValue[random[0]],
          duration: delay
        })
        gsap
          .to(cableAry[1], {
            x: -380,
            y: yValue[random[1]],
            duration: delay
          })
          .eventCallback('onComplete', () => {
            sound.pause()
            sound = ResourceManager.Handle.getViewerResource(`ac7_wrong.mp3`)
              .sound
            sound.play()
            gsap.delayedCall(0.5, () => {
              for (const cable of cableAry) {
                this.removeChild(cable)
              }
              sound = null
              resolve()
            })
          })
      }
    })
  }

  async correct() {
    console.log(`정답`)
    await this.cableMotion(true)
  }

  async wrong() {
    this.wrong = () => null
    // 오답 갯수 세기
    ;(this.parent.parent as GameScene).wrong()
    // 오답 갯수 세기
    console.log(`오답`)

    await this.cableMotion(false)

    let target = null
    let scaleValue = 0
    if (this.mText) {
      target = this.mText
      scaleValue = 0.8
    }
    if (this.mImg) {
      target = this.mImg
      scaleValue = 0.3
    }

    gsap.to(target, { alpha: 0.5, duration: 0.5 })
    gsap
      .to(target.scale, { x: scaleValue, y: scaleValue, duration: 0.25 })
      .repeat(1)
      .yoyo(true)
      .eventCallback('onComplete', () => {
        this.mBattery.tint = 0xbcbcbc
        gsap
          .to(this, { alpha: 0, duration: 0.5 })
          .eventCallback('onComplete', () => {
            this.visible = false
          })
      })
  }

  deleteWrong() {
    if (this.mQuiz !== this.mQuizCorrect) {
      gsap
        .to(this, { alpha: 0, duration: 0.25 })
        .eventCallback('onComplete', () => {
          this.visible = false
        })
    } else {
      return
    }
  }
}

export class BatteryGroup extends PIXI.Container {
  private mQuizData: any
  private mBatteryAry: Array<Battery>
  private mWrongAry: Array<Battery>
  constructor(data: any) {
    super()

    this.mQuizData = data
    this.mBatteryAry = []
    this.mWrongAry = []

    if (this.mQuizData.type == 3) {
      //소리로 이미지찾기
      this.createImgBattery()
    } else {
      //소리나 이미지로 이미지찾기
      this.createTextBattery()
    }
  }
  active() {
    for (const battery of this.mBatteryAry) {
      battery.active()
    }
  }
  createTextBattery() {
    const correct = this.mQuizData.correct
    const wrong = this.mQuizData.wrong

    const list = shuffleArray([correct, wrong[0], wrong[1]])

    const offsetY = [config.h / 2 - 160, config.h / 2, config.h / 2 + 160]
    for (let i = 0; i < list.length; i++) {
      const battery = new Battery(this.mQuizData.type, list[i], correct)
      battery.y = offsetY[i]
      this.addChild(battery)
      this.mBatteryAry.push(battery)
    }
  }
  createImgBattery() {
    const correct = this.mQuizData.correct
    const wrong = this.mQuizData.wrong

    const list = shuffleArray([correct, wrong[0], wrong[1]])

    const offsetY = [config.h / 2 - 160, config.h / 2, config.h / 2 + 160]
    for (let i = 0; i < list.length; i++) {
      const battery = new Battery(this.mQuizData.type, list[i], correct)
      battery.y = offsetY[i]
      this.addChild(battery)
      this.mBatteryAry.push(battery)
    }
  }

  correct() {
    ;(this.parent as GameScene).next()
  }

  deleteWrong() {
    for (const ex of this.mBatteryAry) {
      ex.deleteWrong()
    }
  }
}

export class Mirror extends PIXI.Container {
  private mData: any

  private mMirror: PIXI.Sprite
  private mImageType: PIXI.Texture
  private mCorrect: PIXI.Texture
  private mSoundType: PIXI.Texture

  private mImgQuiz: PIXI.Sprite
  private mSoundQuiz: SoundBtn
  constructor(data: any) {
    super()
    this.mData = data

    this.mImageType = ResourceManager.Handle.getViewerResource(
      `t3_mirror01.png`
    ).texture
    this.mCorrect = ResourceManager.Handle.getViewerResource(
      `t3_mirror02.png`
    ).texture
    this.mSoundType = ResourceManager.Handle.getViewerResource(
      `t3_mirror03.png`
    ).texture

    this.mMirror = new PIXI.Sprite()

    if (this.mData['type'] == 1) {
      this.mMirror.texture = this.mImageType
      this.createImageType()
    } else {
      this.mMirror.texture = this.mSoundType
      this.createSoundType()
    }
    this.mMirror.anchor.set(0.5)

    this.addChild(this.mMirror)
  }

  correct() {
    this.mMirror.texture = this.mCorrect
  }

  active(): Promise<void> {
    return new Promise<void>((resolve) => {
      let sound = ResourceManager.Handle.getCommonResource('ac1_playpop.mp3')
        .sound
      sound.play()
      if (this.mImgQuiz) {
        this.mImgQuiz.alpha = 1
        sound = null
        resolve()
      }
      if (this.mSoundQuiz) {
        this.mSoundQuiz.onSound()
        gsap.delayedCall(1, () => {
          sound = null
          resolve()
        })
      }
    })
  }

  createImageType() {
    const num = getSound(this.mData.correct)
    this.mImgQuiz = new PIXI.Sprite()
    this.mImgQuiz.texture = ResourceManager.Handle.getCommonResource(
      `word_${num}.png`
    ).texture
    this.mImgQuiz.scale.set(0.8)
    this.mImgQuiz.anchor.set(0.5)
    this.mImgQuiz.alpha = 0.5
    this.mMirror.addChild(this.mImgQuiz)
  }

  createSoundType() {
    this.mSoundQuiz = new SoundBtn(this.mData.correct)
    this.mMirror.addChild(this.mSoundQuiz)
  }
}

export class GameScene extends PIXI.Container {
  private mData: any

  private mMirror: Mirror
  private mBattery: BatteryGroup

  private mGuideSnd: PIXI.sound.Sound

  constructor(data: any) {
    super()
    this.mData = data
  }
  async onInit() {
    const bg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`t3_bg.png`).texture
    )

    this.addChild(bg)

    this.createGuideText()

    this.mMirror = new Mirror(this.mData)
    this.mMirror.position.set(config.w * (1 / 4), config.h / 2)
    this.addChild(this.mMirror)

    this.mBattery = new BatteryGroup(this.mData)
    this.mBattery.position.set(config.w * (3 / 4), 0)
    this.addChild(this.mBattery)

    if (this.mData[`type`] == 1) {
      this.createTextQuizCard()
    }
    if (this.mData[`type`] == 2) {
      this.createSoundTextQuiz()
    }
    if (this.mData[`type`] == 3) {
      this.createSoundImageQuiz()
    }

    this.sortableChildren = true
    this.mMirror.zIndex = 2
    this.mBattery.zIndex = 1
  }

  async activeQuiz() {
    await this.mMirror.active()
    this.mBattery.active()
  }

  createGuideText(): Promise<void> {
    return new Promise<void>((resolve) => {
      const text = new PIXI.Text(`그림에 알맞은 답을 찾아 선택해봐!`, {
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: 34
      })
      text.pivot.set(text.width / 2, text.height / 2)
      text.position.set(config.w / 2, 40)
      this.addChild(text)

      text.interactive = true
      text.buttonMode = true
      text.on('pointertap', () => {
        // 안내 사운드
        if (this.mGuideSnd) {
          this.mGuideSnd.pause()
          this.mGuideSnd = null
        }
        this.mGuideSnd = ResourceManager.Handle.getViewerResource(
          `${this.mData['sound']}`
        ).sound
        this.mGuideSnd.play()
      })
      resolve()
    })
  }

  // 이미지를 보고 텍스트 선택 type1
  async createTextQuizCard() {
    //
  }

  // 소리 듣고 텍스트 선택 type2
  createSoundTextQuiz() {
    //
  }

  // 소리 듣고 이미지 선택 type3
  createSoundImageQuiz() {
    //
  }

  next() {
    this.mMirror.correct()
    gsap.delayedCall(1, () => {
      ;(this.parent as Type3).next()
    })
  }

  async createImgQuizCard() {
    //
  }

  wrong() {
    ;(this.parent as Type3).wrong()
  }
}

export class Type3 extends QuizType {
  private mData: any
  private mResourceList: Array<string>
  //type3 안의 게임 순서
  private mCurrentStep: number

  private mType3GameScene: Array<GameScene>

  constructor(quizData: any) {
    super()
    this.mData = quizData
    this.mCurrentStep = 0
  }

  async onInit() {
    console.log(this.mData)
    await this.getData()
    await ResourceManager.Handle.loadCommonResource({
      sounds: this.mResourceList
    })
    this.removeChild()

    await this.createQuiz()
  }
  private getData(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mResourceList = []

      const step = ['step1', 'step2', 'step3', 'step4']
      const length = Object.keys(this.mData).length
      for (let i = 0; i < length; i++) {
        const text = this.mData[step[i]].correct
        const num = getSound(text)
        const file = `word_${num}.mp3`

        let flag = true
        for (const list of this.mResourceList) {
          if (list == file) {
            flag = false
          }
        }

        if (flag == true) this.mResourceList.push(file)
      }

      console.warn(this.mResourceList)
      resolve()
    })
  }
  async createQuiz() {
    this.mType3GameScene = []

    const totalStep = Object.keys(this.mData).length
    for (let i = 1; i <= totalStep; i++) {
      this.mType3GameScene.push(new GameScene(this.mData[`step${i}`]))
    }

    this.addChild(this.mType3GameScene[this.mCurrentStep])
    await this.mType3GameScene[this.mCurrentStep].onInit()

    // 안내 사운드
    const scriptSnd = ResourceManager.Handle.getViewerResource(
      `${this.mData['step1']['sound']}`
    ).sound
    scriptSnd.play()

    gsap.delayedCall(scriptSnd.duration + 0.5, () => {
      this.mType3GameScene[this.mCurrentStep].activeQuiz()
    })
  }

  async next() {
    const total = Object.keys(this.mData).length
    this.mCurrentStep += 1
    if (this.mCurrentStep >= total) {
      ;(this.parent.parent as Total).nextType()
      console.log(`currentStep=>${this.mCurrentStep}`)
      console.log(`total=>${total}`)
    } else {
      ;(this.parent.parent as Total).nextStep()
      this.removeChildren()
      this.addChild(this.mType3GameScene[this.mCurrentStep])
      await this.mType3GameScene[this.mCurrentStep].onInit()
      await this.mType3GameScene[this.mCurrentStep].activeQuiz()
    }
  }

  wrong() {
    ;(this.parent.parent as Total).wrongCount1 += 1
  }
}
