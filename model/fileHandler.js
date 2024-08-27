'use strict';
const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');
const pathToFile = path.resolve(__dirname, 'data/file.txt');
const pathToHTMLFile = path.resolve(__dirname, 'data/data.html');

const fileHandlers = {
  recToTxt: (sumData) =>
    fs.appendFile(pathToFile, sumData, (error) => {
      if (error) {
        console.log(error);
      }
    }),

  recToHTML: (htmlData) =>
    fs.appendFile(pathToHTMLFile, htmlData, (err) => {
      if (err) console.log(err);
    }),

  clearFiles: async () => {
    const content = '';
    await fsPromises
      .writeFile(pathToFile, content)
      .then(() => fsPromises.writeFile(pathToHTMLFile, content))
      .catch((err) => console.error(err));
  },

  getStat: (ctx, messages, Input) => {
    fs.stat(pathToFile, (err, stats) => {
      if (err) {
        ctx.reply(err);
        return;
      }
      stats.size <= 0
        ? ctx.reply(messages.fileIsEmpty)
        : stats.size > 51200000
        ? ctx.reply(messages.fileIsBig)
        : ctx.replyWithDocument(Input.fromLocalFile(pathToFile));
    });
  },

  read: (ctx, messages, pathFile) => {
    fs.readFile(pathFile, 'utf-8', (err, data) => {
      if (err) {
        ctx.reply(err);
      } else {
        ctx.reply(data ? data : messages.emptyStory);
      }
    });
  },

  replyHTML: (ctx, messages) => {
    fs.readFile(pathToHTMLFile, 'utf-8', (err, data) => {
      if (err) {
        ctx.reply(err);
      } else {
        ctx.replyWithHTML(data ? data : messages.emptyStory);
      }
    });
  },
};

module.exports = {
  pathToFile,
  pathToHTMLFile,
  fileHandlers,
};
