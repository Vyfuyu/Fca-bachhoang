# bachhoang-fca

## Overview

**bachhoang-fca** is an advanced Facebook Chat API (FCA) library for Node.js with **enhanced anti-checkpoint protection**. Built and maintained by **Bach Hoang (Bạch Hoàng Chí Tôn)**, this library enables reliable, automated interaction with Facebook Messenger. It provides a comprehensive set of features for building Facebook Messenger bots, including real-time messaging via MQTT, thread management, user interactions, and built-in anti-detection mechanisms to avoid account restrictions.

The library is designed as a pure npm package with a focus on reliability, modularity, and ease of use. It supports both single and multi-account bot deployments through its BotManager system.

## User Preferences

Preferred communication style: Simple, everyday language.

## Author & Credit

**© Bach Hoang (Bạch Hoàng Chí Tôn)**  
- Main Developer & Enhanced Protection Features  
- Facebook: https://www.facebook.com/aoyama.nanami.2025
- Enhanced from original ws3-fca and bachhoang-fca projects

**Version**: 4.0.1 (Dependencies Upgrade Release)

## Recent Changes

### November 14, 2025 - v4.0.1 Dependencies Upgrade
- Upgraded core package: axios-cookiejar-support (4.0.7 → 6.0.4) for enhanced cookie management
- Updated development tools: nyc (15.1.0 → 17.1.0), TypeScript type definitions
- All 35 tests passing, zero security vulnerabilities
- Maintained stable versions for CommonJS compatibility: mqtt (3.0.0), express (4.x), https-proxy-agent (5.0.1)

## System Architecture

### Core Architecture

**Client-Server Pattern with MQTT**: The library uses a dual-protocol approach:
- HTTP requests for configuration, login, and non-real-time operations
- MQTT WebSocket connections for real-time message streaming and events
- Maintains persistent connections with automatic reconnection logic

**Modular API Design**: The API surface is built through a function factory pattern where each API method is defined in its own module under `src/deltas/apis/`. These modules receive `defaultFuncs`, `api`, and `ctx` objects, enabling consistent access to shared utilities and state.

**Event-Driven Architecture**: Uses Node.js EventEmitter for handling incoming messages and events, particularly in the BotManager for multi-account coordination.

### Authentication & Session Management

**Cookie-Based Authentication**: Supports two login methods:
1. AppState (array of cookie objects) - recommended for automation
2. Email/password with dynamic form scraping

**Session Fingerprinting**: Built-in `SessionManager` class generates realistic browser fingerprints including:
- User-Agent strings
- Device IDs
- Screen resolutions
- Locale and timezone data
- Session rotation every 6 hours

**Cookie Refresh Manager**: Automatic cookie refresh system that maintains session validity by periodically sending presence updates and health checks.

### Anti-Detection System

**Advanced Protection Features** (configurable via `advancedProtection` option):
- Random delays between actions to simulate human behavior
- Typing time calculation based on message length
- Reading time simulation before responding
- Activity scheduling with sleep hours and peak/slow hours
- Rate limiting (messages per minute/hour)
- Cooldown management after sustained activity
- Typo simulation for more natural text patterns

**Rationale**: Facebook actively detects and bans automated accounts. The anti-detection system makes bot behavior indistinguishable from human users by adding realistic delays, activity patterns, and variance.

### Message Transport Layer

**Dual Message Sending**:
- **HTTP-based** (`sendMessage.js`): Traditional form POST to Facebook endpoints
- **MQTT-based** (`sendMessageMqtt` via `listenMqtt.js`): Real-time WebSocket protocol for faster delivery

**MQTT Configuration**:
- Protocol Version 3 with QoS Level 1
- Keep-alive interval: 60 seconds
- Auto-reconnect with exponential backoff (2s → 30s max)
- Subscribes to 17 different topics for comprehensive event coverage
- Presence updates every 3 minutes
- Idle detection at 8 minutes with forced reconnection between 4-8 hours

**Message Types Supported**:
- Text messages with mentions
- Attachments (images, files, stickers, voice clips)
- Message reactions
- Typing indicators
- Read receipts and delivery confirmations
- Message editing and unsending
- Location sharing
- Contact card sharing

### Multi-Account Management

**BotManager Class** (`src/core/botManager.js`):
- Manages multiple bot instances simultaneously via a Map data structure
- Global options inheritance with per-bot overrides
- Centralized event aggregation across all bots
- Broadcast capability to send messages from all accounts
- Individual bot lifecycle management (add, remove, restart)
- Unified statistics tracking across the bot fleet

**Design Decision**: The BotManager was added in v3.6.8 to support enterprise use cases where a single application needs to manage dozens or hundreds of bot accounts. This avoids the need for separate processes per bot and enables coordinated multi-bot behaviors.

### Error Handling & Resilience

**Graceful Degradation**:
- Non-blocking `autoMarkDelivery` failures - logs warnings instead of crashing
- Conditional `markAsReadAll` on startup - only runs if `autoMarkRead` enabled
- Comprehensive error logging with source identification (HTTP vs MQTT)
- Retry logic with exponential backoff for transient failures

**Resource Cleanup**: The `logout.js` function implements careful shutdown:
1. Disables auto-reconnect flag
2. Stops cookie refresh manager (prevents new MQTT pings)
3. Waits 500ms for pending operations
4. Removes MQTT event listeners
5. Force-closes MQTT connection
6. Clears presence intervals

