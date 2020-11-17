module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://pcanales:alaska1944@cluster0.gma7o.mongodb.net/pcm-bank-chll?retryWrites=true&w=majority',
    SALT_FACTOR: process.env.SALT_FACTOR || 10,
    PORT: process.env.PORT || 5000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:4200'
}