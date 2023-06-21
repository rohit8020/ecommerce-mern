import express from 'express';
import OrderController from '../controllers/order.controller.js';
const orderRouter = express.Router();

orderRouter.get('/placeOrder', OrderController.placeOrder)

export default orderRouter;