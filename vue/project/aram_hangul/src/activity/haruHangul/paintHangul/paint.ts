import { ResourceManager } from '@/activity/core/resourceManager'
import { PaintResource } from '@/activity/core/resource/viewer/paintResource'
import * as PaintProduct from '@/activity/core/resource/product/paintProduct'
import { SceneBase } from '@/activity/core/sceneBase'
import { Intro } from '@/activity/scene/intro'
import gsap from 'gsap'
import Config from '@/activity/gameUtil/config'
import Util from '@/activity/gameUtil'
import {
  debugLine,
  getCombinationType,
  getConstantVowel,
  getSound,
  getSyllableType,
  getSymbol,
  shuffleArray,
  syllableToNum
} from '@/activity/gameUtil/game'
import { Eop } from '@/activity/scene/eop'
import { Dimmed } from '@/activity/widget/dimmed'
import { EventSprite } from '@/activity/widget/eventSprite'
import { Affordance } from '@/activity/widget/affordance'
import { App } from '@/activity/core/app'
import config from '@/activity/gameUtil/config'
import { Rectangle } from 'pixi.js'
import { Power0 } from 'gsap/all'

const btnX = [266, 414, 570, 728, 878, 1032]
const btnColor = [
  0xf92121 /**빨강 */,
  0xff8f29 /**주황 */,
  0xffe424 /**황토 */,
  0x23cc23 /**녹색 */,
  0x2da2ea /**파랑 */,
  0x8a4dff /**보라 */
]
const colorName = ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
const quizWord = config.data[Config.studyDay]['word'][0]

let gameData: any
let gameword = ''
let phonemeSnd: PIXI.sound.Sound
let syllableSnd: PIXI.sound.Sound
let startSnd: PIXI.sound.Sound
let correctSnd: PIXI.sound.Sound

let wronrCount = 0

export class ColorBtn extends PIXI.Sprite {
  private mNormal: PIXI.Texture
  private mDown: PIXI.Texture
  private mDisable: PIXI.Texture

  private mClilckFlag: boolean
  private mColorCode: number
  get colorCode(): number {
    return this.mColorCode
  }

  constructor(index: number) {
    super()
    this.mNormal = ResourceManager.Handle.getViewerResource(
      `btn_${colorName[index]}.png`
    ).texture
    this.mDown = ResourceManager.Handle.getViewerResource(
      `btn_${colorName[index]}_pick.png`
    ).texture
    this.mDisable = ResourceManager.Handle.getViewerResource(
      `btn_gray.png`
    ).texture

    this.texture = this.mDisable

    this.mColorCode = btnColor[index]
    this.anchor.set(0.5)

    this.mClilckFlag = false
  }
  activeIntro() {
    this.texture = this.mNormal
    this.interactive = true
    this.buttonMode = true

    this.on('pointerdown', () => {
      this.mClilckFlag = true
      this.texture = this.mDown
    })
      .on('pointerup', () => {
        if (this.mClilckFlag == true) {
          this.disable()
          ;(this.parent as IntroScene).clickColorBtn(this.mColorCode)
        } else {
          this.texture = this.mNormal
        }
      })
      .on('pointerout', () => {
        this.texture = this.mNormal
      })
      .on('pointerupoutside', () => {
        this.texture = this.mNormal
      })
  }

  activeGame() {
    this.texture = this.mNormal
    this.interactive = true
    this.buttonMode = true

    this.on('pointerdown', () => {
      this.mClilckFlag = true
      this.texture = this.mDown
    })
      .on('pointerup', () => {
        console.log(this.mClilckFlag)
        if (this.mClilckFlag == true) {
          this.interactive = false
          this.buttonMode = false

          if ((this.parent as GameScene).selectColor(this.colorCode)) {
            console.log(`correct`)
            ;(this.parent as GameScene).disableBtn()
            this.correct()
          } else {
            console.log(`wrong`)
            this.wrong()
          }
        } else {
          this.texture = this.mNormal
        }
      })
      .on('pointerout', () => {
        this.mClilckFlag = false
        this.texture = this.mNormal
      })
      .on('pointerupoutside', () => {
        this.mClilckFlag = false
        this.texture = this.mNormal
      })
  }

