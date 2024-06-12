const { getGroupCollection} = require('../../db/database');
const { growProgress } = require("../../func/calc");

const checkInCommand = async (ctx) => {
    if(ctx.chat.type === 'private') {
        await ctx.reply('Ця команда доступна лише у групах.');
        return;
    }

    try {
        const GroupUser = await getGroupCollection(ctx.chat.id);
        const user = await GroupUser.findOne({ id: ctx.from.id });

        const now = new Date();
        const fiveMinutes = 1000;

        if (user) {
            if (user.lastRequest && (now - user.lastRequest) < fiveMinutes) {
                await ctx.reply(`${ctx.from.username}, Ви можете надсилати запити раз на 1 хвилину. Спробуй пізніше.`);
            } else {
                user.lastRequest = now;
                await user.save();
                await growProgress(ctx);
            }
        } else {
            const newUser = new GroupUser({
                id: ctx.from.id,
                first_name: ctx.from.first_name,
                last_name: ctx.from.last_name,
                username: ctx.from.username,
                lastRequest: now,
                flower: 0,
            });
            await newUser.save();
            await growProgress(ctx);
        }
    } catch (error) {
        console.error('Ошибка при выполнении команды checkInCommand:', error);
        await ctx.reply('Сталася помилка під час виконання команди. Будь ласка, спробуйте пізніше.');
    }
};


module.exports = {
    checkInCommand,
};
