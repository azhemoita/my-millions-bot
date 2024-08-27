'use strict';

const date = new Date();
const dateStamp = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'short',
  year: '2-digit',
}).format(date);

module.exports = dateStamp;
