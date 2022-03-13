const httpStatus = require('http-status')

const jwt = require('jsonwebtoken')

const catchAsync = require('../../utils/catch-async')
const { userService, tokenService, authService } = require('../services')
const CustomError = require('../../utils/custom-error')
const { User } = require('../models/user_model')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await userService.getUser(email, password)
    const accessToken = tokenService.generateAccessToken({id: user._id})
    const refreshToken = tokenService.generateRefreshToken({id: user._id})
    res.setHeader('Authorization', `Bearer ${refreshToken}`)
    res.status(httpStatus.OK).send({user, accessToken, refreshToken})
})

const register = catchAsync(async (req, res) => {
    const user = await userService.checkUser(req.body)
    //const token = await tokenService.generateTokenForSendVerificationEmail(req.body)

    res.status(httpStatus.CREATED).send({
        statusCode: 200,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        sex: req.body.sex,
        mobile: req.body.mobile,
        message: 'Valid information. Move to confirm email before sending email activation.',
    })
})

const sendVerificationEmail = catchAsync(async (req, res) => {
    const {email} = req.body
    const token = await tokenService.generateTokenForSendVerificationEmail(req.body)
    await authService.sendVerificationEmail(token, email)
    res.status(httpStatus.CREATED).send({
        statusCode: 200,
        token: token,
        email: email, 
        message: 'Sending email successfully',
    })

})

const activateEmail = catchAsync(async (req, res) => {
    const { token } = req.body
    try {
        jwt.verify(token, process.env.PASSPORT_JWT_ACCOUNT_ACTIVATION)
        const { firstName, lastName, fullName, email, password, birthday, sex} = jwt.decode(token)
        const user = await userService.createUser(firstName, lastName, fullName, email, password, birthday, sex)
        res.status(httpStatus.CREATED).send({
            statusCode: 200,
            message: 'Create user successfully',
        })
    } catch (err) {
        throw new CustomError('402', err.message)
    }
   
})

const checkResetTokenValid = catchAsync(async (req, res) => {
    const { token } = req.body
    try {
        jwt.verify(token, process.env.PASSPORT_JWT_RESET_PASSWORD)
        res.status(httpStatus.CREATED).send({
            statusCode: 200,
            message: 'Valid token',
        })
    } catch (err) {
        throw new CustomError('500', err.message)
    }
   
})

const forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body
    const user = await userService.getUserByEmail(email)
    const resetPasswordToken = await tokenService.generateResetPasswordToken(email)
    await authService.sendResetPasswordEmail(resetPasswordToken, email)
    res.status(httpStatus.OK).send({
        message: 'Send email to reset password',
        token: resetPasswordToken
    })
})

const resetPassword = catchAsync(async (req, res) => {
    const { token, password } = req.body
    await userService.resetPassword(token, password)
    res.status(httpStatus.OK).send({
        message: 'Change your password successfully',
    })
})

const authGoogle = catchAsync(async (req, res) => {
    try {
       const { idToken } = req.body
       client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then((response) => {
           const { email, family_name, given_name, name, picture } = response.payload
           console.log(email)

           User.findOne({ email }).exec((err, user) => {
               if (user) {
                    const accessToken = tokenService.generateAccessToken({id: user._id})
                    const refreshToken = tokenService.generateRefreshToken({id: user._id})
                   
                    res.setHeader('Authorization', `Bearer ${refreshToken}`)
                    return res.status(httpStatus.OK).send({user, accessToken, refreshToken})
               } else {
                    user = new User({
                        firstName: family_name,
                        lastName: given_name,
                        fullName: name,
                        email: email,
                        password: email + '123456',
                        image: picture,
                        birthday: '2001-01-01',
                        mobile: "",
                        })
                        user.save((err, data) => {
                            if (err) {
                                throw new CustomError('500', 'Internet Server Error')
                            }
                             const accessToken = tokenService.generateAccessToken({id: user._id})
                             const refreshToken = tokenService.generateRefreshToken({id: user._id})
                            
                             res.setHeader('Authorization', `Bearer ${refreshToken}`)
                             return res.status(httpStatus.OK).send({user, accessToken, refreshToken})
                        })
               }
           })
       })
   } catch (err) {
       throw new CustomError('500', 'Internet Server Error')
   }
})



module.exports = {
    login,
    register,
    sendVerificationEmail,
    activateEmail, 
    forgotPassword,
    resetPassword,
    authGoogle,
    checkResetTokenValid
}