  correct() {
    const correct = ResourceManager.Handle.getViewerResource(`ac3_correct.mp3`)
      .sound
    correct.play()
    gsap.delayedCall(correct.duration, () => {
      ;(this.parent as GameScene).correct()
    })
  }

  wrong() {
    this.disable()
    let wrong = ResourceManager.Handle.getViewerResource(`ac3_wrong.mp3`).sound
    wrong.play()
    wrong = null
    wronrCount += 1
  }

  disable() {
    this.texture = this.mDisable
    this.mClilckFlag = false
    this.interactive = false
    this.buttonMode = false
    this.removeAllListeners()
  }
}

export class Phoneme extends PIXI.Container {
  private mLine: PIXI.Sprite
  private mPhoneme: PIXI.Sprite

  private mSoundNum: number
  private mSound: PIXI.sound.Sound

  private mColorCode: number
  get colorCode(): number {
    return this.mColorCode
  }

  constructor(
    fileType: string,
    phonemeType: number,
    soundNum: number,
    colorCode: number
  ) {
    super()
    this.mColorCode = colorCode
    this.mSoundNum = soundNum

    this.mPhoneme = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(
        `paint_${fileType}t${phonemeType}_${this.mSoundNum}.png`
      ).texture
    )
    this.mPhoneme.anchor.set(0.5)
    this.mLine = new PIXI.Sprite(
      ResourceManager.Handle.getCommonResource(
        `line_${fileType}t${phonemeType}_${this.mSoundNum}.png`
      ).texture
    )
    this.mLine.anchor.set(0.5)
    this.mLine.tint = this.mColorCode

    this.addChild(this.mPhoneme, this.mLine)

    this.mSound = ResourceManager.Handle.getCommonResource(
      `${fileType}${this.mSoundNum}.mp3`
    ).sound
  }

  active() {
    gsap.killTweensOf(this.mLine)
    this.mSound.pause()
    this.mLine.alpha = 1
    gsap.delayedCall(this.mSound.duration, () => {
      this.focus()
      ;(this.parent as GameScene).resetBtn()
      gsap.delayedCall(2, () => {
        this.interactive = true
        this.buttonMode = true
      })
    })
    this.on('pointertap', () => {
      this.focus()
    })
  }

  focus() {
    this.interactive = false
    this.buttonMode = false
    gsap.killTweensOf(this.mLine)
    this.mSound.pause()
    this.mLine.alpha = 1
    gsap
      .to(this.mLine, { alpha: 0, duration: 0.25 })
      .repeat(3)
      .yoyo(true)

    this.mSound.play()
    gsap.delayedCall(this.mSound.duration + 0.5, () => {
      this.interactive = true
      this.buttonMode = true
    })
  }

  correct(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.interactive = false
      this.buttonMode = false
      this.mSound.play()
      this.mPhoneme.alpha = 1
      this.mPhoneme.tint = this.mColorCode
      gsap
        .to(this.mPhoneme, { alpha: 0, duration: 0.25 })
        .repeat(3)
        .yoyo(true)
        .eventCallback('onComplete', () => {
          gsap.delayedCall(1, () => {
            resolve()
          })
        })
    })
  }
}

export class GameScene extends PIXI.Container {
  private mColorBtn: Array<ColorBtn>
  private mQuizAry: Array<Phoneme>
  private mStep: number

