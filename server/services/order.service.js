import Order from "../models/Order.js";

class OrderService{
    static async createOrder({ userId, products, totalAmount }){
        const newOrder = new Order({ userId, products, totalAmount })
        await newOrder.save()
    }

    static async findOrders(filter){
        console.log(filter)
        const orders= await Order.find(filter)
        console.log(orders)
        return orders
    }
}

export default OrderService;