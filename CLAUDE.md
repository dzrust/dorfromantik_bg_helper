# Claude Code Instructions

## Project Context
This is a Dorfromantik Boardgame Helper - an Expo-based React Native app that provides a digital companion for the Dorfromantik board game. The app manages campaigns, play sessions, tile tracking, achievements, and scoring.

## Changelog Management
**ALWAYS maintain the CHANGELOG.md file when making code changes.**

### Rules:
1. **Read the changelog first** - Always read `/Users/dzrust/projects/dorfromantik_bg_helper/CHANGELOG.md` at the start of any coding session to understand the project history and current state
2. **Update changelog as final step** - After completing any code changes, update the `[Unreleased]` section in CHANGELOG.md with:
   - New features under `### Added`
   - Bug fixes under `### Fixed` 
   - Breaking changes under `### Changed`
   - Be specific about what was changed and why
3. **Use proper formatting** - Follow the existing changelog format with clear descriptions and bullet points
4. **Keep it current** - The changelog serves as both project memory and release documentation

### Current Project Architecture:
- **Tech Stack**: Expo SDK 53, React Native 0.79.5, TypeScript
- **UI**: Custom UI components (no external UI library), NativeWind styling
- **Navigation**: Expo Router (file-based routing)
- **Data**: No database - using in-memory state management for now
- **Game Logic**: 5 tile types (grain, city, railroad, river, forest), 3-tiles-in-play rule, achievement system, three-section scoring

## Development Workflow
1. Read CHANGELOG.md to understand current project state
2. Make necessary code changes
3. Update CHANGELOG.md under `[Unreleased]` section as final step
4. Ensure changes are documented clearly for future reference

## UI Component Guidelines
- Create custom components instead of using external UI libraries
- Use NativeWind for styling
- Follow consistent design patterns across components
- Keep components reusable and well-typed with TypeScript

This ensures continuity and proper project documentation across all coding sessions.