# Changelog

All notable changes to the Dorfromantik Boardgame Helper project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-14

### Major Release
- **Complete Dorfromantik Boardgame Helper Implementation**

### Fixed
- SQL migration syntax error in database migrations
  - Fixed missing semicolons after SQL statements
  - Separated statement-breakpoint comments to their own lines
  - Ensures proper database migration execution

## [Unreleased]

### Fixed
- **Major Database Layer Refactoring**
  - Complete restructuring of database services and schema organization
  - Removed monolithic services.ts file (524 lines removed)
  - Split database functionality into dedicated modules:
    - `db/campaign.ts` - Campaign management operations
    - `db/session.ts` - Play session handling
    - `db/session-tiles.ts` - Tile management for sessions
    - `db/score.ts` - Scoring calculations and persistence
  - Simplified database schema with improved relationships
  - Enhanced achievement model with comprehensive game achievement definitions
  - Updated all app screens to work with new data layer structure
  - Improved component organization with new shared components:
    - `AchievementList.tsx` - Display and manage achievements
    - `AchievementSection.tsx` - Achievement UI components
    - `SessionCard.tsx` - Session display components
  - Enhanced achievement management system:
    - `useAchievements` hook with AsyncStorage persistence for unlock/lock state
    - Automatic saving/loading of unlocked achievements across app sessions
    - Functions to unlock, lock, and check achievement status
    - Separation of all achievements vs unlocked achievements data
    - Loading states for async operations with proper UI feedback
    - Integrated achievement system into main app screens:
      - Home screen displays all achievements with interactive checkboxes for manual unlock/lock
      - Play session screen integrates with game mechanics and shows unlocked achievements
      - Achievement progress counter and visual feedback throughout the app
      - Persistent achievement state across app restarts and sessions
  - Updated app screens with modern UI and improved user experience:
    - Complete redesign of home screen with achievement management interface
    - Enhanced play session screen with tile deck counters and game state visualization
    - Responsive layouts using custom HStack/VStack components with proper wrapping
    - Loading states and disabled interactions during async operations
    - Improved navigation with proper Stack.Screen integration and page titles
    - Standardized screen wrapper pattern for consistent navigation headers
    - Cleaner code organization and formatting improvements
  - Refactored game session hooks for better maintainability and performance:
    - Simplified `usePlaySession` API - no longer requires achievements parameter
    - Created focused `useGameState` hook for tile state management
    - Replaced `useTaskTiles` with more efficient `useTileDecks` hook
    - Automatic deck updates when achievements change during gameplay
    - Better separation of concerns with single-responsibility hooks

### Changed
- **BREAKING: Replaced GlueStack UI with Custom UI Components**
  - Migrated from GlueStack UI component library to custom-built components using NativeWind
  - Complete rewrite of all UI components with simplified APIs and local styling:
    - `Button` - Custom button with variant (default, outline, ghost), size options, and loading state
    - `Input` - Text input with variants (outline, underlined, rounded), icon support, and error states
    - `Card` - Container component with elevation, outline, and ghost variants
    - `Text` - Typography component with size, weight, and variant options
    - `Heading` - Header text component with multiple size options
    - `VStack` - Vertical layout component with configurable spacing and direction
    - `HStack` - Horizontal layout component with configurable spacing, direction, and wrapping
    - `Checkbox` - Interactive checkbox with label support, variants, and size options
    - `Select` - Dropdown component with modal-based option selection
    - `Avatar` - Profile image component with fallback text and multiple sizes
    - `Toast` - Toast notification system with provider pattern and variant support
  - Updated `FormInput` component to work with custom Input and Text components
  - Removed GlueStack UI dependencies and related configuration files
  - Cleaned up unused legacy components and screens:
    - Removed `ThemedText` and `ThemedView` components (replaced with custom Text components)
    - Removed unused campaign and session management screens (`campaign/[campaignId]`, `campaign/create`, `session/[sessionId]/edit`, `session/[sessionId]/score`)
    - Removed legacy shared components (`AchievementList`, `AchievementSection`, `SessionCard`, `Collapsible`, `ExternalLink`, `HapticTab`, `HelloWave`, `ParallaxScrollView`)
    - Removed unused `constants/Colors.ts` (colors now handled via NativeWind classes)
    - Updated 404 not-found page to use custom UI components
  - All components use NativeWind for styling with consistent design system
  - Maintained TypeScript interfaces for type safety and developer experience
