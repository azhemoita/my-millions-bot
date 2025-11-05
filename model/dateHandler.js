'use strict';

function dateStamp() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Tomsk',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  return formatter.format(now);
}

module.exports = dateStamp;
