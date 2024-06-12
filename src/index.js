require('dotenv').config();
const {Bot, GrammyError, HttpError} = require('grammy');
const { connectDB } = require('./db/database');
const { checkInCommand } = require('./commands/check/check');
const { startCommand } = require('./commands/start/start');

const bot = new Bot(process.env.BOT_API_KEY);

const startBot = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Задержка в 2 секунды
        bot.start();
    } catch (e) {
        console.error('Failed to start bot', e);
    }
};

connectDB().then(() => {
    console.log('Database connected');

    bot.api.setMyCommands([
        {
            command: 'start',
            description: 'Запускает бота',
        },
        {
            command: 'hello',
            description: 'Получить приветствие',
        },
        {
            command: 'check',
            description: 'Проверить интервал',
        }
    ]).catch(e => {
        console.error('Failed to set bot commands', e);
    });


    bot.command('start', startCommand);

    bot.command('check', checkInCommand)

    bot.hears(['Анечка', 'Кирилл', 'анечка', 'кирилл'], async (ctx) => {
        if (ctx.msg.text === 'Анечка') {
            await ctx.reply(`Богиня`);
        } else if (ctx.msg.text === 'Кирилл') {
            await ctx.reply('Бог');
        }
    });

    bot.catch((err) => {
        const ctx = err.ctx;
        console.log(`Error while handling update ${ctx.update.update_id}`);
        const e = err.error;

        if (e instanceof GrammyError) {
            console.error('Error in request', e.description);
        } else if (e instanceof HttpError) {
            console.error('Telegram not connect', e);
        } else {
            console.error('Unknown error', e);
        }
    });

    startBot();
}).catch((e) => {
    console.error('Failed to connect to the database', e);
});

