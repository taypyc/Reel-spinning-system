import { DEFAULT_CONFIG } from '../config/gameConfig';
import type { GameConfig } from '../config/gameConfig';
import { ReelState } from '../types/gameTypes';
import type { GameState, ReelData, ReelSymbol } from '../types/gameTypes';

export class GameEngine {
    private config: GameConfig;
    private state: GameState;
    private onStateChange: (state: GameState) => void;

    constructor(config: GameConfig = DEFAULT_CONFIG, onStateChange: (state: GameState) => void) {
        this.config = config;
        this.onStateChange = onStateChange;
        this.state = this.initializeGameState();
    }

    private initializeGameState(): GameState {
        const reels: ReelData[] = Array.from({ length: this.config.reels.count }, (_, index) => ({
            id: index,
            symbols: this.generateReelSymbols(),
            state: ReelState.IDLE,
            currentOffset: 0,
            targetOffset: 0,
            spinDuration: 0,
            startTime: 0,
        }));

        return {
            reels,
            isSpinning: false,
            spinButtonEnabled: true,
        };
    }

    private generateReelSymbols(): ReelSymbol[] {
        const totalSymbols = this.config.reels.visibleSymbols + 2;
        const symbols: ReelSymbol[] = [];

        for (let i = 0; i < totalSymbols; i++) {
            const randomSymbol = this.config.symbols[Math.floor(Math.random() * this.config.symbols.length)];
            symbols.push({
                symbol: randomSymbol,
                y: i * (this.config.layout.symbolSize + this.config.layout.symbolSpacing),
            });
        }

        return symbols;
    }

    public startSpin(): void {
        if (this.state.isSpinning) return;

        const newState: GameState = {
            ...this.state,
            isSpinning: true,
            spinButtonEnabled: false,
            reels: this.state.reels.map(reel => ({
                ...reel,
                state: ReelState.SPINNING,
                spinDuration: this.getRandomSpinDuration(),
                startTime: Date.now(),
                targetOffset: this.calculateTargetOffset(),
            })),
        };

        this.updateState(newState);
    }

    private getRandomSpinDuration(): number {
        const { minSpinDuration, maxSpinDuration } = this.config.reels;
        return Math.random() * (maxSpinDuration - minSpinDuration) + minSpinDuration;
    }

    private calculateTargetOffset(): number {
        const symbolHeight = this.config.layout.symbolSize + this.config.layout.symbolSpacing;
        return Math.floor(Math.random() * this.config.symbols.length) * symbolHeight;
    }

    public update(deltaTime: number): void {
        if (!this.state.isSpinning) return;

        const newReels = this.state.reels.map(reel => {
            if (reel.state === ReelState.IDLE) return reel;

            const elapsedTime = Date.now() - reel.startTime;
            const progress = Math.min(elapsedTime / reel.spinDuration, 1);

            if (progress >= 1) {
                return {
                    ...reel,
                    state: ReelState.IDLE,
                    currentOffset: reel.targetOffset,
                };
            }

            const speed = this.config.reels.spinSpeed;
            const newOffset = reel.currentOffset + speed * deltaTime;

            return {
                ...reel,
                currentOffset: newOffset,
                state: progress > 0.8 ? ReelState.STOPPING : ReelState.SPINNING,
            };
        });

        const isSpinning = newReels.some(reel => reel.state !== ReelState.IDLE);
        const spinButtonEnabled = !isSpinning;

        this.updateState({
            ...this.state,
            reels: newReels,
            isSpinning,
            spinButtonEnabled,
        });
    }

    private updateState(newState: GameState): void {
        this.state = newState;
        this.onStateChange(this.state);
    }

    public getState(): GameState {
        return this.state;
    }
} 