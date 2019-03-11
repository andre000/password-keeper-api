const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

module.exports = {
  encrypt(text) {
    const iv = randomBytes(IV_LENGTH / 2).toString('hex');
    const cipher = createCipheriv(ALGORITHM, process.env.SECRET_KEY, iv);
    const crypted = iv + cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return crypted;
  },
  decrypt(text) {
    const iv = text.substr(0, IV_LENGTH);
    const decipher = createDecipheriv(ALGORITHM, process.env.SECRET_KEY, iv);
    const dec = decipher.update(text.substr(IV_LENGTH), 'hex', 'utf8') + decipher.final('utf8');
    return dec;
  },
};
