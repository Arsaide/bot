const { getGroupCollection, User} = require('../../db/database');

const checkInCommand = async (ctx) => {
    if(ctx.chat.type === 'private') {
        await ctx.reply('Эта команда доступна только в группах.');
        return;
    }

    try {
        const GroupUser = await getGroupCollection(ctx.chat.id);
        const user = await GroupUser.findOne({ id: ctx.from.id });

        const now = new Date();
        const fiveMinutes = 60 * 1000;

        if (user) {
            if (user.lastRequest && (now - user.lastRequest) < fiveMinutes) {
                await ctx.reply(`${ctx.from.username}, Вы можете отправлять запросы раз в 1 минут. Попробуйте позже.`);
            } else {
                user.lastRequest = now;
                await user.save();
                await ctx.reply(`@${ctx.from.username}, Ваш запрос принят.`);
            }
        } else {
            const newUser = new GroupUser({
                id: ctx.from.id,
                first_name: ctx.from.first_name,
                last_name: ctx.from.last_name,
                username: ctx.from.username,
                lastRequest: now,
            });
            await newUser.save();
            await ctx.reply(`@${ctx.from.username}, Ваш запрос принят.`);
        }
    } catch (error) {
        console.error('Ошибка при выполнении команды checkInCommand:', error);
        await ctx.reply('Произошла ошибка при выполнении команды. Пожалуйста, попробуйте позже.');
    }
};


module.exports = {
    checkInCommand,
};
