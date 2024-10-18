const models = {
    usersModel: require('./nosql/users'),
    storageModel: require('./nosql/storage'),
    reservationModel: require('./nosql/reservation'),
    promotionModel: require('./nosql/promotion'),
    eventsModel: require('./nosql/events'),
    eventFeedbackModel: require('./nosql/event-feedback'),
    commentModel: require('./nosql/comment'),
    categoryModel: require('./nosql/category')
}

module.exports = models