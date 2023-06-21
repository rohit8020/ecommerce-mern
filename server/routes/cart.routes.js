import express from 'express'
import CartController from '../controllers/cart.controller.js';
import AuthMiddleware from '../middlewares/Auth.js'; 

const cartRouter=express.Router();

cartRouter.get('/cartItems',AuthMiddleware.isLoggedIn,CartController.getCartItems)
cartRouter.post('/addItem',AuthMiddleware.isLoggedIn,CartController.addToCart)
cartRouter.put('/:cartItemId',AuthMiddleware.isLoggedIn, CartController.updateCartItem);
cartRouter.delete('/:cartItemId',AuthMiddleware.isLoggedIn, CartController.deleteCartItem);

export default cartRouter