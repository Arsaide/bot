const { getGroupCollection} = require('../../db/database');
const { growProgress } = require("../../middleware/growProgress");
const {formatTimeLeft} = require("../../middleware/formatTimeLeft");
const {getDickRank} = require("../../middleware/getDickRank")

const checkInCommand = async (ctx) => {
    if(ctx.chat.type === 'private') {
        await ctx.reply('Ця команда доступна лише у групах.');
        return;
    }

    try {
        const GroupUser = await getGroupCollection(ctx.chat.id);
        const user = await GroupUser.findOne({ id: ctx.from.id });

        const now = new Date();

        if (user) {
            const userLastRequestTime = new Date(user.lastRequest);

            const nextAllowedTime = new Date(userLastRequestTime);
            nextAllowedTime.setDate(nextAllowedTime.getDate() + 1);
            nextAllowedTime.setHours(6, 0, 0, 0);

            if (now < nextAllowedTime) {
                const timeLeft = formatTimeLeft(nextAllowedTime - now);
                await ctx.reply(`@${ctx.from.username}, \nСпроба оновлюється щодня о 6:00. \nЗалишилось часу до наступної спроби: ${timeLeft}\nТвій пісюн: ${user.flower} см. \nРанг пісюна: <b><i>${getDickRank(user.flower)}</i></b>.`, {parse_mode: "HTML"});
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
