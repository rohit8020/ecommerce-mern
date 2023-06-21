import Cart from './../models/Cart.js'

class CartService{
    static async getCartItems(userId){
        const cartItems= await Cart.find({userId})
        return cartItems
    }
    static async deleteItem(cartItemId){
        await Cart.findByIdAndRemove(cartItemId);
    }
    static async updateCartItem(cartItemId,quantity){
        await Cart.findByIdAndUpdate(
            cartItemId,
            { quantity },
            { new: false }
        );
    }
}

export default CartService