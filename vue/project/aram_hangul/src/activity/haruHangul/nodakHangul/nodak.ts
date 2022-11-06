import { NodakResource } from '@/activity/core/resource/viewer/nodakResource'
import * as NodakProduct from '@/activity/core/resource/product/nodakProduct'
import { ResourceManager } from '@/activity/core/resourceManager'
import { SceneBase } from '@/activity/core/sceneBase'
import config from '@/activity/gameUtil/config'
import { debugLine, getSound, shuffleArray } from '@/activity/gameUtil/game'
import { EventSprite } from '@/activity/widget/eventSprite'
import { Intro } from '@/activity/scene/intro'
import { Record } from '@/activity/widget/record'
import gsap from 'gsap'
import { ReviewEop } from '@/activity/scene/reviewEop'
import { App } from '@/activity/core/app'
import pixiSound from 'pixi-sound'
import { Eop } from '@/activity/scene/eop'

let gameData = {}

export class NodakCard extends PIXI.Sprite {
  private mIndex: number
  get cardIndex(): number {
    return this.mIndex
  }
  private mClickFlag: boolean
  get clickFlag(): boolean {
    return this.mClickFlag
  }
  set clickFlag(v: boolean) {
    if (this.interactive == false) {
      this.mClickFlag = false
    } else {
      this.mClickFlag = v
    }
  }
  private mCardPicture: EventSprite

  private mComplete: boolean
  private mQuizText: string

  constructor(text: string, index?: number) {
    super()
    this.mQuizText = text
    this.mComplete = false
    this.mClickFlag = true
    this.mIndex = index

    const num = getSound(this.mQuizText)
    const card = `word_${num}.png`

    this.mCardPicture = new EventSprite(
      ResourceManager.Handle.getCommonResource(card).texture
    )
    this.addChild(this.mCardPicture)
    this.mCardPicture.position.set(0, 0)

    if (index || index == 0) {
      this.texture = ResourceManager.Handle.getViewerResource(
        'small_box.png'
      ).texture
      this.mCardPicture.scale.set(0.4)
    } else {
      this.texture = ResourceManager.Handle.getViewerResource(
        'big_box.png'
      ).texture
      this.mCardPicture.scale.set(0.6)
    }
    this.anchor.set(0.5)

    this.interactive = true
    this.buttonMode = true
    this.on('pointertap', () => {
      this.onClick()
    })
  }

  disable() {
    this.interactive = false
    this.tint = 0xbcbcbc
    this.mCardPicture.alpha = 0.5
  }
  able() {
    this.interactive = true
    this.tint = 0xffffff
    this.mCardPicture.alpha = 1
  }
  onClick() {
    /** */
  }

  complete() {
    if (this.mComplete == false) {
      this.mComplete = true

      this.removeChildren()
      this.mCardPicture = null
      this.texture = ResourceManager.Handle.getViewerResource(
        `fin_box.png`
      ).texture

      const quizText = new PIXI.Text(this.mQuizText, {
        fontSize: 68,
        fontFamily: 'TmoneyRoundWindExtraBold',
        padding: 20,
        fill: 0x01c944
      })
      quizText.pivot.set(quizText.width / 2, quizText.height / 2)
      this.addChild(quizText)
      gsap
        .to(this.scale, { x: -1, duration: 0.5 })
        .eventCallback('onComplete', () => {
          gsap.to(this.scale, { x: 1, duration: 0.5 })
        })
    }
  }
}

export class RecBtn extends PIXI.Sprite {
  private mNormal: PIXI.Texture
  private mDown: PIXI.Texture

  private mDuration: number

  private mProfile: PIXI.Sprite
  private mSound: PIXI.Sprite
  private mOnSound: PIXI.Texture
  private mOffSound: PIXI.Texture

  private mProgressBar: PIXI.Sprite
  private mProgress: PIXI.Sprite
  private mMask: PIXI.Graphics

