'use strict';

const check = {
  user: (ctx) => {
    return (
      process.env.ID_OWNER == ctx.message.from.id ||
      process.env.ID_DEV == ctx.message.from.id
    );
  },

  userEditedMessage: (ctx) => {
    return (
      process.env.ID_OWNER == ctx.editedMessage.from.id ||
      process.env.ID_DEV == ctx.editedMessage.from.id
    );
  },

  message: (ctx) => {
    return ctx.message.text.includes('+') || ctx.message.text.includes('-');
  },

  editedMessage: (ctx) => {
    return (
      ctx.editedMessage.text.includes('+') ||
      ctx.editedMessage.text.includes('-')
    );
  },
};

module.exports = check;
