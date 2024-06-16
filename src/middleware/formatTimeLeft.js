function formatTimeLeft(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}год. ${minutes}хв.`
}

module.exports = {
    formatTimeLeft
}