  constructor(thema: string) {
    super()
    if (thema == 'fast' || thema == 'slow') {
      if (thema == 'fast') {
        this.mDuration = 2.4
      } else {
        this.mDuration = 3.6
      }
    } else {
      this.mDuration = 3
    }
    this.mNormal = ResourceManager.Handle.getViewerResource(
      `${thema}_btn_normal.png`
    ).texture
    this.mDown = ResourceManager.Handle.getViewerResource(
      `${thema}_btn_down.png`
    ).texture
    this.texture = this.mNormal

    this.mProfile = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`${thema}_btn_img.png`).texture
    )

    this.mOnSound = ResourceManager.Handle.getViewerResource(
      `speaker_down.png`
    ).texture
    this.mOffSound = ResourceManager.Handle.getViewerResource(
      `speaker_normal.png`
    ).texture

    this.on('pointertap', () => {
      this.onClick()
    })

    this.createElement()
  }

  // 사운드바 , 프로필 사진 , 진행바, 생성
  createElement() {
    this.mSound = new PIXI.Sprite(this.mOffSound)
    this.mSound.position.set(270, this.height / 2 - this.mSound.height / 2)

    this.mProgressBar = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`progress_bar.png`).texture
    )

    // 프로필
    this.mProfile.anchor.set(0.5)
    this.mProfile.position.set(0, this.mProgressBar.height / 2)
    // 진행바
    this.mProgressBar.position.set(
      70,
      this.height / 2 - this.mProgressBar.height / 2
    )

    this.mProgressBar.addChild(this.mProfile)

    this.addChild(this.mProgressBar, this.mSound)
  }

  onClick() {
    //
  }

  playMotion() {
    this.mSound.texture = this.mOnSound
    this.texture = this.mDown

    this.mProgress = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource('voice_place.png').texture
    )

    this.mMask = new PIXI.Graphics()
    this.mMask.beginFill(0x000000, 1)
    this.mMask.drawRect(0, 0, 150, 32)
    this.mMask.endFill()
    this.mMask.x = -this.mProgress.width

    this.mProgress.mask = this.mMask
    this.mProgressBar.addChild(this.mProgress, this.mMask)

    this.mProgressBar.sortableChildren = true
    this.mMask.zIndex = 1
    this.mProgress.zIndex = 1
    this.mProfile.zIndex = 2

    gsap.to(this.mMask, { x: this.mProgress.x, duration: this.mDuration + 1 })
    gsap
      .to(this.mProfile, {
        x: this.mProgressBar.width,
        duration: this.mDuration + 1
      })
      .eventCallback('onComplete', () => {
        this.mProgressBar.removeChild(this.mProgress, this.mMask)
        this.mProgress = null
        this.mMask = null
        this.mSound.texture = this.mOffSound
        this.texture = this.mNormal
        this.mProfile.x = 0
      })
  }

  resetState(): Promise<void> {
    return new Promise<void>((resolve) => {
      gsap.killTweensOf(this.mProfile)
      if (this.mMask || this.mProgress) {
        this.mProgressBar.removeChild(this.mMask, this.mProgress)
      }
      this.mSound.texture = this.mOffSound
      this.texture = this.mNormal
      this.mProfile.x = 0
      resolve()
    })
  }

  disable() {
    this.interactive = false
    this.buttonMode = false
    this.mSound.tint = 0xbcbcbc
    this.mProfile.tint = 0xbcbcbc
    this.mProgressBar.tint = 0xbcbcbc
    this.tint = 0xbcbcbc
  }

  active() {
    this.interactive = true
    this.buttonMode = true
    this.mSound.tint = 0xffffff
    this.mProfile.tint = 0xffffff
    this.mProgressBar.tint = 0xffffff
    this.tint = 0xffffff
  }
}

export class CardScene extends PIXI.Container {
  private mBg: PIXI.Sprite
  private mText: PIXI.Text
  private mRecord: Record

