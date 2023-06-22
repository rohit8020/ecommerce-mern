import express from 'express';
import OrderController from '../controllers/order.controller.js';
import AuthMiddleware from '../middlewares/Auth.js';
const orderRouter = express.Router();

orderRouter.post('/placeOrder', AuthMiddleware.isLoggedIn, OrderController.placeOrder)
orderRouter.get('/allOrders', AuthMiddleware.isLoggedIn, OrderController.getAllOrders)

export default orderRouter;