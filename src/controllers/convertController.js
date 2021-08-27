const multer = require('multer');
const multerConfig = require('../config/multerConfig');

require('dotenv').config();

const upload = multer(multerConfig).single('file');

const File = require('../models/fileModel');
const Convert = require('./modules/converter');

exports.convert = async (req, res) => {
    return upload(req, res, async(err) => {
        if(err) return res.status(500).json({
            status: 200,
            statusText: 'Apenas arquivos docx'
        });

        try {
            const { originalname, filename } = req.file;

            const file = await new File(filename, originalname);
            const convert = new Convert(filename, '.pdf');
            try {
                await convert.pdf();
    
                return res.json({
                    status: 200,
                    statusText: `${process.env.URL}/files/${filename.slice(0, -5)}.pdf`
                });
            } catch(e) {
                return res.status(500).json({
                    status: 500,
                    statusText: 'Erro desconhecido'
                });
            }
        } catch(e) {
            return res.status(500).json({
                status: 500,
                statusText: 'Corpo invalido'
            });
        }
    });
}

exports.test = (req, res) => {}