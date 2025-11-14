"use strict";

const crypto = require("crypto");
const logger = require("./logger");

/**
 * Enhanced Anti-Checkpoint Protection System
 * Advanced techniques to avoid Facebook checkpoint detection
 * 
 * Built by Bach Hoang (Bạch Hoàng Chí Tôn)
 */

class EnhancedCheckpointProtection {
    constructor(options = {}) {
        this.enabled = options.enabled !== false;
        this.aggressiveMode = options.aggressiveMode || false;
        this.stats = {
            actionsPerformed: 0,
            checkpointAvoided: 0,
            sessionRotations: 0,
            delaysApplied: 0,
            lastAction: null
        };
        
        // Behavioral patterns
        this.actionHistory = [];
        this.maxHistorySize = 1000;
        
        // Timing patterns
        this.lastActionTime = Date.now();
        this.actionIntervals = [];
        
        // Session state
        this.suspicionLevel = 0; // 0-100
        this.cooldownUntil = 0;
        
        if (this.enabled) {
            logger.success('Enhanced Checkpoint Protection: ACTIVE');
            if (this.aggressiveMode) {
                logger.warn('Aggressive Mode: ENABLED (Maximum Protection)');
            }
        }
    }
    
    /**
     * Calculate dynamic delay based on action type and current suspicion level
     */
    calculateSmartDelay(actionType) {
        const baseDelays = {
            'message': { min: 800, max: 3000 },
            'read': { min: 500, max: 1500 },
            'typing': { min: 300, max: 1000 },
            'reaction': { min: 400, max: 1200 },
            'thread_action': { min: 1000, max: 4000 },
            'login': { min: 2000, max: 5000 }
        };
        
        const delays = baseDelays[actionType] || { min: 500, max: 2000 };
        
        // Increase delay based on suspicion level
        const suspicionMultiplier = 1 + (this.suspicionLevel / 100);
        const aggressiveMultiplier = this.aggressiveMode ? 1.5 : 1.0;
        
        const min = delays.min * suspicionMultiplier * aggressiveMultiplier;
        const max = delays.max * suspicionMultiplier * aggressiveMultiplier;
        
        // Add randomness with gaussian distribution for more natural timing
        const delay = this.gaussianRandom(min, max);
        
        this.stats.delaysApplied++;
        return Math.floor(delay);
    }
    
    /**
     * Gaussian random number generator (Box-Muller transform)
     * Creates more natural, human-like timing patterns
     */
    gaussianRandom(min, max) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        
        // Map to range
        const mean = (min + max) / 2;
        const stdDev = (max - min) / 6; // 99.7% of values within range
        
