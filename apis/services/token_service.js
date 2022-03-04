const jwt = require('jsonwebtoken')
const moment = require('moment')

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */

const generateTokenForSendVerificationEmail = (userBody) => {
    const payload = {
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        fullName: userBody.fullName,
        email: userBody.email,
        password: userBody.password,
        birthday: userBody.birthday,
        sex: userBody.sex,
        phone: userBody.phone
    }
    return jwt.sign(payload, process.env.PASSPORT_JWT_ACCOUNT_ACTIVATION, {
        expiresIn: '100m',
    })
}

const generateAccessToken = (id) => {
    const payload = {
        id: id
    }
    return jwt.sign(payload, process.env.PASSPORT_JWT_ACCESS_TOKEN, {
        expiresIn: '1d',
    })
}

const generateRefreshToken = (id) => {
    const payload = {
        id: id
    }
    return jwt.sign(payload, process.env.PASSPORT_JWT_REFRESH_TOKEN, {
        expiresIn: '7d',
    })
}

const generateResetPasswordToken = (email) => {
    const resetPasswordToken = jwt.sign(
        {
            email,
        },
        process.env.PASSPORT_JWT_RESET_PASSWORD,
        {
            expiresIn: '5m',
        }
    )
    return resetPasswordToken
}

module.exports = {
    generateTokenForSendVerificationEmail,
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken,
}