  private mOutroCard: EventSprite
  constructor() {
    super()
    const random = Math.ceil(Math.random() * 4)
    const bg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`bg_0${random}.png`).texture
    )
    this.addChild(bg)
  }

  async onStart() {
    await this.createColorBtn()
    await this.createQuizWord()
    await this.createSound()

    this.mQuizAry[this.mStep].active()

    this.resetBtn()
  }

  selectColor(btnCode: number): boolean {
    if (this.mQuizAry[this.mStep].colorCode == btnCode) {
      return true
    } else {
      return false
    }
  }

  private createSound(): Promise<void> {
    return new Promise<void>((resolve) => {
      const num = getSound(quizWord)
      syllableSnd = ResourceManager.Handle.getCommonResource(`word_${num}.mp3`)
        .sound
      syllableSnd.play()
      gsap.delayedCall(syllableSnd.duration, () => {
        resolve()
      })
    })
  }

  createQuizWord() {
    this.mStep = 0
    this.mQuizAry = []

    const colorList = [
      0xf92121 /**빨강 */,
      0xff8f29 /**주황 */,
      0xffe424 /**황토 */,
      0x23cc23 /**녹색 */,
      0x2da2ea /**파랑 */,
      0x8a4dff /**보라 */
    ]
    let randomColor = shuffleArray(colorList)

    let index = 0
    const offsetx = {
      1: [{ x: config.w / 2 }],
      2: [{ x: config.w / 2 - 100 }, { x: config.w / 2 + 100 }],
      3: [
        { x: config.w / 2 - 200 },
        { x: config.w / 2 },
        { x: config.w / 2 + 200 }
      ]
    }
    const xValue = offsetx[quizWord.length]
    for (let i = 0; i < quizWord.length; i++) {
      const syllable = getConstantVowel(quizWord[i])
      const type = getCombinationType(quizWord[i])
      for (let j = 0; j < syllable.length; j++) {
        const num = syllableToNum(syllable[j])
        let phonemeType = ``
        if (j == 0) phonemeType = `1cho_`
        if (j == 1) phonemeType = `2jung_`
        if (j == 2) phonemeType = `3jong_`

        if (randomColor[index] === undefined) {
          index = 0
          randomColor = shuffleArray(colorList)
        }
        const quiz = new Phoneme(phonemeType, type, +num, randomColor[index])
        quiz.position.set(xValue[i]['x'], config.h / 2 - 40)
        this.addChild(quiz)

        this.mQuizAry.push(quiz)
        index += 1
      }
    }
  }

  createColorBtn(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mColorBtn = []
      for (let i = 0; i < 6; i++) {
        const color = new ColorBtn(i)
        color.position.set(btnX[i], 588)
        this.addChild(color)
        this.mColorBtn.push(color)
      }
      resolve()
    })
  }

  async correct() {
    await this.mQuizAry[this.mStep].correct()
    this.mStep += 1
    if (this.mQuizAry[this.mStep] == undefined) {
      this.outroScene()
    } else {
      await this.mQuizAry[this.mStep].active()
    }
  }
  resetBtn() {
    for (const btn of this.mColorBtn) {
      btn.disable()
      btn.activeGame()
    }
  }

  disableBtn() {
    for (const btn of this.mColorBtn) {
      btn.disable()
    }
  }

  async outroScene() {
    await this.createOutroBg()
    await this.playOutro()
  }

  private playOutro(): Promise<void> {
    return new Promise<void>((resolve) => {
      const data = config.data[config.studyDay]['word'][0]
      const symbol = config.data[config.studyDay]['symbol']
      // const data = `꼬끼오`

      // 아웃트로 왼쪽 음소 텍스트
      const phoneme = new PIXI.Text(symbol, {
        padding: 20,
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: 280,
        fill: 0x333333
      })
      phoneme.pivot.set(phoneme.width / 2, phoneme.height / 2)
      phoneme.position.set(-240, 0)
      // ===============================================================

      // 아웃트로 오른쪽아래 단어 텍스트
      const text = new PIXI.Text(data, {
        padding: 20,
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: 80,
        fill: 0x0caa5f
      })
      text.pivot.set(text.width / 2, text.height / 2)
      text.position.set(196, 160)
      // ===============================================================

      // 아웃트로 오른쪽위 단어 이미지
      const wordnum = getSound(config.data[config.studyDay]['word'][0])
      const complete = new PIXI.Sprite(
        ResourceManager.Handle.getCommonResource(`word_${wordnum}.png`).texture
      )
      complete.scale.set(0.7)
      complete.anchor.set(0.5)
      complete.position.set(196, -60)
      // ===============================================================

      this.mOutroCard.addChild(phoneme, complete, text)

      const sndName = syllableToNum(gameData['symbol'])
      const phonemeSnd = ResourceManager.Handle.getCommonResource(
        `${gameData['type']}${sndName}.mp3`
      ).sound

      const wordNum = getSound(gameData['word'])
      const wordSnd = ResourceManager.Handle.getCommonResource(
        `word_${wordNum}.mp3`
      ).sound

      gsap.delayedCall(wordSnd.duration, () => {
        phonemeSnd.play()
      })
      gsap
        .to(phoneme.scale, { x: 0.9, y: 0.9, duration: 0.5 })
        .repeat(3)
        .yoyo(true)
        .eventCallback('onComplete', () => {
          wordSnd.play()
          gsap
            .to(complete.scale, { x: 0.6, y: 0.6, duration: 0.5 })
            .repeat(3)
            .yoyo(true)
          gsap
            .to(text.scale, { x: 0.9, y: 0.9, duration: 0.5 })
            .repeat(3)
            .yoyo(true)
            .eventCallback('onComplete', async () => {
              console.log(
                `%c 오답갯수 [${wronrCount}]`,
                'border:2px red solid;'
              )
              const eop = new Eop()
              this.addChild(eop)
              await eop.eopPlay()
              this.destroy()
              App.Handle.nextGame()
            })
        })
    })
  }

  createOutroBg(): Promise<void> {
    return new Promise<void>((resolve) => {
      App.Handle.modalRoot.visible = false
      const dimmed = new PIXI.Graphics()
      dimmed.beginFill(0x000000, 0.4)
      dimmed.drawRect(0, 0, config.w, config.h)
      dimmed.endFill()
      dimmed.alpha = 0

      this.mOutroCard = new EventSprite(
        ResourceManager.Handle.getViewerResource(`card.png`).texture
      )
      this.mOutroCard.scale.set(0)
      this.mOutroCard.position.set(config.w / 2, config.h / 2)
      this.addChild(dimmed, this.mOutroCard)
      gsap
        .to(dimmed, { alpha: 1, duration: 0.5 })
        .eventCallback('onComplete', () => {
          gsap.to(this.mOutroCard.scale, {
            x: 1,
            y: 1,
            duration: 0.25,
            ease: Power0.easeNone
          })
          resolve()
        })
    })
  }
}

