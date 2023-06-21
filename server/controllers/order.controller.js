import OrderService from "../services/order.service.js";

class OrderController {
    static async placeOrder(req, res) {
        try {
            const { userId, products, totalAmount } = req.body;
            await OrderService.createOrder({ userId, products, totalAmount });
            res.status(201).json({success: true, message: 'Order created successfully!'});
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

export default OrderController