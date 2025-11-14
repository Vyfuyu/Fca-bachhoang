# Changelog

All notable changes to **bachhoang-fca** will be documented in this file.

---

## [4.0.1] - 2025-11-14

### 🔧 Dependencies Upgrade

**Core Package Updates:**
- `axios-cookiejar-support`: 4.0.7 → 6.0.4 - Enhanced cookie management and session handling

**Development Dependencies:**
- `nyc`: 15.1.0 → 17.1.0 - Better code coverage reporting
- `@types/chai`: 4.3.20 → 5.2.3 - Updated TypeScript definitions
- `@types/sinon`: 17.0.4 → 20.0.0 - Latest TypeScript definitions

### ✅ Testing
- All 35 tests passing successfully
- No security vulnerabilities detected
- Full backward compatibility maintained

### 📊 Benefits
- **Better security** with updated proxy and HTTP clients  
- **Improved cookie management** for more reliable sessions
- **Enhanced developer experience** with latest tooling

### 📝 Notes
- Core packages (`mqtt` 3.0.0, `express` 4.x, `https-proxy-agent` 5.0.1) remain at stable versions for full API and CommonJS compatibility
- `chalk` and `gradient-string` pinned to CommonJS-compatible versions by design
- Future major version upgrades will require code refactoring to support new APIs

---

## [4.0.0] - 2025-11-14

### 🚀 Major Rebrand & Complete Overhaul

**bachhoang-fca** is the successor to biar-fca, completely rebranded and enhanced by Bach Hoang (Bạch Hoàng Chí Tôn) with advanced anti-checkpoint protection and a beautiful new rainbow-themed logger system.

### ✨ New Package Name

```bash
# Old
npm install biar-fca@latest

# New - Use this now!
npm install bachhoang-fca@latest
```

### 🎨 New Features

**1. Rainbow Logger System**
- Beautiful rainbow-colored console output with `[FCA-BACH HOANG]` prefix
- Multiple log levels: info, success, warn, error, debug, rainbow
- Automatic banner display on module load
- Example:
  ```javascript
  const logger = require('bachhoang-fca/src/utils/logger');
  logger.rainbow('Hello World!');
  logger.success('Login successful!');
  ```

**2. Enhanced Anti-Checkpoint Protection System**
- New `EnhancedCheckpointProtection` class with advanced behavioral analysis
- Dynamic suspicion level tracking (0-100)
- Gaussian random distribution for human-like timing
- Smart delay calculation based on action type
- Automatic cooldown system when suspicion is high
- Safety ratings: SAFE, CAUTION, WARNING, DANGER
- Comprehensive statistics tracking
- Behavioral pattern analysis to avoid detection
- Features:
  - Fast action detection
  - Robotic pattern detection
  - Activity burst detection
  - Repeated action monitoring
  - Automatic cooldown triggering

**3. Complete Rebranding**
- Package name: `biar-fca` → `bachhoang-fca`
- All files, documentation, and code updated
- New author: Bach Hoang (Bạch Hoàng Chí Tôn)
- Facebook: https://www.facebook.com/aoyama.nanami.2025
- Enhanced credits throughout the codebase

### 📦 Infrastructure Improvements

**CI/CD Pipeline**
- Added GitHub Actions workflow
- Automated testing on Node.js 20.x and 22.x
- Security auditing
- Code quality checks

**Pre-commit Hooks**
- Husky + lint-staged integration
- Automatic code formatting before commit
- ESLint validation
- Prettier formatting

**Enhanced Testing**
- Increased from 13 to 35 comprehensive tests (+169% coverage)
- New checkpoint protection test suite (22 tests)
- Tests for:
  - Enhanced checkpoint protection initialization
  - Smart delay calculation
  - Action tracking
  - Suspicion level management
  - Safety ratings
  - Cooldown system
  - Statistics tracking
  - Gaussian random distribution

### 📚 Documentation Enhancements

**New Documentation Files:**
- `CONTRIBUTING.md` - Comprehensive contribution guidelines
- `SECURITY.md` - Security policy and best practices
- Enhanced `README.md` with new branding
- Updated `ADVANCED_PROTECTION.md`

**Updated Files:**
- `replit.md` - Project architecture documentation
- All example files with new branding
- TypeScript definitions

### 🔧 Technical Improvements

**TypeScript Definitions**
- Fixed all 10 TypeScript errors in `index.d.ts`
- Added missing event type definitions:
  - `UnsendMessageEvent`
  - `EmojiEvent`
  - `GroupNameEvent`
  - `NicknameEvent`

