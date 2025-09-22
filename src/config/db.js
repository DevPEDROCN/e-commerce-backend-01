const mongoose = require('mongoose');
const logger = require('./logger');
const config = { mongoURI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce' };

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        logger.info('MongoDB conectado com sucesso!');
    } catch (err) {
        logger.error(`Erro de conexão MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
