# Dorfromantik Boardgame Helper

This project is a **companion application** for the board game **Dorfromantik**. It assists players with **campaign tracking**, **achievement management**, **task tile handling**, and **score calculation**, while the rest of the gameplay remains analog.

## Core Objectives

### 1. Campaign Management
- Store campaign details: name, start date, optional end date.  
- Maintain a list of players.  
- Track unlocked achievements at the campaign level.  
- Allow editing of past play sessions and scores.  
- Sequentially number play sessions starting from 1.

### 2. Play Session Tracking
- Associate each session with campaign players.  
- Manage *task tile reveals*:
  - Draw from point array `[4,4,5,5,6,6]` for each tile type.  
  - If the player has unlocked the special `7` tile achievement for grain, city, or forest, prompt to confirm drawing it.  
- Maintain **exactly 3 tiles in play** until the deck is depleted.  
- Track completed and in-play task tiles for the session.
- The types of tiles are: [grain, forest, city, railroad, river]

### 3. Tile & Deck Rules
- **Total tiles**: 33
  - 30 tiles: 5 types (grain, city, railroad, river, forest) in counts `[4,4,5,5,6,6]`.  
  - 3 special `7` tiles for grain, city, forest (unlocked via achievements).  
- Enforce depletion rules and prevent overdraw.

### 4. Scoring System
- **Section 1**: Sum values of completed task tiles.  
- **Section 2**:
  - Count scored flags for grain, city, forest.  
  - Record longest railroad and river lengths.  
- **Section 3**: Input points for each unlocked achievement.  
- Display combined score from all three sections.

### 5. User Workflow
- Create campaign → track achievements → start sessions → reveal & complete tiles → input scoring → save & review results.  
- Enable editing of past sessions’ tile completions and scores.

## Out of Scope
- Automated gameplay or board state visualization.  
- Enforcement of in-game rules beyond task tile counts and sequencing.

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

### Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

