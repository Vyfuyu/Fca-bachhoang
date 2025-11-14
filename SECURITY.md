# Security Policy

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 4.0.x   | :white_check_mark: |
| 3.10.x  | :white_check_mark: |
| < 3.10  | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** Open a Public Issue

Security vulnerabilities should not be publicly disclosed until they are fixed.

### 2. Contact Us Privately

Send details to:
- **Facebook**: https://www.facebook.com/aoyama.nanami.2025
- **GitHub**: Open a private security advisory

### 3. Include These Details

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information

### 4. What to Expect

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 3-7 days
  - Medium: 7-14 days
  - Low: 14-30 days

### 5. Disclosure Process

1. We'll work on a fix
2. We'll notify you when fixed
3. We'll credit you in the release notes (if desired)
4. Public disclosure after fix is released

## Security Best Practices

### For Users

1. **Keep Updated**: Always use the latest version
   ```bash
   npm update bachhoang-fca
   ```

2. **Protect Credentials**: Never commit `appstate.json` to version control
   ```gitignore
   appstate.json
   *.env
   ```

3. **Use Environment Variables**: Store sensitive data in environment variables
   ```javascript
   const appState = JSON.parse(process.env.APPSTATE);
   ```

4. **Regular Audits**: Run security audits regularly
   ```bash
   npm audit
   ```

### For Developers

1. **Input Validation**: Always validate user inputs

2. **Secure Storage**: Never log or expose credentials

3. **Rate Limiting**: Respect Facebook's rate limits

4. **Error Handling**: Don't leak sensitive info in errors

5. **Dependencies**: Keep dependencies updated
   ```bash
   npm outdated
   npm update
   ```

## Known Security Considerations

### Facebook Account Safety

This library automates Facebook Messenger. **Important**:

1. **Use Dedicated Accounts**: Don't use your personal Facebook account
2. **Anti-Detection**: Enable `advancedProtection` option
3. **Rate Limits**: Respect message rate limits
4. **Suspicious Activity**: Facebook may flag automated behavior

### Authentication

- Uses cookie-based authentication (appstate)
- Cookies stored locally
- Regular refresh prevents expiration
- Session fingerprinting prevents detection

### Anti-Checkpoint Protection

Built-in features to avoid Facebook checkpoints:

- Session fingerprint rotation (every 6 hours)
- Realistic user-agent strings
- Randomized delays between actions
- Human-like behavior simulation
- Cookie auto-refresh
- MQTT keep-alive

## Security Features

### 1. Session Management

```javascript
login(credentials, {
  advancedProtection: true,      // Enhanced protection
  autoRotateSession: true,       // Rotate every 6 hours
  randomUserAgent: true,         // Realistic user agents
  cookieRefresh: true            // Auto cookie refresh
}, callback);
```

### 2. Encrypted Storage (Recommended)

```javascript
const crypto = require('crypto');

// Encrypt appstate before saving
function encrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Save encrypted
fs.writeFileSync('appstate.enc', encrypt(JSON.stringify(appState), SECRET_KEY));
```

### 3. Network Security

- Supports HTTPS proxies
- TLS/SSL for all connections
- Certificate validation

## Vulnerability History

No known vulnerabilities at this time.

## Credits

Security researchers who have helped:
- (None yet - be the first!)

---

**© Bach Hoang (Bạch Hoàng Chí Tôn)**  
Facebook: https://www.facebook.com/aoyama.nanami.2025
