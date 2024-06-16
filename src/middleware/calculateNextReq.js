function calculateNextReq(now, hours, min, sec, ms) {
    const todayAtTime = new Date();
    todayAtTime.setHours(hours, min, sec, ms);

    if(now >= todayAtTime) {
        todayAtTime.setDate(todayAtTime.getDate() + 1);
    }

    return todayAtTime;
}

module.exports = {
    calculateNextReq
}
