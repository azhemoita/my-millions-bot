'use strict';
const { message, editedMessage } = require('telegraf/filters');
const dateStamp = require('../model/dateHandler');
const sumResult = require('../controller/calculator');
const messages = require('../view/messages');
const check = require('../controller/check');
const numFormat = new Intl.NumberFormat('ru-RU');

function handlers(bot) {
  bot.hears('Посмотреть историю', async (ctx) => {
    if (!(await check.user)) {
      return ctx.reply(messages.noRights);
    }

    const history = await sumResult.getHistory(10);

    if (history.length === 0) {
      return ctx.reply('История пуста 📭');
    }

    let replyText = '<b>Последние вычисления:</b>\n\n';
    for (const row of history) {
      replyText += `<u>${dateStamp(row.date)}</u> | <u>${
        row.expression
      }</u> = <b>${row.result}</b> (30% - ${row.percentage_30})\n`;
    }

    await ctx.reply(replyText, { parse_mode: 'HTML' });
  });

  bot.on('message', async (ctx) => {
    const expr = ctx.message.text;
    const messageId = ctx.message.message_id;
    const isInsert = true;
    const result = await sumResult.sum(expr, messageId, isInsert);
    const percent30 = typeof result === 'number' ? result * 0.3 : null;
    const canWrite = await check.message(ctx);

    if (await check.user) {
      await ctx.react('✍', true);
    } else {
      return ctx.reply(messages.doNotWriteResult);
    }

    canWrite
      ? await ctx.reply(
          `${expr} = ${numFormat.format(result)} (30% - ${numFormat.format(
            percent30
          )})`
        )
      : await ctx.reply(expr);
  });

  bot.on(editedMessage, async (ctx) => {
    const expr = ctx.editedMessage.text;
    const messageId = ctx.editedMessage.message_id;
    const isInsert = false;
    const canWrite = await check.editedMessage(ctx);
    const isUserAllowed = await check.userEditedMessage;
    const result = await sumResult.sum(expr, messageId, isInsert);
    const percent30 = typeof result === 'number' ? result * 0.3 : null;

    if (!isUserAllowed) {
      return ctx.reply(messages.doNotWriteResult);
    }

    await ctx.react('⚡', true);

    const updated = await sumResult.updateRecord(
      expr,
      result,
      percent30,
      messageId
    );

    if (!updated) {
      console.warn(
        'No matching record found for update - interesting instead.'
      );
      await query(
        'INSERT INTO dens_millions (expression, result, percentage_30) VALUES (?, ?, ?)',
        [expr, result, percent30]
      );
    }

    if (canWrite) {
      await ctx.reply(
        `${expr} = ${numFormat.format(result)} (30% - ${numFormat.format(
          percent30
        )})`
      );
    } else {
      await ctx.reply(expr);
    }
  });
}

module.exports = {
  handlers,
};
