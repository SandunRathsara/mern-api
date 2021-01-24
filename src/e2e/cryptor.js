const crypto = require('crypto');
const logger = require('../log');

class e2e {
  constructor(Key) {
    this.key = Key.slice(0, 32);
    this.iv = 'TsRvBcpinxqjASnV'; //randomString.generate(16);
    this.cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    this.decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
  }

  encrypt(message) {
    try {
      let encrypted = this.cipher.update(message, 'utf8', 'hex');
      encrypted += this.cipher.final('hex');
      return encrypted;
    } catch (error) {
      logger.error(`Encryption Failure | ${error.message}`);
    }
  }

  decrypt(message) {
    try {
      let decrypted = this.decipher.update(message, 'hex', 'utf8');
      decrypted += this.decipher.final('utf8');
      return decrypted;
    } catch (error) {
      logger.error(`Encryption Failure | ${error.message}`);
    }
  }
}

module.exports = { e2e };
