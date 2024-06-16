const getDickRank = (flower) => {
    if (flower <= 0) {
        return 'лох';
    } else if (flower <= 100) {
        return 'малэнькій пісюн...';
    } else if (flower <= 250) {
        return 'класний пісюн';
    } else if (flower <= 700) {
        return 'Гарний хуй';
    } else if (flower >= 1100) {
        return 'Гігант';
    } else {
        return 'Я в шоці';
    }
};

module.exports = {
    getDickRank: getDickRank
}