export class IntroScene extends PIXI.Container {
  private mColorBtn: Array<ColorBtn>
  private mPhoneme: PIXI.Sprite
  private mAffordance: Affordance
  constructor() {
    super()
    const random = Math.ceil(Math.random() * 4)
    const bg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`bg_0${random}.png`).texture
    )
    this.addChild(bg)
  }
  async onStart() {
    console.log(`intro`)
    await this.createColorBtn()
    await this.createQuiz()
    await this.introQuizSound()

    for (const color of this.mColorBtn) {
      color.activeIntro()
    }
  }

  introQuizSound(): Promise<void> {
    return new Promise<void>((resolve) => {
      startSnd = ResourceManager.Handle.getViewerResource(`ac3_cardpop.mp3`)
        .sound
      startSnd.play()
      gsap.delayedCall(startSnd.duration, () => {
        const day = config.studyDay
        const type = config.data[day]['type']
        const symbol = config.data[day]['symbol'][0]
        const num = syllableToNum(symbol)

        phonemeSnd = ResourceManager.Handle.getCommonResource(
          `${type}${num}.mp3`
        ).sound
        phonemeSnd.play()
        resolve()
      })
    })
  }

  createQuiz(): Promise<void> {
    return new Promise<void>((resolve) => {
      const day = config.studyDay
      const phonemeType = `paint_${config.data[day]['type']}`
      const symbol = config.data[day]['symbol'][0]
      const type = config.data[day]['symbolType']
      const num = syllableToNum(symbol)

      this.mPhoneme = new PIXI.Sprite(
        ResourceManager.Handle.getCommonResource(
          `${phonemeType}${type}${num}.png`
        ).texture
      )
      this.mPhoneme.tint = 0xbcbcbc
      this.mPhoneme.anchor.set(0.5)
      this.mPhoneme.position.set(config.w / 2, config.h / 2 - 40)

      const debug = new PIXI.Graphics()
      debug.lineStyle(2, 0xbcbcbc, 1)
      debug.drawRect(0, 0, this.mPhoneme.width, this.mPhoneme.height)
      debug.endFill()
      debug.position.set(
        config.w / 2 - debug.width / 2,
        config.h / 2 - debug.height / 2 - 40
      )

      this.addChild(this.mPhoneme, debug)
      this.mPhoneme.alpha = 0
      gsap
        .to(this.mPhoneme, { alpha: 1, duration: 0.5 })
        .eventCallback('onComplete', () => {
          resolve()
        })
    })
  }

  createColorBtn(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mColorBtn = []
      for (let i = 0; i < 6; i++) {
        const color = new ColorBtn(i)
        color.position.set(btnX[i], 588)
        this.addChild(color)
        this.mColorBtn.push(color)
      }
      resolve()
    })
  }

  disableColorBtn() {
    for (const btn of this.mColorBtn) {
      btn.disable()
    }
  }

  clickColorBtn(colorCode: number) {
    this.clickColorBtn = () => null
    correctSnd = ResourceManager.Handle.getViewerResource(`ac3_correct.mp3`)
      .sound
    correctSnd.play()
    gsap.delayedCall(correctSnd.duration, () => {
      this.disableColorBtn()
      this.mPhoneme.alpha = 1
      this.mPhoneme.tint = colorCode
      gsap
        .to(this.mPhoneme, { alpha: 0, duration: 0.25 })
        .repeat(5)
        .yoyo(true)
        .eventCallback('onComplete', () => {
          phonemeSnd.play()
          gsap.delayedCall(phonemeSnd.duration + 1, () => {
            ;(this.parent as Paint).goGameScene()
          })
        })
    })
  }
}

