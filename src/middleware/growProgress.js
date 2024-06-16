const { getGroupCollection } = require('../db/database');
const {getDickRank} = require("./getDickRank");

const negativeWords = ['зменшився', 'зав\'яв', 'розірвали', 'з\'їли'];
const positiveWords = ['виріс', 'посипали содою і він виріс', 'созрів', 'зміцнився', 'витягнувся', 'розквітнув']

async function growProgress(ctx) {
    try {
        const GroupUser = await getGroupCollection(ctx.chat.id);
        const user = await GroupUser.findOne({ id: ctx.from.id });

        if (user && user.flower !== undefined) {
            let growth = 0;

            const randomNumber = Math.floor(Math.random() * 100);

            if (randomNumber < 1) {
                growth = 15;
            } else if (randomNumber < 35) {
                growth = -Math.floor(Math.random() * 10) - 1; // -10 -> -1
            } else {
                growth = Math.floor(Math.random() * 10) + 1; // 1 -> 10
            }

            user.flower += growth;
            await user.save();

            const wordArray = growth < 0 ? negativeWords : positiveWords;
            const randomIndex = Math.floor(Math.random() * wordArray.length);
            const randomWord = wordArray[randomIndex];

            await ctx.reply(`@${ctx.from.username}, твій пісюн ${randomWord} на ${growth} см. У тебе ${user.flower} см. Ранг пісюна: ${getDickRank(user.flower)}`);
        } else {
            await ctx.reply(`Сталася помилка в розрахуйнках або не вдалося знайти користувача або твій пісюн занадто маленький, що навіть бот його не визначив...`);
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
