const multer = require('multer')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './middleware/folder')

        filename: (req, file, callback) => {
            callback(null, file.originalname)
        }
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.size >= 10000000) {
            return callback(null, true)
        } else {
            callback(null, false)
            return callback(new Error(`only jpg jpeg and file under 10 megabyte were allowed`))
        }
    }
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

async function uploadCloudinary(filePath) {
    let resp;
    try {
        resp = await cloudinary.uploader.upload(filePath, {
            use_filename: true
        })

        fs.unlinkSync(filePath)
        return resp.url
    } catch (e) {
        fs.unlinkSync(filePath)
        return
    }
}




module.exports = {
    upload,
    uploadCloudinary

}