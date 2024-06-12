const { getGroupCollection } = require('../db/database');

async function growProgress(ctx) {
    try {
        const GroupUser = await getGroupCollection(ctx.chat.id);
        const user = await GroupUser.findOne({ id: ctx.from.id });

        if (user && user.flower !== undefined) {
            let growth = 0;

            const randomNumber = Math.floor(Math.random() * 100);

            if(randomNumber < 1) {
                growth = 15;
            } else if (randomNumber < 35) {
                growth = -Math.floor(Math.random() * 11);
            } else {
                growth = Math.floor(Math.random() * 11);
            }

            user.flower += growth;
            await user.save();

            await ctx.reply(`@${ctx.from.username}, ваша квітка виросла на ${growth} см. Усього у вас ${user.flower} см.`);
        } else {
            await ctx.reply(`Не вдалося знайти користувача або значення flower не визначено.`);
        }

        console.log('Квітка виросла на випадкову кількість умовних одиниць');
    } catch (error) {
        console.error('Помилка у виконані функції growProgress:', error);
        throw error;
    }
}

module.exports = {
    growProgress,
};
