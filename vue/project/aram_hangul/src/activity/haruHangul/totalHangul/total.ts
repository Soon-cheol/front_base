import { ResourceManager } from '@/activity/core/resourceManager'
import { TotalResource } from '@/activity/core/resource/viewer/totalResource'
import * as TotalProduct from '@/activity/core/resource/product/totalProduct'
import { SceneBase } from '@/activity/core/sceneBase'
import config from '@/activity/gameUtil/config'
import { Intro } from '@/activity/scene/intro'
import { Type1 } from './Type1'
import { Type2 } from './Type2'
import { Type3 } from './Type3'
import { Type4 } from './Type4'
import { QuizType } from './QuizType'
import gsap from 'gsap/all'
import { App } from '@/activity/core/app'
import {
  getCombinationType,
  getConstantVowel,
  getSound,
  getSyllableType,
  syllableToNum
} from '@/activity/gameUtil/game'
import { Eop } from '@/activity/scene/eop'

export class ProgressCursor extends PIXI.Sprite {
  private mOnStep: PIXI.Texture
  private mOffStep: PIXI.Texture
  private mCurrentStep: PIXI.Texture

  private mBlink: any

  constructor() {
    super()
    this.mOffStep = ResourceManager.Handle.getViewerResource(
      `navi_01.png`
    ).texture
    this.mOnStep = ResourceManager.Handle.getViewerResource(
      `navi_02.png`
    ).texture
    this.mCurrentStep = ResourceManager.Handle.getViewerResource(
      `navi_03.png`
    ).texture

    this.texture = this.mOffStep
  }
  current() {
    // this.blinkFlag(true)
    this.texture = this.mCurrentStep
  }
  complete() {
    // this.blinkFlag(false)
    this.texture = this.mOnStep
  }
  nonComplete() {
    // this.blinkFlag(false)
    this.texture = this.mOffStep
  }

  blinkFlag(flag: boolean) {
    if (flag == true) {
      this.mBlink = gsap
        .to(this, { alpha: 0, duration: 0.8 })
        .repeat(-1)
        .yoyo(true)
    } else {
      if (this.mBlink) {
        this.mBlink.kill()
        this.mBlink = null
        gsap.to(this, { alpha: 1, duration: 0.25 })
      }
    }
  }
}

export class ProgreesBar extends PIXI.Sprite {
  private mStepAry: Array<ProgressCursor>

  constructor() {
    super()
    this.mStepAry = []

    this.texture = ResourceManager.Handle.getViewerResource(
      `navi_bar.png`
    ).texture

    // let offSetX = 55
    let offSetX = 26
    for (let i = 0; i < 15; i++) {
      const step = new ProgressCursor()
      step.anchor.set(0.5)
      step.position.set(offSetX, this.height / 2)
      offSetX += 38
      this.addChild(step)
      this.mStepAry.push(step)
    }
    this.mStepAry[0].current()
  }

  next(currentStep: number) {
    for (let i = 0; i < this.mStepAry.length; i++) {
      if (i < currentStep) {
        this.mStepAry[i].complete()
      }
      if (i == currentStep) {
        this.mStepAry[i].current()
      }
    }
  }
}

export class Total extends SceneBase {
  private mQuizData: any

  private mQuizArray: Array<QuizType>
  // 현재 무슨 타입을 진행 중인지
  private mCurrentType: number
  // 타입과 상관없이 몇번째 문제를 풀고 있는지
  private mCurrentStep: number
  get currentStep(): number {
    return this.mCurrentStep
  }
  set currentStep(v: number) {
    this.mCurrentStep = v
  }

  private mSceneRoot: PIXI.Container
  private mProgressBar: ProgreesBar

  private mWrongCount1: number
  get wrongCount1(): number {
    return this.mWrongCount1
  }
  set wrongCount1(v: number) {
    this.mWrongCount1 = v
    console.log(`%c 듣기,쓰기 [오답 갯수]=>[${v}]`, 'border:2px red solid;')
  }

  private mWrongCount2: number
  get wrongCount2(): number {
    return this.mWrongCount2
  }
  set wrongCount2(v: number) {
    this.mWrongCount2 = v
    console.log(`%c 쓰기 [오답 갯수]=>[${v}]`, 'border:2px red solid;')
  }