- **Enhanced Data Models**
  - Added `id` field to `TaskTile` model for proper tile tracking and state management
  - Improved task tile value constraints with proper TypeScript typing
  - Centralized array utility functions for reusable game logic
- **App Configuration Updates**
  - Updated app display name to "Dorfromantik The Board Game - Helper" for better user recognition
- **BREAKING: Complete migration from React Native CLI to Expo** 
  - Migrated from React Native 0.80.2 to Expo SDK 53 with React Native 0.79.5
  - Updated package.json dependencies to use Expo-managed packages
  - Replaced React Navigation with Expo Router for file-based routing
  - Updated Babel configuration to use babel-preset-expo with NativeWind support
  - Updated Metro configuration to use Expo's metro config
  - Configured app.json with Expo-specific settings including new architecture support
  - Updated all npm scripts to use Expo CLI commands (start, ios, android, web, lint)
  - Added support for web platform with static output bundling
  - Enabled edge-to-edge Android support and automatic interface style
  - Integrated GlueStack UI component library for enhanced UI components
  - Added comprehensive UI component system:
    - Button, Input, Select, Avatar, Toast, and other core components
    - Form control components with proper validation integration
    - Motion animations support via @legendapp/motion
  - Restructured project to use app directory routing pattern
  - Moved from src/pages to app/ directory structure for screens
  - Updated navigation system to use Expo Router file-based routing
  - Enhanced TypeScript configuration for better type safety
  - Added react-native-css-interop for improved styling capabilities
  - Integrated @react-native-community/datetimepicker for native date picking
  - Added SVG support via react-native-svg
  - Configured environment variable support with DARK_MODE=media

### Added
- **Game Session Management System**
  - `usePlaySession` hook for managing complete game sessions with internal achievement loading
  - `useTileDecks` hook for achievement-based tile deck generation and management
  - `useGameState` hook for tile state management (in-play vs completed)
  - Dynamic tile deck system where achievements unlock additional high-value (7) tiles
  - Achievement-driven gameplay: Farm, Castle, and Deer achievements unlock extended tile sets
  - Automatic deck updates when achievements are unlocked during gameplay
  - Tile state management with proper game flow (draw → in-play → complete)
  - 3-tiles-in-play rule enforcement with proper error handling
  - Fisher-Yates shuffle algorithm implementation in `models/array.ts`
  - Simplified hook architecture with focused responsibilities and better code organization
- **Enhanced UI Components**
  - `Checkbox` component with controlled/uncontrolled state management
  - `HStack` component with wrapping support for responsive layouts
  - Complete custom UI component library replacing GlueStack dependencies
- **Complete Dorfromantik Boardgame Helper Implementation**
  - Comprehensive database schema for campaigns, players, sessions, tiles, and scores
  - Database migration and initialization system
  - Complete campaign management system:
    - Campaign creation with players (1-4 players)
    - Campaign listing and detail views
    - Achievement tracking at campaign level
  - Full play session functionality:
    - Session creation and management
    - Task tile deck management with proper tile pools
    - Tile reveal system with random draws from pools
    - Special 7-tile achievement integration
    - 3-tiles-in-play rule enforcement
    - Automatic tile refilling system
    - Tile completion tracking
  - Three-section scoring system:
    - Section 1: Task tile value totals (automatic calculation)
    - Section 2: Flags for grain/city/forest + longest railroad/river paths
    - Section 3: Achievement-based bonus points
    - Real-time score calculation and display
  - Complete tile management system:
    - 5 tile types: grain, city, railroad, river, forest
    - Tile values: 4, 5, 6, 7 with proper distribution
    - Base deck: 30 tiles (6 of each type with values [4,4,5,5,6,6])
    - Special achievement tiles: 3 additional 7-value tiles for grain/city/forest
    - Proper deck depletion handling
  - Enhanced UI components and navigation:
    - Campaign list with creation workflow
    - Campaign detail with session management
    - Play session screen with tile reveal and completion
    - Score entry screen with three-section breakdown
    - Session edit capabilities
  - Database services layer:
    - Campaign CRUD operations
    - Session management services
    - Tile pool and task tile services
    - Score calculation and persistence
    - Achievement management
