module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://pcanales:alaska1944@cluster0.gma7o.mongodb.net/pcm-bank-chll?retryWrites=true&w=majority',
    SALT_FACTOR: process.env.SALT_FACTOR || 10,
    PORT: process.env.PORT || 5000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:4200',
    JWT_SECRET: process.env.JWT_SECRET || 'bed764f2-0a54-4844-a91d-2394ece42a4e',
    SESSION_EXPIRE: process.env.SESSION_EXPIRE || '1h'
}