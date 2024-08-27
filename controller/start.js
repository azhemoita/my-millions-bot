'use strict';
const { Markup } = require('telegraf');

function start(bot) {
  bot.start(async (ctx) => {
    await ctx.reply(
      'Добавлена кнопка просмота истории...',
      Markup.keyboard([['Посмотреть историю']])
        .resize()
        .oneTime()
    );
  });
}

module.exports = {
  start,
};
