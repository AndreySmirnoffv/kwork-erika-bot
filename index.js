import nodeTelegramBotApi from 'node-telegram-bot-api'
import { config } from 'dotenv'
import { keyboard } from './assets/keyboards/keyboard.js'
import { getCredit } from './assets/scripts/getCredit.js'

config({path: "./assets/modules/.env"})

const bot = new nodeTelegramBotApi(process.env.TOKEN, {polling: true})

bot.on('message', async msg => {
    if (msg.text === "/start"){
        console.log(msg.chat.id, msg.from.username)
        await bot.sendMessage(msg.chat.id, `Привет ${msg.from.username}, Нажми на кнопку чтобы оформить кредит`, keyboard)
    }
})


bot.on('callback_query', async msg => {
    if (msg.data === "credit"){
        await getCredit(bot, msg)
    }
})

bot.on('polling_error', console.log)