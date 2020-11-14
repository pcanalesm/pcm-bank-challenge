module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/pcm-bank-chll',
    SALT_FACTOR: process.env.SALT_FACTOR || 10,
    PORT: process.env.PORT || 5000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:4200'
}