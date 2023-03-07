const router = require('express').Router()
const { createUser,
    updateAvatar
} = require('../../controller/user.controller')
const { upload } = require('../../middleware/upload.middleware')
router.post('/register', createUser)
router.put('/:id', upload.single('avatar'), updateAvatar)





module.exports = router