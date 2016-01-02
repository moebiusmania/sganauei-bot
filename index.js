var TelegramBot = require('node-telegram-bot-api');

var token = require('./token.js');
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Data
var birre = ['Weiss','Kellerbier','Guinness','Birra piscio'];

// Utilities
function randomize(length){
  return Math.floor(Math.random() * length);
}

bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

bot.onText(/\/cosabevo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var fromIdGroup = msg.chat.id;
  var resp = match[1];
  var num = 0;
  // console.log(msg);
  // console.log(match);
  switch(match[1]){
    case 'birra':
      num = randomize(birre.length);
      console.log(msg);
      console.log(match);
      bot.sendMessage(fromIdGroup, msg.from.first_name + ' che ne dici di una ' + birre[num] + '?');
      break;
    case 'analcolico':
      bot.sendMessage(fromIdGroup, msg.from.first_name + ', se vuoi dell\'acqua puoi infilare la testa nell\'abbeveratoio dei cavalli...');
      break;
    default:
      bot.sendMessage(fromIdGroup, msg.from.first_name + ' almeno dimmi cosa!');
      break;
  }
  // bot.sendMessage(fromId, resp);
});

// Any kind of message
// bot.on('message', function (msg) {
//   var chatId = msg.chat.id;
//   // photo can be: a file path, a stream or a Telegram file_id
//   var photo = 'cats.png';
//   // bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
//   // bot.sendMessage(chatId,'figa boh!');
// });
