'use strict';
const { Input } = require('telegraf');
const messages = require('../view/messages');
const {
  fileHandlers,
  pathToFile,
  pathToHTMLFile,
} = require('../model/fileHandler');
const check = require('./check');

function commands(bot) {
  bot.command('check', (ctx) => {
    check.user
      ? fileHandlers.getStat(ctx, messages, Input)
      : ctx.reply(messages.noRights);
  });

  bot.command('historytxt', (ctx) => {
    check.user
      ? fileHandlers.read(ctx, messages, pathToFile)
      : ctx.reply(messages.noRights);
  });

  bot.command('history', (ctx) => {
    check.user
      ? fileHandlers.read(ctx, messages, pathToHTMLFile)
      : ctx.reply(messages.noRights);
  });

  bot.command('clear', (ctx) => {
    check.user || check.userEditedMessage
      ? fileHandlers
          .clearFiles()
          .then(() => ctx.reply(`${messages.filesIsClear}`))
          .catch((err) => ctx.reply(`${messages.filesDoNotClear} ${err}`))
      : ctx.reply(messages.noRights);
  });
}

module.exports = {
  commands,
};
