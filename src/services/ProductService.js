const Product = require('../models/Product');
const logger = require('../config/logger');

class ProductService {
    async createProduct(data) {
        const product = new Product(data);
        await product.save();
        logger.info(`Produto criado: ${product.name}`, { productId: product._id });
        return product.toObject();
    }

    async findProductById(id) {
        const product = await Product.findById(id);
        return product ? product.toObject() : null;
    }

    async updateProduct(id, updateData) {
        const updated = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return updated ? updated.toObject() : null;
    }

    async deleteProduct(id) {
        const deleted = await Product.findByIdAndDelete(id);
        return deleted ? deleted.toObject() : null;
    }
}

module.exports = new ProductService();