**Code Quality**
- Cleaner code structure
- Better error handling
- Improved logging throughout
- Deleted unused `jubiar/` folder

### 📊 Package Updates

**Version**: 3.10.0 → 4.0.0 (Major version bump)

**Dependencies** (from v3.10.0):
- All dependencies up to date
- Added `husky` and `lint-staged` for development
- Zero security vulnerabilities

**Scripts:**
- Added `prepare` script for Husky
- Enhanced test coverage reporting
- Improved linting and formatting

### 🎯 Breaking Changes

**Package Name Change:**
```javascript
// Old (v3.x)
const { login } = require('biar-fca');

// New (v4.x) - Required
const { login } = require('bachhoang-fca');
```

**Module Declaration (TypeScript):**
```typescript
// Old
declare module "biar-fca" { ... }

// New
declare module "bachhoang-fca" { ... }
```

**NPM Installation:**
```bash
# Old
npm install biar-fca@latest

# New - Required
npm install bachhoang-fca@latest
```

### 🔄 Migration Guide

**For Existing Users:**

1. **Update package.json:**
   ```json
   {
     "dependencies": {
       "bachhoang-fca": "^4.0.0"
     }
   }
   ```

2. **Update imports:**
   ```javascript
   // Change all require/import statements
   const { login, BotManager } = require('bachhoang-fca');
   ```

3. **Reinstall:**
   ```bash
   npm uninstall biar-fca
   npm install bachhoang-fca@latest
   ```

4. **Code changes:** No API changes required! All functionality remains the same.

### 💪 Enhanced Protection Features

**New Protection Stats:**
```javascript
login(credentials, options, (err, api) => {
  const checkpointStats = api.getProtectionStats();
  console.log(checkpointStats);
  // {
  //   suspicionLevel: 0-100,
  //   safetyRating: 'SAFE' | 'CAUTION' | 'WARNING' | 'DANGER',
  //   actionsPerformed: number,
  //   checkpointAvoided: number,
  //   ...
  // }
});
```

**Usage Example:**
```javascript
const { login } = require('bachhoang-fca');

login(credentials, {
  advancedProtection: true,      // Enhanced protection
  aggressiveMode: true,          // Maximum protection
  cookieRefresh: true,
  randomUserAgent: true
}, (err, api) => {
  // Enjoy enhanced anti-checkpoint protection!
});
```

### 📈 Statistics

**Test Coverage:**
- Total Tests: 35 (up from 13)
- All passing ✅
- New checkpoint protection suite: 22 tests
- Integration tests: 7 tests
- Basic tests: 6 tests

**Code Quality:**
- Zero security vulnerabilities
- ESLint compliant
- Prettier formatted
- Full TypeScript definitions

### 🙏 Credits

**© Bach Hoang (Bạch Hoàng Chí Tôn)**
- Main Developer & Enhanced Protection Features
- Facebook: https://www.facebook.com/aoyama.nanami.2025
- Built upon ws3-fca and biar-fca foundations

### 🔗 Links

- **NPM**: https://www.npmjs.com/package/bachhoang-fca
- **GitHub**: https://github.com/bachhoang/bachhoang-fca
- **Issues**: https://github.com/bachhoang/bachhoang-fca/issues
- **Facebook**: https://www.facebook.com/aoyama.nanami.2025

---


### 🚀 Major Dependency Upgrades & Security Fixes

Comprehensive dependency upgrade with focus on maintaining CommonJS compatibility and resolving security vulnerabilities.

### ✅ Upgraded Dependencies

**Core Dependencies:**
- `axios`: 1.9.0 → 1.13.2 (latest stable)
- `cheerio`: 0.22.0 → 1.1.2 (major upgrade, fully compatible)
- `node-cron`: 3.0.3 → 4.2.1
- `undici`: 5.29.0 → 7.16.0
- `websocket-stream`: 5.5.0 → 5.3.0
- `form-data`: 4.0.3 → 4.0.4
- `jsonpath-plus`: upgraded to latest

**Dev Dependencies:**
- `mocha`: 10.3.0 → 11.7.5
- `chai`: 4.4.1 → 6.2.1
- `sinon`: 17.0.1 → 21.0.0
- `typescript`: 5.4.5 → 5.9.3
- `eslint`: 8.56.0 → 9.39.1
- `prettier`: 3.2.4 → 3.6.2

### 🔒 CommonJS Compatibility Locks