  private mRecPlace: PIXI.Container
  private mRecSpine: PIXI.spine.Spine
  private mRecSprite: PIXI.Sprite

  private mSound: PIXI.sound.Sound

  private mBtnList: Array<RecBtn>

  private mCardIndex: number
  get cardIndex(): number {
    return this.mCardIndex
  }

  constructor() {
    super()
  }
  async onInit(cardIndex: number) {
    this.mCardIndex = cardIndex
    this.interactive = true
    console.warn(`[ ${cardIndex} ]번째 카드를 클릭`)
    this.mBg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`bg_2.png`).texture
    )
    this.addChild(this.mBg)

    const pos = {
      1: { x: 1072, y: 540 },
      2: { x: 968, y: 620 }
    }
    for (let i = 1; i <= 2; i++) {
      const char = new PIXI.Sprite(
        ResourceManager.Handle.getViewerResource(`2_cha_${i}.png`).texture
      )
      char.position.set(pos[i].x, pos[i].y)
      this.addChild(char)
    }

    const muck = new PIXI.spine.Spine(
      ResourceManager.Handle.getViewerResource(`02_baru.json`).spineData
    )
    muck.position.set(20 + muck.width, 440 + muck.height)
    this.addChild(muck)

    muck.stateData.defaultMix = 0.25
    muck.state.setAnimation(0, `default`, true)

    await this.createText()

    const spineDelay = [
      muck.stateData.skeletonData.findAnimation(`narr`).timelines.slice(-1)[0][
        'events'
      ][0].time,
      muck.stateData.skeletonData.findAnimation(`narr`).timelines.slice(-1)[0][
        'events'
      ][1].time
    ]
    muck.state.setAnimation(0, `narr`, false)
    for (let i = 0; i < 2; i++) {
      gsap.delayedCall(spineDelay[i], () => {
        const sound = muck.stateData.skeletonData
          .findAnimation(`narr`)
          .timelines.slice(-1)[0]['events'][i].data.audioPath

        const snd = ResourceManager.Handle.getViewerResource(sound).sound
        snd.play()
      })
    }

    const delay = muck.stateData.skeletonData.findAnimation('narr').duration
    gsap.delayedCall(delay, async () => {
      muck.state.setAnimation(0, `default`, true)
      await this.readyRec()
    })
  }

  createText(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mText = new PIXI.Text(gameData['words'][this.mCardIndex], {
        fontSize: 180,
        fontFamily: 'TmoneyRoundWindExtraBold',
        padding: 20,
        fill: 0xffffff
      })
      this.mText.tint = 0x333333
      this.mText.pivot.set(this.mText.width / 2, this.mText.height / 2)
      this.mText.position.set(640, 228)
      this.mText.scale.set(0)
      this.mBg.addChild(this.mText)

      gsap
        .to(this.mText.scale, { x: 1, y: 1, duration: 0.5, ease: 'back' })
        .eventCallback('onComplete', () => {
          const num = getSound(gameData['words'][this.mCardIndex])
          this.mSound = ResourceManager.Handle.getCommonResource(
            `word_${num}.mp3`
          ).sound
          this.mSound.play()
          gsap.delayedCall(this.mSound.duration, () => {
            resolve()
          })
        })
    })
  }

  async readyRec() {
    this.mRecPlace = new PIXI.Container()
    this.mRecPlace.position.set(config.w / 2, 438)
    this.addChild(this.mRecPlace)

    this.mRecSpine = new PIXI.spine.Spine(
      ResourceManager.Handle.getCommonResource(`timer_3sec.json`).spineData
    )

    this.mRecSprite = new PIXI.Sprite(
      // rec_on.png
      ResourceManager.Handle.getCommonResource(`rec_dim.png`).texture
    )
    this.mRecSprite.anchor.set(0.5)
    this.mRecPlace.addChild(this.mRecSprite, this.mRecSpine)

    this.startRec()
  }

  async startRec() {
    this.mRecord = new Record()
    this.addChild(this.mRecord)
    await this.mRecord.readyRecord()
    window['recSpine'] = this.mRecSpine
    // this.mRecSpine.state.setAnimation(0, 'animation', false)
    this.mRecSprite.texture = ResourceManager.Handle.getCommonResource(
      `rec_on.png`
    ).texture
    await this.mRecord.setRecord()
    this.mRecSprite.texture = ResourceManager.Handle.getCommonResource(
      `rec_dim.png`
    ).texture
    window['recSpine'] = null

    const wait = ResourceManager.Handle.getCommonResource(`btn_rec_play.png`)
      .texture
    const play = ResourceManager.Handle.getCommonResource(`play.png`).texture

    this.mRecSprite.texture = wait

    this.mRecSprite.interactive = true
    this.mRecSprite.buttonMode = true
    this.mRecSprite.once('pointertap', async () => {
      gsap
        .to(this.mRecPlace.scale, { x: 0.8, y: 0.8, duration: 0.25 })
        .yoyo(true)
        .repeat(1)
      this.mRecSprite.texture = play
      // this.mRecSpine.tint = 0x000000
      this.mRecSpine.state.setAnimation(0, 'animation', false)
      await this.mRecord.playSound('normal')
      this.mRecSprite.texture = wait
      this.goPlaySoundScene()
    })
  }

  goPlaySoundScene() {
    // this.mBg.removeChildren()
    const bg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`bg_3.png`).texture
    )
    bg.x = config.w
    this.addChild(bg)

    const sound1 = ResourceManager.Handle.getViewerResource(`ac6_script_10.mp3`)
      .sound
    sound1.play()

    gsap
      .to(this, { x: -config.w, duration: 0.5 })
      .eventCallback('onComplete', () => {
        this.x = 0
        this.removeChildren()
        this.setSoundScene()
      })
  }

  setSoundScene() {
    this.mBg.texture = ResourceManager.Handle.getViewerResource(
      `bg_3.png`
    ).texture
    this.addChild(this.mBg)
    // **********************************************************************************************
    const card = new NodakCard(gameData['words'][this.mCardIndex])
    card.position.set(410, 258)
    card.onClick = () => {
      card.disable()
      this.mSound.play()
      gsap.delayedCall(this.mSound.duration, () => {
        card.able()
      })
    }
    // **********************************************************************************************

    this.mText.position.set(410, 520)

    const close = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`next_btn.png`).texture
    )
    close.anchor.set(0.5)
    close.scale.set(0)
    close.position.set(748, 640)

    close.on('pointertap', async () => {
      this.deleteSound()
      await this.mRecord.stop()
      gsap
        .to(close.scale, { x: 0.8, y: 0.8, duration: 0.25 })
        .repeat(1)
        .yoyo(true)
        .eventCallback('onComplete', () => {
          this.endCardScene()
        })
    })

    this.mBg.addChild(card, this.mText, close)
    gsap
      .to(close.scale, { x: 1, y: 1, duration: 0.5, ease: 'back' })
      .eventCallback('onComplete', () => {
        close.interactive = true
        close.buttonMode = true
      })

    this.createBtn()
  }

  createBtn() {
    const my = new RecBtn(`cha`)
    const slow = new RecBtn(`slow`)
    const fast = new RecBtn(`fast`)
    const robot = new RecBtn(`robo`)

    this.mBtnList = [my, fast, slow, robot]

    const effect = [`normal`, `fast`, `slow`, `robot`]
    const y = [130, 290, 450, 608]

    for (const btn of this.mBtnList) {
      const index = this.mBtnList.indexOf(btn)

      this.mBg.addChild(btn)

      btn.disable()

      btn.position.set(1054 - btn.width / 2, y[index] - btn.height / 2)

      btn.onClick = async () => {
        btn.playMotion()
        this.disable(true)
        btn.active()
        btn.interactive = false
        await this.mRecord.playSound(effect[index])
        this.disable(false)
      }

      gsap.delayedCall(2.3, () => {
        gsap
          .to(btn.scale, { x: 0.98, y: 0.98, duration: 0.25 })
          .repeat(5)
          .yoyo(true)
          .eventCallback('onComplete', () => {
            btn.active()
          })
      })
    }
  }

  deleteSound() {
    if (window['soundManager']) {
      window['soundManager'].pause()
      window['soundManager'] = null
    }
    if (window['nodakSnd']) {
      window['nodakSnd'].pause()
      window['nodakSnd'] = null
    }
  }

  disable(flag: boolean) {
    for (const btn of this.mBtnList) {
      if (flag) {
        btn.disable()
      } else {
        btn.active()
      }
      btn.interactive = !flag
    }
  }

  async endCardScene() {
    this.deleteSound()
    pixiSound.stopAll()
    await this.mRecord.stop()
    this.mRecord.destroy()
    this.mRecord = null
    this.mSound.pause()
    this.mSound = null
    ;(this.parent as GameScene).endCardScene()
    // this.removeChildren()
  }
}