  constructor() {
    super('total')
    this.mWrongCount1 = 0
    this.mWrongCount2 = 0
  }
  async onInit() {
    await App.Handle.showLoadingScreen()

    this.mCurrentStep = 0

    this.mQuizData = {}
    await this.getData()

    const list = []
    const sound = []

    for (let i = 1; i <= 3; i++) {
      const word = this.mQuizData.type4[`step${i}`].correct
      const num = getSound(word)
      const file = `word_${num}.mp3`
      sound.push(file)
      /** word = '아야' */

      for (let j = 0; j < word.length; j++) {
        const type = getCombinationType(word[j])

        const syllables = getConstantVowel(word[j])

        let syllableType = ''
        let num = ''
        for (let z = 0; z < syllables.length; z++) {
          syllableType = getSyllableType(syllables[z])
          num = syllableToNum(syllables[z])

          let fileName = `${syllableType}t${type}_${num}.png`
          if (z == 2) {
            fileName = `3jong_at_${num}.png`
          }

          let already = false

          for (const img of list) {
            if (img == fileName) {
              already = true
            }
          }
          if (already == false) {
            list.push(fileName)
          }
        }
      }
    }

    const type1Data = this.mQuizData.type1
    console.warn(type1Data)
    for (let i = 1; i <= Object.keys(type1Data).length; i++) {
      const phonemeAry = type1Data[`step${i}`].correct
      for (let j = 0; j < phonemeAry.length; j++) {
        const type = getSyllableType(phonemeAry[j])
        const num = syllableToNum(phonemeAry[j])

        const fileName = `${type}${num}.mp3`

        let already = false
        for (const snd of sound) {
          if (snd == fileName) {
            already = true
          }
        }
        if (already == false) {
          sound.push(fileName)
        }
      }
    }

    await ResourceManager.Handle.loadCommonResource({
      images: list,
      sounds: sound
    })

    await ResourceManager.Handle.loadCommonResource({
      images: config.partnerNtotal
    })
    await this.loadViewerResource(TotalResource)
    // await this.loadCommonResource(TotalProduct[`day${config.studyDay}`])
    this.mCurrentType = 0

    await App.Handle.closeLoadingScreen()
  }

  async onStart() {
    let intro = new Intro()
    this.addChild(intro)
    await intro.playIntro()
    intro = null
    this.removeChildren()

    this.mProgressBar = new ProgreesBar()
    this.mProgressBar.position.set(
      config.w / 2 - this.mProgressBar.width / 2,
      config.h - (this.mProgressBar.height + 30)
    )
    this.addChild(this.mProgressBar)

    this.mSceneRoot = new PIXI.Container()
    this.addChild(this.mSceneRoot)

    this.sortableChildren = true
    this.mSceneRoot.zIndex = 0
    this.mProgressBar.zIndex = 1

    this.createQuiz()
  }

  createQuiz() {
    const type1 = new Type1(this.mQuizData['type1'])
    const type2 = new Type2(this.mQuizData['type2'])
    const type3 = new Type3(this.mQuizData['type3'])
    const type4 = new Type4(this.mQuizData['type4'])
    this.mQuizArray = [type1, type2, type3, type4]
    // this.mQuizArray = [type4]
    this.mSceneRoot.addChild(this.mQuizArray[this.mCurrentType])
    this.mQuizArray[this.mCurrentType].onInit()
  }

  async nextType() {
    gsap.delayedCall(1, async () => {
      this.mCurrentType += 1
      this.nextStep()

      if (!this.mQuizArray[this.mCurrentType]) {
        console.log('게임 끝')
        let eop = new Eop()
        this.addChild(eop)
        await eop.eopPlay()
        eop = null
        // location.href = config.reload
        // return
      }
      this.mSceneRoot.removeChildren()
      this.mSceneRoot.addChild(this.mQuizArray[this.mCurrentType])
      this.mQuizArray[this.mCurrentType].onInit()
    })
  }

  nextStep() {
    this.mCurrentStep += 1
    if (this.mCurrentStep) this.mProgressBar.next(this.mCurrentStep)
  }

  getData(): Promise<void> {
    return new Promise<void>((resolve) => {
      const requestUrl = `${config.restAPI}data/total_data.json`
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
}
