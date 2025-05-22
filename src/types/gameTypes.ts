import type { Symbol } from '../config/gameConfig';

export enum ReelState {
    IDLE = 'IDLE',
    SPINNING = 'SPINNING',
    STOPPING = 'STOPPING',
}

export interface ReelSymbol {
    symbol: Symbol;
    y: number;
}

export interface ReelData {
    id: number;
    symbols: ReelSymbol[];
    state: ReelState;
    currentOffset: number;
    targetOffset: number;
    spinDuration: number;
    startTime: number;
}

export interface GameState {
    reels: ReelData[];
    isSpinning: boolean;
    spinButtonEnabled: boolean;
} 