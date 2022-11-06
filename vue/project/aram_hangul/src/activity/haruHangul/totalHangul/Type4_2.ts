import { ResourceManager } from '@/activity/core/resourceManager'
import config from '@/activity/gameUtil/config'
import {
  getConstantVowel,
  getCombinationType,
  getSound,
  soundPlay,
  syllableToNum,
  shuffleArray,
  getColorByPoint,
  getSyllableType,
  debugLine
} from '@/activity/gameUtil/game'
import { Affordance } from '@/activity/widget/affordance'
import { EventSprite } from '@/activity/widget/eventSprite'
import gsap, { Power0, shuffle } from 'gsap/all'
import { QuizType } from './QuizType'
import { Total } from './total'

export class SoundBtn extends PIXI.Container {
  private mSoundBtn: PIXI.Sprite
  private mOn: PIXI.Texture
  private mOff: PIXI.Texture

  private mSound: string
  constructor(soundName: string) {
    super()
    const num = getSound(soundName)
    this.mSound = `word_${num}`

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

      soundPlay(this.mSound, true)

      gsap.delayedCall(1.2, () => {
        this.interactive = true
        this.buttonMode = true
        this.mSoundBtn.texture = this.mOff
        resolve()
      })
    })
  }
}

export class SideBarSliced extends PIXI.Container {
  private mBg: PIXI.Sprite
  private mTextSprite: PIXI.Sprite

  private mType: number
  private mSyllableIndex: number
  private mQuiz: string

  private mTotalStep: number
  set step(v: number) {
    this.mTotalStep = v
  }
  get step(): number {
    return this.mTotalStep
  }
  private mId: number
  get index(): number {
    return this.mId
  }

  constructor(id: number, type: number, syllableIndex: number, quiz: string) {
    super()
    const quizSyllableAry = getConstantVowel(quiz)
    this.mQuiz = getSyllableType(quizSyllableAry[id])
    this.mType = type
    this.mSyllableIndex = syllableIndex
    this.mId = id
    /**bg = pink조각사진 */
    this.mBg = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(
        `side_type${type}_pink${syllableIndex + 1}.png`
      ).texture
    )
    const num = syllableToNum(quizSyllableAry[syllableIndex])

    this.mTextSprite = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(
        `${this.mQuiz}t${type}_${num}.png`
      ).texture
    )
    this.mBg.position.set(this.width / 2, this.height / 2)
    this.addChild(this.mBg)

    this.mTextSprite.tint = 0x000000
    this.mTextSprite.anchor.set(0.5)
    this.mTextSprite.position.set(
      this.mTextSprite.width / 2,
      this.mTextSprite.height / 2
    )
    this.addChild(this.mTextSprite)

    this.pivot.set(this.width / 2, this.height / 2)

    this.interactive = true
    this.buttonMode = true

    this.on('pointerup', (evt: PIXI.InteractionEvent) => {
      const clickColor = getColorByPoint(
        this.mBg,
        new PIXI.Point(evt.data.global.x, evt.data.global.y)
      ).a
      if (clickColor != 0) {
        this.onClick()
      }
    })
  }
  onClick() {
    /** */
  }

  active() {
    this.interactive = true
    this.buttonMode = true
    this.mBg.texture = ResourceManager.Handle.getCommonResource(
      `side_type${this.mType}_pink${this.mSyllableIndex + 1}.png`
    ).texture
    this.mTextSprite.alpha = 1
  }

  disable() {
    this.interactive = false
    this.buttonMode = false
    this.mBg.texture = ResourceManager.Handle.getCommonResource(
      `side_type${this.mType}_dim${this.mSyllableIndex + 1}.png`
    ).texture
    this.mTextSprite.alpha = 0.5
  }

  end() {
    this.visible = false
  }
}

export class SideBar extends PIXI.Sprite {
  private mQuizWord: string
  private mSlicedAry: Array<SideBarSliced>

  private mSlicedContainer: PIXI.Container
  constructor(quiz: string) {
    super()
    this.mSlicedContainer = new PIXI.Container()
    this.addChild(this.mSlicedContainer)

    this.mSlicedAry = []
    this.mQuizWord = quiz
    this.texture = ResourceManager.Handle.getViewerResource(
      't4_bar1.png'
    ).texture

    this.createSlicedSide()
  }

