const moment = require('moment')
const { User } = require('../models/index')
const { uploadCloudinary } = require('../middleware/upload.middleware')


async function createUser(req, res, next) {

    const dateFormat = moment(req.body.dob, "DD/MM/YYYY")

    const payload = {
        fullname: req.body.fullname,
        address: req.body.address,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        dob: dateFormat,
    }

    try {
        const createUser = await User.create(payload)

        res.json({
            message: 'success',
            status: 200,
            data: createUser
        })
        return

    } catch (error) {
        res.json({
            message: 'success',
            status: 500,
            data: error
        })
        return

    }

}

async function updateAvatar(req, res, next) {
    const id = req.params.id

    try {
        const url = await uploadCloudinary(req.file.path)

        await User.update({
            avatar: url
        }, {
            where: {
                id
            }
        })

        const getOne = await User.findOne({
            where: {
                id
            }
        })

        res.json({
            message: 'success',
            status: 200,
            data: getOne
        })
        return

    } catch (e) {
        res.json({
            message: 'success',
            status: 500,
            data: e
        })
        return

    }




}



module.exports = {
    createUser,
    updateAvatar

}