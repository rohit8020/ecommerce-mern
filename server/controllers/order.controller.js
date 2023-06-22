import OrderService from "../services/order.service.js";
import CartService from "../services/cart.service.js";

class OrderController {
    static async getAllOrders(req,res){
        try {
            const userId = req.user._id;
            console.log(userId);
            const orders=await OrderService.findOrders({userId});
            res.status(200).json({success:true,data:orders});
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async placeOrder(req, res) {
        try {
            const userId=req.user._id;
            const { products, totalAmount } = req.body;
            await OrderService.createOrder({ userId, products, totalAmount });
            await CartService.deleteItems({ userId})
            res.status(201).json({success: true, message: 'Order created successfully!'});
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

export default OrderController