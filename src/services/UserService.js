const User = require('../models/User');
const logger = require('../config/logger');

class UserService {
    async createUser(userData) {
        try {
            if (!userData.name || !userData.email || !userData.password) {
                const error = new Error('Campos obrigatórios não preenchidos.');
                logger.error(error.message, { context: 'createUser', payload: userData });
                throw error;
            }

            const newUser = new User(userData);
            await newUser.save();
            logger.info(`Usuário criado: ${newUser.name}`, { userId: newUser._id });
            return newUser.toObject();
        } catch (error) {
            if (error.code === 11000) {
                const duplicateKey = Object.keys(error.keyValue)[0];
                const customError = new Error(`Duplicidade: ${duplicateKey} já está em uso.`);
                logger.error(customError.message, { context: 'createUser', payload: userData });
                throw customError;
            }
            logger.error(`Erro ao criar usuário: ${error.message}`, { context: 'createUser', payload: userData });
            throw error;
        }
    }

    async findUserById(userId) {
        const user = await User.findById(userId);
        return user ? user.toObject() : null;
    }

    async updateUser(userId, updateData) {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        return updatedUser ? updatedUser.toObject() : null;
    }

    async deleteUser(userId) {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser ? deletedUser.toObject() : null;
    }
}

module.exports = new UserService();
