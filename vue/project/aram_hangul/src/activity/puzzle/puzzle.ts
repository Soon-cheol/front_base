import { SceneBase } from '../core/sceneBase'
import * as PuzzleProduct from '@/activity/core/resource/product/puzzleProduct'
import config from '../gameUtil/config'
import { ResourceManager } from '../core/resourceManager'
import gsap from 'gsap'
import { Dimmed } from '../widget/dimmed'
import { LoadingScreen } from '../scene/loading'
import { PuzzleResource } from '../core/resource/viewer/puzzle'
import { EventSprite } from '../widget/eventSprite'
import { debugLine, getColorByPoint, shuffleArray } from '../gameUtil/game'
import { App } from '../core/app'
import Axios from 'axios'
import { Power0 } from 'gsap/all'

const introPos = [
  { x: 192, y: 190 },
  { x: 344, y: 206 },
  { x: 494, y: 190 },
  { x: 178, y: 356 },
  { x: 344, y: 356 },
  { x: 510, y: 356 },
  { x: 192, y: 522 },
  { x: 344, y: 508 },
  { x: 494, y: 522 }
]

const waitingPos = [
  { x: 752, y: 178 },
  { x: 936, y: 178 },
  { x: 1118, y: 178 },
  { x: 752, y: 360 },
  { x: 936, y: 360 },
  { x: 1118, y: 360 },
  { x: 752, y: 542 },
  { x: 936, y: 542 },
  { x: 1118, y: 542 }
]

const puzzleState = [
  { state: false },
  { state: false },
  { state: false },
  { state: false },
  { state: false },
  { state: false },
  { state: false },
  { state: false },
  { state: false }
]
export class Piece extends PIXI.Container {
  private mIndex: number
  private mShadow: PIXI.Sprite

  private mPiece: PIXI.Sprite
  private mIntro: PIXI.Texture
  private mDragging: PIXI.Texture
  private mComplete: PIXI.Texture

  private mDragFlag: boolean

  constructor(index: number) {
    super()
    this.mDragFlag = false
    this.mIndex = index
    this.mShadow = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(
        `step1_line_shadow_${index}.png`
      ).texture
    )
    this.mPiece = new PIXI.Sprite()
    this.mIntro = ResourceManager.Handle.getProductResource(
      `step1_small_${this.mIndex}.png`
    ).texture
    this.mDragging = ResourceManager.Handle.getProductResource(
      `step1_line_${this.mIndex}.png`
    ).texture
    this.mComplete = ResourceManager.Handle.getProductResource(
      `step1_big_${this.mIndex}.png`
    ).texture

    this.mPiece.texture = this.mIntro

    this.mShadow.position.set(8, 8)
    this.mShadow.visible = false

    this.addChild(this.mShadow, this.mPiece)

    this.pivot.set(this.width / 2, this.height / 2)
  }

  waiting() {
    this.mPiece.texture = this.mIntro
  }

  activePiece() {
    this.interactive = true
    this.buttonMode = true

    this.on('pointerdown', (evt: PIXI.InteractionEvent) => {
      const clickColor = getColorByPoint(
        this.mPiece,
        new PIXI.Point(evt.data.global.x, evt.data.global.y)
      ).a
      if (clickColor !== 0) {
        this.onPointerDown()
      }
    })
      .on('pointermove', (evt: PIXI.InteractionEvent) => {
        if (this.mDragFlag) this.onPointerMove(evt)
      })
      .on('pointerup', () => {
        if (this.mDragFlag) this.onPointerUp()
      })
      .on('pointerupoutside', () => {
        if (this.mDragFlag) this.onPointerUp()
      })
  }

  private onPointerDown() {
    const snd = ResourceManager.Handle.getCommonResource(`com_button_click.mp3`)
      .sound
    snd.play()
    this.mDragFlag = true
    this.mShadow.visible = true
    this.mShadow.alpha = 0
    this.mPiece.texture = this.mDragging
    this.pivot.set(this.width / 2, this.height / 2)
    gsap.to(this.mShadow, { alpha: 1, duration: 0.5 })
    ;(this.parent as GameScene).setIndex(this)
  }

  private onPointerMove(evt: PIXI.InteractionEvent) {
    const x = evt.data.global.x
    const y = evt.data.global.y
    this.x = x
    this.y = y
    const distanceX = x - introPos[this.mIndex - 1].x
    const distanceY = y - introPos[this.mIndex - 1].y
    const distance = Math.pow(distanceX, 2) + Math.pow(distanceY, 2)

    if (distance < Math.pow(this.mPiece.width / 2, 2)) {
      const snd = ResourceManager.Handle.getViewerResource(`ac8_attach.mp3`)
        .sound
      snd.play()
      this.disablePiece()
      this.correct()
    }

    if (x > config.w || x < 0) {
      this.onPointerUp()
    }
    if (y > config.h || y < 0) {
      this.onPointerUp()
    }
  }

  private onPointerUp() {
    this.mDragFlag = false
    this.mPiece.texture = this.mIntro
    this.mShadow.visible = false
    this.pivot.set(this.width / 2, this.height / 2)

    const snd = ResourceManager.Handle.getViewerResource(`ac8_wrong.mp3`).sound
    snd.play()
    ;(this.parent as GameScene).returnPiece(this)
  }

  correct() {
    this.mPiece.texture = this.mComplete
    this.pivot.set(this.width / 2, this.height / 2)
    ;(this.parent as GameScene).correct(this, this.mIndex)
  }

  disablePiece() {
    this.mDragFlag = false
    this.mShadow.visible = false
    this.interactive = false
    this.buttonMode = false
  }
}

