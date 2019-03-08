const { createCipher, createDecipher } = require('crypto');

const ALGORITHM = 'aes-256-ctr';

module.exports = {
  encrypt(text) {
    const cipher = createCipher(ALGORITHM, process.env.SECRET_KEY);
    const crypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return crypted;
  },
  decrypt(text) {
    const decipher = createDecipher(ALGORITHM, process.env.SECRET_KEY);
    const dec = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    return dec;
  },
};