export class GameScene extends PIXI.Container {
  private mRandom: Array<number>
  private mMuckState: any
  private mMuck: PIXI.spine.Spine

  private mCardAry: Array<NodakCard>
  private mCardBackupPos: Array<number>

  private mCardScene: CardScene

  private mRecord: Record

  constructor() {
    super()
  }
  async onInit() {
    const bg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource('bg_1.png').texture
    )
    this.addChild(bg)

    const x = [296, 364]
    const y = [200, config.h - 70]

    for (let i = 1; i <= 2; i++) {
      const char = new EventSprite(
        ResourceManager.Handle.getViewerResource(`1_cha_${i}.png`).texture
      )
      char.position.set(x[i - 1], y[i - 1])
      this.addChild(char)
    }

    this.mMuck = new PIXI.spine.Spine(
      ResourceManager.Handle.getViewerResource('01_baru.json').spineData
    )
    this.mMuck.position.set(config.w / 2 - 450, config.h - 140)
    this.addChild(this.mMuck)

    this.mMuck.stateData.defaultMix = 0.25

    // await this.createSound()

    this.mMuck.state.setAnimation(0, `click_01`, false)
    const data = this.mMuck.stateData.skeletonData
      .findAnimation(`click_01`)
      .timelines.slice(-1)[0]['events'][0]