  async createSlicedSide() {
    console.log(this.mQuizWord)

    let totalStep = 0
    for (let i = 0; i < this.mQuizWord.length; i++) {
      const syllableAry = getConstantVowel(this.mQuizWord[i])
      console.log(syllableAry)

      for (let j = 0; j < syllableAry.length; j++) {
        const type = getCombinationType(this.mQuizWord[i])
        const syllableIndex = j

        const sliced = new SideBarSliced(
          j,
          type,
          syllableIndex,
          this.mQuizWord[i]
        )

        sliced.x += config.position[`type${type}`][syllableIndex].x
        sliced.y += config.position[`type${type}`][syllableIndex].y

        this.mSlicedAry.push(sliced)
        sliced.step = totalStep
        totalStep += 1

        sliced.disable()

        sliced.onClick = () => {
          if (sliced.step == (this.parent as GameScene).step) {
            sliced.onClick = () => null
            console.log(`정답!!`)
            const snd = ResourceManager.Handle.getViewerResource(
              `ac7_correct.mp3`
            ).sound
            snd.play()
            gsap.delayedCall(snd.duration, () => {
              sliced.end()
              ;(this.parent as GameScene).next()
            })
          } else {
            console.log(`오답!!`)
            const snd = ResourceManager.Handle.getViewerResource(
              `ac7_wrong.mp3`
            ).sound
            snd.play()
            gsap.delayedCall(snd.duration, () => {
              //
            })
          }
          console.log(sliced.step)
        }
      }
    }

    const shuffle = shuffleArray(this.mSlicedAry)
    let offsetX = 160
    for (let i = 0; i < shuffle.length; i++) {
      shuffle[i].x += offsetX
      shuffle[i].y += this.height / 2 + 30
      offsetX += 300
      this.mSlicedContainer.addChild(shuffle[i])
    }

    this.mSlicedContainer.pivot.set(
      this.mSlicedContainer.width / 2,
      this.mSlicedContainer.height / 2
    )
    this.mSlicedContainer.position.set(this.width / 2, this.height / 2)
  }

  active() {
    for (const sliced of this.mSlicedAry) {
      sliced.active()
    }
  }
}

export class TextSprite extends PIXI.Sprite {
  private mBlinkMotion: any
  constructor(texture: string) {
    super()
    console.log(texture)
    this.texture = ResourceManager.Handle.getCommonResource(texture).texture
    this.tint = 0x000000
  }
  blink(flag: boolean) {
    if (this.mBlinkMotion) {
      this.mBlinkMotion.kill()
      this.mBlinkMotion = null
    }
    if (flag == false) {
      this.blink = () => null
      return
    }
    this.mBlinkMotion = gsap.timeline({})
    this.mBlinkMotion.to(this, { alpha: 0, duration: 0.25 })
    this.mBlinkMotion.to(this, { tint: 0xffffff, duration: 0 })
    this.mBlinkMotion.to(this, { alpha: 1, duration: 0.25 })
    this.mBlinkMotion.to(this, { alpha: 0, duration: 0.25 })
    this.mBlinkMotion.to(this, { tint: 0x000000, duration: 0 })
    this.mBlinkMotion.to(this, { alpha: 1, duration: 0.25 })
    this.mBlinkMotion.eventCallback('onComplete', () => {
      gsap.delayedCall(3, () => {
        this.blink(true)
      })
    })
  }
}

export class SlicedSyllable extends PIXI.Container {
  private mInfo: Array<string>
  private mType: number

  private mBg: PIXI.Sprite

  private mDimmed: EventSprite

  private mGameStep: number
  get totalStep(): number {
    return Object.keys(this.mInfo).length
  }

  private mFocusMotion: any

  private mDeepAry: Array<PIXI.Sprite>
  private mFocusAry: Array<PIXI.Sprite>
  private mDefaultAry: Array<PIXI.Sprite>
  private mPinkAry: Array<PIXI.Sprite>
  private mTextAry: Array<TextSprite>

  private mCorrect: TextSprite
  get correct(): TextSprite {
    return this.mCorrect
  }

  constructor(info: Array<string>, type: number) {
    super()
    this.mGameStep = -1

    console.log(info)
    this.mInfo = info
    this.mType = type
    this.mBg = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource('box_shadow.png').texture
    )
    this.addChild(this.mBg)

