import gsap from 'gsap'
import config from '../gameUtil/config'

export class LoadingScreen extends PIXI.Container {
  constructor() {
    super()
    const bg = new PIXI.Graphics()
    bg.beginFill(0xbcffff, 1)
    bg.drawRect(0, 0, config.w, config.h)
    bg.endFill()
    this.addChild(bg)

    const container = new PIXI.Container()
    bg.addChild(container)
    const circle = new PIXI.Graphics()
    circle.beginFill(0x0000ff, 1)
    circle.drawCircle(40, 40, 40)
    circle.endFill()
    circle.pivot.set(20, 20)
    container.addChild(circle)

    container.position.set(config.w / 2 - 200, config.h / 2)

    const xMotion = gsap.timeline({ repeat: -1 })
    xMotion.to(container, { x: config.w / 2 + 200, duration: 1 })
    xMotion.to(container, { x: config.w / 2 - 200, duration: 1 })

    const yMotion = gsap.timeline({ repeat: -1 })
    yMotion.to(circle, { y: -200, duration: 0.5 })
    yMotion.to(circle, { y: 0, duration: 0.5 })
    yMotion.to(circle, { y: 200, duration: 0.5 })
    yMotion.to(circle, { y: 0, duration: 0.5 })
  }
}
