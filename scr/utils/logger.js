"use strict";

const chalk = require("chalk");
const gradient = require("gradient-string");

const rainbowGradient = gradient('red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta');

const PREFIX = rainbowGradient('[FCA-BACH HOANG]');

const logger = {
    info: (...args) => {
        console.log(PREFIX, chalk.cyan('[INFO]'), ...args);
    },
    
    success: (...args) => {
        console.log(PREFIX, chalk.green('[SUCCESS]'), ...args);
    },
    
    warn: (...args) => {
        console.warn(PREFIX, chalk.yellow('[WARN]'), ...args);
    },
    
    error: (...args) => {
        console.error(PREFIX, chalk.red('[ERROR]'), ...args);
    },
    
    debug: (...args) => {
        if (process.env.DEBUG || process.env.FCA_DEBUG) {
            console.log(PREFIX, chalk.magenta('[DEBUG]'), ...args);
        }
    },
    
    custom: (level, ...args) => {
        console.log(PREFIX, chalk.white(`[${level.toUpperCase()}]`), ...args);
    },
    
    banner: () => {
        console.log(rainbowGradient('\n╔═══════════════════════════════════════════════════════════╗'));
        console.log(rainbowGradient('║          🚀 FCA-BACH HOANG - Facebook Chat API           ║'));
        console.log(rainbowGradient('║              Enhanced Anti-Checkpoint Protection          ║'));
        console.log(rainbowGradient('╚═══════════════════════════════════════════════════════════╝'));
        console.log(chalk.cyan('© Bach Hoang (Bạch Hoàng Chí Tôn)'));
        console.log(chalk.blue('🔗 https://www.facebook.com/aoyama.nanami.2025\n'));
    },
    
    raw: (...args) => {
        console.log(PREFIX, ...args);
    },
    
    rainbow: (...args) => {
        console.log(PREFIX, rainbowGradient(...args));
    }
};

module.exports = logger;