        let result = mean + z0 * stdDev;
        return Math.max(min, Math.min(max, result));
    }
    
    /**
     * Track action and update suspicion level
     */
    trackAction(actionType, metadata = {}) {
        const now = Date.now();
        const timeSinceLastAction = now - this.lastActionTime;
        
        // Record action
        this.actionHistory.push({
            type: actionType,
            timestamp: now,
            interval: timeSinceLastAction,
            metadata
        });
        
        // Trim history
        if (this.actionHistory.length > this.maxHistorySize) {
            this.actionHistory.shift();
        }
        
        // Update intervals
        this.actionIntervals.push(timeSinceLastAction);
        if (this.actionIntervals.length > 100) {
            this.actionIntervals.shift();
        }
        
        // Calculate suspicion level
        this.updateSuspicionLevel(actionType, timeSinceLastAction);
        
        // Update stats
        this.stats.actionsPerformed++;
        this.stats.lastAction = { type: actionType, timestamp: now };
        this.lastActionTime = now;
        
        return this.getSafetyStatus();
    }
    
    /**
     * Update suspicion level based on behavior patterns
     */
    updateSuspicionLevel(actionType, interval) {
        // Decrease suspicion over time (natural decay)
        const decayRate = 0.01;
        this.suspicionLevel = Math.max(0, this.suspicionLevel - decayRate);
        
        // Increase suspicion for suspicious patterns
        
        // 1. Too fast actions
        if (interval < 500) {
            this.suspicionLevel += 5;
            logger.warn('[Checkpoint Protection] Fast action detected, raising suspicion');
        }
        
        // 2. Too consistent intervals (robotic pattern)
        if (this.actionIntervals.length >= 10) {
            const variance = this.calculateVariance(this.actionIntervals.slice(-10));
            if (variance < 1000) { // Very consistent timing
                this.suspicionLevel += 3;
                logger.warn('[Checkpoint Protection] Robotic pattern detected');
            }
        }
        
        // 3. Too many actions in short time
        const recentActions = this.actionHistory.filter(a => 
            Date.now() - a.timestamp < 60000 // Last minute
        ).length;
        
        if (recentActions > 20) {
            this.suspicionLevel += 10;
            logger.warn('[Checkpoint Protection] High activity detected');
        }
        
        // 4. Same action repeated too quickly
        const sameTypeActions = this.actionHistory.filter(a => 
            a.type === actionType && Date.now() - a.timestamp < 10000
        ).length;
        
        if (sameTypeActions > 5) {
            this.suspicionLevel += 5;
            logger.warn('[Checkpoint Protection] Repeated action pattern detected');
        }
        
        // Cap suspicion level
        this.suspicionLevel = Math.min(100, this.suspicionLevel);
        
        // Trigger cooldown if suspicion too high
        if (this.suspicionLevel > 70 && this.cooldownUntil < Date.now()) {
            this.triggerCooldown();
        }
    }
    
    /**
     * Calculate variance of an array
     */
    calculateVariance(arr) {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const squaredDiffs = arr.map(x => Math.pow(x - mean, 2));
        return squaredDiffs.reduce((a, b) => a + b, 0) / arr.length;
    }
    
    /**
     * Trigger cooldown period
     */
    triggerCooldown() {
        const cooldownDuration = this.aggressiveMode ? 300000 : 120000; // 5 min or 2 min
        this.cooldownUntil = Date.now() + cooldownDuration;
        this.stats.checkpointAvoided++;
        
        logger.warn('[Checkpoint Protection] Cooldown activated:', cooldownDuration / 1000, 'seconds');
        logger.info('Suspicion Level:', this.suspicionLevel);
    }
    
    /**
     * Check if we should delay action
     */
    shouldDelay() {
        return this.suspicionLevel > 30 || Date.now() < this.cooldownUntil;
    }
    
    /**
     * Get current safety status
     */
    getSafetyStatus() {
        return {
            suspicionLevel: this.suspicionLevel,
            inCooldown: Date.now() < this.cooldownUntil,
            cooldownRemaining: Math.max(0, this.cooldownUntil - Date.now()),
            safetyRating: this.getSafetyRating(),
            recommendation: this.getRecommendation()
        };
    }
    
    /**
     * Get safety rating (SAFE, CAUTION, WARNING, DANGER)
     */
    getSafetyRating() {
        if (this.suspicionLevel < 30) return 'SAFE';
        if (this.suspicionLevel < 50) return 'CAUTION';
        if (this.suspicionLevel < 70) return 'WARNING';
        return 'DANGER';
    }
    
    /**
     * Get recommendation based on current state
     */
    getRecommendation() {
        const rating = this.getSafetyRating();
        
        switch(rating) {
            case 'SAFE':
                return 'Normal operation';
            case 'CAUTION':
                return 'Slow down slightly';
            case 'WARNING':
                return 'Reduce activity significantly';
            case 'DANGER':
                return 'Stop all actions, wait for cooldown';
            default:
                return 'Unknown';
        }
    }
    
    /**
     * Get protection stats
     */
    getStats() {
        return {
            ...this.stats,
            suspicionLevel: this.suspicionLevel,
            safetyStatus: this.getSafetyStatus()
        };
    }
    
    /**
     * Reset protection state
     */
    reset() {
        this.suspicionLevel = 0;
        this.cooldownUntil = 0;
        this.actionHistory = [];
        this.actionIntervals = [];
        logger.info('[Checkpoint Protection] State reset');
    }
}

module.exports = EnhancedCheckpointProtection;
