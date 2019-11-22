#!/usr/bin/env node

const app = require('./app');
const pkg = require('./package.json');
const Bot = require('./bot/bot.js');

const PORT = process.env.PORT || 3000;

Bot();

app.listen(PORT);
console.log(`${pkg.name} v${pkg.version} listening on port ${PORT}`);
