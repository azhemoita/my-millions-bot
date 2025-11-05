'use strict';

const { query } = require('../model/db');

const sumResult = {
  sumOld: (textToArray) =>
    textToArray
      .toString('utf8')
      .trim()
      .split('+')
      .map((el) =>
        Array.from(el)
          .filter((elem) =>
            elem === '0' || elem === '.' || elem === '-'
              ? true
              : parseInt(elem, 10)
          )
          .reduce((sum, el) => (sum += el), '')
      )
      .map((el) => el.split('-'))
      .map((el) =>
        el.length > 1 ? el.reduce((sum, el) => (sum -= Number(el))) : Number(el)
      )
      .reduce((sum, el) =>
        el === '' || el === '.' ? sum : (sum += Number(el))
      ),

  sum: async (text, messageId, isInsert) => {
    let expr = text.toString('utf8').replace(/[^0-9+\-*/.()]/g, '');
    expr = expr.replace(/([+\-*/])\1+/g, '$1');
    expr = expr.replace(/^[+\/*]+/, '');

    let result;
    try {
      if (!/^[0-9+\-*/.()]+$/.test(expr)) throw new Error();
      result = Function(`"use strict"; return (${expr})`)();
    } catch {
      return 'Invalid expression';
    }

    if (typeof result === 'number' && !isNaN(result) && isInsert) {
      try {
        await query(
          'INSERT INTO `dens_millions` (id, expression,	result, percentage_30, date) VALUES (?, ?, ?, ?, NOW())',
          [
            messageId,
            expr,
            result,
            Math.round((result * 0.3 + Number.EPSILON) * 100) / 100,
          ]
        );
      } catch (error) {
        console.error('Error inserting to DB: ', error);
      }
    }

    return result;
  },

  getHistory: async (limit = 10) => {
    try {
      const rows = await query(
        'SELECT expression, result, percentage_30, date FROM dens_millions ORDER BY date DESC LIMIT ?',
        [limit]
      );
      return rows;
    } catch (error) {
      console.error('Error reading history from DB: ', error);
      return [];
    }
  },

  updateRecord: async (expression, newResult, percentage30, messageId) => {
    try {
      const sql = `
      UPDATE dens_millions
      SET expression = ?, result = ?, percentage_30 = ?, date = CURRENT_TIMESTAMP
      WHERE dens_millions.id = ?
      `;
      const result = await query(sql, [
        expression,
        newResult,
        percentage30,
        messageId,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating record: ', error);
      return false;
    }
  },
};

module.exports = sumResult;