    this.mFocusAry = []
    this.mDeepAry = []
    this.mDefaultAry = []
    this.mPinkAry = []
    this.mTextAry = []
    this.createElement()
    this.createText()
    this.pivot.set(this.width / 2, this.height / 2)
  }

  createElement() {
    this.mDimmed = new EventSprite(
      ResourceManager.Handle.getCommonResource(`box_shadow.png`).texture
    )
    this.mDimmed.tint = 0xbcbcbc
    this.mDimmed.alpha = 0.5
    this.mDimmed.onClick = () => {
      console.log(`사운드 비활성화`)
    }
    // this.mDimmed.tint = 0x000000

    this.sortableChildren = true
    for (let i = 0; i < Object.keys(this.mInfo).length; i++) {
      const deep = new PIXI.Sprite(
        ResourceManager.Handle.getCommonResource(
          `type${this.mType}_${i + 1}deep.png`
        ).texture
      )
      const defaultSliced = new PIXI.Sprite(
        ResourceManager.Handle.getCommonResource(
          `type${this.mType}_${i + 1}default.png`
        ).texture
      )
      const pink = new PIXI.Sprite(
        ResourceManager.Handle.getCommonResource(
          `type${this.mType}_${i + 1}pink.png`
        ).texture
      )
      const focus = new PIXI.Sprite(
        ResourceManager.Handle.getCommonResource(
          `type${this.mType}_focus${i + 1}.png`
        ).texture
      )

      defaultSliced.zIndex = 0
      deep.zIndex = 1
      pink.zIndex = 2
      focus.zIndex = 3
      this.mDimmed.zIndex = 4
      // focus.tint = 0x71b7db

      deep.alpha = 0
      pink.alpha = 0
      focus.alpha = 0

      this.mDefaultAry.push(defaultSliced)
      this.mDeepAry.push(deep)
      this.mPinkAry.push(pink)
      this.mFocusAry.push(focus)
      this.addChild(deep, defaultSliced, pink, focus, this.mDimmed)
    }
  }

  // 글 및 사운드 생성
  createText() {
    for (let i = 0; i < Object.keys(this.mInfo).length; i++) {
      let text = null
      if (i == 0) {
        text = new TextSprite(
          `1cho_t${this.mType}_${syllableToNum(this.mInfo[i])}.png`
        )
      }
      if (i == 1) {
        text = new TextSprite(
          `2jung_t${this.mType}_${syllableToNum(this.mInfo[i])}.png`
        )
      }
      if (i == 2) {
        text = new TextSprite(`3jong_at_${syllableToNum(this.mInfo[i])}.png`)
      }
      this.addChild(text)
      text.tint = 0x000000
      text.zIndex = 4
      text.alpha = 0
      this.mTextAry.push(text)
    }
  }

  focus() {
    if (this.mGameStep >= 0) this.completeFocus()
    this.mGameStep += 1
    this.removeChild(this.mDimmed)
    this.mDimmed = null
    if (this.mFocusMotion) {
      this.mFocusMotion.kill()
      this.mFocusMotion = null
    }
    if (!this.mFocusAry[this.mGameStep]) {
      return
    }
    this.mFocusMotion = gsap.timeline({ repeat: -1, yoyo: true })
    this.mFocusMotion.to(this.mFocusAry[this.mGameStep], {
      alpha: 1,
      duration: 0.8,
      ease: Power0.easeNone
    })

    if (this.mFocusAry[this.mGameStep]) {
      this.mDeepAry[this.mGameStep].alpha = 1
    }
  }

  completeFocus() {
    console.log(this.mGameStep)
    if (this.mFocusMotion) {
      this.mFocusMotion.kill()
      this.mFocusMotion = null
    }

    this.mFocusAry[this.mGameStep].alpha = 0
    gsap.to(this.mDeepAry[this.mGameStep], { alpha: 1, duration: 1 })
    gsap.to(this.mTextAry[this.mGameStep], { alpha: 1, duration: 1 })
    gsap.to(this.mPinkAry[this.mGameStep], { alpha: 1, duration: 1 })
  }

  complete() {
    for (const deep of this.mDeepAry) {
      deep.alpha = 1
    }
    for (const text of this.mTextAry) {
      text.alpha = 1
    }
    for (const pink of this.mPinkAry) {
      pink.alpha = 1
    }
  }
}

