'use strict';

const sumResult = {
  sumOld: (textToArray) =>
    textToArray
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

  sum: (text) =>
    eval(
      Array.from(text)
        .filter((elem) =>
          elem === '0' || elem === '.' || elem === '-' || elem === '+'
            ? true
            : parseInt(elem, 10)
        )
        .reduce((sum, el) => (sum += el), '')
    ),
};

module.exports = sumResult;
