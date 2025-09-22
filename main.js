const connectDB = require('./src/config/db');
const logger = require('./src/config/logger');

const UserService = require('./src/services/UserService');
const ProductService = require('./src/services/ProductService');
const OrderService = require('./src/services/OrderService');

const runDemo = async () => {
    await connectDB();
    logger.info('Iniciando demo DAL...');

    try {
        const user = await UserService.createUser({ name: 'John Doe', email: 'john.doe@example.com', password: '1234567' });
        const product = await ProductService.createProduct({ name: 'Smartphone X', description: 'Última geração', price: 999.99, category: 'Eletrônicos', stock: 50 });

        const order = await OrderService.createOrder({
            user: user._id,
            products: [{ product: product._id, quantity: 2, priceAtOrder: product.price }],
            totalAmount: product.price * 2,
            status: 'pending'
        });

        console.log('Pedido criado:', order);

        const fetched = await OrderService.findOrderById(order._id);
        console.log('Pedido buscado (populado):', fetched);

        const updated = await OrderService.updateOrder(order._id, { status: 'processing' });
        console.log('Pedido atualizado:', updated);

        const deleted = await OrderService.deleteOrder(order._id);
        console.log('Pedido deletado:', deleted);

        logger.info('Demo concluída!');
    } catch (error) {
        logger.error(`Erro demo: ${error.message}`);
        console.error(error);
    } finally {
        process.exit(0);
    }
};

runDemo();