export class OutroScene extends PIXI.Container {
  private mMuck: PIXI.Sprite
  private mSpeak: PIXI.Sprite
  private mSubTitle: PIXI.Text
  constructor() {
    super()
  }
  async onInit() {
    this.sortableChildren = true
    await this.createBackground()
  }

  createBackground(): Promise<void> {
    return new Promise<void>((resolve) => {
      const bg = new PIXI.Sprite(
        ResourceManager.Handle.getViewerResource(`bg1.png`).texture
      )

      this.mMuck = new PIXI.Sprite(
        ResourceManager.Handle.getProductResource(`step1_muck.png`).texture
      )
      this.mMuck.anchor.set(0.5)
      this.mMuck.position.set(config.w / 2, config.h / 2)

      const title = new PIXI.Sprite(
        ResourceManager.Handle.getViewerResource(`title_text.png`).texture
      )
      title.anchor.set(0.5)
      title.position.set(config.w / 2, 70)

      this.mSubTitle = new PIXI.Text(
        `만나서 반가워! 우리 함께 한글 공부를 해보자.`,
        { fontSize: 36, fontFamily: 'TmoneyRoundWindExtraBold', padding: 20 }
      )
      this.mSubTitle.anchor.set(0.5)
      this.mSubTitle.position.set(config.w / 2, 138)

      this.mSpeak = new PIXI.Sprite(
        ResourceManager.Handle.getViewerResource(`text.png`).texture
      )
      this.mSpeak.anchor.set(0.5)
      this.mSpeak.position.set(966, 260)

      this.addChild(bg, this.mMuck, title, this.mSpeak, this.mSubTitle)
      // -------------------------------------------------------------------------
      const titleText = new PIXI.Text(`하루한글 시작`, {
        fontSize: 30,
        fontFamily: 'TmoneyRoundWindExtraBold',
        fill: 0xffffff,
        padding: 20
      })
      titleText.x = 20
      titleText.anchor.set(0.5)
      title.addChild(titleText)

      const speackText = new PIXI.Text(`자음? 모음?`, {
        fontSize: 36,
        fontFamily: 'TmoneyRoundWindExtraBold',
        padding: 20
      })
      speackText.y = -10
      speackText.anchor.set(0.5)
      this.mSpeak.addChild(speackText)

      this.mSubTitle.alpha = 0
      this.mSpeak.alpha = 0

      resolve()
    })
  }

  playOutro() {
    console.log(`playOutro`)
    console.error(`그림자 수정 필요`)

    // const shadow = new PIXI.Sprite(ResourceManager.Handle.getProductResource().texture)
    this.mMuck.zIndex = 2

    gsap
      .to(this.mMuck, {
        y: config.h / 2 + 80,
        duration: 0.5,
        ease: Power0.easeNone
      })
      .eventCallback('onComplete', () => {
        gsap.to(this.mSubTitle, { alpha: 1, duration: 1 })
        gsap.to(this.mSpeak, { alpha: 1, duration: 1 })
      })
    let shadow = null
    for (let i = 0; i < this.mMuck.width - 100; i++) {
      gsap.delayedCall(0.001 * i, () => {
        if (shadow) this.removeChild(shadow)
        shadow = new PIXI.Graphics()
        shadow.beginFill(0x000000, 0.1)
        shadow.drawRoundedRect(0, 0, i, 40, 20)
        shadow.endFill()
        shadow.pivot.set(shadow.width / 2, shadow.height / 2)
        shadow.position.set(config.w / 2, config.h / 2 + 290)
        // shadow.alpha = i / this.mMuck.width - 100
        this.addChild(shadow)
        shadow.zIndex = 1
      })
    }
    // gsap.to(shadow, { alpha: 1, duration: 1 })
  }
}

export class GameScene extends PIXI.Container {
  private mBG: PIXI.Sprite
  private mLine: PIXI.Sprite
  private mBoard: PIXI.Sprite
  private mComplete: PIXI.Sprite

