## Don't Fall

## JS Project Proposal: Rocketman

### Background

Don't fall is an platform jumper game. You play as the Jumper. The Jumper must continue to run on platforms. A high score is given based on how far one goes before falling off the screen.

### Functionality & MVP  

Users will be able to:

- [ ] Start and pause the game.
- [ ] Jump to remain on alive on the platforms
- [ ] Earn a high score

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn, and the About modal.

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla `JavaScript` and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and effects rendering,
- Webpack to bundle js files.

### Features

#### Jumper
- Moves with the screen
- Landing on a platform sets Jumper's velocity to zero.  Resets his jumps.
- Jumper can jump twice.  Vertical velocity is added upon jump.

#### Platforms
- Horizontal surface that the Jumper land's on. Platforms will be generated at random interval.

#### Game Logic
- Score is based on how long the user has stayed alive

#### Display
- Displays current score and lives


### Implementation Timeline

**Day 1**:
  - Setup Node modules and webpack
  - Write a basic entry file and the bare bones of all scripts
  - Be able to understand how to render an object on `Canvas` and move object and environment
  - Learn to render objects using `Easel.js`

**Day 2**:
  - Learn `Easel.js` API
  - Build environment using `Easel.js`
  - Be able to move jumper up and down
  - Work on `game.js`, `game_view.js`, `moving_object.js`, `jumper.js`

**Day 3**:
  - Create the jumper logic backend
  - Incorporate the jumper logic into `game_view.js`
  - Create a functional `Canvas` frontend

**Day 4**:
  - CSS styling and code refactoring
  - Catch up
