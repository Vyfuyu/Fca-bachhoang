const { expect } = require('chai');
const { login, BotManager } = require('../module/index');

describe('bachhoang-fca Basic Tests', function() {
  this.timeout(5000);

  describe('Module Exports', () => {
    it('should export login function', () => {
      expect(login).to.be.a('function');
    });

    it('should export BotManager class', () => {
      expect(BotManager).to.be.a('function');
    });
  });

  describe('BotManager', () => {
    it('should create a new BotManager instance', () => {
      const manager = new BotManager();
      expect(manager).to.be.instanceOf(BotManager);
      expect(manager.bots).to.be.instanceOf(Map);
    });

    it('should have default global options', () => {
      const manager = new BotManager();
      expect(manager.globalOptions).to.have.property('advancedProtection', true);
      expect(manager.globalOptions).to.have.property('cookieRefresh', true);
    });
  });

  describe('Package Structure', () => {
    it('should have correct version in package.json', () => {
      const pkg = require('../package.json');
      expect(pkg.version).to.match(/^\d+\.\d+\.\d+$/);
    });

    it('should have required dependencies', () => {
      const pkg = require('../package.json');
      expect(pkg.dependencies).to.have.property('axios');
      expect(pkg.dependencies).to.have.property('mqtt');
      expect(pkg.dependencies).to.have.property('cheerio');
    });
  });
});
