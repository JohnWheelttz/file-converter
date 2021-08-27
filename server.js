const app = require('./src/app').app;

require('dotenv').config();

const port = process.env.PORT || 3000;
app.on('DBCONNECTED', () => {
    app.listen(port, () => {
        console.log('http://localhost:3000');
    })
})