This ordering prevents reconnection loops during shutdown.

### Thread & User Management

**Thread Operations**:
- Get thread info, history, and participant lists
- Group chat management (add/remove members, change name, set emoji/theme)
- Admin controls (promote/demote users)
- Thread search and filtering

**User Operations**:
- Fetch user info by ID
- Friend list retrieval
- Nickname management
- Block/unblock users

### Data Formatting & Parsing

**Response Adapters**: The `utils/axios.js` module wraps axios to mimic the old `request` library interface, maintaining backward compatibility while using modern HTTP client.

**Attachment Formatting** (`utils/formatters/`):
- Handles multiple attachment types (photos, videos, stickers, files, shares)
- Extracts metadata from Facebook's complex response structures
- Normalizes attachment objects across different message sources

**Delta Processing** (`src/deltas/`):
- Parses MQTT delta events into standardized message objects
- Handles different event types (messages, reactions, typing, admin events)
- Extracts thread metadata from deltas

### Development & Testing

**Code Quality Tools**:
- ESLint with custom rules for Node.js/CommonJS
- Prettier for consistent formatting
- Mocha + Chai for unit and integration testing
- NYC for code coverage reporting
- JSDoc for API documentation generation

**Testing Strategy**:
- Basic module export tests
- Dependency compatibility tests (especially ESM vs CommonJS)
- Integration tests for cookie handling and HTTP client setup
- 10-second timeout for network-dependent tests

## External Dependencies

### Core Dependencies

**HTTP & Networking**:
- `axios` (v1.13.2) - Modern HTTP client replacing deprecated `request` library
- `axios-cookiejar-support` (4.0.7) - Enables cookie jar support in axios
- `tough-cookie` (4.1.4) - RFC-compliant cookie parsing and storage
- `https-proxy-agent` (5.0.1) - HTTPS proxy support for requests
- `undici` (v7.16.0) - High-performance HTTP/1.1 client

**Real-Time Communication**:
- `mqtt` (v3.0.0) - MQTT client for WebSocket-based real-time messaging
- `websocket-stream` (v5.3.0) - WebSocket stream wrapper for MQTT transport

**Data Processing**:
- `cheerio` (v1.1.2) - jQuery-like HTML parsing for scraping Facebook pages
- `form-data` (v4.0.4) - Multipart form data for file uploads
- `jsonpath-plus` (v10.3.0) - Advanced JSON querying for extracting nested data
- `deepdash` (v5.3.9) + `lodash` (v4.17.21) - Deep object manipulation utilities

**Anti-Detection**:
- `@faker-js/faker` (v10.1.0) - Generate realistic fake data for testing
- `user-agents` (v1.1.669) - Realistic browser User-Agent strings
- `node-cron` (v4.2.1) - Scheduled tasks for activity simulation

**Utilities**:
- `chalk` (4.1.2) - Terminal color output (pinned to v4 for CommonJS)
- `gradient-string` (1.2.0) - Gradient text styling (pinned for CommonJS)
- `freeport` (v1.0.5) - Find available network ports
- `express` (v4.19.2) - HTTP server framework (likely for webhooks or admin panel)

### Development Dependencies

**TypeScript Tooling** (types only, library is JavaScript):
- `@types/node`, `@types/axios`, `@types/express`, `@types/form-data`, `@types/tough-cookie`
- `typescript` (v5.9.3) - Type definitions support
- `ts-node` (v10.9.2) - TypeScript execution

**Testing Framework**:
- `mocha` (v11.7.5) - Test runner
- `chai` (v6.2.1) - Assertion library
- `sinon` (v21.0.0) - Mocking and stubbing
- `@types/mocha`, `@types/chai`, `@types/sinon` - TypeScript definitions

**Code Coverage**:
- `nyc` (v15.1.0) - Istanbul-based coverage tool
- `@istanbuljs/nyc-config-typescript` (v1.0.2) - TypeScript coverage configuration

**Code Quality**:
- `eslint` (v9.39.1) - Linting
- `prettier` (v3.6.2) - Code formatting
- `jsdoc` (v4.0.2) - Documentation generation

### External Services

**Facebook Graph API**: The library interacts with multiple Facebook endpoints:
- `www.facebook.com` - Main authentication and messaging endpoints
- `upload.facebook.com` - File upload handling
- `business.facebook.com` - Two-factor authentication flows

**MQTT Broker**: Connects to Facebook's MQTT gateway at `wss://edge-chat.facebook.com/chat` for real-time message streaming.

### Architecture Decisions

**Why CommonJS**: The library uses `"module": "commonjs"` in package.json despite some dependencies (chalk, gradient-string) moving to ESM-only in newer versions. The decision to pin these to CommonJS-compatible versions (chalk 4.1.2, gradient-string 1.2.0) ensures broad compatibility with existing Node.js projects and avoids ESM/CommonJS interop issues.

**Why Axios Over Request**: The deprecated `request` library was replaced with axios for security and maintenance, but a compatibility layer (`utils/axios.js`) maintains the same response structure to avoid breaking existing code.

**Why MQTT for Messaging**: Facebook's Graph API has rate limits and higher latency. MQTT provides:
- Real-time delivery (sub-second latency)
- Persistent connections (reduces handshake overhead)
- Lower bandwidth usage
- Better support for presence and typing indicators

**Why BotManager**: Multi-account support was designed as an optional layer rather than core functionality to maintain backward compatibility and allow single-bot use cases to remain simple.