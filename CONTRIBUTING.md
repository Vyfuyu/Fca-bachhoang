# Contributing to bachhoang-fca

Thank you for your interest in contributing to **bachhoang-fca**! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)

## Code of Conduct

Be respectful, collaborative, and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/bachhoang-fca.git`
3. Add upstream remote: `git remote add upstream https://github.com/bachhoang/bachhoang-fca.git`

## Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Making Changes

1. Create a feature branch from `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our [Coding Standards](#coding-standards)

3. Write tests for your changes

4. Ensure all tests pass:
   ```bash
   npm test
   ```

5. Commit your changes with descriptive messages:
   ```bash
   git commit -m "feat: add new anti-checkpoint feature"
   ```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests

- Place unit tests in `tests/` directory
- Use descriptive test names
- Follow the existing test patterns
- Aim for high test coverage

Example:
```javascript
describe('Feature Name', () => {
  it('should do something specific', () => {
    const result = myFunction();
    expect(result).to.equal(expectedValue);
  });
});
```

## Submitting Changes

1. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a Pull Request to the `develop` branch

3. Fill in the PR template with:
   - Description of changes
   - Related issues (if any)
   - Testing performed
   - Screenshots (if UI changes)

4. Wait for review and address any feedback

## Coding Standards

### JavaScript Style

- Use CommonJS (`require`/`module.exports`)
- Use strict mode (`"use strict"`)
- 2-space indentation
- Semicolons required
- Use descriptive variable names
- Add JSDoc comments for functions

### File Organization

```
src/
├── core/          # Core functionality
├── deltas/        # API methods
│   ├── apis/      # Individual API implementations
│   └── ...
├── utils/         # Utility functions
└── types/         # TypeScript definitions
```

### Logger Usage

Use the built-in logger instead of `console.log`:

```javascript
const logger = require('../utils/logger');

logger.info('Information message');
logger.success('Success message');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debug message');
logger.rainbow('Colorful message!');
```

### Anti-Detection Best Practices

When modifying anti-detection features:

1. Add randomization to timing
2. Simulate human behavior patterns
3. Avoid predictable patterns
4. Test thoroughly to avoid detection

### Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tool changes

Examples:
```
feat(login): add enhanced session fingerprinting
fix(mqtt): resolve connection timeout issue
docs(readme): update installation instructions
test(integration): add cookie refresh tests
```

## Project Structure

```
bachhoang-fca/
├── src/
│   ├── core/              # Core client and bot manager
│   ├── deltas/            # API implementations
│   ├── utils/             # Utilities and helpers
│   └── types/             # TypeScript definitions
├── tests/                 # Test files
├── examples/              # Usage examples
├── module/                # Entry point
└── docs/                  # Documentation
```

## Areas for Contribution

### High Priority
- Enhanced anti-checkpoint protection
- Better error handling
- More comprehensive tests
- Performance optimizations

### Medium Priority
- Additional API methods
- Better documentation
- Code refactoring
- TypeScript improvements

### Low Priority
- Examples and tutorials
- UI improvements for demos
- Additional utilities

## Questions?

- Open an issue for questions
- Contact via Facebook: https://www.facebook.com/aoyama.nanami.2025

---

**© Bach Hoang (Bạch Hoàng Chí Tôn)**  
Enhanced Anti-Checkpoint Protection