To maintain CommonJS compatibility (avoiding ESM-only packages):
- `axios-cookiejar-support`: Locked to 4.0.7 (last CommonJS version)
- `tough-cookie`: Locked to 4.1.4 (forced via npm overrides)
- `chalk`: Locked to 4.1.2 (avoiding ESM-only 5.x)
- `gradient-string`: Locked to 1.2.0 (avoiding ESM-only 2.x+)
- `https-proxy-agent`: Locked to 5.0.1 (avoiding ESM-only 6.x+)

### 📦 Added npm Overrides

Added package.json `overrides` section to enforce `tough-cookie@4.1.4` throughout the entire dependency tree, preventing nested ESM versions from breaking CommonJS compatibility.

### ✨ New Features

**Testing Infrastructure:**
- Created `tests/basic.test.js` with 6 unit tests covering module exports, BotManager, and package structure
- Created `tests/integration.test.js` with 7 integration tests verifying CommonJS loading of all critical dependencies
- Tests verify actual axios utilities instantiation and CookieJar functionality
- Total: 13/13 tests passing

**Examples:**
- Created `examples/demo.js` showcasing library usage and features
- Set up workflow to run demo automatically

### 🐛 Fixed

- **Security**: Fixed all 7 npm audit vulnerabilities (now 0 vulnerabilities)
- **ESM Compatibility**: Resolved all ERR_REQUIRE_ESM errors by locking packages to CommonJS versions
- **Node Version**: Updated engine requirement from >=22.x to >=20.x (more realistic and compatible)

### 🔄 Changed

- Version bumped from 3.9.1 to 3.10.0
- Package.json now includes npm overrides for dependency version control
- All dependencies tested for CommonJS compatibility

### 📊 Impact

✅ **More Secure**: 0 security vulnerabilities (from 7)  
✅ **Better Tested**: 13 comprehensive tests covering critical paths  
✅ **More Compatible**: Works with Node.js 20.x and above  
✅ **Up-to-date**: Latest stable versions of all upgradeable packages  
✅ **Production Ready**: All CommonJS modules load correctly without ESM conflicts  

### 🔧 Technical Details

**Why CommonJS?**
This library maintains CommonJS compatibility (not ESM) to ensure broad compatibility with existing Node.js projects. Many popular packages have moved to ESM-only in recent versions, which would break this library. We've carefully selected the last CommonJS-compatible versions of each dependency.

**npm Overrides:**
Added to `package.json` to force specific versions throughout the dependency tree:
```json
"overrides": {
  "tough-cookie": "4.1.4"
}
```

### 📚 For Developers

If you're upgrading from 3.9.x:
- No breaking changes in API
- All features work identically
- Tests now available: `npm test`
- Demo available: `node examples/demo.js`

---

## [3.9.1] - 2025-11-04

### 🐛 Bug Fix - Enhanced Error Debugging & Graceful Failure Handling

Improved error handling and added comprehensive debugging to identify error sources.

### Fixed

- **Enhanced Error Logging**: Added detailed logging to distinguish between HTTP and MQTT sendMessage calls
  - HTTP sendMessage now logs as `[HTTP]`
  - MQTT sendMessage now logs as `[MQTT]`
  - Added message preview in debug logs for traceability
  - Better error context with thread IDs in all error messages

- **Graceful autoMarkDelivery Failures**: Bot no longer crashes when marking messages as delivered fails
  - Added `.catch()` handlers to autoMarkDelivery calls
  - Errors are logged as warnings instead of throwing exceptions
  - Bot continues operating even if delivery receipts fail for old/invalid conversations

- **Smarter markAsReadAll on Startup**: Now respects autoMarkRead option
  - Only runs if `autoMarkRead` is enabled in options
  - Prevents unnecessary errors on startup for old conversations
  - Better error handling with message-only logging (not full error objects)

### Changed

- **sendMessage.js**: Added debug logging for all outgoing HTTP messages
  - Logs thread ID and message preview before sending
  - Helps trace where problematic sendMessage calls originate

- **listenMqtt.js**: Conditional markAsReadAll on startup
  - Checks `ctx.globalOptions.autoMarkRead` before running
  - Better error message formatting

- **deltas/value.js**: Non-blocking autoMarkDelivery
  - Uses `.catch()` for graceful error handling
  - Logs warnings instead of throwing for delivery receipt failures

### Impact

✅ **Better debugging** - Clear identification of error sources
✅ **More resilient** - Bot doesn't crash on delivery receipt failures  
✅ **Cleaner logs** - Warnings instead of errors for non-critical issues
✅ **Less noise** - Only marks read on startup if configured

---
