'use strict';
const { message, editedMessage } = require('telegraf/filters');
const dateStamp = require('../model/dateHandler');
const sumResult = require('../controller/calculator');
const { fileHandlers } = require('../model/fileHandler');
const messages = require('../view/messages');
const check = require('../controller/check');
const numFormat = new Intl.NumberFormat('ru-RU');

function handlers(bot) {
  bot.hears('Посмотреть историю', (ctx) => {
    check.user
      ? fileHandlers.replyHTML(ctx, messages)
      : ctx.reply(messages.noRights);
  });

  bot.on('message', async (ctx) => {
    const contentTxt = `>|${dateStamp}|${ctx.message.text}\n`;

    const content = `>|${dateStamp}| (${ctx.message.text}) = ${numFormat.format(
      sumResult.sum(ctx.message.text)
    )} |(30% - ${sumResult.sum(ctx.message.text) * 0.3})\n`;

    const recordTxt = `<u>>|${dateStamp}| <b>${ctx.message.text}</b></u>\n`;

    const record = `<u>>|${dateStamp}| ${
      ctx.message.text
    } = <b>${numFormat.format(
      sumResult.sum(ctx.message.text)
    )}</b> (<i>30%</i> - ${numFormat.format(
      sumResult.sum(ctx.message.text) * 0.3
    )})</u>\n`;

    (await check.user)
      ? await ctx
          .react(`✍`, true)
          .then(
            fileHandlers.recToTxt(
              (await check.message(ctx)) ? content : contentTxt
            )
          )
          .then(
            fileHandlers.recToHTML(
              (await check.message(ctx)) ? record : recordTxt
            )
          )
          .catch((err) => ctx.reply(err))
      : ctx.reply(messages.doNotWriteResult);

    (await check.message(ctx))
      ? await ctx.reply(
          `${ctx.message.text} = ${numFormat.format(
            sumResult.sum(ctx.message.text)
          )} (30% - ${numFormat.format(sumResult.sum(ctx.message.text) * 0.3)})`
        )
      : await ctx.reply(`${ctx.message.text}`);
  });

  bot.on(editedMessage, async (ctx) => {
    const contentTxt = `>|${dateStamp}|${ctx.editedMessage.text}\n`;

    const content = `>|${dateStamp}| (${
      ctx.editedMessage.text
    }) = ${numFormat.format(sumResult.sum(ctx.editedMessage.text))} |(30% - ${
      sumResult.sum(ctx.editedMessage.text) * 0.3
    }) изменено\n`;

    const recordTxt = `<u>>|${dateStamp}| <b>${ctx.editedMessage.text}</b></u>\n`;

    const record = `<u>>|${dateStamp}| ${
      ctx.editedMessage.text
    } = <b>${numFormat.format(
      sumResult.sum(ctx.editedMessage.text)
    )}</b> (<i>30%</i> - ${numFormat.format(
      sumResult.sum(ctx.editedMessage.text) * 0.3
    )})</u> ✍️\n`;

    (await check.userEditedMessage)
      ? await ctx
          .react(`⚡`, true)
          .then(
            fileHandlers.recToTxt(
              (await check.editedMessage(ctx)) ? content : contentTxt
            )
          )
          .then(
            fileHandlers.recToHTML(
              (await check.editedMessage(ctx)) ? record : recordTxt
            )
          )
          .catch((err) => ctx.reply(err))
      : ctx.reply(messages.doNotWriteResult);

    (await check.editedMessage(ctx))
      ? await ctx.reply(
          `${ctx.editedMessage.text} = ${numFormat.format(
            sumResult.sum(ctx.editedMessage.text)
          )} (30% - ${numFormat.format(
            sumResult.sum(ctx.editedMessage.text) * 0.3
          )})`
        )
      : await ctx.reply(`${ctx.editedMessage.text}`);
  });
}

module.exports = {
  handlers,
};
