'use strict';
const { Telegraf } = require('telegraf');
const { start } = require('./controller/start');
const { help } = require('./controller/help');
const { handlers } = require('./middleware/botHandlers');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

start(bot);
help(bot);
handlers(bot);

bot
  .launch()
  .then(() => console.log('Бот запущен!'))
  .catch((err) => console.log(err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
