import express from 'express';
import ProductsController from '../controllers/products.controller.js';
const productsRouter=express.Router();

productsRouter.get('/allProducts',ProductsController.getAllProducts)

export default productsRouter;