const mongoose = require('mongoose');
const { MONGO_URI } = require('./../config/config');

module.exports = {
    connect() {

        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        mongoose.connection.on('connected', () => {
            console.log('Mongo connected');

        });

        mongoose.connection.on('error', (err) => {
            console.log('Failed ', err);

        });

        mongoose.connection.on('disconnected', () => {
            console.log('Disconected');
        });

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                process.exit(0);
            });
        });

    }
}