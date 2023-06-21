import CartService from "../services/cart.service.js";


class CartController {
    static async getCartItems(req, res) {
        try {
            const userId = req.user._id;
            const cartItems = await CartService.getCartItems(userId);
            res.status(200).json({ success: true, cartItems });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async addToCart(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.user._id;
            const cartItem = new Cart({ userId, productId, quantity });
            await cartItem.save();
            res.status(201).json({ success: true, message: "Item added to the cart!" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async updateCartItem(req, res) {
        try {
            const { cartItemId } = req.params;
            const { quantity } = req.body;
            await CartService.updateCartItem(cartItemId,quantity)
            res.status(201).json({ success: true, message: "Item updated in the cart!" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async deleteCartItem(req, res) {
        try {
            const { cartItemId } = req.params;
            await CartService.deleteItem(cartItemId)
            res.status(200).json({success:true, message: 'Cart item deleted successfully' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

}

export default CartController