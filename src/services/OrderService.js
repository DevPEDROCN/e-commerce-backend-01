const Order = require('../models/Order');
const logger = require('../config/logger');

class OrderService {
    async createOrder(orderData) {
        const order = new Order(orderData);
        await order.save();
        logger.info(`Pedido criado para usuário: ${order.user}`, { orderId: order._id });
        return await this.findOrderById(order._id);
    }

    async findOrderById(id) {
        const order = await Order.findById(id)
            .populate('user', 'name email')
            .populate('products.product', 'name price');
        return order ? order.toObject() : null;
    }

    async updateOrder(id, updateData) {
        const updated = await Order.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            .populate('user', 'name email')
            .populate('products.product', 'name price');
        return updated ? updated.toObject() : null;
    }

    async deleteOrder(id) {
        const deleted = await Order.findByIdAndDelete(id)
            .populate('user', 'name email')
            .populate('products.product', 'name price');
        return deleted ? deleted.toObject() : null;
    }
}

module.exports = new OrderService();