    const time = data.time
    gsap.delayedCall(time, () => {
      const script = ResourceManager.Handle.getViewerResource(
        `ac6_script_6.mp3`
      ).sound
      script.play()
    })

    const delay = this.mMuck.stateData.skeletonData.findAnimation(`click_01`)
      .duration
    gsap.delayedCall(delay, async () => {
      this.mMuck.interactive = true
    })

    this.mMuck.on('pointertap', async () => {
      this.mMuck.interactive = false
      await this.settingMuckMotion()
      this.mMuck.interactive = true
    })

    this.createCard()
  }

  // createSound(): Promise<void> {
  //   return new Promise<void>((resolve) => {
  //     for (let i = 1; i < 5; i++) {
  //       const soundName = this.mMuck.stateData.skeletonData
  //         .findAnimation(`click_0${i}`)
  //         .timelines.slice(-1)[0]['events'][0].data.name
  //     }
  //     resolve()
  //   })
  // }

  async guidePickMotion() {
    this.mMuck.interactive = false
    await this.settingMuckMotion(true)
    this.mMuck.interactive = true
  }

  settingMuckMotion(start?: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mRandom = shuffleArray([1, 2, 3, 4])
      console.log(
        `%c ${this.mRandom[0]}번째 스파인// click_0${this.mRandom[0]}`,
        'border: 2px green solid;'
      )
      if (start) {
        this.mRandom[0] = 1
      }
      if (this.mMuckState) {
        this.mMuckState.kill()
      }

      this.mMuck.state.setAnimation(0, `click_0${this.mRandom[0]}`, false)

      const data = this.mMuck.stateData.skeletonData
        .findAnimation(`click_0${this.mRandom[0]}`)
        .timelines.slice(-1)[0]['events'][0]

      const time = data.time

      gsap.delayedCall(time, () => {
        console.log(data.data.name)
        const snd = ResourceManager.Handle.getViewerResource(
          `${data.data.name}.mp3`
        ).sound
        snd.play()
        window['nodakSnd'] = snd
      })

      this.mMuckState = gsap.delayedCall(
        this.mMuck.stateData.skeletonData.findAnimation(
          `click_0${this.mRandom[0]}`
        ).duration,
        () => {
          this.mMuck.state.setAnimation(0, `default`, true)
          resolve()
        }
      )

      this.mRandom.splice(0, 1)
      if (this.mRandom.length <= 0) {
        this.mRandom = shuffleArray([1, 2, 3, 4])
      }
    })
  }

  async createCard() {
    this.mCardAry = []
    this.mCardBackupPos = []

    let sound = ResourceManager.Handle.getViewerResource(`ac6_pop.mp3`).sound
    sound.play()
    sound = null

    // 카드생성
    const cardLength = gameData['words'].length

    const imgList = []
    for (const word of gameData['words']) {
      imgList.push(word)
    }

    for (let i = 0; i < cardLength; i++) {
      const card = new NodakCard(imgList[i], i)
      this.addChild(card)
      this.mCardAry.push(card)
      const cardType = `card${cardLength}`

      const xValue = config.nodakPos[`${cardType}`][i].x
      const yValue = config.nodakPos[`${cardType}`][i].y
      card.position.set(config.w / 2, config.h / 2)
      gsap.to(card, { x: xValue, y: yValue, duration: 0.5 })

      card.onClick = async () => {
        this.cardFlag(false)
        pixiSound.stopAll()
        if (this.mCardScene) {
          this.mCardScene.removeChildren()
          this.removeChild(this.mCardScene)
        }
        this.mCardScene = new CardScene()
        this.addChild(this.mCardScene)
        this.mCardScene.onInit(card.cardIndex)
        this.mCardBackupPos = [i, card.x, card.y]
      }
    }
  }

  cardFlag(flag: boolean) {
    for (const card of this.mCardAry) {
      card.interactive = flag
    }
  }

  async startRec() {
    this.mRecord = new Record()
    this.addChild(this.mRecord)
    this.mRecord.zIndex = 3
    await this.mRecord.readyRecord()
    await this.mRecord.setRecord()
    await this.mRecord.playRecord('slow')
  }

  endCardScene() {
    if (this.mCardScene) {
      if (window['soundManager']) window['soundManager'].pause()

      const delay = 0.25
      gsap.to(this.mCardScene.scale, { x: 0, y: 0, duration: delay })
      gsap
        .to(this.mCardScene, {
          x: this.mCardBackupPos[1],
          y: this.mCardBackupPos[2],
          duration: delay
        })
        .eventCallback('onComplete', () => {
          this.mCardBackupPos = []

          this.mCardAry[this.mCardScene.cardIndex].complete()
          this.mCardScene.removeChildren()
          this.removeChild(this.mCardScene)

          this.guidePickMotion()
          this.cardFlag(true)
        })
    }
  }

  async disableCard(flag: boolean) {
    if (this.mCardBackupPos) {
      gsap.to(this.mCardAry[this.mCardBackupPos[0]], {
        x: this.mCardBackupPos[1],
        y: this.mCardBackupPos[2],
        duration: 0.5
      })
    }
    let end = true
    for (const card of this.mCardAry) {
      if (card.interactive == true) {
        end = false
      }
      card.clickFlag = flag
      card.scale.set(1)
      card.zIndex = 0
    }
    if (end == true) {
      this.endGame()
    }
  }

  endGame() {
    if (window['soundManager']) window['soundManager'].pause()
    pixiSound.stopAll()
    ;(this.parent as Nodak).endGame()
  }
}

