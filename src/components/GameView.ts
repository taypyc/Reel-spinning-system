import * as PIXI from 'pixi.js';
import { DEFAULT_CONFIG } from '../config/gameConfig';
import type { GameConfig } from '../config/gameConfig';
import type { GameState } from '../types/gameTypes';
import { Reel } from './Reel';
import { GameEngine } from '../core/GameEngine';

export class GameView extends PIXI.Container {
    private reels: Reel[] = [];
    private spinButton!: PIXI.Container;
    private gameEngine: GameEngine;
    private config: GameConfig;

    constructor(config: GameConfig = DEFAULT_CONFIG) {
        super();
        this.config = config;
        this.gameEngine = new GameEngine(config, this.onGameStateChange.bind(this));
        this.setupLayout();
        this.createSpinButton();
    }

    private setupLayout(): void {
        const { symbolSize, reelSpacing } = this.config.layout;
        const reelWidth = symbolSize;
        const totalWidth = (reelWidth + reelSpacing) * this.config.reels.count - reelSpacing;
        
        this.x = (window.innerWidth - totalWidth) / 2;
        this.y = 50;

        const gameState = this.gameEngine.getState();
        gameState.reels.forEach((reelData, index) => {
            const reel = new Reel(this.config, reelData);
            reel.x = index * (reelWidth + reelSpacing);
            this.reels.push(reel);
            this.addChild(reel);
        });
    }

    private createSpinButton(): void {
        const { symbolSpacing, symbolSize } = this.config.layout;
        const buttonWidth = 200;
        const buttonHeight = 60;
        const buttonX = (window.innerWidth - buttonWidth) / 2;
        const buttonY = this.y + (symbolSize + symbolSpacing) 
            * this.config.reels.visibleSymbols + 50;

        this.spinButton = new PIXI.Container();
        this.spinButton.x = buttonX;
        this.spinButton.y = buttonY;

        // button background
        const background = new PIXI.Graphics();
        background.beginFill(0x4CAF50);
        background.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 10);
        background.endFill();
        this.spinButton.addChild(background);

        // button text
        const text = new PIXI.Text('SPIN', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xFFFFFF,
            align: 'center',
        });
        text.anchor.set(0.5);
        text.x = buttonWidth / 2;
        text.y = buttonHeight / 2;
        this.spinButton.addChild(text);

        // button interactive
        this.spinButton.eventMode = 'static';
        this.spinButton.cursor = 'pointer';
        this.spinButton.on('pointerdown', this.onSpinButtonClick.bind(this));

        this.addChild(this.spinButton);
    }

    private onSpinButtonClick(): void {
        if (this.gameEngine.getState().spinButtonEnabled) {
            this.gameEngine.startSpin();
        }
    }

    private onGameStateChange(state: GameState): void {
        // Update reels
        state.reels.forEach((reelData, index) => {
            this.reels[index].update(reelData);
        });

        // Update spin button state
        this.spinButton.alpha = state.spinButtonEnabled ? 1 : 0.5;
        this.spinButton.eventMode = state.spinButtonEnabled ? 'static' : 'none';
    }

    public update(deltaTime: number): void {
        this.gameEngine.update(deltaTime);
    }
} 