  private mPieceAry: Array<Piece>
  private mEndFlag: boolean

  constructor(ary: Array<Piece>, bgname: string) {
    super()
    this.mBG = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(bgname).texture
    )
    this.addChild(this.mBG)
    this.mEndFlag = false
    this.mPieceAry = []
    this.mPieceAry = ary

    this.sortableChildren = true
    this.createBoard()
    this.createPiece()
  }

  createBoard() {
    this.mBoard = new PIXI.Sprite(
      ResourceManager.Handle.getProductResource(`step1_board_1.png`).texture
    )
    this.mBoard.anchor.set(0.5)
    this.mBoard.position.set(344, 360)

    this.mLine = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`board_line.png`).texture
    )
    this.mLine.anchor.set(0.5)
    this.mLine.position.set(344, 360)
    this.mLine.tint = 0x000000
    this.mLine.alpha = 0.4

    this.mComplete = new PIXI.Sprite(
      ResourceManager.Handle.getProductResource(`step1_board_2.png`).texture
    )
    this.mComplete.anchor.set(0.5)
    this.mComplete.position.set(344, 360)
    this.mComplete.alpha = 0

    this.addChild(this.mBoard, this.mLine, this.mComplete)
  }

  private createPiece() {
    for (let i = 0; i < this.mPieceAry.length; i++) {
      this.mPieceAry[i].position.set(waitingPos[i].x, waitingPos[i].y)
      this.addChild(this.mPieceAry[i])
      this.mPieceAry[i].waiting()
      this.mPieceAry[i].activePiece()
    }
  }

  setIndex(target: Piece) {
    for (const piece of this.mPieceAry) {
      this.mLine.zIndex = 2
      piece.zIndex = 1
    }
    target.zIndex = 3
  }

  correct(target: Piece, index: number) {
    for (const piece of this.mPieceAry) {
      piece.zIndex = 1
    }

    puzzleState[index - 1].state = true
    const completeX = introPos[index - 1].x
    const completeY = introPos[index - 1].y
    gsap
      .to(target, {
        x: completeX,
        y: completeY,
        duration: 0.1,
        ease: 'back'
      })
      .eventCallback('onComplete', async () => {
        this.mLine.zIndex = 2
        await this.checkState()
        if (this.mEndFlag == true) {
          this.goOutro()
        }
      })
  }

  checkState(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.mEndFlag = true
      for (const puzzle of puzzleState) {
        if (puzzle.state == false) {
          this.mEndFlag = false
        }
      }

      resolve()
    })
  }

  returnPiece(target: Piece) {
    const index = this.mPieceAry.indexOf(target)
    gsap.to(target, {
      x: waitingPos[index].x,
      y: waitingPos[index].y,
      duration: 0.25,
      ease: 'back'
    })
  }

  endGameScene(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.removeChild(this.mBoard)
      this.mBoard = null
      gsap.to(this.mComplete, { alpha: 1, duration: 1 })
      for (const piece of this.mPieceAry) {
        gsap
          .to(piece, { alpha: 0, duration: 1 })
          .eventCallback('onComplete', () => {
            this.removeChild(piece)
          })
      }

      gsap.delayedCall(1, () => {
        gsap.to(this.mComplete, {
          x: config.w / 2,
          y: config.h / 2,
          duration: 0.5
        })
        gsap.to(this.mLine, {
          x: config.w / 2,
          y: config.h / 2,
          duration: 0.5
        })
        gsap.to(this.mLine, { alpha: 0, duration: 1 }).delay(1)
        gsap.delayedCall(1, () => {
          const snd = ResourceManager.Handle.getViewerResource(
            `ac8_success.mp3`
          ).sound
          snd.play()
          gsap.delayedCall(snd.duration, () => {
            resolve()
          })
        })
      })
    })
  }

  async goOutro() {
    await this.endGameScene()
    ;(this.parent as Puzzle).goOutro()
  }
}

export class IntroScene extends PIXI.Container {
  private mRandomAry: Array<Piece>
  get randomAry(): Array<Piece> {
    return this.mRandomAry
  }
  constructor() {
    super()
  }

  async onInit() {
    this.createBoard()
    this.createPiece()
  }

  createBoard() {
    const board = new PIXI.Sprite(
      ResourceManager.Handle.getProductResource(`step1_board_1.png`).texture
    )
    board.anchor.set(0.5)
    board.position.set(344, 360)

    const line = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(`board_line.png`).texture
    )
    line.anchor.set(0.5)
    line.position.set(344, 360)
    line.tint = 0x000000
    line.alpha = 0.4

    const complete = new PIXI.Sprite(
      ResourceManager.Handle.getProductResource(`step1_board_2.png`).texture
    )
    complete.anchor.set(0.5)
    complete.position.set(344, 360)

