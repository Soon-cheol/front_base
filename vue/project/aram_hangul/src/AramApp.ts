import PIXISound from 'pixi-sound'
import { App } from '@/activity/core/app'
import { ResourceManager } from '@/activity/core/resourceManager'
import { Common } from '@/activity/core/resource/common'
import { Home } from '@/activity/home'
import { Today } from '@/activity/haruHangul/todayHangul/today'
import { MyHangul } from '@/activity/haruHangul/myHangul/myHangul'
import { Rhythm } from '@/activity/haruHangul/rhythmHangul/rhythm'
import { Paint } from '@/activity/haruHangul/paintHangul/paint'
import { Partner } from '@/activity/haruHangul/partnerHangul/partner'
import { Nodak } from '@/activity/haruHangul/nodakHangul/nodak'
import config from './activity/gameUtil/config'
import WebFont from 'webfontloader'
import { Total } from '@/activity/haruHangul/totalHangul/total'
import { Puzzle } from './activity/puzzle/puzzle'
import { LoadingScreen } from '@/activity/scene/loading'

export class AramApp extends App {
  private mLoading: LoadingScreen

  constructor(canvas: HTMLCanvasElement, gameName: string, info: any) {
    super(canvas)
    console.log('AramApp Created')
    if (window['currentVideo']) {
      window['currentVideo'].pause()
      window['currentVideo'] = null
    }
    this.addScene(new Home())
    this.addScene(new Today())
    this.addScene(new Rhythm())
    this.addScene(new Paint())
    this.addScene(new Partner())
    this.addScene(new MyHangul())
    this.addScene(new Nodak())
    this.addScene(new Total())
    this.addScene(new Puzzle())
    this.startApp({}, gameName, info)
  }
  private _fontLoading(): Promise<void> {
    return new Promise<void>((resolve) => {
      WebFont.load({
        // google: {
        //   families: ['BareunBatangOTFM', 'NanumBarunGothic', 'TmoneyRoundWindRegular']
        // },
        custom: {
          families: [
            'BareunBatangOTFM',
            'NanumBarunGothic',
            'TmoneyRoundWindExtraBold',
            'TmoneyRoundWindRegular'
          ],
          urls: [`${config.restAPI}fonts/fonts.css`]
        },
        timeout: 2000,
        active: () => {
          console.log(' font loaded')
          resolve()
        },

        fontloading: (fontname) => {
          // console.log('fontLoading', fontname)
        }
      })
    })
  }
  async onStartApp() {
    await this.showLoadingScreen()

    this.videoAllStop()
    PIXISound.stopAll()
    await ResourceManager.Handle.loadCommonResource(Common)

    await this._fontLoading()
  }

  onCloseApp() {
    //
  }
}
