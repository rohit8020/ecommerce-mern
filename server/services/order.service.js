import Order from "../models/Order.js";

class OrderService{
    static async createOrder({ userId, products, totalAmount }){
        const newOrder = new Order({ userId, products, totalAmount })
        await newOrder.save()
    }
}

export default OrderService;