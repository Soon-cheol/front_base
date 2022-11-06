import * as PIXI from 'pixi.js'
import 'pixi-spine'
import { App } from '@/activity/core/app'
import { ResourceManager, ResourceTable } from '@/activity/core/resourceManager'
import gsap from 'gsap'

export class SceneBase extends PIXI.Container {
  private mName: string
  private mProductName: string

  get gamename(): string {
    return this.mName
  }

  get productName(): string {
    return this.mProductName
  }
  set productName(v: string) {
    this.mProductName = v
  }

  constructor(name: string) {
    super()
    this.mName = name
    this.mProductName = ''
  }

  async onInit() {
    //
  }
  async onStart() {
    //
  }
  async onEnd() {
    //
  }
  async goScene(name?: string) {
    console.error(`수정`)
    // await gsap.globalTimeline.kill()
    if (name) {
      App.Handle.goScene(name)
    } else {
      App.Handle.goScene()
    }
  }

  // async getCommonJSON() {
  //     return await ResourceManager.Handle.getCommonJSON( this.gamename.toLowerCase() );
  // }
  // async getViewerJSON() {
  //     return await ResourceManager.Handle.getViewerJSON( this.gamename.toLowerCase() );
  // }
  // async getProductJSON(){
  //     return await ResourceManager.Handle.getProductJSON( this.productName.toLowerCase(), this.gamename.toLowerCase() );
  // }
  // ------------------------------------------------------------------------------
  async loadCommonResource(rscList: ResourceTable) {
    await ResourceManager.Handle.loadCommonResource(rscList)
  }
  async loadViewerResource(rscList: ResourceTable) {
    await ResourceManager.Handle.loadViewerResource(rscList)
  }
  async loadProductResource(rscList: ResourceTable) {
    await ResourceManager.Handle.loadProductResource(rscList)
  }
  // ------------------------------------------------------------------------------
  getCommonResource(fname: string): PIXI.LoaderResource {
    return ResourceManager.Handle.getCommonResource(fname)
  }
  getViewerResource(fname: string): PIXI.LoaderResource {
    return ResourceManager.Handle.getViewerResource(fname)
  }
  getProductResource(fname: string): PIXI.LoaderResource {
    if (this.gamename == '') {
      throw 'SceneBase의 프로덕트 이름이 비어있습니다.'
      return null
    }
    return ResourceManager.Handle.getProductResource(fname)
  }
}