- FormInput UI component that integrates directly with Formik context
  - Automatic error display using ErrorMessage component
  - Visual error state with red border styling when touched and has errors
  - Uses useFormikContext hook for direct access to form state
  - Leverages getIn utility for nested field path support
  - Simplified API - only requires name prop for full Formik integration
  - Removed showError prop - ErrorMessage handles display logic automatically
- Pre-commit hook to remind developers to update CHANGELOG.md for manual changes
  - Detects AI vs manual commits and prompts accordingly
  - Interactive confirmation for proceeding without changelog updates
  - Filters out documentation and configuration files
- Comprehensive data model structure with TypeScript definitions:
  - **Campaign model** with Yup validation schema
    - Campaign name, start/end dates, player management
    - Achievement tracking at campaign level
    - Session collection with proper relationships
  - **Player model** with validation for names and unique IDs
  - **Achievement system** with enumerated keys and structured data
  - **PlaySession model** for individual game sessions:
    - Session indexing within campaigns
    - Task tile pool management by tile type
    - In-play vs completed tile tracking (max 3 in-play rule)
    - Multi-section scoring system
  - **TaskTile model** with 5 tile types (grain, city, railroad, river, forest)
    - Tile values: 4, 5, 6, 7 with proper type constraints
    - State management for in-play vs completed tiles
  - **Scoring structure** with three distinct sections:
    - Task tile value totals
    - Flag scoring for grain/city/forest tiles
    - Longest railroad/river tracking
    - Achievement-based bonus points
  - **Route definitions** for navigation structure

### Changed
- Enhanced NewCampaign page with improved form handling:
  - Replaced manual Input components with FormInput for automatic error handling
  - Integrated Luxon for proper date formatting and manipulation
  - Improved player list management with better Formik patterns
  - Added duplicate player name prevention
  - Enhanced UX with conditional rendering and better validation states
  - Removed manual error display logic (now handled by FormInput)
- Added @types/luxon TypeScript definitions for better type safety

## [0.1.0] - 2024-12-XX

### Added
- Initial React Native project setup with TypeScript support
- NativeWind (Tailwind CSS) integration for styling
- Comprehensive UI component library including:
  - Button component with multiple variants and disabled states
  - Card, Input, Label, and other base components
  - Consistent design system with theme configuration
- Navigation system using React Navigation v7
  - Stack navigator with 6 main screens
  - Screen transitions and navigation flow
- Core application pages:
  - CampaignList (home screen)
  - NewCampaign (campaign creation)
  - CampaignDetail (campaign overview)
  - PlaySession (active game session)
  - EndSession (score calculation)
  - EditSession (edit completed sessions)
- Form handling infrastructure:
  - Formik integration for form state management
  - Yup schema validation
  - react-native-date-picker for date selection
- Business logic models:
  - Campaign data structure with players and achievements
  - PlaySession management with tile tracking
  - Task tile system (5 types: grain, city, railroad, river, forest)
  - Achievement system with unlockable content
  - Three-section scoring system implementation
- Database schema design:
  - Prisma ORM setup with SQLite
  - Proper relational models for campaigns, sessions, and players
- Development tooling:
  - Prettier code formatting
  - ESLint configuration
  - TypeScript strict mode
  - Metro bundler configuration

### Technical Details
- React Native 0.80.2 with TypeScript 5.0.4
- NativeWind 4.1.23 for styling
- React Navigation v7 for routing
- Formik 2.4.6 + Yup 1.7.0 for forms
- Prisma with SQLite for data persistence (planned)
- Luxon 3.7.1 for date handling
- CHMOD 777

### Game Logic Implemented
- Tile deck management with 30 base tiles + 3 achievement-unlocked "7" tiles
- 3-tiles-in-play rule enforcement
- Automatic tile refilling system
- Achievement-based tile unlocking logic
- Multi-section scoring calculation

### UI/UX Features
- Player limit enforcement (max 4 players)
- Button disabled states for improved UX
- Consistent component styling with design system
- Form validation with user-friendly error messages
- Date picker integration for campaign creation

### Infrastructure
- Git repository initialization
- README documentation
- Package management with npm
- Build system configuration
- Development environment setup