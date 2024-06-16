const getDickRank = (flower) => {
    if (flower <= 0) {
        return 'лох';
    } else if (flower <= 100) {
        return 'малєнькій пісюн...';
    } else if (flower <= 250) {
        return 'класний пісюн';
    } else if(flower <= 400) {
        return 'Євростандарт'
    } else if (flower <= 550) {
        return 'Козак';
    } else if (flower <= 750) {
        return "Сором'язливий";
    } else if (flower <= 850) {
        return 'Бешкетник';
    } else if (flower <= 1100) {
        return 'Ого, маєш гарний хуй';
    } else if (flower <= 1500) {
        return 'Гігант';
    } else if (flower <= 2000) {
        return 'Звір';
    } else if (flower <= 2500) {
        return 'ХЗ';
    } else if (flower <= 3000) {
        return 'ХЗ';
    } else {
        return 'Навіть слів немає';
    }
};

module.exports = {
    getDickRank: getDickRank
}