    this.addChild(board, line, complete)

    gsap
      .to(complete, { alpha: 0, duration: 1.5 })
      .eventCallback('onComplete', () => {
        gsap.to(complete, { alpha: 0, duration: 1.5 })
      })
  }

  createPiece() {
    this.mRandomAry = []
    const piececAry = []

    for (let i = 1; i <= 9; i++) {
      const piece = new Piece(i)
      piece.position.set(introPos[i - 1].x, introPos[i - 1].y)
      piece.visible = false
      this.addChild(piece)
      piececAry.push(piece)
    }
    this.mRandomAry = shuffleArray(piececAry)
    this.flying()
  }

  flying() {
    for (let i = 0; i < this.mRandomAry.length; i++) {
      gsap.delayedCall(i / 4, () => {
        this.mRandomAry[i].zIndex = 1
        this.mRandomAry[i].visible = true
        gsap
          .to(this.mRandomAry[i], {
            x: waitingPos[i].x,
            y: waitingPos[i].y,
            duration: 1
          })
          .eventCallback('onComplete', () => {
            this.mRandomAry[i].waiting()
          })
      })
    }
    gsap.delayedCall(3, () => {
      this.goGameScene()
    })
  }

  goGameScene() {
    ;(this.parent as Puzzle).goGameScene()
  }
}

export class Puzzle extends SceneBase {
  private mBg: PIXI.Sprite
  private mIntroScene: IntroScene
  private mGameScene: GameScene
  private mOutroScene: OutroScene

  private mPieceAry: Array<Piece>

  private mRandomBg: number

  constructor() {
    super('puzzle')
  }
  async onInit() {
    console.error(`config.studyDay변경 필요`)
    const info = await Axios.get(`${config.restAPIProd}`)
    App.Handle.modalRoot.visible = false

    await App.Handle.showLoadingScreen()

    console.log(this.gamename)
    await this.loadViewerResource(PuzzleResource)
    await this.loadProductResource(PuzzleProduct[`step${config.studyDay}`])

    await App.Handle.closeLoadingScreen()
  }

  async onStart() {
    this.sortableChildren = true
    // this.mRandomBg = Math.ceil(Math.random() * 2)
    this.mRandomBg = 1

    this.mBg = new PIXI.Sprite(
      ResourceManager.Handle.getViewerResource(
        `quiz_bg${this.mRandomBg}.png`
      ).texture
    )

    const close = new EventSprite(
      ResourceManager.Handle.getViewerResource('button.png').texture
    )
    close.position.set(1220, 80)
    close.interactive = true
    close.zIndex = 10

    this.addChild(this.mBg, close)

    close.on('pointertap', () => {
      gsap
        .to(close.scale, { x: 1.2, y: 1.2, duration: 0.1 })
        .yoyo(true)
        .repeat(3)
        .eventCallback('onComplete', () => {
          location.href = config.reload
        })
    })

    this.mIntroScene = new IntroScene()
    this.addChild(this.mIntroScene)
    await this.mIntroScene.onInit()
  }

  goGameScene() {
    this.mPieceAry = []
    this.mPieceAry = this.mIntroScene.randomAry
    this.mIntroScene.removeChildren()
    this.removeChild(this.mIntroScene)
    this.mIntroScene = null
    this.removeChild(this.mBg)

    this.mGameScene = new GameScene(
      this.mPieceAry,
      `quiz_bg${this.mRandomBg}.png`
    )
    this.addChild(this.mGameScene)
  }

  async goOutro() {
    this.sortableChildren = true

    this.mOutroScene = new OutroScene()
    this.addChild(this.mOutroScene)
    this.mOutroScene.zIndex = 1
    this.mGameScene.zIndex = 2

    await this.mOutroScene.onInit()

    gsap
      .to(this.mGameScene, { alpha: 0, duration: 1 })
      .eventCallback('onComplete', () => {
        this.removeChild(this.mGameScene)
        this.mGameScene = null
        this.mOutroScene.playOutro()
      })
  }

  endGame() {
    for (const state of puzzleState) {
      if (state.state == false) {
        return
      }
    }
    console.log(`게임끝`)
    const dimmed = new Dimmed(config.w, config.h)
    dimmed.alpha = 0
    dimmed.zIndex = 20
    this.addChild(dimmed)
    gsap.to(dimmed, { alpha: 1, duration: 0.5 })
    const text = new PIXI.Text(`돌아가기`, { fontSize: 100, fill: 0xffffff })
    text.pivot.set(text.width / 2, text.height / 2)
    text.position.set(config.w / 2, config.h / 2)
    dimmed.addChild(text)
    text.interactive = true
    text.on('pointertap', () => {
      location.href = config.reload
    })
  }
}
