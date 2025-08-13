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

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
