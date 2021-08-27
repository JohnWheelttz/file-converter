const mongoose = require('mongoose');

require('dotenv').config();

const FileSchema = new mongoose.Schema({
    link: {type: String, required: true}
});

const FileModel = mongoose.model('File', FileSchema);

class File {
    constructor(filename, originalname) {
        this.link = `${process.env.URL}/${filename}`;
    }

    async createLink() {
        const newLink = await FileModel.create({ link: this.link });

        return newLink;
    }
}

module.exports = File;