const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');

require('dotenv').config();

const homeRoute = require('./routes/homeRoute');
const convertRoute = require('./routes/convertRoute');

class App {
    constructor() {
        this.app = express();
        mongoose.connect(process.env.CONNECTDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('DBCONNECTED');
            this.app.emit('DBCONNECTED');
        });
        
        this.middlewares();
        this.routes();

        this.app.use((req, res) => {
            res.status(500).json({
                status: 500,
                statusText: 'Page is not found'
            });
        });
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.app.use('/files', express.static(resolve(__dirname, 'downloads','resources')));

        this.app.set('views', resolve(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
    }

    routes() {
        this.app.use('/', homeRoute);

        this.app.use('/convert', convertRoute);
    }
}

module.exports = new App();