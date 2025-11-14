const { expect } = require('chai');
const EnhancedCheckpointProtection = require('../src/utils/enhancedCheckpointProtection');

describe('Enhanced Checkpoint Protection Tests', function() {
  this.timeout(5000);

  describe('Initialization', () => {
    it('should create protection instance with default settings', () => {
      const protection = new EnhancedCheckpointProtection();
      expect(protection.enabled).to.be.true;
      expect(protection.aggressiveMode).to.be.false;
      expect(protection.suspicionLevel).to.equal(0);
    });

    it('should create protection instance with aggressive mode', () => {
      const protection = new EnhancedCheckpointProtection({ aggressiveMode: true });
      expect(protection.aggressiveMode).to.be.true;
    });

    it('should initialize with empty action history', () => {
      const protection = new EnhancedCheckpointProtection();
      expect(protection.actionHistory).to.be.an('array').that.is.empty;
    });
  });

  describe('Smart Delay Calculation', () => {
    it('should calculate delay for message action', () => {
      const protection = new EnhancedCheckpointProtection();
      const delay = protection.calculateSmartDelay('message');
      expect(delay).to.be.a('number');
      expect(delay).to.be.at.least(800);
      expect(delay).to.be.at.most(5000);
    });

    it('should calculate delay for read action', () => {
      const protection = new EnhancedCheckpointProtection();
      const delay = protection.calculateSmartDelay('read');
      expect(delay).to.be.a('number');
      expect(delay).to.be.at.least(500);
    });

    it('should increase delay in aggressive mode', () => {
      const normalProtection = new EnhancedCheckpointProtection();
      const aggressiveProtection = new EnhancedCheckpointProtection({ aggressiveMode: true });
      
      const normalDelay = normalProtection.calculateSmartDelay('message');
      const aggressiveDelay = aggressiveProtection.calculateSmartDelay('message');
      
      // Aggressive mode should generally have longer delays
      expect(aggressiveDelay).to.be.at.least(normalDelay * 0.8);
    });
  });

  describe('Action Tracking', () => {
    it('should track actions correctly', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.trackAction('message', { threadID: '123' });
      
      expect(protection.actionHistory).to.have.lengthOf(1);
      expect(protection.actionHistory[0].type).to.equal('message');
      expect(protection.stats.actionsPerformed).to.equal(1);
    });

    it('should update suspicion level for fast actions', (done) => {
      const protection = new EnhancedCheckpointProtection();
      protection.lastActionTime = Date.now();
      
      // Simulate very fast action (suspicious)
      setTimeout(() => {
        try {
          protection.trackAction('message');
          expect(protection.suspicionLevel).to.be.above(0);
          done();
        } catch (error) {
          done(error);
        }
      }, 100);
    });

    it('should return safety status after tracking', () => {
      const protection = new EnhancedCheckpointProtection();
      const status = protection.trackAction('message');
      
      expect(status).to.have.property('suspicionLevel');
      expect(status).to.have.property('safetyRating');
      expect(status).to.have.property('recommendation');
    });
  });

  describe('Suspicion Level Management', () => {
    it('should start with zero suspicion', () => {
      const protection = new EnhancedCheckpointProtection();
      expect(protection.suspicionLevel).to.equal(0);
    });

    it('should not exceed 100 suspicion level', () => {
      const protection = new EnhancedCheckpointProtection();
      
      // Simulate many fast actions
      for (let i = 0; i < 50; i++) {
        protection.updateSuspicionLevel('message', 100);
      }
      
      expect(protection.suspicionLevel).to.be.at.most(100);
    });

    it('should decay suspicion over time', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.suspicionLevel = 50;
      
      // Multiple updates should decrease suspicion
      for (let i = 0; i < 100; i++) {
        protection.updateSuspicionLevel('message', 5000); // Normal interval
      }
      
      expect(protection.suspicionLevel).to.be.below(50);
    });
  });

  describe('Safety Ratings', () => {
    it('should return SAFE rating for low suspicion', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.suspicionLevel = 20;
      expect(protection.getSafetyRating()).to.equal('SAFE');
    });

    it('should return CAUTION rating for medium suspicion', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.suspicionLevel = 40;
      expect(protection.getSafetyRating()).to.equal('CAUTION');
    });

    it('should return WARNING rating for high suspicion', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.suspicionLevel = 60;
      expect(protection.getSafetyRating()).to.equal('WARNING');
    });

    it('should return DANGER rating for very high suspicion', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.suspicionLevel = 80;
      expect(protection.getSafetyRating()).to.equal('DANGER');
    });
  });

  describe('Cooldown System', () => {
    it('should trigger cooldown for high suspicion', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.suspicionLevel = 75;
      protection.triggerCooldown();
      
      expect(protection.cooldownUntil).to.be.above(Date.now());
      expect(protection.stats.checkpointAvoided).to.equal(1);
    });

    it('should detect when in cooldown', () => {
      const protection = new EnhancedCheckpointProtection();
      protection.cooldownUntil = Date.now() + 10000;
      
      const status = protection.getSafetyStatus();
      expect(status.inCooldown).to.be.true;
      expect(status.cooldownRemaining).to.be.above(0);
    });
  });

  describe('Statistics', () => {
    it('should track statistics correctly', () => {
      const protection = new EnhancedCheckpointProtection();
      
      protection.trackAction('message');
      protection.trackAction('read');
      protection.calculateSmartDelay('message');
      
      const stats = protection.getStats();
      expect(stats.actionsPerformed).to.equal(2);
      expect(stats.delaysApplied).to.be.at.least(1);
      expect(stats.lastAction).to.have.property('type', 'read');
    });
  });

  describe('Reset Functionality', () => {
    it('should reset protection state', () => {
      const protection = new EnhancedCheckpointProtection();
      
      // Build up some state
      protection.trackAction('message');
      protection.suspicionLevel = 50;
      protection.cooldownUntil = Date.now() + 10000;
      
      // Reset
      protection.reset();
      
      expect(protection.suspicionLevel).to.equal(0);
      expect(protection.cooldownUntil).to.equal(0);
      expect(protection.actionHistory).to.be.empty;
    });
  });

  describe('Gaussian Random Distribution', () => {
    it('should generate values within range', () => {
      const protection = new EnhancedCheckpointProtection();
      
      for (let i = 0; i < 100; i++) {
        const value = protection.gaussianRandom(1000, 3000);
        expect(value).to.be.at.least(1000);
        expect(value).to.be.at.most(3000);
      }
    });

    it('should have different values (not constant)', () => {
      const protection = new EnhancedCheckpointProtection();
      const values = [];
      
      for (let i = 0; i < 10; i++) {
        values.push(protection.gaussianRandom(1000, 3000));
      }
      
      // Check that not all values are the same
      const uniqueValues = [...new Set(values)];
      expect(uniqueValues.length).to.be.above(5);
    });
  });
});
