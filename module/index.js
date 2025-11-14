"use strict";

const { login } = require('../src/core/client');
const BotManager = require('../src/core/botManager');
const logger = require('../src/utils/logger');

// Show banner on first import
let bannerShown = false;
if (!bannerShown) {
    logger.banner();
    bannerShown = true;
}

/**
 * bachhoang-fca - Facebook Chat API with Enhanced Anti-Checkpoint Protection
 * 
 * A powerful Node.js library for automating Facebook Messenger interactions.
 * Built by Bach Hoang (Bạch Hoàng Chí Tôn) with advanced anti-detection features.
 * Provides a comprehensive API for sending messages, managing threads, retrieving user info,
 * and much more through a clean, promise-based interface.
 * 
 * @module bachhoang-fca
 * @author Bach Hoang (Bạch Hoàng Chí Tôn) - Enhanced Protection & Main Developer
 * @facebook https://www.facebook.com/aoyama.nanami.2025
 * @license MIT
 * 
 * @example Single Account
 * const { login } = require('bachhoang-fca');
 * const fs = require('fs');
 * 
 * const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));
 * 
 * login({ appState }, (err, api) => {
 *   if (err) return console.error(err);
 *   
 *   api.sendMessageMqtt('Hello!', 'THREAD_ID', (err, info) => {
 *     if (err) return console.error(err);
 *     console.log(`Message sent with ID: ${info.messageID}`);
 *   });
 * });
 * 
 * @example Multi-Account Support
 * const { BotManager } = require('bachhoang-fca');
 * 
 * const manager = new BotManager();
 * 
 * await manager.addBot('bot1', { appState: appState1 });
 * await manager.addBot('bot2', { appState: appState2 });
 * 
 * manager.on('message', ({ botId, event }) => {
 *   console.log(`Bot ${botId} received: ${event.body}`);
 * });
 * 
 * // Broadcast to all bots
 * await manager.broadcast('Hello from all accounts!', threadID);
 */

module.exports = { login, BotManager };
