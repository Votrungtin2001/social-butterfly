const httpStatus = require('http-status')
const CustomError = require('../../utils/custom-error')
const { User } = require('../models/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const checkUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new CustomError('401', 'Email already taken')
    }
}

const createUser = async (firstName, lastName, fullName, email, password, birthday, sex) => {
    if (await User.isEmailTaken(email)) {
        throw new CustomError('401', 'Email already taken')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
        firstName: firstName, 
        lastName: lastName,
        fullName: fullName,
        email: email,
        password: passwordHash,
        birthday: birthday,
        sex: sex
    })

    return newUser.save()
}

const getUser = async (email, password) => {
    const user = await User.findOne({email}).populate("followers following", "avatar username fullname followers following")
    if(!user) throw new CustomError('401', 'This email does not exist.')

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new CustomError('402', 'Password is incorrect.')

    return user
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({email}).populate("followers following", "avatar username fullname followers following")
    if(!user) throw new CustomError('400', 'This email does not exist.')
    return user

}

const resetPassword = async (token, password) => {
    try {
        jwt.verify(token, process.env.PASSPORT_JWT_RESET_PASSWORD)
        const { email } = jwt.decode(token)
        const user = await getUserByEmail(email)
        const passwordHash = await bcrypt.hash(password, 10)
        user.password = passwordHash
        user.save()
    } catch (err) {
        throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err.message)
    }
}



module.exports = {
    getUser,
    checkUser,
    createUser,
    getUserByEmail,
    resetPassword
}
