'use strict';
const messages = require('../view/messages');

function help(bot) {
  bot.help((ctx) => {
    ctx.reply(messages.help);
  });
}

module.exports = {
  help,
};
