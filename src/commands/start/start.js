const {User} = require("../../db/database");
const startCommand = async (ctx) => {
    try {
        const user = {
            id: ctx.from.id,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            username: ctx.from.username,
        };

        if(ctx.chat.type === 'group') {
            await ctx.reply('Эта команда доступна только в личном чате')
        } else if (ctx.chat.type === 'private') {
            await User.findOneAndUpdate({ id: user.id }, user, { upsert: true, new: true });
            await ctx.reply('Привет! Ты успешно добавлен в базу данных.');
        }
    } catch (error) {
        await ctx.reply('Что то пошло не так')
        console.error('Start command error', error)
    }
};

module.exports = {
    startCommand,
};