export class QuizPlace extends PIXI.Container {
  private mData: any
  private mSoundBtn: SoundBtn

  private mSlicedSyllable: Array<SlicedSyllable>
  private mQuizContainer: PIXI.Container
  private mEqual: PIXI.Sprite

  private mSyllableStep: number

  private mCurrectStep: number
  get step(): number {
    return this.mCurrectStep
  }
  set step(v: number) {
    this.mSlicedSyllable[this.mSyllableStep].focus()
    this.mCurrectStep = v
  }

  constructor(data: any) {
    super()
    this.mCurrectStep = 0
    this.mSlicedSyllable = []
    this.mQuizContainer = new PIXI.Container()
    this.mData = data
    this.mSoundBtn = new SoundBtn(this.mData.correct)
    this.mSoundBtn.position.set(100, 240)
    this.addChild(this.mSoundBtn)

    this.createImg()
    this.decideType()
    this.createText()

    this.mSyllableStep = 0

    this.mSlicedSyllable[this.mSyllableStep].focus()
  }

  createImg() {
    const type = getSound(this.mData.correct)

    const dimmed = new PIXI.Graphics()
    dimmed.beginFill(0x000000, 0.1)
    dimmed.drawRoundedRect(0, 0, 288, 232, 20)
    dimmed.endFill()
    dimmed.pivot.set(dimmed.width / 2, dimmed.height / 2)
    dimmed.position.set(300, 220)
    this.addChild(dimmed)

    const white = new PIXI.Graphics()
    white.beginFill(0xffffff, 1)
    white.drawRoundedRect(0, 0, dimmed.width - 8, dimmed.height - 8, 20)
    white.endFill()
    white.position.set(4, 4)

    const img = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(`word_${type}.png`).texture
    )
    img.anchor.set(0.5)
    img.scale.set(0.5)
    img.position.set(dimmed.width / 2, dimmed.height / 2)

    dimmed.addChild(white, img)

    this.mEqual = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`t4_equal.png`).texture
    )
    this.mEqual.anchor.set(0.5)
    this.mEqual.position.set(dimmed.x + dimmed.width / 2 + 60, 220)
    this.addChild(this.mEqual)
  }

  /**타입 결정하는 함수 */
  decideType() {
    for (let i = 0; i < this.mData.correct.length; i++) {
      console.log(
        `%c ${this.mData.correct[i]}의 타입은 "${getCombinationType(
          this.mData.correct[i]
        )}"입니다.`,
        'border:2px red solid;letter-spacing:-0.1rem;font-weight:bold;'
      )
    }
  }

  /**글 만드는 함수 */
  createText() {
    /*
     * ex -> 꼬끼오
     * slicedAray1 ['ㄲ','ㅗ']
     * slicedAray2 ['ㄲ','ㅣ']
     * slicedAray3 ['ㅇ','ㅗ']
     */
    let slicedAray1 = []
    let slicedAray2 = []
    let slicedAray3 = []

    let step1 = 0
    let step2 = 0
    let step3 = 0

    let bodyCount = 0
    for (let i = 0; i < this.mData.correct.length; i++) {
      const word = this.mData.correct[i]
      for (let j = 0; j < word.length; j++) {
        if (word.length == 1) {
          step1 = getCombinationType(word[j])
          slicedAray1 = getConstantVowel(word[j])
        }
        if (word.length == 2) {
          step2 = getCombinationType(word[j])
          slicedAray2 = getConstantVowel(word[j])
        }
        if (word.length == 3) {
          step3 = getCombinationType(word[j])
          slicedAray3 = getConstantVowel(word[j])
        }
        bodyCount = word.length
      }
    }

    const slicedAray = [slicedAray1, slicedAray2, slicedAray3]
    const typeAray = [step1, step2, step3]

    let offsetX = 280 / 2

    for (let i = 0; i < bodyCount; i++) {
      const sliced = new SlicedSyllable(slicedAray[i], typeAray[i])
      this.mQuizContainer.addChild(sliced)
      sliced.position.set(offsetX, 280 / 2)
      offsetX += sliced.width + 20
      this.mSlicedSyllable.push(sliced)
    }
    this.addChild(this.mQuizContainer)
    this.mQuizContainer.pivot.set(
      this.mQuizContainer.width / 2,
      this.mQuizContainer.height / 2
    )
    this.mQuizContainer.position.set(
      this.mEqual.x + this.mEqual.width + this.mQuizContainer.width / 2,
      220
    )
  }

  async active() {
    await this.mSoundBtn.onSound()
  }

  complete() {
    for (const all of this.mSlicedSyllable) {
      all.complete()
    }
  }
}