export class Paint extends SceneBase {
  private mGameResource: any
  private mWrongCount: number

  private mIntroScene: IntroScene
  private mGameScene: GameScene

  constructor() {
    super('Paint')
    this.mWrongCount = 0
  }
  async onInit() {
    this.mGameResource = {}

    await App.Handle.showLoadingScreen()

    await this.getFileList()

    await this.loadCommonResource(this.mGameResource)
    await this.loadViewerResource(PaintResource)

    await App.Handle.closeLoadingScreen()
  }

  async onStart() {
    const intro = new Intro()
    this.addChild(intro)
    await intro.playIntro()
    this.removeChild(intro)

    const bgm = ResourceManager.Handle.getViewerResource(`ac3_bgm.mp3`).sound
    bgm.play({ loop: true })
    window['currentBGM'] = bgm
    this.removeChildren()

    this.mIntroScene = new IntroScene()
    this.addChild(this.mIntroScene)
    this.mIntroScene.onStart()
  }

  goGameScene() {
    if (this.mIntroScene) this.mIntroScene.destroy()
    this.removeChildren()
    this.mGameScene = new GameScene()
    this.addChild(this.mGameScene)
    this.mGameScene.onStart()
  }

  private getFileList(): Promise<void> {
    return new Promise<void>((resolve) => {
      const day = config.studyDay

      gameData = config.data[day]

      gameword = config.data[day]['word']

      const wordnum = getSound(config.data[day]['word'][0])

      let index = 0

      const images = [`word_${wordnum}.png`]
      const soundList = [`word_${wordnum}.mp3`]

      for (let i = 0; i < gameword[0].length; i++) {
        const type = getCombinationType(gameword[0][i])
        const phoneme = getConstantVowel(gameword[0][i])
        for (let j = 0; j < phoneme.length; j++) {
          let chojungjong = ``
          let phonemeType = `t${type}_`

          if (j == 0) {
            chojungjong = `1cho_`
          }
          if (j == 1) {
            chojungjong = `2jung_`
          }
          if (j == 2) {
            chojungjong = `3jong_`
            phonemeType = `at_`
          }

          const num = syllableToNum(phoneme[j])

          const fileName = `paint_${chojungjong}${phonemeType}${num}.png`
          const linefileName = `line_${chojungjong}${phonemeType}${num}.png`

          const soundfileName = `${chojungjong}${num}.mp3`

          //------------------------------------------------------------

          let soundflag = true
          for (const file of soundList) {
            if (file == soundfileName) {
              soundflag = false
            }
          }
          if (soundflag == true) {
            soundList.push(soundfileName)
          }
          //------------------------------------------------------------

          //------------------------------------------------------------
          let lineflag = true
          for (const file of images) {
            if (file == linefileName) {
              lineflag = false
            }
          }
          if (lineflag == true) {
            images.push(linefileName)
          }
          //------------------------------------------------------------

          //------------------------------------------------------------
          let flag = true
          for (const file of images) {
            if (file == fileName) {
              flag = false
            }
          }
          if (flag == true) {
            images.push(fileName)
          }
          //------------------------------------------------------------
          index += 1
        }
      }
      this.mGameResource = {
        images: images,
        sounds: soundList,
        json: [],
        videos: [],
        spine: []
      }

      resolve()
    })
  }

  /**게임씬 playOutro 에서 끝*/
}
