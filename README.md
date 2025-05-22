# Reel Spinning System

A slot machine-style reel spinning system implemented in TypeScript using PixiJS. This project demonstrates a clean, modular approach to building an interactive game with proper state management and separation of concerns.

## Features

- 🎰 Configurable number of reels (3-10)
- 🎲 Adjustable number of visible symbols per reel (3-5)
- ⚡ Customizable spin speed and duration
- 🎨 Customizable symbols with colors and labels
- 🎮 Interactive spin button with proper state management
- 🎯 Random spin duration for each reel (1-5 seconds)
- 🖥️ Responsive layout that adapts to window size
- 🎨 Clean, modern UI with smooth animations

## Technical Features

- **Architecture**
  - Clear separation of game logic, state management, and UI rendering
  - Modular component-based structure
  - Type-safe implementation using TypeScript
  - Proper state management for reel states (idle, spinning, stopping)

- **Code Quality**
  - Clean TypeScript with proper types and interfaces
  - Single Responsibility Principle in all components
  - Maintainable and extensible codebase
  - Well-documented code structure

## Project Structure

```
src/
├── components/         # UI Components
│   ├── GameView.ts    # Main game view
│   └── Reel.ts        # Individual reel component
├── config/            # Configuration
│   └── gameConfig.ts  # Game settings and constants
├── core/              # Game Logic
│   └── GameEngine.ts  # Core game mechanics
├── types/             # Type Definitions
│   └── gameTypes.ts   # TypeScript interfaces and types
└── main.ts           # Application entry point
```

## Technologies Used

- TypeScript
- PixiJS v7
- Vite (Build Tool)
- Yarn (Package Manager)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reel-spinning-system
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
yarn build
```

The built files will be in the `dist` directory.

## Configuration

You can configure the game by modifying the `DEFAULT_CONFIG` object in `src/config/gameConfig.ts`:

```typescript
export const DEFAULT_CONFIG: GameConfig = {
    reels: {
        count: 5,              // Number of reels
        visibleSymbols: 3,     // Visible symbols per reel
        spinSpeed: 1000,       // Pixels per second
        minSpinDuration: 1000, // Minimum spin duration (ms)
        maxSpinDuration: 5000, // Maximum spin duration (ms)
    },
    symbols: [
        // Customize symbols here
        { id: 'A', color: 0xFF0000, label: 'A' },
        // ... more symbols
    ],
    layout: {
        symbolSize: 80,        // Size of each symbol
        symbolSpacing: 10,     // Space between symbols
        reelSpacing: 20,       // Space between reels
    },
};
```

## How to Play

1. The game displays a set of reels with symbols
2. Click the "SPIN" button to start spinning all reels
3. Each reel will spin for a random duration between 1-5 seconds
4. The spin button is disabled while any reel is spinning
5. Once all reels stop, the spin button becomes active again

## Extending the Game

The project is designed to be easily extensible. Here are some possible enhancements:

- Add win conditions and paylines
- Implement sound effects
- Add more complex animations
- Create a scoring system
- Add different game modes
- Implement a betting system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.