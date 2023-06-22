import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";

class CartController {
    static async getCartItems(req, res) {
        try {
            const userId = req.user._id;
            const cartItemsMap = {}
            const productsMap = {};
            const cartItems = await CartService.getCartItems(userId);
            cartItems.forEach(cartItem => {
                cartItemsMap[cartItem.productId] = cartItem
            })
            const productIds = cartItems.map(cartItem => cartItem.productId)
            const products = await ProductService.findProducts({ _id: { $in: productIds } })
            products.forEach(product => {
                productsMap[product._id] = product
            })
            const response = [];
            cartItems.forEach(cartItem => {
                response.push({
                    productId: cartItem.productId,
                    name: productsMap[cartItem.productId].title,
                    quantity: cartItem.quantity,
                    price: productsMap[cartItem.productId].price,
                    cartItemId: cartItem._id
                })
            })
            console.log(response)
            res.status(200).json({ success: true, data: response });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async addToCart(req, res) {
        try {
            console.log(req.body)
            const { productId, quantity } = req.body;
            const userId = req.user._id;
            await CartService.addToCart({ productId, quantity, userId });
            res.status(201).json({ success: true, message: "Item added to the cart!" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

export default CartController