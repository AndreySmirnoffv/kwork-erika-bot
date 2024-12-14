
import { waitForText } from "../utils/waitForText.js"
import db from '../db/db.json' with {type: "json"}
import * as fs from 'fs'
import { keyboard } from "../keyboards/keyboard.js"

export async function getCredit(bot, msg){

    await bot.sendMessage(msg.message.chat.id, "Пришли мне ФИО")

    const fio = await waitForText(bot, msg.message.chat.id)

    await bot.sendMessage(msg.message.chat.id, "Пришлите мне ваш номер")

    const phone = await waitForText(bot, msg.message.chat.id)

    if (!phone.startsWith('+') || phone.length != 12) {

        return await bot.sendMessage(msg.message.chat.id, "Номер телефона должен начинаться с '+'. Попробуйте снова. и не бы", keyboard)

    }

    await bot.sendMessage(msg.message.chat.id, "Пришлите мне вашу почту")

    const email = await waitForText(bot, msg.message.chat.id)
    

    if (!email.includes('@')) {

        return await bot.sendMessage(msg.message.chat.id, "Некорректный адрес электронной почты. Почта должна содержать символ '@'. Попробуйте снова.", keyboard)

    }

    await bot.sendMessage(msg.message.chat.id, "Введите сумму которую хотите взять. (она должна быть не меньше 1000000 рублей)")

    const amount = await waitForText(bot, msg.message.chat.id)

    if (amount < 1000000) {

        return await bot.sendMessage(msg.message.chat.id, "Ты ввел некорректную сумму. Попробуй снова", keyboard)

    }

    db.push({
        fio: fio,
        phone: phone,
        email: email,
        amount: amount
    })

    fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))

    await bot.sendMessage(msg.message.chat.id, `ФИО: ${fio}\nНомер телефона: ${phone}\nПочта: ${email}\nСумма: ${amount}`) 

    await bot.sendMessage(576819186, `ФИО: ${fio}\nНомер телефона: ${phone}\nПочта: ${email}\nСумма: ${amount}`) // iambidexter

}