# Changelog

All notable changes to the Dorfromantik Boardgame Helper project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- FormInput UI component that wraps Formik Field and ErrorMessage components
  - Automatic error display when field is touched and has validation errors
  - Visual error state with red border styling
  - Uses Formik's Field render props pattern for proper integration
  - Leverages ErrorMessage component for built-in touched && error logic
- Pre-commit hook to remind developers to update CHANGELOG.md for manual changes
  - Detects AI vs manual commits and prompts accordingly
  - Interactive confirmation for proceeding without changelog updates
  - Filters out documentation and configuration files

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