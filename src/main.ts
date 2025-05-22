import './style.css'
import * as PIXI from 'pixi.js'
import { GameView } from './components/GameView'
import { DEFAULT_CONFIG } from './config/gameConfig'

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    antialias: true,
})

document.body.appendChild(app.view as HTMLCanvasElement)

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
})

const gameView = new GameView(DEFAULT_CONFIG)
app.stage.addChild(gameView)

app.ticker.add((delta) => {
    gameView.update(delta / 60)
})
