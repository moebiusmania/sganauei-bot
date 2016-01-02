'use strict';

// Imports
var TelegramBot = require('node-telegram-bot-api');
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');

// Setup token
var token = require('./token.js');

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Utilities
function randomize(length){
  return Math.floor(Math.random() * length);
}

bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// bot.onText(/\/cosabevo/, function (msg, match) {
//   var fromId = msg.chat.id ? msg.chat.id : msg.from.id;
//   var resp = match[1];
//   bot.sendMessage(fromId, 'Sono ancora in fase di sviluppo, per ora puoi chiedermi consigli tra:');
//   bot.sendMessage(fromId, '- birre');
//   bot.sendMessage(fromId, '- analcolici (a tuo rischio e pericolo)');
// });

bot.onText(/\/cosabevo (.+)/, function (msg, match) {
  var fromId = msg.chat.id ? msg.chat.id : msg.from.id;
  var resp = match[1];
  var num = 0;
  let myData;
  // console.log(msg);
  console.log(match);
  switch(match[1]){
    case 'birra':
      bot.sendMessage(fromId,'fammi pensare...');
      fetch('https://sganauei-bot.firebaseio.com/beers.json')
        .then((res) => {
          return res.json();
        }).then((json) => {
          myData = json;
          num = randomize(myData.length);
          bot.sendMessage(fromId, msg.from.first_name + ' che ne dici di una ' + myData[num] + '?');
        });
      break;
    case 'analcolico':
      bot.sendMessage(fromId, msg.from.first_name + ', se vuoi dell\'acqua puoi infilare la testa nell\'abbeveratoio dei cavalli...');
      break;
    default:
      bot.sendMessage(fromId, 'Ancora non ho consigli a riguardo 😭');
      break;
  }
});

// Any kind of message
// bot.on('message', function (msg) {
//   var chatId = msg.chat.id;
//   // photo can be: a file path, a stream or a Telegram file_id
//   var photo = 'cats.png';
//   // bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
//   // bot.sendMessage(chatId,'figa boh!');
// });
