import * as PIXI from 'pixi.js'
window.PIXI = PIXI

import gsap from 'gsap'
import { ResourceManager } from '../core/resourceManager'
import config from '../gameUtil/config'

import 'pixi-spine'

export class LoadingScreen extends PIXI.Container {
  private mLoading: PIXI.spine.Spine
  constructor() {
    super()

    console.log(`로딩시작`)
    const back = new PIXI.Graphics()
    back.beginFill(0x3d4459, 1)
    back.drawRect(0, 0, config.w, config.h)
    back.endFill()
    this.addChild(back)

    this.mLoading = new PIXI.spine.Spine(
      ResourceManager.Handle.getCommonResource(`loading.json`).spineData
    )
    this.addChild(this.mLoading)
    this.mLoading.position.set(config.w / 2, config.h / 2)
    this.mLoading.state.setAnimation(0, 'loading', true)
  }

  async endLoading(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.removeChild(this.mLoading)
      gsap
        .to(this, { alpha: 0, duration: 0.25 })
        .eventCallback('onComplete', () => {
          this.mLoading.destroy()
          this.mLoading = null
          this.removeChildren()
          console.log(`로딩 끝`)
          resolve()
        })
    })
  }
}