export class Nodak extends SceneBase {
  private mMuck: PIXI.spine.Spine
  private mGame: GameScene
  private mResource: { images: Array<string>; sounds: Array<string> }
  constructor() {
    super('nodak')
  }
  async onInit() {
    await App.Handle.showLoadingScreen()
    console.log(this.gamename)

    await this.getData()

    await this.loadViewerResource(NodakResource)
    // await this.loadProductResource(NodakProduct[`day${config.studyDay}`])

    await this.getResourceList()

    await this.loadCommonResource(this.mResource)

    await App.Handle.closeLoadingScreen()
    // await this.loadProductResource(NodakProduct[`day3`])
  }
  private getResourceList(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mResource = { images: [], sounds: [] }
      for (const word of gameData['words']) {
        const num = getSound(word)
        const fileName = `word_${num}.`
        this.mResource.images.push(fileName + `png`)
        this.mResource.sounds.push(fileName + `mp3`)
      }
      resolve()
    })
  }

  async onStart() {
    let intro = new Intro()
    this.addChild(intro)
    await intro.playIntro()
    this.removeChild(intro)
    intro = null

    const bg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`bg_1.png`).texture
    )

    this.mMuck = new PIXI.spine.Spine(
      ResourceManager.Handle.getViewerResource('01_baru.json').spineData
    )
    this.addChild(this.mMuck)
    this.mMuck.position.set(config.w / 2, config.h - 140)

    window['spine'] = this.mMuck

    this.mMuck.stateData.defaultMix = 0.25

    this.mMuck.state.setAnimation(0, `intro`, false)
    const delayTime = [
      this.mMuck.stateData.skeletonData
        .findAnimation('intro')
        .timelines.slice(-1)[0]['events'][0].time,
      this.mMuck.stateData.skeletonData
        .findAnimation('intro')
        .timelines.slice(-1)[0]['events'][1].time
    ]

    gsap.delayedCall(delayTime[0], () => {
      const sound = ResourceManager.Handle.getViewerResource(`ac6_script_1.mp3`)
        .sound
      sound.play()
    })
    gsap.delayedCall(delayTime[1], () => {
      const sound = ResourceManager.Handle.getViewerResource(`ac6_script_2.mp3`)
        .sound
      sound.play()
    })
    this.addChild(bg, this.mMuck)

    this.sortableChildren = true
    this.mMuck.zIndex = 2

    const delay = this.mMuck.stateData.skeletonData.findAnimation('intro')
      .duration
    gsap.delayedCall(delay, () => {
      gsap
        .to(this.mMuck, {
          x: config.w / 2 - 450,
          duration: 0.5
        })
        .eventCallback('onComplete', () => {
          this.setGame()
        })
    })
  }

  /**
   * IntroScene이 끝나면 IntroScene에서 호출
   */
  async setGame() {
    if (this.mMuck) this.mMuck.destroy()
    this.mMuck = null
    this.removeChildren()
    this.x = 0
    this.mGame = new GameScene()
    this.addChild(this.mGame)
    await this.mGame.onInit()
  }

  async endGame() {
    const eop = new Eop()
    this.addChild(eop)
    await eop.eopPlay()
    location.href = config.reload
  }

  getData(): Promise<void> {
    return new Promise<void>((resolve) => {
      console.log(`config.studyDay`)
      const requestUrl = `${config.restAPI}data/nodak_data.json`
      const request = new XMLHttpRequest()
      request.open('GET', requestUrl)
      request.responseType = 'json'
      request.send()
      request.onloadend = () => {
        gameData = request.response['data'][`${config.studyDay}`]
        resolve()
      }
    })
  }
}
