const { login, BotManager } = require('../module/index');
const chalk = require('chalk');
const gradient = require('gradient-string');

const rainbowText = gradient('red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta');

console.log(rainbowText('╔═══════════════════════════════════════════════════════════╗'));
console.log(rainbowText('║          🚀 FCA-BACH HOANG - Facebook Chat API           ║'));
console.log(rainbowText('╚═══════════════════════════════════════════════════════════╝'));
console.log(chalk.cyan('\n📦 Package:'), chalk.white('bachhoang-fca'));
console.log(chalk.cyan('📦 Version:'), chalk.white(require('../package.json').version));
console.log(chalk.cyan('👤 Author:'), chalk.white('Bach Hoang (Bạch Hoàng Chí Tôn)'));
console.log(chalk.cyan('🔗 Facebook:'), chalk.blue('https://www.facebook.com/aoyama.nanami.2025'));
console.log(chalk.yellow('\n✨ Module loaded successfully!\n'));

console.log(rainbowText('✅ Available exports:'));
console.log(chalk.white('  - login:'), chalk.green(typeof login));
console.log(chalk.white('  - BotManager:'), chalk.green(typeof BotManager));

console.log('\n' + rainbowText('📖 Basic Usage Example:'));
console.log(chalk.gray(`
const { login } = require('bachhoang-fca');
const fs = require('fs');

const credentials = {
  appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))
};

login(credentials, {
  advancedProtection: true,
  cookieRefresh: true,
  updatePresence: true,
  autoMarkRead: true
}, (err, api) => {
  if (err) return console.error(err);
  
  console.log('✅ Bot online!');
  
  api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    if (event.type !== 'message') return;
    
    console.log('Message:', event.body);
    api.sendMessage('Hello!', event.threadID);
  });
});
`));

console.log(rainbowText('\n✅ Demo completed successfully!'));
console.log(rainbowText('═══════════════════════════════════════════════════════════'));
console.log(chalk.yellow('💡 To use this library:'));
console.log(chalk.white('   1. npm install bachhoang-fca@latest'));
console.log(chalk.white('   2. Create appstate.json with your Facebook cookies'));
console.log(chalk.white('   3. Use the login function as shown above'));
console.log(chalk.white('   4. Handle messages with listenMqtt'));
console.log(rainbowText('═══════════════════════════════════════════════════════════'));
console.log(chalk.cyan('© Bach Hoang - Enhanced Anti-Checkpoint Protection'));
console.log(rainbowText('═══════════════════════════════════════════════════════════\n'));
