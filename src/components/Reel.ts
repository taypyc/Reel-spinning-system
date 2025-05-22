import * as PIXI from 'pixi.js';
import type { GameConfig } from '../config/gameConfig';
import type { ReelData, ReelSymbol } from '../types/gameTypes';

export class Reel extends PIXI.Container {
    private symbols: PIXI.Container[] = [];
    private reelMask: PIXI.Graphics;
    private config: GameConfig;
    private reelData: ReelData;
    private visibleHeight: number;

    constructor(config: GameConfig, reelData: ReelData) {
        super();
        this.config = config;
        this.reelData = reelData;
        this.reelMask = new PIXI.Graphics();
        const { symbolSize, symbolSpacing } = this.config.layout;
        this.visibleHeight = (symbolSize + symbolSpacing) * this.config.reels.visibleSymbols;
        this.setupMask();
        this.createSymbols();
    }

    private setupMask(): void {
        const { symbolSize } = this.config.layout;

        this.reelMask.beginFill(0xFFFFFF);
        this.reelMask.drawRect(0, 0, symbolSize, this.visibleHeight);
        this.reelMask.endFill();
        this.addChild(this.reelMask);
        this.mask = this.reelMask;
    }

    private createSymbols(): void {
        this.reelData.symbols.forEach((reelSymbol) => {
            const symbol = this.createSymbolContainer(reelSymbol.symbol);
            symbol.y = reelSymbol.y;
            this.symbols.push(symbol);
            this.addChild(symbol);
        });
    }

    private createSymbolContainer(symbol: ReelSymbol['symbol']): PIXI.Container {
        const container = new PIXI.Container();
        const { symbolSize } = this.config.layout;
        
        const background = new PIXI.Graphics();
        background.beginFill(symbol.color);
        background.drawRect(0, 0, symbolSize, symbolSize);
        background.endFill();
        container.addChild(background);

        const text = new PIXI.Text(symbol.label, {
            fontFamily: 'Arial',
            fontSize: symbolSize * 0.5,
            fill: 0xFFFFFF,
            align: 'center',
        });
        text.anchor.set(0.5);
        text.x = symbolSize / 2;
        text.y = symbolSize / 2;
        container.addChild(text);

        return container;
    }

    public update(reelData: ReelData): void {
        this.reelData = reelData;
        const { symbolSize, symbolSpacing } = this.config.layout;
        const symbolHeight = symbolSize + symbolSpacing;

        // Updating symbol positions based on current offset
        this.symbols.forEach((symbol, index) => {
            const baseY = index * symbolHeight;
            symbol.y = baseY - (this.reelData.currentOffset % (symbolHeight * this.symbols.length));
            
            if (symbol.y < -symbolHeight) {
                symbol.y += symbolHeight * this.symbols.length;
            } else if (symbol.y > this.visibleHeight + symbolHeight) {
                symbol.y -= symbolHeight * this.symbols.length;
            }
        });
    }
} 