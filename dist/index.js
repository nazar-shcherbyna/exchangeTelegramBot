const {Telegraf} = require("telegraf");
const axios = require('axios');
const cc = require('currency-codes');
const TOKEN = process.env.TOKEN || "1693125881:AAFxpYEDuHibSuX7i7OygBGGjS9i8beA1Is";
const BASE = 'USD'
const bot = new Telegraf(TOKEN);
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
const REQUEST_URL = `https://api.exchangeratesapi.io/latest?base=${BASE}`;

bot.start((ctx) => {
    return ctx.reply('Welcome');
})

bot.hears('/list', async (ctx) => {
    try {
        const currencyObj = await axios.get(REQUEST_URL);
        const currData = currencyObj.data;
        currStorage = localStorage.setItem('currency', currData);

        let arrCurr = []

        for (key in currData.rates) {
            arrCurr.push(key + ' - ' + currData.rates[key].toFixed(2));
        }
        
        return ctx.reply('Список всех валют для конвертации: ' + '\n' + `Базовая ${currData.base}` + '\n' + arrCurr.join('\n'));

    } catch (error){
        return ctx.reply(error);
    }
})

bot.startPolling();