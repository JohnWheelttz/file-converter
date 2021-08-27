const multer = require('multer');
const { extname, resolve } = require('path');

const random = () => Math.floor(Math.random() * 10000 + 10000);

module.exports = {
    fileFilter: (req, file, cb) => {
        if(extname(file.originalname) !== '.docx') {
            return cb(new multer.MulterError('Arquivo precisa ser docx'));
        }

        return cb(null, true);
    },

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..' , 'uploads', 'resources'));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`)
        }
    })
};