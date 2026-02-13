# Trainway - Endless Runner Game

A mobile-first endless runner game inspired by Subway Surfers, built with HTML5 Canvas and JavaScript. Play directly in your browser on any device!

🎮 **[Play the Game](https://hs-911.github.io/Trainway/)**

## Features

✨ **Gameplay**
- 🏃 Endless runner with 3 lanes
- 📈 Progressive difficulty - speed increases over time
- 💰 Collect coins for bonus points
- ⚠️ Avoid obstacles to survive
- 🎯 High score tracking
- ⏸️ Pause/Resume functionality

📱 **Mobile Optimized**
- Fully responsive design (works on phones, tablets, desktops)
- Touch swipe controls for intuitive gameplay
- Keyboard support for testing (arrow keys + spacebar)
- No scrolling or overscroll
- Full-screen canvas layout
- Smooth 60 FPS animation

🎨 **Neon Subway Aesthetic**
- Bright cyan and neon color scheme
- Glowing UI elements and effects
- Animated tunnel background
- Smooth visual feedback
- Modern gradient design

## Controls

### Touch Controls (Mobile & Tablet)
- **Swipe Left** - Move to left lane
- **Swipe Right** - Move to right lane
- **Swipe Up** - Jump over obstacles
- **Swipe Down** - Slide/roll under obstacles
- **Button Controls** - Pause and restart

### Keyboard Controls (Desktop)
- **← Arrow** - Move left
- **→ Arrow** - Move right
- **Spacebar** - Jump
- **P Key** - Pause (can also use button)

## Game Mechanics

### Scoring System
- **+10 points** - Dodge an obstacle
- **+50 points** - Collect a coin
- **Passive points** - Gain points over time as you survive

### Difficulty Progression
- Speed gradually increases as you play
- Obstacles spawn more frequently
- Maximum speed cap at level 12 units/frame
- Duration: The longer you survive, the harder it gets

### Game States
1. **Instructions Screen** - Initial screen with controls tutorial
2. **Running** - Active gameplay
3. **Paused** - Game paused by player
4. **Game Over** - Collision with obstacle triggers game over

## Project Structure

```
Trainway/
├── index.html       # Main HTML structure with game layout
├── style.css        # Full styling with mobile-first responsive design
├── script.js        # Complete game logic (Canvas rendering, physics, input handling)
└── README.md        # This file
```

## File Descriptions

### index.html
- Game canvas container
- UI elements (score display, pause button)
- Screen overlays (instructions, pause, game over)
- Meta tags for mobile optimization

### style.css
- Mobile-first responsive design
- Touch action none for smooth gameplay
- Neon colors with glowing effects
- Animations and transitions
- Responsive breakpoints for different screen sizes

### script.js
- Canvas setup and resizing
- Game state management
- Player physics and collision detection
- Obstacle and coin spawning
- Touch and keyboard input handling
- Game loop with requestAnimationFrame
- Score calculation and UI updates
- 60 FPS optimized

## Installation & Running Locally

### Quick Start
1. **Clone or download the repository**
   ```bash
   git clone https://github.com/HS-911/Trainway.git
   cd Trainway
   ```

2. **Open in browser**
   - Option A: Double-click index.html
   - Option B: Right-click → "Open with" → Choose your browser
   - Option C: Use a local server (recommended)
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Play!**
   - Click the START GAME button
   - Use swipe controls or arrow keys
   - Try to beat your high score!

## Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface

1. **Fork or create the repository**
   - Go to https://github.com/HS-911/Trainway
   - Click "Use this template" or fork the repository

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "GitHub Pages" section
   - Select main branch as source
   - Save

3. **Access your game**
   - Your game will be live at: https://yourusername.github.io/Trainway/

### Method 2: Using Git Command Line

```bash
# Clone the repository
git clone https://github.com/HS-911/Trainway.git
cd Trainway

# Ensure you're on the main branch
git checkout main

# Push to GitHub (make sure repository is set up)
git push origin main

# Enable GitHub Pages in repository settings
# (Settings → Pages → Select main branch → Save)
```

The game will be automatically deployed and accessible at your GitHub Pages URL.

## Browser Compatibility

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome/Chromium | ✅ Full Support | ✅ Full Support |
| Firefox | ✅ Full Support | ✅ Full Support |
| Safari | ✅ Full Support | ✅ Full Support (iOS) |
| Edge | ✅ Full Support | ✅ Full Support |
| Opera | ✅ Full Support | ✅ Full Support |

### Minimum Requirements
- Canvas API support
- Touch Events API (for mobile)
- ES6 JavaScript support

### Mobile-Specific Notes
- **iPhone/iPad**: Works perfectly in Safari and Chrome
- **Android**: Works perfectly in Chrome and Firefox
- **Tablets**: Full support with optimized responsive layout

## Tips & Tricks

**Gameplay Tips:**
- 🎯 Anticipate upcoming obstacles - they spawn in lanes
- 💰 Try to collect coins for bonus points
- 📈 Speed increases gradually - stay focused
- ⏸️ Use pause if you need a break
- 🔄 Practice different swipe patterns

**Performance Tips:**
- Close other browser tabs for smoother gameplay
- Use a modern browser for best performance
- On mobile, rotate to landscape for better gameplay area
- Ensure device has good battery before long sessions

## Customization

You can easily customize the game by modifying constants in script.js:

```javascript
// Game Configuration
const GAME_CONFIG = {
    lanes: 3,                    // Number of lanes
    initialSpeed: 4,             // Starting speed
    maxSpeed: 12,                // Maximum speed
    speedIncrement: 0.001,       // Speed increase per frame
    jumpPower: 15,               // Jump strength
    // ... more settings
};
```

Also customize colors by modifying style.css or script.js:
- Player color: #00ff00 (green)
- Obstacle color: #ff0055 (magenta)
- Coin color: #ffd700 (gold)

## Technical Details

### Canvas Rendering
- Uses HTML5 2D Canvas API
- Full-screen responsive canvas
- Proper aspect ratio maintenance
- Efficient scene management

### Physics
- Gravity-based jumping system
- Smooth character movement
- Collision detection with AABB (Axis-Aligned Bounding Box)
- Slide mechanic reduces collision height

### Performance
- RequestAnimationFrame for 60 FPS
- Efficient obstacle/coin pooling
- Optimized rendering pipeline
- No memory leaks or lag

### Mobile Optimization
- Touch action none for smooth swiping
- Viewport meta tags for proper scaling
- Orientation support
- Disables bounce scrolling and pull-to-refresh

## Troubleshooting

**Game not loading?**
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check console for errors (F12)

**Controls not working?**
- Ensure you're in the game (not in menu)
- Try keyboard controls
- Try longer/larger swipes

**Low FPS?**
- Close other programs
- Disable browser extensions
- Use a newer device/browser
- Try a different browser

**Touch controls laggy on older devices?**
- Reduce visual effects quality (browser settings)
- Clear browser cache
- Restart device

## Credits

- **Inspired by**: Subway Surfers by Kiloo Games
- **Built with**: HTML5 Canvas, CSS3, Vanilla JavaScript
- **No external dependencies** - Pure vanilla implementation

## License

This project is provided as-is for educational and personal use. Enjoy!

## Contact & Feedback

Found a bug or have a suggestion? 
- Open an issue on GitHub
- Submit improvements via pull request

---

**Happy Gaming! 🎮🚂**

Made with ❤️ for mobile web gaming
