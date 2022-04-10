const httpStatus = require('http-status')
const { Notify } = require('../models/notify_model')


const createNotify = async (id, recipients, url, text, content, image, userID) => {
    const notify = new Notifie({
        id, recipients, url, text, content, image, userID
    })

    await notify.save()

    return newMessage
}

const removeNotify = async (notifyID, url) => {
    const notify = await Notifie.findOneAndDelete({
        id: notifyID, url: url
    })
    return notify
}


const getNotifies = async (userID) => {
    const notify = await Notify.find({recipients: userID})
        .sort('-createdAt').populate('user', 'avatar username')
    return notify
}

const updateReadNotify = async (notifyID) => {
    const notifies = await Notify.findOneAndUpdate({_id: notifyID}, {
        isRead: true
    })
    return notifies
}

const deleteAllNotifies = async (userID) => {
    const notifies = await Notifie.deleteMany({recipients: userID})
    return notifies
}


module.exports = {
    createNotify,
    removeNotify,
    getNotifies,
    updateReadNotify,
    deleteAllNotifies
}