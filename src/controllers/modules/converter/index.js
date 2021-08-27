const libre = require('libreoffice-convert');
const { promisify } = require('util')
const libre_convert = promisify(libre.convert);
const { join } = require('path');
const fs = require('fs').promises;

class Convert {
    constructor(filename, extend='.pdf') {
        this.extend = extend
        this.enterPath = join(__dirname, `../../../uploads/resources/${filename}`);
        this.outputPath = join(__dirname, `../../../downloads/resources/${filename.slice(0, -5)}${extend}`);
    }

    async pdf() {
        const data = await fs.readFile(this.enterPath);

        await fs.unlink(this.enterPath);

        const done = await libre_convert(data, this.extend, undefined);

        await fs.writeFile(this.outputPath, done);
    }
}

module.exports = Convert;