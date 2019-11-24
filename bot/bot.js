const Telegraf = require('telegraf');
const bot = new Telegraf("884700053:AAFt-XLiEHOkGNUFpcZyyoMwfOvp2SU4DiI");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Axios = require('axios');

const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('USD', 'USD_currecny'),
  Markup.callbackButton('EUR', 'EUR_currecny'),
  Markup.callbackButton('RUR', 'RUR_currecny')
]);

function findCurrency(currencyName) {
    return Axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then(function(response){
            let desiredObj = response.data.find((item) => item.ccy == currencyName);
            let currentCurrency = "Выбранная валюта: ccy \nОсновная валюта: base_ccy \nКурс продажи НБУ: sale грн\nКурс покупки НБУ: buy грн"; 
            for (let key in desiredObj) {
                currentCurrency = currentCurrency.replace(key, desiredObj[key]);
            }
            return new Promise((resolve, reject) => {
                resolve(currentCurrency);
            });
    })
}

module.exports = Bot => {
    
    bot.start((ctx) => ctx.reply(`Имя - ${ctx.from.first_name}\nФамилия - ${ctx.from.last_name}\nId - ${ctx.from.id}`))
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.command('/name', (ctx) => ctx.reply(`${ctx.from.username}`))
    bot.command('/id', (ctx) => ctx.reply(`${ctx.from.id}`))
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.command('/getCurrency', (ctx) => ctx.reply('Выберите валюту', Extra.markup(keyboard)))

    bot.action('USD_currecny', (ctx) => findCurrency("USD").then((result) => ctx.reply(result)))
    bot.action('EUR_currecny', (ctx) => findCurrency("EUR").then((result) => ctx.reply(result)))
    bot.action('RUR_currecny', (ctx) => findCurrency("RUR").then((result) => ctx.reply(result)))

    bot.launch();
    
}

