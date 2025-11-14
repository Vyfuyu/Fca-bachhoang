const { expect } = require('chai');
const toughCookie = require('tough-cookie');

describe('Integration Tests', function() {
  this.timeout(5000);

  describe('Dependencies CommonJS Compatibility', () => {
    it('should load tough-cookie as CommonJS (not ESM)', () => {
      expect(toughCookie).to.be.an('object');
      expect(toughCookie.CookieJar).to.be.a('function');
      
      const jar = new toughCookie.CookieJar();
      expect(jar).to.be.instanceOf(toughCookie.CookieJar);
    });

    it('should create a cookie jar without errors', () => {
      const { CookieJar } = toughCookie;
      const jar = new CookieJar();
      
      expect(jar).to.have.property('setCookie');
      expect(jar).to.have.property('getCookies');
    });

    it('should load chalk as CommonJS', () => {
      const chalk = require('chalk');
      expect(chalk.green).to.be.a('function');
      
      const coloredText = chalk.green('test');
      expect(coloredText).to.be.a('string');
    });

    it('should load gradient-string as CommonJS', () => {
      const gradient = require('gradient-string');
      expect(gradient).to.be.a('function');
      
      const gradientFn = gradient(['#FF0000', '#00FF00']);
      expect(gradientFn).to.be.a('function');
      
      const coloredText = gradientFn('test');
      expect(coloredText).to.be.a('string');
    });

    it('should load axios-cookiejar-support as CommonJS', () => {
      delete require.cache[require.resolve('axios-cookiejar-support')];
      const { wrapper } = require('axios-cookiejar-support');
      expect(wrapper).to.be.a('function');
    });

    it('should instantiate axios wrapper from utils', () => {
      delete require.cache[require.resolve('../src/utils/axios')];
      const axiosUtils = require('../src/utils/axios');
      expect(axiosUtils).to.be.an('object');
      expect(axiosUtils.get).to.be.a('function');
      expect(axiosUtils.post).to.be.a('function');
      expect(axiosUtils.getJar).to.be.a('function');
      
      const jar = axiosUtils.getJar();
      expect(jar).to.have.property('setCookie');
    });

    it('should load cheerio as CommonJS', () => {
      const cheerio = require('cheerio');
      expect(cheerio).to.be.an('object');
      expect(cheerio.load).to.be.a('function');
      
      const $ = cheerio.load('<div>test</div>');
      expect($('div').text()).to.equal('test');
    });
  });
});
