const Telegraf = require('telegraf');
const bot = new Telegraf("884700053:AAFt-XLiEHOkGNUFpcZyyoMwfOvp2SU4DiI");

module.exports = Bot => {
    bot.start((ctx) => ctx.reply(`Имя - ${ctx.from.first_name}\nФамилия - ${ctx.from.last_name}\nId - ${ctx.from.id}\nTelephone - ${ctx.telegram}`))
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.command('/name', (ctx) => ctx.reply(`${ctx.from.username}`))
    bot.command('/id', (ctx) => ctx.reply(`${ctx.from.id}`))
    bot.on('sticker', (ctx) => ctx.reply('👍'))
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.launch();
}