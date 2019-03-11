const fs = require('fs');
const chalk = require('chalk');
const { Entropy, charset16 } = require('entropy-string');

const { log } = console;
log(chalk`{whiteBright.bold RANDOM KEY GENERATOR}`);
log('--------------------');

log(chalk`{gray - Reading .env file...}`);
const env = String(fs.readFileSync('.env'));

log(chalk`{gray - Creating new Key...}`);
const entropy = new Entropy({ charset: charset16 });
const key = entropy.token().substr(0, 32);

const newEnv = env.replace(/SECRET_KEY=.+/, `SECRET_KEY=${key}`);
log(chalk`{gray - Saving new .env file...}`);
fs.writeFileSync('.env', newEnv);

log('\n');
log(chalk`{bold New Key Generated!}`);
log(chalk`{bgRedBright.bold ${key}}`);
log('\n');
log(chalk`{red Please make sure to keep this key safe, ortherwise you won't be able to decrypt your data!}`);
