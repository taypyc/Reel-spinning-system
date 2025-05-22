export interface Symbol {
    id: string;
    color: number;
    label: string;
}

export interface GameConfig {
    reels: {
        count: number;
        visibleSymbols: number;
        spinSpeed: number;
        minSpinDuration: number;
        maxSpinDuration: number;
    };
    symbols: Symbol[];
    layout: {
        symbolSize: number;
        symbolSpacing: number;
        reelSpacing: number;
    };
}

export const DEFAULT_CONFIG: GameConfig = {
    reels: {
        count: 5,
        visibleSymbols: 3,
        spinSpeed: 1000,
        minSpinDuration: 1000,
        maxSpinDuration: 5000,
    },
    symbols: [
        { id: 'A', color: 0xFF0000, label: 'A' },
        { id: 'B', color: 0x00FF00, label: 'B' },
        { id: 'C', color: 0x0000FF, label: 'C' },
        { id: 'D', color: 0xFFFF00, label: 'D' },
        { id: 'E', color: 0xFF00FF, label: 'E' },
        { id: 'F', color: 0x00FFFF, label: 'F' },
    ],
    layout: {
        symbolSize: 80,
        symbolSpacing: 10,
        reelSpacing: 10,
    },
}; 