export class GameScene extends PIXI.Container {
  private mData: any
  private mSideBar: SideBar
  private mQuizPlace: QuizPlace

  // 하나의 타입 안의 총 게임스텝
  private mTotalStep: number

  // 하나의 타입 안의 게임스텝
  private mStep: number
  get step(): number {
    return this.mStep
  }
  set step(v: number) {
    this.mStep = v
  }

  private mGuideSnd: PIXI.sound.Sound

  constructor(data: any) {
    super()
    this.mData = data
  }
  async onInit() {
    this.mStep = 0
    this.mTotalStep = 0
    console.log(this.mData)
    this.removeChildren()

    const bg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`t4_bg.png`).texture
    )
    this.addChild(bg)

    this.createGuideText()

    const totalAry = []
    for (const a of this.mData.correct) {
      const syllables = getConstantVowel(a)
      for (const sy of syllables) {
        totalAry.push(sy)
      }
    }
    this.mTotalStep = totalAry.length
    // this.mData
    this.mSideBar = new SideBar(this.mData.correct)
    this.mSideBar.y = config.h
    this.addChild(this.mSideBar)
    gsap.to(this.mSideBar, {
      y: config.h - this.mSideBar.height,
      duration: 0.5
    })

    this.mQuizPlace = new QuizPlace(this.mData)
    this.addChild(this.mQuizPlace)
  }

  createGuideText(): Promise<void> {
    return new Promise<void>((resolve) => {
      const text = new PIXI.Text(`순서대로 낱말을 완성해봐!`, {
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

  async activeQuiz() {
    await this.mQuizPlace.active()
    this.mSideBar.active()
  }

  next() {
    this.mStep += 1
    console.log(`게임씬의 현재 스텝 ${this.mStep}//${this.mTotalStep}`)
    if (this.mStep >= this.mTotalStep) {
      this.mQuizPlace.complete()
      console.error(`다음 타입으로`)
      ;(this.parent as Type4).next()
    } else {
      this.mQuizPlace.step = this.mStep
    }
  }
}

export class Type4 extends QuizType {
  private mData: any
  //type4 안의 게임 순서
  private mCurrentStep: number

  private mType4GameScene: Array<GameScene>

  constructor(quizData: any) {
    super()
    this.mData = quizData
    this.mCurrentStep = 0
  }

  async onInit() {
    console.log(this.mData)
    this.removeChild()

    await this.createQuiz()
  }

  async createQuiz() {
    this.mType4GameScene = []

    const totalStep = Object.keys(this.mData).length
    for (let i = 1; i <= totalStep; i++) {
      this.mType4GameScene.push(new GameScene(this.mData[`step${i}`]))
    }

    this.addChild(this.mType4GameScene[this.mCurrentStep])
    await this.mType4GameScene[this.mCurrentStep].onInit()

    // 안내 사운드
    const scriptSnd = ResourceManager.Handle.getViewerResource(
      `${this.mData['step1']['sound']}`
    ).sound
    scriptSnd.play()

    gsap.delayedCall(scriptSnd.duration + 1, () => {
      this.mType4GameScene[this.mCurrentStep].activeQuiz()
    })
  }

  async next() {
    const total = Object.keys(this.mData).length
    this.mCurrentStep += 1
    if (this.mCurrentStep >= total) {
      ;(this.parent.parent as Total).nextType()
      console.log(`currentStep=>${this.mCurrentStep}`)
      console.log(`total=>${total}`)
      console.log(`끝`)
    } else {
      ;(this.parent.parent as Total).nextStep()
      this.removeChildren()
      this.addChild(this.mType4GameScene[this.mCurrentStep])
      await this.mType4GameScene[this.mCurrentStep].onInit()
      await this.mType4GameScene[this.mCurrentStep].activeQuiz()
    }
  }
}
